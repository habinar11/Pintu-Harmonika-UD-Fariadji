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
  ShieldCheck,
  ChevronRight,
  Maximize2,
  Minimize2,
  CheckCircle2,
} from "lucide-react";

export type BukaanType = "1_bukaan" | "2_bukaan";
export type ColorMode = "1_warna" | "2_warna" | "strip_warna";
export type StripStyle = "1_garis" | "2_garis";

export interface ColorPreset {
  id: string;
  name: string;
  hex: string;
  gradientStart: string;
  gradientEnd: string;
  borderHex: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: "maroon",
    name: "Merah Marun",
    hex: "#881337",
    gradientStart: "#9f1239",
    gradientEnd: "#4c0519",
    borderHex: "#f43f5e",
  },
  {
    id: "emerald",
    name: "Hijau Harmonika",
    hex: "#15803d",
    gradientStart: "#22c55e",
    gradientEnd: "#14532d",
    borderHex: "#4ade80",
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
    name: "Abu-abu Baja",
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
  { id: "chrome", name: "Silver Chrome", hex: "#f1f5f9" },
  { id: "orange", name: "Oranye Sporty", hex: "#ea580c" },
  { id: "red", name: "Merah Kontras", hex: "#ef4444" },
  { id: "cyan", name: "Biru Cyan", hex: "#06b6d4" },
  { id: "lime", name: "Hijau Neon", hex: "#84cc16" },
];

interface HarmonikaVisualizerProps {
  bukaanType: BukaanType;
  onBukaanTypeChange: (type: BukaanType) => void;
  hasPintuExtra: boolean;
  onHasPintuExtraChange: (hasExtra: boolean) => void;
  colorMode: ColorMode;
  onColorModeChange: (mode: ColorMode) => void;
  hasStrip?: boolean;
  onHasStripChange?: (hasStrip: boolean) => void;
  primaryColorId: string;
  onPrimaryColorChange: (colorId: string) => void;
  secondaryColorId: string;
  onSecondaryColorChange: (colorId: string) => void;
  stripColorId: string;
  onStripColorChange: (stripId: string) => void;
  stripStyle: StripStyle;
  onStripStyleChange: (style: StripStyle) => void;
  widthMeters: number;
  heightMeters: number;
}

