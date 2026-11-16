"use client";

import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Sparkles,
  Sliders,
  Check,
  DoorClosed,
  DoorOpen,
  Palette,
  Layers,
  Info,
  ShieldCheck,
  RotateCcw,
  Maximize2,
  ChevronRight,
  Eye,
} from "lucide-react";

export type DoorModel = "1_pintu" | "2_pintu" | "extra_swing";
export type ColorMode = "1_warna" | "2_warna" | "strip_warna";

export interface ColorPreset {
  id: string;
  name: string;
  hex: string;
  gradientStart: string;
  gradientEnd: string;
  borderHex: string;
  badge?: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: "maroon",
    name: "Merah Marun",
    hex: "#b91c1c",
    gradientStart: "#dc2626",
    gradientEnd: "#7f1d1d",
    borderHex: "#ef4444",
    badge: "Sesuai Render Ruko",
  },
  {
    id: "green",
    name: "Hijau Harmonika",
    hex: "#15803d",
    gradientStart: "#22c55e",
    gradientEnd: "#14532d",
    borderHex: "#4ade80",
    badge: "Sesuai Pintu Extra Asli",
  },
  {
    id: "black",
    name: "Hitam Doff",
    hex: "#18181b",
    gradientStart: "#27272a",
    gradientEnd: "#09090b",
    borderHex: "#52525b",
  },
  {
    id: "silver",
    name: "Abu-abu Baja / Silver",
    hex: "#475569",
    gradientStart: "#64748b",
    gradientEnd: "#334155",
    borderHex: "#94a3b8",
  },
  {
    id: "bronze",
    name: "Coklat Mocca",
    hex: "#451a03",
    gradientStart: "#78350f",
    gradientEnd: "#301002",
    borderHex: "#b45309",
  },
  {
    id: "navy",
    name: "Biru Safir",
    hex: "#1e3a8a",
    gradientStart: "#2563eb",
    gradientEnd: "#172554",
    borderHex: "#60a5fa",
  },
  {
    id: "white",
    name: "Putih Bersih",
    hex: "#e2e8f0",
    gradientStart: "#f8fafc",
    gradientEnd: "#cbd5e1",
    borderHex: "#ffffff",
  },
  {
    id: "gold",
    name: "Emas Elegan",
    hex: "#b45309",
    gradientStart: "#d97706",
    gradientEnd: "#78350f",
    borderHex: "#fde047",
  },
];

export const STRIP_PRESETS: { id: string; name: string; hex: string }[] = [
  { id: "gold", name: "Gold Metalik", hex: "#fbbf24" },
  { id: "orange", name: "Oranye Sporty", hex: "#ea580c" },
  { id: "red", name: "Merah Kontras", hex: "#ef4444" },
  { id: "chrome", name: "Silver Chrome", hex: "#f1f5f9" },
  { id: "cyan", name: "Biru Cyan", hex: "#06b6d4" },
  { id: "lime", name: "Hijau Neon", hex: "#84cc16" },
];

interface HarmonikaVisualizerProps {
  model: DoorModel;
  onModelChange: (model: DoorModel) => void;
  colorMode: ColorMode;
  onColorModeChange: (mode: ColorMode) => void;
  primaryColorId: string;
  onPrimaryColorChange: (colorId: string) => void;
  secondaryColorId: string;
  onSecondaryColorChange: (colorId: string) => void;
  stripColorId: string;
  onStripColorChange: (stripId: string) => void;
  widthMeters: number;
  heightMeters: number;
}