export default function HarmonikaVisualizer({
  bukaanType,
  onBukaanTypeChange,
  hasPintuExtra,
  onHasPintuExtraChange,
  colorMode,
  onColorModeChange,
  hasStrip = false,
  onHasStripChange,
  primaryColorId,
  onPrimaryColorChange,
  secondaryColorId,
  onSecondaryColorChange,
  stripColorId,
  onStripColorChange,
  stripStyle,
  onStripStyleChange,
  widthMeters,
  heightMeters,
}: HarmonikaVisualizerProps) {
  // Pintu Extra 2-step animation state:
  // 0 = Tertutup Rapat (Full Closed)
  // 1 = Pintu Extra Terbuka (Bukaan Geser Celah Intip & Ventilasi dekat Handle)
  // 2 = Full Harmonika Terbuka (Bukaan 92% tumpukan daun tetap ada di samping)
  const [extraStage, setExtraStage] = useState<0 | 1 | 2>(0);
  const [extraSlide, setExtraSlide] = useState<number>(0); // 0 (tutup) -> 1 (geser buka celah intip)
  const [gateOpen, setGateOpen] = useState<number>(0); // 0 (tutup) -> 0.92 (full buka harmonika)
  const [isNightMode, setIsNightMode] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const primaryColor =
    COLOR_PRESETS.find((c) => c.id === primaryColorId) || COLOR_PRESETS[0];
  const secondaryColor =
    COLOR_PRESETS.find((c) => c.id === secondaryColorId) || COLOR_PRESETS[2];
  const stripColor =
    STRIP_PRESETS.find((s) => s.id === stripColorId) || STRIP_PRESETS[0];

  // Max open ratio is 0.92 (92%) so the folded stack of slats remains visible on the side
  const MAX_OPEN_RATIO = 0.92;

  // Reset stages when mode or extra changes
  useEffect(() => {
    setExtraStage(0);
    setGateOpen(0);
    setExtraSlide(0);
    setIsAnimating(false);
  }, [bukaanType, hasPintuExtra]);

  // Smooth easing animator using requestAnimationFrame
  const animateTo = (
    targetGateOpen: number,
    targetExtraSlide: number,
    duration = 650,
    onComplete?: () => void
  ) => {
    setIsAnimating(true);
    const startGate = gateOpen;
    const startExtra = extraSlide;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic easing (ease-in-out)
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setGateOpen(startGate + (targetGateOpen - startGate) * ease);
      setExtraSlide(startExtra + (targetExtraSlide - startExtra) * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setGateOpen(targetGateOpen);
        setExtraSlide(targetExtraSlide);
        setIsAnimating(false);
        onComplete?.();
      }
    };

    requestAnimationFrame(step);
  };

  // Toggle animation
  const handleToggleClick = () => {
    if (isAnimating) return;

    if (hasPintuExtra) {
      // 2-step animation sequence for Pintu Extra:
      // 0 (tertutup) -> 1 (geser buka celah intip 1 tiang) -> 2 (full harmonika buka 92%, extra ikut tertutup rapi) -> 0 (tutup rapat)
      if (extraStage === 0) {
        setExtraStage(1);
        animateTo(0, 1, 600);
      } else if (extraStage === 1) {
        // Stage 1 -> 2: Pintu harmonika buka penuh ke samping!
        // Extra menutup (extraSlide -> 0) agar ikut terlipat ke kusen samping, BUKAN makin lebar!
        setExtraStage(2);
        animateTo(MAX_OPEN_RATIO, 0, 750);
      } else {
        // Stage 2 -> 0: Tutup rapat kembali ke tengah
        setExtraStage(0);
        animateTo(0, 0, 750);
      }
    } else {
      // Standard 1-step toggle: 0 <-> 0.92 (tidak hilang keseluruhan, tumpukan 8% tetap ada di tiang)
      const target = gateOpen > 0.4 ? 0 : MAX_OPEN_RATIO;
      animateTo(target, 0, 700);
    }
  };

  // Dimensions of portal opening
  const portalX = 140;
  const portalY = 310;
  const portalWidth = 720;
  const portalHeight = 350;

  // Slat geometry
  const slatCount = bukaanType === "1_bukaan" ? 14 : 16;
  const halfSlat = slatCount / 2;

  // Helper to render 1 vertical CAGAK (tiang UNP) and SILANGAN (scissor lattice)
  // ONLY visible inside the 1-tiang bukaan extra gap
  const renderCagakAndSilangan = (
    gapLeft: number,
    gapRight: number,
    keyPrefix: string
  ) => {
    const width = gapRight - gapLeft;
    if (width <= 4) return null;

    const topY = portalY + 8;
    const height = portalHeight - 16;
    const bottomY = topY + height;
    const midX = (gapLeft + gapRight) / 2;

    // 3 tiers of X crosses
    const tiers = [
      { y1: topY + 24, y2: topY + 104 },
      { y1: topY + 116, y2: topY + 204 },
      { y1: topY + 216, y2: topY + 296 },
    ];

    return (
      <g key={keyPrefix}>
        {/* Dark interior cavity background with subtle transparency */}
        <rect
          x={gapLeft}
          y={topY}
          width={width}
          height={height}
          fill="#090d16"
          opacity="0.88"
        />

        {/* 1 Vertical CAGAK (Tiang Baja UNP) in the center of the gap */}
        <rect
          x={midX - 4}
          y={topY}
          width="8"
          height={height}
          fill="url(#lockPillarGrad)"
          stroke="#334155"
          strokeWidth="0.8"
          rx="1"
        />
        {/* Center specular highlight line */}
        <line
          x1={midX}
          y1={topY}
          x2={midX}
          y2={bottomY}
          stroke="#cbd5e1"
          strokeWidth="1.2"
          opacity="0.85"
        />

        {/* Silang-Silang Pantograph Scissor Lattice (Baja Galvanis/Silver) */}
        {tiers.map((tier, tIdx) => (
          <g key={`${keyPrefix}-tier-${tIdx}`}>
            {/* Left-to-Right diagonal bar */}
            <line
              x1={gapLeft + 2}
              y1={tier.y1}
              x2={gapRight - 2}
              y2={tier.y2}
              stroke="#f1f5f9"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <line
              x1={gapLeft + 2}
              y1={tier.y1}
              x2={gapRight - 2}
              y2={tier.y2}
              stroke="#475569"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Right-to-Left diagonal bar */}
            <line
              x1={gapLeft + 2}
              y1={tier.y2}
              x2={gapRight - 2}
              y2={tier.y1}
              stroke="#f1f5f9"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <line
              x1={gapLeft + 2}
              y1={tier.y2}
              x2={gapRight - 2}
              y2={tier.y1}
              stroke="#475569"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Pivot pin in center on the cagak */}
            <circle
              cx={midX}
              cy={(tier.y1 + tier.y2) / 2}
              r="2.6"
              fill="#fbbf24"
              stroke="#78350f"
              strokeWidth="0.8"
            />

            {/* Side pins */}
            <circle
              cx={gapLeft + 3}
              cy={(tier.y1 + tier.y2) / 2}
              r="2"
              fill="#fbbf24"
              stroke="#78350f"
              strokeWidth="0.6"
            />
            <circle
              cx={gapRight - 3}
              cy={(tier.y1 + tier.y2) / 2}
              r="2"
              fill="#fbbf24"
              stroke="#78350f"
              strokeWidth="0.6"
            />
          </g>
        ))}
      </g>
    );
  };

  // Helper to render an individual vertical slat with authentic paint scheme
  const renderSingleSlat = (
    x: number,
    width: number,
    key: string,
    isPintuExtraLeaf = false
  ) => {
    const slatTop = portalY + 8;
    const slatH = portalHeight - 16;
    const midSplitY = slatTop + slatH * 0.52; // Atas-Bawah split line

    return (
      <g key={key}>
        {colorMode === "2_warna" ? (
          // AUTHENTIC 2-WARNA ATAS - BAWAH (BUKAN SELANG-SELING)
          <g>
            {/* Bagian Atas: Primary Color */}
            <rect
              x={x}
              y={slatTop}
              width={width}
              height={slatH * 0.52}
              fill="url(#slatGradPrimary)"
              stroke={primaryColor.borderHex}
              strokeWidth="0.8"
              rx="1.5"
            />
            {/* Horizontal Divider Belt */}
            <line
              x1={x}
              y1={midSplitY}
              x2={x + width}
              y2={midSplitY}
              stroke="#fbbf24"
              strokeWidth="2.5"
            />
            {/* Bagian Bawah: Secondary Color */}
            <rect
              x={x}
              y={midSplitY}
              width={width}
              height={slatH * 0.48}
              fill="url(#slatGradSecondary)"
              stroke={secondaryColor.borderHex}
              strokeWidth="0.8"
              rx="1.5"
            />
          </g>
        ) : (
          // 1 WARNA SOLID
          <rect
            x={x}
            y={slatTop}
            width={width}
            height={slatH}
            fill="url(#slatGradPrimary)"
            stroke={primaryColor.borderHex}
            strokeWidth="0.8"
            rx="2"
          />
        )}

        {/* Vertical UNP Embossed Stiffener Rib (Center of Slat) */}
        <rect
          x={x + width * 0.42}
          y={slatTop}
          width={width * 0.16}
          height={slatH}
          fill="#000000"
          opacity="0.28"
        />

        {/* HORIZONTAL ACCENT STRIP DI TENGAH: 1 GARIS ATAU 2 GARIS (BISA UNTUK 1 WARNA MAUPUN 2 WARNA) */}
        {(hasStrip || colorMode === "strip_warna") && (
          <g>
            {stripStyle === "1_garis" ? (
              // 1 Garis Strip Horizontal Lebar di Tengah
              <g>
                <rect
                  x={x}
                  y={portalY + portalHeight / 2 - 8}
                  width={width}
                  height="16"
                  fill={stripColor.hex}
                  stroke="#fbbf24"
                  strokeWidth="1"
                />
                <circle
                  cx={x + width / 2}
                  cy={portalY + portalHeight / 2}
                  r="2"
                  fill="#ffffff"
                  stroke="#78350f"
                  strokeWidth="0.5"
                />
              </g>
            ) : (
              // 2 Garis Strip Horizontal Sejajar di Tengah
              <g>
                <rect
                  x={x}
                  y={portalY + portalHeight / 2 - 14}
                  width={width}
                  height="8"
                  fill={stripColor.hex}
                  stroke="#fbbf24"
                  strokeWidth="0.8"
                />
                <rect
                  x={x}
                  y={portalY + portalHeight / 2 + 6}
                  width={width}
                  height="8"
                  fill={stripColor.hex}
                  stroke="#fbbf24"
                  strokeWidth="0.8"
                />
              </g>
            )}
          </g>
        )}

        {/* Rivets at top, mid, and bottom */}
        <circle cx={x + width / 2} cy={slatTop + 38} r="2" fill="#fbbf24" stroke="#78350f" strokeWidth="0.6" />
        <circle cx={x + width / 2} cy={slatTop + slatH / 2} r="2.2" fill="#fbbf24" stroke="#78350f" strokeWidth="0.6" />
        <circle cx={x + width / 2} cy={slatTop + slatH - 38} r="2" fill="#fbbf24" stroke="#78350f" strokeWidth="0.6" />
      </g>
    );
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 via-[#140206] to-black rounded-3xl border-2 border-maroon-700/70 shadow-2xl overflow-hidden flex flex-col">
      {/* Visualizer Top Bar & Studio Controls */}
      <div className="p-4 sm:p-5 bg-black/60 border-b border-maroon-900/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              Studio Visualisasi Ruko Asli & Harmonika
              <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full border border-rose-800/80 font-bold hidden sm:inline-block">
                Interaktif 3D
              </span>
            </h4>
            <p className="text-[11px] text-rose-300/80">
              Pilih 1 atau 2 bukaan, opsi Pintu Extra (Bukaan Intip & Ventilasi), skema warna atas-bawah, dan strip list aksen tengah.
            </p>
          </div>
        </div>

        {/* Day/Night and Play Animation Buttons */}
        <div className="flex items-center space-x-2">
          {/* Day / Night lighting toggle */}
          <button
            type="button"
            onClick={() => setIsNightMode(!isNightMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border min-h-[38px] ${
              isNightMode
                ? "bg-slate-900/90 text-amber-300 border-amber-400/40 shadow-sm"
                : "bg-amber-100 text-slate-900 border-amber-300"
            }`}
            title="Ubah Suasana Pencahayaan (Siang Alami / Malam dengan Spotlight)"
          >
            {isNightMode ? (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Malam (Spotlight)</span>
                <span className="sm:hidden">Malam</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Siang Hari</span>
                <span className="sm:hidden">Siang</span>
              </>
            )}
          </button>

          {/* Trigger Door Button */}
          <button
            type="button"
            onClick={handleToggleClick}
            disabled={isAnimating}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 shadow-lg min-h-[38px] active:scale-95 ${
              (hasPintuExtra && extraStage === 2) || (!hasPintuExtra && gateOpen > 0.4)
                ? "bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white border border-rose-400"
                : hasPintuExtra && extraStage === 1
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border border-emerald-300"
                : "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 hover:brightness-105 border border-amber-200"
            }`}
          >
            {(hasPintuExtra && extraStage === 2) || (!hasPintuExtra && gateOpen > 0.4) ? (
              <>
                <DoorClosed className="w-4 h-4 shrink-0" />
                <span>Tutup Pintu</span>
              </>
            ) : hasPintuExtra && extraStage === 1 ? (
              <>
                <Maximize2 className="w-4 h-4 shrink-0" />
                <span>Buka Full Harmonika</span>
              </>
            ) : (
              <>
                <DoorOpen className="w-4 h-4 shrink-0" />
                <span>{hasPintuExtra ? "Buka Pintu Extra (Celah Intip)" : "Buka Pintu"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* BASE MODEL TABS (1 BUKAAN ATAU 2 BUKAAN) + CHECKBOX FITUR PINTU EXTRA */}
      <div className="px-4 py-3 bg-black/50 border-b border-maroon-900/60 flex flex-wrap items-center justify-between gap-3">
        {/* Step 1: Base Bukaan */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold text-rose-200 uppercase tracking-wider">
            Model Bukaan:
          </span>
          <div className="flex items-center space-x-1.5 bg-black/60 p-1 rounded-xl border border-maroon-800">
            <button
              type="button"
              onClick={() => onBukaanTypeChange("2_bukaan")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                bukaanType === "2_bukaan"
                  ? "bg-maroon-800 text-white shadow-sm border border-amber-400/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              2 Bukaan (Tengah / Kupu-Tarung)
            </button>
            <button
              type="button"
              onClick={() => onBukaanTypeChange("1_bukaan")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                bukaanType === "1_bukaan"
                  ? "bg-maroon-800 text-white shadow-sm border border-amber-400/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              1 Bukaan (Geser 1 Arah)
            </button>
          </div>
        </div>

        {/* Step 2: Fitur Pintu Extra (Centang Ya / Tidak) */}
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2.5 bg-black/60 border border-maroon-800 hover:border-amber-400/60 px-3 py-1.5 rounded-xl cursor-pointer transition-colors active:scale-95">
            <input
              type="checkbox"
              checked={hasPintuExtra}
              onChange={(e) => onHasPintuExtraChange(e.target.checked)}
              className="w-4 h-4 rounded text-red-600 focus:ring-amber-400 bg-maroon-950 border-maroon-700"
            />
            <div className="text-xs">
              <span className="font-extrabold text-white">
                Pakai Pintu Extra (Bukaan Intip & Ventilasi)
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* CRISP ARCHITECTURAL VECTOR SVG RUKO STAGE */}
      <div
        className="relative w-full overflow-hidden bg-slate-950 cursor-pointer select-none group"
        onClick={handleToggleClick}
        title="Klik pintu untuk memutar animasi buka / tutup"
      >
        <svg
          viewBox="0 0 1000 700"
          className="w-full h-auto max-h-[580px] object-contain drop-shadow-2xl"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Sky gradients */}
            <linearGradient id="skyDay" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="45%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>

            <linearGradient id="skyNight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#090d16" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </linearGradient>

            {/* Ruko Modern Concrete Facade Gradient */}
            <linearGradient id="facadeWallDay" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="30%" stopColor="#f1f5f9" />
              <stop offset="70%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            <linearGradient id="facadeWallNight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="35%" stopColor="#334155" />
              <stop offset="75%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Architectural Charcoal Cladding for upper storeys */}
            <linearGradient id="charcoalCladding" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Fascia / Canopy Gradient */}
            <linearGradient id="canopyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="25%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Warm LED Downlight Spotlights */}
            <radialGradient id="spotlightL" cx="280" cy="285" r="320" fx="280" fy="285" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="spotlightM" cx="500" cy="285" r="320" fx="500" fy="285" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="spotlightR" cx="720" cy="285" r="320" fx="720" fy="285" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>

            {/* Primary Slat Gradient */}
            <linearGradient id="slatGradPrimary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor.gradientStart} />
              <stop offset="35%" stopColor={primaryColor.hex} />
              <stop offset="70%" stopColor={primaryColor.gradientEnd} />
              <stop offset="100%" stopColor={primaryColor.gradientStart} />
            </linearGradient>

            {/* Secondary Slat Gradient for 2-Warna Atas-Bawah */}
            <linearGradient id="slatGradSecondary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={secondaryColor.gradientStart} />
              <stop offset="35%" stopColor={secondaryColor.hex} />
              <stop offset="70%" stopColor={secondaryColor.gradientEnd} />
              <stop offset="100%" stopColor={secondaryColor.gradientStart} />
            </linearGradient>

            {/* Metallic Steel Guide Rails */}
            <linearGradient id="steelRail" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="40%" stopColor="#cbd5e1" />
              <stop offset="70%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Master Lock Pillar Gradient */}
            <linearGradient id="lockPillarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="40%" stopColor="#475569" />
              <stop offset="80%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Glass Reflection */}
            <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* 1. SKY BACKGROUND (FULL WIDTH & HEIGHT) */}
          <rect
            x="0"
            y="0"
            width="1000"
            height="700"
            fill={isNightMode ? "url(#skyNight)" : "url(#skyDay)"}
          />

          {/* Stars in Night Mode */}
          {isNightMode && (
            <g opacity="0.6">
              <circle cx="80" cy="40" r="1.2" fill="#ffffff" />
              <circle cx="160" cy="25" r="1.5" fill="#fef08a" />
              <circle cx="280" cy="50" r="1" fill="#ffffff" />
              <circle cx="450" cy="30" r="1.3" fill="#ffffff" />
              <circle cx="620" cy="20" r="1.5" fill="#ffffff" />
              <circle cx="780" cy="45" r="1.2" fill="#fef08a" />
              <circle cx="910" cy="35" r="1.4" fill="#ffffff" />
            </g>
          )}

          {/* 2. RUKO MAIN STRUCTURE (2-STOREY MODERN SHOPHOUSE) */}
          <rect
            x="60"
            y="50"
            width="880"
            height="620"
            fill={isNightMode ? "url(#facadeWallNight)" : "url(#facadeWallDay)"}
            rx="8"
          />

          {/* Left & Right Pillar Shadows for 3D Depth */}
          <rect x="60" y="50" width="35" height="620" fill="#000000" opacity={isNightMode ? 0.45 : 0.2} />
          <rect x="905" y="50" width="35" height="620" fill="#000000" opacity={isNightMode ? 0.45 : 0.25} />

          {/* Upper Floor Modern Cladding & Windows */}
          <rect x="95" y="65" width="810" height="180" fill="url(#charcoalCladding)" rx="6" />

          {/* Window 1 */}
          <g transform="translate(130, 85)">
            <rect width="210" height="140" fill="#090d16" stroke="#475569" strokeWidth="4" rx="4" />
            <rect width="210" height="140" fill="url(#glassReflect)" />
            <line x1="105" y1="0" x2="105" y2="140" stroke="#334155" strokeWidth="3" />
            <line x1="0" y1="70" x2="210" y2="70" stroke="#334155" strokeWidth="2" />
            <rect x="10" y="10" width="190" height="120" fill="#fbbf24" opacity={isNightMode ? 0.2 : 0.05} />
          </g>

          {/* Window 2 */}
          <g transform="translate(395, 85)">
            <rect width="210" height="140" fill="#090d16" stroke="#475569" strokeWidth="4" rx="4" />
            <rect width="210" height="140" fill="url(#glassReflect)" />
            <line x1="105" y1="0" x2="105" y2="140" stroke="#334155" strokeWidth="3" />
            <line x1="0" y1="70" x2="210" y2="70" stroke="#334155" strokeWidth="2" />
            <rect x="10" y="10" width="190" height="120" fill="#fbbf24" opacity={isNightMode ? 0.22 : 0.05} />
          </g>

          {/* Window 3 */}
          <g transform="translate(660, 85)">
            <rect width="210" height="140" fill="#090d16" stroke="#475569" strokeWidth="4" rx="4" />
            <rect width="210" height="140" fill="url(#glassReflect)" />
            <line x1="105" y1="0" x2="105" y2="140" stroke="#334155" strokeWidth="3" />
            <line x1="0" y1="70" x2="210" y2="70" stroke="#334155" strokeWidth="2" />
            <rect x="10" y="10" width="190" height="120" fill="#fbbf24" opacity={isNightMode ? 0.2 : 0.05} />
          </g>

          {/* 3. STOREFRONT CANOPY & SIGNAGE FASCIA */}
          <g transform="translate(80, 248)">
            <rect width="840" height="42" fill="url(#canopyGrad)" stroke="#1e293b" strokeWidth="3" rx="4" />
            <line x1="0" y1="2" x2="840" y2="2" stroke="#94a3b8" strokeWidth="1.5" />
            <rect x="260" y="6" width="320" height="30" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" rx="3" />
            <text
              x="420"
              y="26"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="13"
              fontWeight="900"
              fontFamily="sans-serif"
              letterSpacing="3.5"
            >
              UD. FARIADJI PINTU HARMONIKA
            </text>
            {/* Recessed Warm LED Fixtures */}
            <circle cx="200" cy="39" r="4.5" fill="#fef08a" stroke="#475569" strokeWidth="1" />
            <circle cx="420" cy="39" r="4.5" fill="#fef08a" stroke="#475569" strokeWidth="1" />
            <circle cx="640" cy="39" r="4.5" fill="#fef08a" stroke="#475569" strokeWidth="1" />
          </g>

          {/* Canopy Drop Shadow */}
          <rect x="80" y="290" width="840" height="18" fill="#000000" opacity={isNightMode ? 0.6 : 0.35} />

          {/* 4. GROUND FLOOR PORTAL OPENING */}
          <rect
            x={portalX - 22}
            y={portalY - 14}
            width={portalWidth + 44}
            height={portalHeight + 28}
            fill={isNightMode ? "#1e293b" : "#475569"}
            stroke="#0f172a"
            strokeWidth="3"
            rx="4"
          />

          {/* Interior Opening Cavity */}
          <rect x={portalX} y={portalY} width={portalWidth} height={portalHeight} fill="#090d16" />

          {/* ========================================================= */}
          {/* INTERIOR SHOWROOM (Terlihat saat Harmonika / Extra Terbuka) */}
          {/* ========================================================= */}
          <g opacity={Math.min(1, Math.max(gateOpen * 1.5, extraSlide > 0.05 ? 0.95 : 0))}>
            <rect x={portalX} y={portalY} width={portalWidth} height={portalHeight} fill="#18181b" />
            <ellipse
              cx={portalX + portalWidth / 2}
              cy={portalY + 50}
              rx={portalWidth * 0.45}
              ry="45"
              fill="#fef08a"
              opacity="0.25"
            />

            {/* Left Showroom Shelf */}
            <g transform={`translate(${portalX + 40}, ${portalY + 80})`}>
              <rect width="180" height="230" fill="#27272a" stroke="#3f3f46" strokeWidth="2" rx="4" />
              <line x1="10" y1="70" x2="170" y2="70" stroke="#52525b" strokeWidth="2" />
              <line x1="10" y1="140" x2="170" y2="140" stroke="#52525b" strokeWidth="2" />
              <rect x="25" y="30" width="35" height="38" fill="#f59e0b" rx="2" />
              <rect x="75" y="25" width="40" height="43" fill="#0284c7" rx="2" />
              <rect x="125" y="35" width="30" height="33" fill="#10b981" rx="2" />
              <rect x="30" y="95" width="45" height="42" fill="#be123c" rx="2" />
              <rect x="95" y="100" width="55" height="37" fill="#6366f1" rx="2" />
            </g>

            {/* Center Reception Desk with Sign */}
            <g transform={`translate(${portalX + 260}, ${portalY + 160})`}>
              <rect width="200" height="150" fill="#27272a" stroke="#3f3f46" strokeWidth="2" rx="6" />
              <rect x="10" y="10" width="180" height="25" fill="#3f3f46" rx="3" />
              <text
                x="100"
                y="27"
                textAnchor="middle"
                fill="#fde047"
                fontSize="11"
                fontWeight="bold"
                letterSpacing="1"
              >
                UD. FARIADJI SHOWROOM
              </text>
              <rect x="75" y="60" width="50" height="35" fill="#090d16" stroke="#94a3b8" strokeWidth="2" rx="2" />
              <line x1="100" y1="95" x2="100" y2="115" stroke="#94a3b8" strokeWidth="4" />
              <line x1="85" y1="115" x2="115" y2="115" stroke="#94a3b8" strokeWidth="3" />
            </g>

            {/* Right Shelf */}
            <g transform={`translate(${portalX + 500}, ${portalY + 80})`}>
              <rect width="180" height="230" fill="#27272a" stroke="#3f3f46" strokeWidth="2" rx="4" />
              <line x1="10" y1="70" x2="170" y2="70" stroke="#52525b" strokeWidth="2" />
              <line x1="10" y1="140" x2="170" y2="140" stroke="#52525b" strokeWidth="2" />
              <rect x="25" y="30" width="40" height="38" fill="#e11d48" rx="2" />
              <rect x="80" y="25" width="45" height="43" fill="#d97706" rx="2" />
              <rect x="135" y="32" width="30" height="36" fill="#0d9488" rx="2" />
              <rect x="40" y="95" width="50" height="42" fill="#4338ca" rx="2" />
              <rect x="110" y="98" width="45" height="39" fill="#15803d" rx="2" />
            </g>

            {/* Tiled floor */}
            <rect x={portalX} y={portalY + portalHeight - 40} width={portalWidth} height="40" fill="#334155" opacity="0.8" />
          </g>

          {/* 5. TOP AND BOTTOM RAILS */}
          {/* Top Guide Rail with roller slot */}
          <rect x={portalX} y={portalY - 2} width={portalWidth} height="18" fill="url(#steelRail)" stroke="#1e293b" strokeWidth="1.5" />
          <line x1={portalX} y1={portalY + 6} x2={portalX + portalWidth} y2={portalY + 6} stroke="#0f172a" strokeWidth="2.5" />

          {/* Bottom Embedded Track */}
          <rect x={portalX} y={portalY + portalHeight - 16} width={portalWidth} height="16" fill="url(#steelRail)" stroke="#1e293b" strokeWidth="1.5" />
          <line x1={portalX} y1={portalY + portalHeight - 8} x2={portalX + portalWidth} y2={portalY + portalHeight - 8} stroke="#0f172a" strokeWidth="2.5" />

          {/* ============================================================== */}
          {/* 6. DYNAMIC FOLDING GATE SLATS & PINTU EXTRA                    */}
          {/* ============================================================== */}

          {/* ------------------------------------------------------------- */}
          {/* CASE A: 2 BUKAAN (BUKAAN TENGAH / KUPU-TARUNG)                 */}
          {/* ------------------------------------------------------------- */}
          {bukaanType === "2_bukaan" && (() => {
            const halfPortal = portalWidth / 2; // 360
            
            // Full gate folding width (leaving 8% stack when full open)
            const wingWidth = halfPortal * (1 - gateOpen);

            // Leading edges of left and right wings (smoothly moving)
            const leftLeadingX = portalX + wingWidth;
            const rightLeadingX = portalX + portalWidth - wingWidth;

            // Lock pillar width on each side = 12px
            const lockPillarW = 12;

            // Extra opening sliding gap (cuma 1 tiang = 40px)
            const gapPerSide = hasPintuExtra ? extraSlide * 40 : 0;
            
            // Slat counts: 7 slats per wing
            const slatsPerWing = 7;
            
            // Left wing solid daun width (from portalX to extra gap)
            const leftDaunWidth = Math.max(10, (leftLeadingX - portalX - lockPillarW) - gapPerSide);
            const leftSlatW = leftDaunWidth / slatsPerWing;
            
            // Left slats centers
            const leftCenters: number[] = [];
            for (let i = 0; i < slatsPerWing; i++) {
              leftCenters.push(portalX + i * leftSlatW + leftSlatW / 2);
            }

            // Right wing solid daun width (from extra gap to right jamb)
            const rightDaunStartX = (rightLeadingX + lockPillarW) + gapPerSide;
            const rightDaunWidth = Math.max(10, (portalX + portalWidth) - rightDaunStartX);
            const rightSlatW = rightDaunWidth / slatsPerWing;

            // Right slats centers
            const rightCenters: number[] = [];
            for (let i = 0; i < slatsPerWing; i++) {
              rightCenters.push(rightDaunStartX + i * rightSlatW + rightSlatW / 2);
            }

            // Left gap: between (leftLeadingX - lockPillarW - gapPerSide) and (leftLeadingX - lockPillarW)
            const leftGapLeft = leftLeadingX - lockPillarW - gapPerSide;
            const leftGapRight = leftLeadingX - lockPillarW;

            // Right gap: between (rightLeadingX + lockPillarW) and (rightLeadingX + lockPillarW + gapPerSide)
            const rightGapLeft = rightLeadingX + lockPillarW;
            const rightGapRight = rightLeadingX + lockPillarW + gapPerSide;

            return (
              <g>
                {/* 1. Left Extra Gap (Cuma 1 tiang: Cagak & Silang visible when extraSlide > 0) */}
                {hasPintuExtra && gapPerSide > 3 && (
                  renderCagakAndSilangan(leftGapLeft, leftGapRight, "2p-left-extra")
                )}

                {/* 2. Right Extra Gap (Cuma 1 tiang: Cagak & Silang visible when extraSlide > 0) */}
                {hasPintuExtra && gapPerSide > 3 && (
                  renderCagakAndSilangan(rightGapLeft, rightGapRight, "2p-right-extra")
                )}

                {/* 3. Sayap Kiri (Clean Plat Daun) */}
                <g>
                  {leftCenters.map((cx, i) =>
                    renderSingleSlat(cx - leftSlatW / 2, leftSlatW, `2p-left-${i}`)
                  )}
                  {/* Subtle edge line where left daun slides */}
                  {hasPintuExtra && gapPerSide > 3 && (
                    <line
                      x1={leftGapLeft}
                      y1={portalY + 8}
                      x2={leftGapLeft}
                      y2={portalY + portalHeight - 8}
                      stroke="#0f172a"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  )}
                </g>

                {/* 4. Sayap Kanan (Clean Plat Daun) */}
                <g>
                  {rightCenters.map((cx, i) =>
                    renderSingleSlat(cx - rightSlatW / 2, rightSlatW, `2p-right-${i}`)
                  )}
                  {/* Subtle edge line where right daun slides */}
                  {hasPintuExtra && gapPerSide > 3 && (
                    <line
                      x1={rightGapRight}
                      y1={portalY + 8}
                      x2={rightGapRight}
                      y2={portalY + portalHeight - 8}
                      stroke="#0f172a"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  )}
                </g>

                {/* 5. Left Leading Lock Pillar & Left Main Handle (Smoothly travels with leftLeadingX) */}
                <g>
                  <rect
                    x={leftLeadingX - lockPillarW}
                    y={portalY + 6}
                    width={lockPillarW}
                    height={portalHeight - 12}
                    fill="url(#lockPillarGrad)"
                    stroke="#475569"
                    strokeWidth="1"
                  />
                  {/* Left Main Handle */}
                  <rect
                    x={leftLeadingX - 8}
                    y={portalY + portalHeight / 2 - 25}
                    width="4.5"
                    height="50"
                    fill="#f1f5f9"
                    stroke="#64748b"
                    strokeWidth="0.8"
                    rx="2"
                  />
                </g>

                {/* 6. Right Leading Lock Pillar & Right Main Handle (Smoothly travels with rightLeadingX) */}
                <g>
                  <rect
                    x={rightLeadingX}
                    y={portalY + 6}
                    width={lockPillarW}
                    height={portalHeight - 12}
                    fill="url(#lockPillarGrad)"
                    stroke="#475569"
                    strokeWidth="1"
                  />
                  {/* Right Main Handle */}
                  <rect
                    x={rightLeadingX + 3.5}
                    y={portalY + portalHeight / 2 - 25}
                    width="4.5"
                    height="50"
                    fill="#f1f5f9"
                    stroke="#64748b"
                    strokeWidth="0.8"
                    rx="2"
                  />
                  {/* Brass Keyhole */}
                  <circle
                    cx={rightLeadingX + 6}
                    cy={portalY + portalHeight / 2 + 35}
                    r="2.5"
                    fill="#0f172a"
                    stroke="#fbbf24"
                    strokeWidth="0.8"
                  />
                </g>

                {/* 7. DUA HANDLE EXTRA DI SISI LUAR CELAH (TOTAL 4 HANDLE DI 2 BUKAAN) */}
                {hasPintuExtra && (
                  <g>
                    {/* Left Extra Handle on Left Sliding Leaf */}
                    <rect
                      x={leftGapLeft - 6}
                      y={portalY + portalHeight / 2 - 22}
                      width="4"
                      height="44"
                      fill="#f1f5f9"
                      stroke="#64748b"
                      strokeWidth="0.8"
                      rx="1.5"
                    />
                    {/* Right Extra Handle on Right Sliding Leaf */}
                    <rect
                      x={rightGapRight + 2}
                      y={portalY + portalHeight / 2 - 22}
                      width="4"
                      height="44"
                      fill="#f1f5f9"
                      stroke="#64748b"
                      strokeWidth="0.8"
                      rx="1.5"
                    />
                  </g>
                )}
              </g>
            );
          })()}

          {/* ------------------------------------------------------------- */}
          {/* CASE B: 1 BUKAAN (GESER 1 ARAH DORONG KE KIRI)                 */}
          {/* ------------------------------------------------------------- */}
          {bukaanType === "1_bukaan" && (() => {
            // Full gate folding width (leaving 8% stack when full open)
            const gateWidth = portalWidth * (1 - gateOpen);

            // Leading edge of 1-bukaan gate (smoothly moving)
            const leadingX = portalX + gateWidth;

            // Leading lock pillar width at right edge = 18px
            const lockPillarW = 18;

            // Extra opening sliding gap (cuma 1 tiang = 45px)
            const extraGap = hasPintuExtra ? extraSlide * 45 : 0;

            // Daun width (from left jamb to extra gap)
            const mainDaunWidth = Math.max(15, (gateWidth - lockPillarW) - extraGap);
            const slatCount1P = 14;
            const slatW = mainDaunWidth / slatCount1P;

            const slatCenters: number[] = [];
            for (let i = 0; i < slatCount1P; i++) {
              slatCenters.push(portalX + i * slatW + slatW / 2);
            }

            // Gap boundaries
            const gapLeft = leadingX - lockPillarW - extraGap;
            const gapRight = leadingX - lockPillarW;

            return (
              <g>
                {/* 1. Extra Gap Next to Handle (1 tiang: Cagak & Silang visible when extraSlide > 0) */}
                {hasPintuExtra && extraGap > 3 && (
                  renderCagakAndSilangan(gapLeft, gapRight, "1p-extra")
                )}

                {/* 2. Main Gate Daun (Clean Plat Daun) */}
                <g>
                  {slatCenters.map((cx, i) =>
                    renderSingleSlat(cx - slatW / 2, slatW, `1p-${i}`)
                  )}
                  {/* Subtle edge line where daun slides back */}
                  {hasPintuExtra && extraGap > 3 && (
                    <line
                      x1={gapLeft}
                      y1={portalY + 8}
                      x2={gapLeft}
                      y2={portalY + portalHeight - 8}
                      stroke="#0f172a"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  )}
                </g>

                {/* 3. Leading Lock Jamb Pillar with Chrome Handle (Smoothly travels with leadingX) */}
                <g>
                  <rect
                    x={leadingX - lockPillarW}
                    y={portalY + 6}
                    width={lockPillarW}
                    height={portalHeight - 12}
                    fill="url(#lockPillarGrad)"
                    stroke="#475569"
                    strokeWidth="1.2"
                  />
                  {/* Main Handle */}
                  <rect
                    x={leadingX - lockPillarW / 2 - 2.5}
                    y={portalY + portalHeight / 2 - 25}
                    width="5"
                    height="50"
                    fill="#f1f5f9"
                    stroke="#64748b"
                    strokeWidth="0.8"
                    rx="2"
                  />
                  {/* Keyhole */}
                  <circle
                    cx={leadingX - lockPillarW / 2}
                    cy={portalY + portalHeight / 2 + 35}
                    r="2.5"
                    fill="#0f172a"
                    stroke="#fbbf24"
                    strokeWidth="0.8"
                  />
                </g>

                {/* 4. Extra Handle on Sliding Daun (TOTAL 2 HANDLE DI 1 BUKAAN) */}
                {hasPintuExtra && (
                  <rect
                    x={gapLeft - 6}
                    y={portalY + portalHeight / 2 - 22}
                    width="4"
                    height="44"
                    fill="#f1f5f9"
                    stroke="#64748b"
                    strokeWidth="0.8"
                    rx="1.5"
                  />
                )}
              </g>
            );
          })()}

          {/* 7. NIGHT MODE REALISTIC SPOTLIGHT OVERLAYS */}
          {isNightMode && (
            <g pointerEvents="none">
              <rect x="0" y="0" width="1000" height="700" fill="#000000" opacity="0.25" />
              <rect x="120" y="280" width="320" height="400" fill="url(#spotlightL)" />
              <rect x="340" y="280" width="320" height="400" fill="url(#spotlightM)" />
              <rect x="560" y="280" width="320" height="400" fill="url(#spotlightR)" />
            </g>
          )}

          {/* 8. PAVEMENT & STREET GROUND */}
          <rect x="0" y="660" width="1000" height="40" fill={isNightMode ? "#0f172a" : "#334155"} />
          <line x1="0" y1="662" x2="1000" y2="662" stroke="#64748b" strokeWidth="2" />
        </svg>

        {/* Click helper badge */}
        <div className="absolute bottom-3 left-4 z-20 bg-black/85 backdrop-blur-sm border border-amber-400/50 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xl flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>
            {hasPintuExtra
              ? extraStage === 0
                ? "Klik 1x: Geser Pintu Extra (Celah Intip & Ventilasi)"
                : extraStage === 1
                ? "Klik 2x: Buka Full Harmonika (92%)"
                : "Klik 3x: Tutup Rapat"
              : gateOpen > 0.4
              ? "Klik untuk Tutup Pintu"
              : "Klik untuk Buka Pintu (Tumpukan 92%)"}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STUDIO TOOLBAR (WARNA, LIST STRIP, & KONTROL BUKAAN)                      */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-6 bg-[#160207] border-t border-maroon-900/80 space-y-5">
        
        {/* SKEMA WARNA: 1 WARNA / 2 WARNA ATAS-BAWAH / LIST STRIP TENGAH */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Palette className="w-4 h-4 text-amber-400" />
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Skema Cat Oven Duco:
              </span>
            </div>

            {/* Color Mode Selection & Strip Checkbox */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-1.5 bg-black/60 p-1 rounded-xl border border-maroon-800">
                <button
                  type="button"
                  onClick={() => onColorModeChange("1_warna")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    colorMode === "1_warna"
                      ? "bg-maroon-800 text-white shadow-sm border border-amber-400/40"
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
                      ? "bg-maroon-800 text-white shadow-sm border border-amber-400/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Kombinasi 2 Warna (Atas - Bawah)
                </button>
              </div>

              {/* Checkbox List Strip Aksen (Bisa untuk 1 warna maupun 2 warna) */}
              <label className="flex items-center space-x-2 bg-black/60 px-3 py-1.5 rounded-xl border border-maroon-800 cursor-pointer hover:border-amber-400/50 transition-colors">
                <input
                  type="checkbox"
                  checked={Boolean(hasStrip || colorMode === "strip_warna")}
                  onChange={(e) => {
                    if (onHasStripChange) {
                      onHasStripChange(e.target.checked);
                    } else {
                      onColorModeChange(e.target.checked ? "strip_warna" : "1_warna");
                    }
                  }}
                  className="w-4 h-4 rounded text-red-600 focus:ring-amber-400 bg-maroon-950 border-maroon-700"
                />
                <span className="text-xs font-bold text-amber-300">
                  + Beri List Strip Aksen
                </span>
              </label>
            </div>
          </div>

          {/* Color 1: Primary Color */}
          <div>
            <div className="text-[11px] text-rose-200/90 font-medium mb-1.5">
              {colorMode === "2_warna" ? "Warna Bagian Atas:" : "Warna Cat Oven Pilihan:"}
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
                    <span className="text-[11px] font-bold block truncate text-white">
                      {color.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color 2: Secondary Color for 2-WARNA ATAS-BAWAH */}
          {colorMode === "2_warna" && (
            <div className="pt-2 border-t border-maroon-900/60 animate-in fade-in duration-200">
              <div className="text-[11px] text-amber-300 font-bold mb-1.5 flex items-center justify-between">
                <span>Warna Bagian Bawah (Kombinasi Atas - Bawah):</span>
                <span className="text-[10px] text-rose-300 font-normal">
                  * Garis pemisah horizontal di tengah daun
                </span>
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

          {/* STRIP OPTIONS: 1 GARIS ATAU 2 GARIS DI TENGAH (MUNCUL JIKA CENTANG STRIP AKTIF) */}
          {(hasStrip || colorMode === "strip_warna") && (
            <div className="pt-2 border-t border-maroon-900/60 space-y-3 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-amber-300 font-bold">
                  Bentuk Strip List di Tengah:
                </span>
                <div className="flex items-center space-x-1.5 bg-black/60 p-1 rounded-xl border border-maroon-800">
                  <button
                    type="button"
                    onClick={() => onStripStyleChange("1_garis")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      stripStyle === "1_garis"
                        ? "bg-maroon-800 text-white shadow-sm border border-amber-400/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    1 Garis Strip Tengah
                  </button>
                  <button
                    type="button"
                    onClick={() => onStripStyleChange("2_garis")}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      stripStyle === "2_garis"
                        ? "bg-maroon-800 text-white shadow-sm border border-amber-400/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    2 Garis Strip Tengah (Sejajar)
                  </button>
                </div>
              </div>

              {/* Strip Color Palette */}
              <div>
                <div className="text-[11px] text-rose-200/90 font-medium mb-1.5">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