export default function HarmonikaVisualizer({
  model,
  onModelChange,
  colorMode,
  onColorModeChange,
  primaryColorId,
  onPrimaryColorChange,
  secondaryColorId,
  onSecondaryColorChange,
  stripColorId,
  onStripColorChange,
  widthMeters,
  heightMeters,
}: HarmonikaVisualizerProps) {
  // Pintu Extra 2-step animation state:
  // 0 = Full Closed (Tertutup Rapat)
  // 1 = Pintu Extra Open (Pintu kecil di tengah terbuka ke samping untuk orang lewat)
  // 2 = Full Harmonika Open (Seluruh pintu harmonika melipat ke tepi samping)
  const [extraStage, setExtraStage] = useState<0 | 1 | 2>(0);

  // Standard open ratio for Model 1 Pintu and 2 Pintu: 0 (closed) to 1 (full open)
  const [openRatio, setOpenRatio] = useState<number>(0);
  const [isNightMode, setIsNightMode] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const primaryColor =
    COLOR_PRESETS.find((c) => c.id === primaryColorId) || COLOR_PRESETS[0];
  const secondaryColor =
    COLOR_PRESETS.find((c) => c.id === secondaryColorId) || COLOR_PRESETS[1];
  const stripColor =
    STRIP_PRESETS.find((s) => s.id === stripColorId) || STRIP_PRESETS[0];

  // Auto reset when model changes
  useEffect(() => {
    setExtraStage(0);
    setOpenRatio(0);
  }, [model]);

  // Main interactive click handler: cycles stages
  const handleMainActionClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (model === "extra_swing") {
      // 2-step sequential animation requested:
      // 0 (closed) -> 1 (pintu extra terbuka) -> 2 (full harmonika terbuka) -> 0 (closed)
      setExtraStage((prev) => {
        if (prev === 0) return 1;
        if (prev === 1) return 2;
        return 0;
      });
      setTimeout(() => setIsAnimating(false), 700);
    } else {
      // Toggle 0 <-> 1 for 1_pintu and 2_pintu
      setOpenRatio((prev) => (prev > 0.4 ? 0 : 0.95));
      setTimeout(() => setIsAnimating(false), 700);
    }
  };

  // Specific stage selector for extra_swing
  const setExtraStageDirect = (stage: 0 | 1 | 2) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setExtraStage(stage);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Calculate opening metrics
  const isCurrentlyExtraOpen = model === "extra_swing" && extraStage === 1;
  const isCurrentlyFullOpen =
    model === "extra_swing" ? extraStage === 2 : openRatio > 0.4;
  const isCurrentlyClosed =
    model === "extra_swing" ? extraStage === 0 : openRatio <= 0.05;

  // Slats count
  const slatCount = 16;
  const halfSlat = 8;

  // Render authentic Scissor Lattice (Silangan Harmonika Besi Baja)
  const renderScissorTrellis = (heightPercent = 100) => {
    return (
      <svg
        className="w-full h-full pointer-events-none opacity-80"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          d="M0 15 L25 35 L50 15 L75 35 L100 15 M0 35 L25 15 L50 35 L75 15 L100 35 M0 50 L25 70 L50 50 L75 70 L100 50 M0 70 L25 50 L50 70 L75 50 L100 70 M0 85 L25 100 L50 85 L75 100 L100 85 M0 100 L25 85 L50 100 L75 85 L100 100"
          stroke="#fcd34d"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Rivet pins */}
        <circle cx="25" cy="25" r="1.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.5" />
        <circle cx="50" cy="25" r="1.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.5" />
        <circle cx="75" cy="25" r="1.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.5" />
        <circle cx="25" cy="60" r="1.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.5" />
        <circle cx="50" cy="60" r="1.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.5" />
        <circle cx="75" cy="60" r="1.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.5" />
        <circle cx="25" cy="92" r="1.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.5" />
        <circle cx="50" cy="92" r="1.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.5" />
        <circle cx="75" cy="92" r="1.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.5" />
      </svg>
    );
  };

  return (
    <div className="bg-gradient-to-b from-[#1c0207] via-[#100104] to-black rounded-3xl border-2 border-maroon-700/70 shadow-2xl overflow-hidden flex flex-col">
      {/* Studio Header Controls */}
      <div className="p-4 sm:p-5 bg-black/70 border-b border-maroon-900/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-black text-white">
                Studio Render Ruko Asli & Pintu Harmonika
              </h4>
              <span className="text-[10px] bg-red-950 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/40 font-bold">
                ★ FOTO RENDER NYATA
              </span>
            </div>
            <p className="text-[11px] text-rose-200/80">
              Simulasi interaktif pada fasad ruko 3D realistis lengkap dengan sistem Pintu Extra (Bukaan 2 Langkah).
            </p>
          </div>
        </div>

        {/* Day / Night and Play Actions */}
        <div className="flex items-center space-x-2">
          {/* Day / Night Mode Button */}
          <button
            type="button"
            onClick={() => setIsNightMode(!isNightMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border min-h-[40px] shadow-sm active:scale-95 ${
              isNightMode
                ? "bg-slate-900 text-amber-300 border-amber-400/40 shadow-amber-400/10"
                : "bg-amber-100 text-slate-900 border-amber-300"
            }`}
            title="Ubah Suasana Pencahayaan (Siang Alami / Malam dengan Spotlight Sorot)"
          >
            {isNightMode ? (
              <>
                <Moon className="w-4 h-4 text-amber-400" />
                <span>Malam (Lampu Sorot)</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-amber-600" />
                <span>Siang Hari</span>
              </>
            )}
          </button>

          {/* Master Action Button */}
          <button
            type="button"
            onClick={handleMainActionClick}
            disabled={isAnimating}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 shadow-xl min-h-[40px] active:scale-95 ${
              isCurrentlyFullOpen
                ? "bg-gradient-to-r from-red-600 to-maroon-700 hover:from-red-500 hover:to-maroon-600 text-white border border-rose-400"
                : isCurrentlyExtraOpen
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border border-emerald-300"
                : "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 hover:brightness-105 border border-amber-200"
            }`}
          >
            {isCurrentlyFullOpen ? (
              <>
                <DoorClosed className="w-4 h-4 shrink-0" />
                <span>Tutup Pintu</span>
              </>
            ) : isCurrentlyExtraOpen ? (
              <>
                <Maximize2 className="w-4 h-4 shrink-0" />
                <span>Buka Full Harmonika</span>
              </>
            ) : (
              <>
                <DoorOpen className="w-4 h-4 shrink-0" />
                <span>{model === "extra_swing" ? "Buka Pintu Extra" : "Buka Pintu"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* MODEL SELECTOR & STEP BAR */}
      <div className="px-4 py-3 bg-black/50 border-b border-maroon-900/60 flex flex-wrap items-center justify-between gap-3">
        {/* Model Tabs */}
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={() => onModelChange("2_pintu")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              model === "2_pintu"
                ? "bg-maroon-800 text-white border border-amber-400/50 shadow-md"
                : "bg-white/5 text-rose-200 hover:bg-white/10 border border-transparent"
            }`}
          >
            Model 2 Pintu (Bukaan Tengah)
          </button>

          <button
            type="button"
            onClick={() => onModelChange("1_pintu")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              model === "1_pintu"
                ? "bg-maroon-800 text-white border border-amber-400/50 shadow-md"
                : "bg-white/5 text-rose-200 hover:bg-white/10 border border-transparent"
            }`}
          >
            Model 1 Pintu (1 Arah)
          </button>

          <button
            type="button"
            onClick={() => onModelChange("extra_swing")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              model === "extra_swing"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black border border-amber-200 shadow-lg shadow-amber-500/20"
                : "bg-white/5 text-rose-200 hover:bg-white/10 border border-transparent"
            }`}
          >
            <span>Model Pintu Extra (Bukaan 2x)</span>
            <span className="text-[10px] bg-red-950 text-amber-300 px-1.5 py-0.2 rounded-md font-extrabold">
              Foto 2
            </span>
          </button>
        </div>

        {/* Status Pills / Stage Navigator */}
        {model === "extra_swing" ? (
          <div className="flex items-center space-x-1 bg-black/60 p-1 rounded-xl border border-maroon-800 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setExtraStageDirect(0)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                extraStage === 0
                  ? "bg-maroon-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              1. Tertutup Rapat
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <button
              type="button"
              onClick={() => setExtraStageDirect(1)}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                extraStage === 1
                  ? "bg-emerald-600 text-white font-extrabold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>2. Pintu Extra Terbuka</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <button
              type="button"
              onClick={() => setExtraStageDirect(2)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                extraStage === 2
                  ? "bg-amber-400 text-slate-950 font-black shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              3. Full Harmonika Buka
            </button>
          </div>
        ) : (
          <div className="text-xs text-rose-200/90 font-medium">
            Status:{" "}
            <strong className={isCurrentlyFullOpen ? "text-amber-300" : "text-emerald-400"}>
              {isCurrentlyFullOpen ? "Terbuka Penuh" : "Tertutup Rapat"}
            </strong>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* THE PHOTOREALISTIC RUKO STAGE: FULL-BLEED REAL ARCHITECTURAL RENDER STAGE */}
      {/* ========================================================================= */}
      <div
        className="relative w-full overflow-hidden select-none cursor-pointer group"
        onClick={handleMainActionClick}
        title="Klik pintu pada gambar untuk memutar animasi buka / tutup"
      >
        {/* Aspect Ratio Box: Exactly 836 x 860 Matching the Render Dimensions */}
        <div className="relative w-full max-w-[850px] mx-auto" style={{ aspectRatio: "836 / 860" }}>
          
          {/* ======================================================== */}
          {/* LAYER 0: FULL-BLEED DAY / NIGHT BACKGROUND (TIDAK TERPOTONG) */}
          {/* ======================================================== */}
          <div
            className={`absolute inset-0 transition-all duration-700 ${
              isNightMode
                ? "bg-gradient-to-b from-[#020510] via-[#0b132a] to-[#120206]"
                : "bg-gradient-to-b from-[#38bdf8] via-[#7dd3fc] to-[#e0f2fe]"
            }`}
          />

          {/* ======================================================== */}
          {/* LAYER 1: INTERIOR RUANG RUKO (TERUNGKAP SAAT PINTU TERBUKA) */}
          {/* Doorway Aperture: Left: 25.72%, Top: 48.37%, Width: 64.35%, Height: 41.28% */}
          {/* ======================================================== */}
          <div
            className="absolute overflow-hidden"
            style={{
              left: "25.72%",
              top: "48.37%",
              width: "64.35%",
              height: "41.28%",
            }}
          >
            {/* Realistic Store Interior Perspective */}
            <div className="relative w-full h-full bg-gradient-to-b from-[#111827] via-[#1f2937] to-[#0f172a] flex flex-col justify-between p-4 shadow-inner">
              {/* Back Wall with Store Logo & Warm Showroom Lighting */}
              <div className="w-full flex flex-col items-center justify-center pt-6 space-y-2">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-amber-400/60 flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-center">
                  <div className="text-xs sm:text-sm font-black text-white tracking-widest uppercase">
                    UD. FARIADJI SHOWROOM
                  </div>
                  <div className="text-[10px] text-amber-300 font-bold">
                    PABRIK RESMI PINTU HARMONIKA SNI
                  </div>
                </div>
                <div className="flex items-center space-x-6 pt-2">
                  <div className="w-16 h-28 bg-white/5 border border-white/10 rounded-lg shadow-md flex items-end p-2">
                    <div className="w-full h-8 bg-amber-400/20 rounded" />
                  </div>
                  <div className="w-20 h-28 bg-white/5 border border-white/10 rounded-lg shadow-md flex items-end p-2">
                    <div className="w-full h-12 bg-rose-400/20 rounded" />
                  </div>
                  <div className="w-16 h-28 bg-white/5 border border-white/10 rounded-lg shadow-md flex items-end p-2">
                    <div className="w-full h-8 bg-emerald-400/20 rounded" />
                  </div>
                </div>
              </div>

              {/* Tiled Luxury Floor with Perspective Reflection */}
              <div
                className="h-28 w-full bg-gradient-to-t from-slate-900 via-slate-800 to-transparent border-t border-slate-700/60"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(255,255,255,0.06) 38px, rgba(255,255,255,0.06) 40px)",
                }}
              />

              {/* Warm Ceiling Recessed Spotlights */}
              <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-amber-300/20 via-amber-400/10 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* ======================================================== */}
          {/* LAYER 2: THE INTERACTIVE PINTU HARMONIKA & PINTU EXTRA   */}
          {/* ======================================================== */}
          <div
            className="absolute z-10 overflow-hidden"
            style={{
              left: "25.72%",
              top: "48.37%",
              width: "64.35%",
              height: "41.28%",
            }}
          >
            {/* Top Guide Rail (Rel Atas) */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 border-b border-amber-400/40 z-30 shadow-md flex items-center justify-between px-2">
              <div className="w-2 h-2 rounded-full bg-slate-950" />
              <div className="h-1 w-full mx-2 bg-slate-950 rounded-full" />
              <div className="w-2 h-2 rounded-full bg-slate-950" />
            </div>

            {/* Bottom Track (Rel Bawah Tanam) */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-slate-950 via-slate-800 to-slate-700 border-t border-amber-400/40 z-30 shadow-inner flex items-center justify-between px-2">
              <div className="w-2 h-2 rounded-full bg-slate-950" />
              <div className="h-1 w-full mx-2 bg-slate-950 rounded-full" />
              <div className="w-2 h-2 rounded-full bg-slate-950" />
            </div>

            {/* ---------------------------------------------------- */}
            {/* CASE A: MODEL EXTRA SWING (PINTU EXTRA SESUAI FOTO 2) */}
            {/* ---------------------------------------------------- */}
            {model === "extra_swing" && (
              <div className="relative w-full h-full pt-4 pb-4">
                {/* 1. LEFT HARMONIKA WING (Daun Harmonika Sayap Kiri) */}
                <div
                  className={`absolute top-4 bottom-4 left-0 w-[38%] transition-all duration-[800ms] cubic-bezier(0.25, 1, 0.5, 1) origin-left flex z-20 ${
                    extraStage === 2
                      ? "-translate-x-[85%] scale-x-[0.16] opacity-90 shadow-2xl"
                      : "translate-x-0 scale-x-100 opacity-100"
                  }`}
                >
                  <div
                    className="relative w-full h-full flex border-r-2 border-slate-900 shadow-md"
                    style={{
                      background: `linear-gradient(90deg, ${primaryColor.gradientStart}, ${primaryColor.hex} 40%, ${primaryColor.gradientEnd})`,
                    }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`left-slat-${i}`}
                        className="flex-1 h-full border-r border-black/30 relative flex items-center justify-center"
                        style={{
                          background:
                            colorMode === "2_warna" && i % 2 === 1
                              ? `linear-gradient(90deg, ${secondaryColor.gradientStart}, ${secondaryColor.hex}, ${secondaryColor.gradientEnd})`
                              : undefined,
                        }}
                      >
                        {/* UNP Profile Rib */}
                        <div className="w-1.5 h-full bg-black/25 shadow-sm" />
                        {colorMode === "strip_warna" && (
                          <div
                            className="absolute top-0 bottom-0 w-1"
                            style={{ backgroundColor: stripColor.hex }}
                          />
                        )}
                        {/* Rivets */}
                        <div className="absolute top-6 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                        <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                        <div className="absolute bottom-6 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                      </div>
                    ))}
                    {/* Pantograph Trellis */}
                    <div className="absolute inset-0">{renderScissorTrellis()}</div>
                  </div>
                </div>

                {/* 2. CENTER SECTION: PINTU EXTRA (PASS DOOR SESUAI FOTO 2) */}
                <div
                  className={`absolute top-4 bottom-4 left-[38%] w-[24%] transition-all duration-[800ms] cubic-bezier(0.25, 1, 0.5, 1) origin-left z-25 flex ${
                    extraStage === 2
                      ? "-translate-x-[75%] scale-x-[0.15] opacity-80"
                      : "translate-x-0 scale-x-100 opacity-100"
                  }`}
                >
                  {/* Pintu Extra Outer Frame (Kusen Pintu Extra Baja) */}
                  <div className="relative w-full h-full border-2 border-amber-400/80 bg-black/40 shadow-2xl flex overflow-hidden">
                    
                    {/* Scissor Lattice Background inside the pass door */}
                    <div className="absolute inset-0 bg-black/60 z-0">
                      {renderScissorTrellis()}
                    </div>

                    {/* LEFT EXTRA DOOR LEAF (Daun Pintu Extra Kiri - Swing Open) */}
                    <div
                      className={`relative z-10 w-1/2 h-full border-r border-amber-300 transition-all duration-700 origin-left flex flex-col justify-between shadow-2xl ${
                        extraStage === 1
                          ? "-rotate-y-[82%] translate-x-[-15%] scale-x-[0.35] opacity-90 shadow-2xl"
                          : "rotate-y-0 translate-x-0 scale-x-100 opacity-100"
                      }`}
                      style={{
                        background: `linear-gradient(90deg, ${primaryColor.gradientStart}, ${primaryColor.hex})`,
                        perspective: "600px",
                      }}
                    >
                      <div className="w-full h-4 bg-black/40 border-b border-amber-400/40" />
                      {/* Chrome Handle & Master Lock Leaf */}
                      <div className="w-full flex items-center justify-end pr-1.5">
                        <div className="w-2.5 h-10 rounded-sm bg-gradient-to-r from-slate-200 to-slate-400 shadow-md border border-slate-500 flex items-center justify-center">
                          <div className="w-1 h-3 bg-slate-700 rounded-full" />
                        </div>
                      </div>
                      <div className="w-full h-4 bg-black/40 border-t border-amber-400/40" />
                    </div>

                    {/* RIGHT EXTRA DOOR LEAF (Daun Pintu Extra Kanan - Swing Open) */}
                    <div
                      className={`relative z-10 w-1/2 h-full border-l border-amber-300 transition-all duration-700 origin-right flex flex-col justify-between shadow-2xl ${
                        extraStage === 1
                          ? "rotate-y-[82%] translate-x-[15%] scale-x-[0.35] opacity-90 shadow-2xl"
                          : "rotate-y-0 translate-x-0 scale-x-100 opacity-100"
                      }`}
                      style={{
                        background: `linear-gradient(90deg, ${primaryColor.hex}, ${primaryColor.gradientEnd})`,
                        perspective: "600px",
                      }}
                    >
                      <div className="w-full h-4 bg-black/40 border-b border-amber-400/40" />
                      {/* Chrome Handle & Keyhole */}
                      <div className="w-full flex items-center justify-start pl-1.5">
                        <div className="w-2.5 h-10 rounded-sm bg-gradient-to-r from-slate-200 to-slate-400 shadow-md border border-slate-500 flex flex-col items-center justify-center space-y-1">
                          <div className="w-1 h-3 bg-slate-700 rounded-full" />
                          <div className="w-1 h-1 rounded-full bg-slate-900" />
                        </div>
                      </div>
                      <div className="w-full h-4 bg-black/40 border-t border-amber-400/40" />
                    </div>

                    {/* Status Badge on Pintu Extra */}
                    {extraStage === 1 && (
                      <div className="absolute inset-x-2 top-2 z-20 bg-emerald-500/90 text-white text-[9px] font-black text-center py-0.5 rounded shadow-lg animate-pulse">
                        Akses Orang Lewat Terbuka
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. RIGHT HARMONIKA WING (Daun Harmonika Sayap Kanan) */}
                <div
                  className={`absolute top-4 bottom-4 right-0 w-[38%] transition-all duration-[800ms] cubic-bezier(0.25, 1, 0.5, 1) origin-right flex z-20 ${
                    extraStage === 2
                      ? "translate-x-[85%] scale-x-[0.16] opacity-90 shadow-2xl"
                      : "translate-x-0 scale-x-100 opacity-100"
                  }`}
                >
                  <div
                    className="relative w-full h-full flex border-l-2 border-slate-900 shadow-md"
                    style={{
                      background: `linear-gradient(90deg, ${primaryColor.gradientEnd}, ${primaryColor.hex} 60%, ${primaryColor.gradientStart})`,
                    }}
                  >
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={`right-slat-${i}`}
                        className="flex-1 h-full border-r border-black/30 relative flex items-center justify-center"
                        style={{
                          background:
                            colorMode === "2_warna" && i % 2 === 0
                              ? `linear-gradient(90deg, ${secondaryColor.gradientStart}, ${secondaryColor.hex}, ${secondaryColor.gradientEnd})`
                              : undefined,
                        }}
                      >
                        {/* UNP Profile Rib */}
                        <div className="w-1.5 h-full bg-black/25 shadow-sm" />
                        {colorMode === "strip_warna" && (
                          <div
                            className="absolute top-0 bottom-0 w-1"
                            style={{ backgroundColor: stripColor.hex }}
                          />
                        )}
                        {/* Rivets */}
                        <div className="absolute top-6 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                        <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                        <div className="absolute bottom-6 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                      </div>
                    ))}
                    {/* Pantograph Trellis */}
                    <div className="absolute inset-0">{renderScissorTrellis()}</div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* CASE B: MODEL 2 PINTU (BUKAAN TENGAH STANDAR RUKO)   */}
            {/* ---------------------------------------------------- */}
            {model === "2_pintu" && (
              <div className="relative w-full h-full pt-4 pb-4 flex">
                {/* Sayap Kiri */}
                <div
                  className={`w-1/2 h-full transition-all duration-[800ms] cubic-bezier(0.25, 1, 0.5, 1) origin-left flex border-r border-amber-400/80 ${
                    openRatio > 0.4
                      ? "-translate-x-[85%] scale-x-[0.16] opacity-90 shadow-2xl"
                      : "translate-x-0 scale-x-100 opacity-100"
                  }`}
                >
                  <div
                    className="relative w-full h-full flex shadow-md"
                    style={{
                      background: `linear-gradient(90deg, ${primaryColor.gradientStart}, ${primaryColor.hex} 40%, ${primaryColor.gradientEnd})`,
                    }}
                  >
                    {[...Array(halfSlat)].map((_, i) => (
                      <div
                        key={`2p-left-${i}`}
                        className="flex-1 h-full border-r border-black/30 relative flex items-center justify-center"
                        style={{
                          background:
                            colorMode === "2_warna" && i % 2 === 1
                              ? `linear-gradient(90deg, ${secondaryColor.gradientStart}, ${secondaryColor.hex}, ${secondaryColor.gradientEnd})`
                              : undefined,
                        }}
                      >
                        <div className="w-1.5 h-full bg-black/25 shadow-sm" />
                        {colorMode === "strip_warna" && (
                          <div
                            className="absolute top-0 bottom-0 w-1"
                            style={{ backgroundColor: stripColor.hex }}
                          />
                        )}
                        <div className="absolute top-6 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                        <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                        <div className="absolute bottom-6 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                      </div>
                    ))}
                    {/* Chrome Handle on Center Jamb */}
                    <div className="w-4 h-full bg-slate-900 border-l border-amber-400 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-10 bg-slate-200 rounded shadow-sm" />
                    </div>
                    <div className="absolute inset-0">{renderScissorTrellis()}</div>
                  </div>
                </div>

                {/* Sayap Kanan */}
                <div
                  className={`w-1/2 h-full transition-all duration-[800ms] cubic-bezier(0.25, 1, 0.5, 1) origin-right flex border-l border-amber-400/80 ${
                    openRatio > 0.4
                      ? "translate-x-[85%] scale-x-[0.16] opacity-90 shadow-2xl"
                      : "translate-x-0 scale-x-100 opacity-100"
                  }`}
                >
                  <div
                    className="relative w-full h-full flex shadow-md"
                    style={{
                      background: `linear-gradient(90deg, ${primaryColor.gradientEnd}, ${primaryColor.hex} 60%, ${primaryColor.gradientStart})`,
                    }}
                  >
                    {/* Chrome Handle on Center Jamb */}
                    <div className="w-4 h-full bg-slate-900 border-r border-amber-400 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-10 bg-slate-200 rounded shadow-sm" />
                    </div>
                    {[...Array(halfSlat)].map((_, i) => (
                      <div
                        key={`2p-right-${i}`}
                        className="flex-1 h-full border-r border-black/30 relative flex items-center justify-center"
                        style={{
                          background:
                            colorMode === "2_warna" && i % 2 === 0
                              ? `linear-gradient(90deg, ${secondaryColor.gradientStart}, ${secondaryColor.hex}, ${secondaryColor.gradientEnd})`
                              : undefined,
                        }}
                      >
                        <div className="w-1.5 h-full bg-black/25 shadow-sm" />
                        {colorMode === "strip_warna" && (
                          <div
                            className="absolute top-0 bottom-0 w-1"
                            style={{ backgroundColor: stripColor.hex }}
                          />
                        )}
                        <div className="absolute top-6 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                        <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                        <div className="absolute bottom-6 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                      </div>
                    ))}
                    <div className="absolute inset-0">{renderScissorTrellis()}</div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* CASE C: MODEL 1 PINTU (BUKAAN 1 ARAH DORONG)        */}
            {/* ---------------------------------------------------- */}
            {model === "1_pintu" && (
              <div className="relative w-full h-full pt-4 pb-4">
                <div
                  className={`w-full h-full transition-all duration-[850ms] cubic-bezier(0.25, 1, 0.5, 1) origin-left flex ${
                    openRatio > 0.4
                      ? "-translate-x-[88%] scale-x-[0.14] opacity-90 shadow-2xl"
                      : "translate-x-0 scale-x-100 opacity-100"
                  }`}
                >
                  <div
                    className="relative w-full h-full flex shadow-md"
                    style={{
                      background: `linear-gradient(90deg, ${primaryColor.gradientStart}, ${primaryColor.hex} 40%, ${primaryColor.gradientEnd})`,
                    }}
                  >
                    {[...Array(14)].map((_, i) => (
                      <div
                        key={`1p-slat-${i}`}
                        className="flex-1 h-full border-r border-black/30 relative flex items-center justify-center"
                        style={{
                          background:
                            colorMode === "2_warna" && i % 2 === 1
                              ? `linear-gradient(90deg, ${secondaryColor.gradientStart}, ${secondaryColor.hex}, ${secondaryColor.gradientEnd})`
                              : undefined,
                        }}
                      >
                        <div className="w-1.5 h-full bg-black/25 shadow-sm" />
                        {colorMode === "strip_warna" && (
                          <div
                            className="absolute top-0 bottom-0 w-1"
                            style={{ backgroundColor: stripColor.hex }}
                          />
                        )}
                        <div className="absolute top-6 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                        <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                        <div className="absolute bottom-6 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xs" />
                      </div>
                    ))}
                    {/* Master Lock Jamb */}
                    <div className="w-5 h-full bg-slate-900 border-l border-amber-400 flex items-center justify-center shrink-0">
                      <div className="w-2 h-12 bg-slate-200 rounded shadow-md flex items-center justify-center">
                        <div className="w-1 h-4 bg-slate-800 rounded-full" />
                      </div>
                    </div>
                    <div className="absolute inset-0">{renderScissorTrellis()}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* LAYER 3: PHOTOREALISTIC RUKO BUILDING FACADE (CUTOUT)    */}
          {/* ======================================================== */}
          <img
            src="/images/ruko-facade-cutout.png"
            alt="Fasad Ruko Modern UD. Fariadji"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-30 drop-shadow-xl"
          />

          {/* ======================================================== */}
          {/* LAYER 4: FULL-BLEED REALISTIC LIGHTING & SPOTLIGHTS     */}
          {/* ======================================================== */}
          {isNightMode ? (
            <div className="absolute inset-0 pointer-events-none z-40 transition-opacity duration-700 opacity-100">
              {/* Deep Night Mood Vignette */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Realistic Spotlight Beams from Canopy Downlights onto Doorway */}
              {/* Left Spotlight */}
              <div
                className="absolute w-56 h-80 pointer-events-none opacity-80"
                style={{
                  left: "26%",
                  top: "43%",
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(254, 240, 138, 0.55) 0%, rgba(245, 158, 11, 0.22) 40%, transparent 75%)",
                }}
              />

              {/* Center Spotlight */}
              <div
                className="absolute w-64 h-84 pointer-events-none opacity-85"
                style={{
                  left: "48%",
                  top: "43%",
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(254, 240, 138, 0.6) 0%, rgba(245, 158, 11, 0.25) 40%, transparent 75%)",
                }}
              />

              {/* Right Spotlight */}
              <div
                className="absolute w-56 h-80 pointer-events-none opacity-80"
                style={{
                  left: "70%",
                  top: "43%",
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(254, 240, 138, 0.55) 0%, rgba(245, 158, 11, 0.22) 40%, transparent 75%)",
                }}
              />

              {/* Pillar Sconce Lamp Glows */}
              <div
                className="absolute w-24 h-24 rounded-full pointer-events-none"
                style={{
                  left: "17%",
                  top: "49%",
                  background:
                    "radial-gradient(circle, rgba(254, 240, 138, 0.7) 0%, rgba(245, 158, 11, 0.3) 50%, transparent 75%)",
                }}
              />
              <div
                className="absolute w-24 h-24 rounded-full pointer-events-none"
                style={{
                  left: "89%",
                  top: "54%",
                  background:
                    "radial-gradient(circle, rgba(254, 240, 138, 0.7) 0%, rgba(245, 158, 11, 0.3) 50%, transparent 75%)",
                }}
              />
            </div>
          ) : (
            /* Day Mode: Subtle Sunlight Glint across Facade */
            <div className="absolute inset-0 pointer-events-none z-40 transition-opacity duration-700 opacity-100 bg-gradient-to-tr from-transparent via-amber-100/10 to-amber-200/20" />
          )}

          {/* Click to open badge indicator */}
          <div className="absolute bottom-4 left-4 z-45 bg-black/80 backdrop-blur-sm border border-amber-400/50 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-2xl flex items-center space-x-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>
              {model === "extra_swing"
                ? extraStage === 0
                  ? "Klik untuk Buka Pintu Extra (Kecil)"
                  : extraStage === 1
                  ? "Klik lagi untuk Buka Full Harmonika"
                  : "Klik untuk Tutup Pintu Rapat"
                : openRatio > 0.4
                ? "Klik untuk Tutup Pintu"
                : "Klik untuk Buka Pintu"}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STUDIO CUSTOMIZATION TOOLBAR (WARNA, LIST STRIP, & KONTROL BUKAAN)        */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-6 bg-[#160207] border-t border-maroon-900/80 space-y-5">
        
        {/* ROW 1: SKEMA WARNA & PILIHAN WARNA */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Palette className="w-4 h-4 text-amber-400" />
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Pilihan Warna Cat Duco Oven:
              </span>
            </div>

            {/* Color Mode Selection Tabs */}
            <div className="flex items-center space-x-1.5 bg-black/60 p-1 rounded-xl border border-maroon-800">
              <button
                type="button"
                onClick={() => onColorModeChange("1_warna")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  colorMode === "1_warna"
                    ? "bg-maroon-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                1 Warna Solid
              </button>
              <button
                type="button"
                onClick={() => onColorModeChange("2_warna")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  colorMode === "2_warna"
                    ? "bg-maroon-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Kombinasi 2 Warna
              </button>
              <button
                type="button"
                onClick={() => onColorModeChange("strip_warna")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  colorMode === "strip_warna"
                    ? "bg-maroon-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                List Strip Aksen
              </button>
            </div>
          </div>

          {/* Color Presets Palette */}
          <div>
            <div className="text-[11px] text-rose-200/90 font-medium mb-1.5">
              {colorMode === "2_warna" ? "Warna Utama (Daun Harmonika):" : "Warna Cat Oven:"}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              {COLOR_PRESETS.map((color) => {
                const isSelected = primaryColorId === color.id;
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => onPrimaryColorChange(color.id)}
                    className={`flex items-center space-x-2 p-2 rounded-xl border transition-all text-left min-h-[44px] active:scale-95 ${
                      isSelected
                        ? "bg-maroon-900/90 border-amber-400 ring-2 ring-amber-400/40 text-white shadow-lg"
                        : "bg-black/40 border-maroon-900 text-rose-200/80 hover:bg-black/60"
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 shadow-md border border-white/40"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold block truncate text-white">
                        {color.name}
                      </span>
                      {color.badge && (
                        <span className="text-[8px] text-amber-300 font-extrabold block truncate">
                          {color.badge}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Color Picker when 2_warna is active */}
          {colorMode === "2_warna" && (
            <div className="pt-2 border-t border-maroon-900/60 animate-in fade-in duration-200">
              <div className="text-[11px] text-amber-300 font-bold mb-1.5">
                Warna Sekunder (Kombinasi Daun Berselang-Seling):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
                {COLOR_PRESETS.map((color) => {
                  const isSelected = secondaryColorId === color.id;
                  return (
                    <button
                      key={`sec-${color.id}`}
                      type="button"
                      onClick={() => onSecondaryColorChange(color.id)}
                      className={`flex items-center space-x-2 p-2 rounded-xl border transition-all text-left min-h-[40px] active:scale-95 ${
                        isSelected
                          ? "bg-maroon-900/90 border-amber-400 ring-2 ring-amber-400/40 text-white shadow-lg"
                          : "bg-black/40 border-maroon-900 text-rose-200/80 hover:bg-black/60"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 shadow-sm border border-white/40"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[10px] font-bold block truncate text-white">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Strip Color Picker when strip_warna is active */}
          {colorMode === "strip_warna" && (
            <div className="pt-2 border-t border-maroon-900/60 animate-in fade-in duration-200">
              <div className="text-[11px] text-amber-300 font-bold mb-1.5">
                Warna Strip List Aksen:
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {STRIP_PRESETS.map((strip) => {
                  const isSelected = stripColorId === strip.id;
                  return (
                    <button
                      key={`strip-${strip.id}`}
                      type="button"
                      onClick={() => onStripColorChange(strip.id)}
                      className={`flex items-center space-x-2 p-2 rounded-xl border transition-all text-left min-h-[40px] active:scale-95 ${
                        isSelected
                          ? "bg-maroon-900/90 border-amber-400 ring-2 ring-amber-400/40 text-white shadow-lg"
                          : "bg-black/40 border-maroon-900 text-rose-200/80 hover:bg-black/60"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 shadow-sm border border-white/40"
                        style={{ backgroundColor: strip.hex }}
                      />
                      <span className="text-[10px] font-bold block truncate text-white">
                        {strip.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM NOTE & SPECIFICATION BADGE */}
        <div className="pt-3 border-t border-maroon-900/80 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-rose-200/80 gap-2">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Dimensi opening saat ini: <strong className="text-white">{widthMeters} m × {heightMeters} m</strong> (Disesuaikan otomatis dengan kalkulator).
            </span>
          </div>

          <div className="text-[11px] text-amber-300 font-bold">
            ✓ Finishing Cat Duco Oven 3 Lapisan Anti Korosi
          </div>
        </div>
      </div>
    </div>
  );
}
