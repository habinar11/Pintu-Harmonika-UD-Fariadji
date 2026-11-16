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
    id: "emerald",
    name: "Hijau Zamrud",
    hex: "#064e3b",
    gradientStart: "#059669",
    gradientEnd: "#022c22",
    borderHex: "#34d399",
  },
  {
    id: "white",
    name: "Putih Minimalis",
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
  // 0 = closed, 0.95 = open
  const [openRatio, setOpenRatio] = useState<number>(0);
  const [isNightMode, setIsNightMode] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const primaryColor =
    COLOR_PRESETS.find((c) => c.id === primaryColorId) || COLOR_PRESETS[0];
  const secondaryColor =
    COLOR_PRESETS.find((c) => c.id === secondaryColorId) || COLOR_PRESETS[1];
  const stripColor =
    STRIP_PRESETS.find((s) => s.id === stripColorId) || STRIP_PRESETS[0];

  // Smooth toggle animation
  const toggleOpenClose = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const target = openRatio > 0.4 ? 0 : 0.95;

    const startVal = openRatio;
    const startTime = performance.now();
    const duration = 850;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // smooth easeInOutCubic
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setOpenRatio(startVal + (target - startVal) * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setOpenRatio(target);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(step);
  };

  // Portal geometry
  const portalX = 140;
  const portalY = 310;
  const portalWidth = 720;
  const portalHeight = 350;

  // Slats definition
  const slatCount = model === "1_pintu" ? 14 : 16;
  const halfSlatCount = slatCount / 2;

  // Helper to render authentic Scissor Lattice (Silangan Harmonika)
  const renderScissorLattice = (
    slatCenters: number[],
    keyPrefix: string
  ) => {
    const lines = [];
    const pins = [];

    // Scissor tier heights
    const topY1 = portalY + 38;
    const topY2 = portalY + 98;
    const midY1 = portalY + portalHeight / 2 - 32;
    const midY2 = portalY + portalHeight / 2 + 32;
    const botY1 = portalY + portalHeight - 98;
    const botY2 = portalY + portalHeight - 38;

    for (let i = 0; i < slatCenters.length - 1; i++) {
      const x1 = slatCenters[i];
      const x2 = slatCenters[i + 1];
      const midX = (x1 + x2) / 2;

      // Top Cross
      lines.push(
        <line
          key={`${keyPrefix}-top1-${i}`}
          x1={x1}
          y1={topY1}
          x2={x2}
          y2={topY2}
          stroke="#fcd34d"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />,
        <line
          key={`${keyPrefix}-top2-${i}`}
          x1={x1}
          y1={topY2}
          x2={x2}
          y2={topY1}
          stroke="#fcd34d"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />
      );
      pins.push(
        <circle
          key={`${keyPrefix}-toppin-${i}`}
          cx={midX}
          cy={(topY1 + topY2) / 2}
          r="2.2"
          fill="#f59e0b"
          stroke="#78350f"
          strokeWidth="0.8"
        />
      );

      // Mid Cross
      lines.push(
        <line
          key={`${keyPrefix}-mid1-${i}`}
          x1={x1}
          y1={midY1}
          x2={x2}
          y2={midY2}
          stroke="#fcd34d"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />,
        <line
          key={`${keyPrefix}-mid2-${i}`}
          x1={x1}
          y1={midY2}
          x2={x2}
          y2={midY1}
          stroke="#fcd34d"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />
      );
      pins.push(
        <circle
          key={`${keyPrefix}-midpin-${i}`}
          cx={midX}
          cy={(midY1 + midY2) / 2}
          r="2.2"
          fill="#f59e0b"
          stroke="#78350f"
          strokeWidth="0.8"
        />
      );

      // Bottom Cross
      lines.push(
        <line
          key={`${keyPrefix}-bot1-${i}`}
          x1={x1}
          y1={botY1}
          x2={x2}
          y2={botY2}
          stroke="#fcd34d"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />,
        <line
          key={`${keyPrefix}-bot2-${i}`}
          x1={x1}
          y1={botY2}
          x2={x2}
          y2={botY1}
          stroke="#fcd34d"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />
      );
      pins.push(
        <circle
          key={`${keyPrefix}-botpin-${i}`}
          cx={midX}
          cy={(botY1 + botY2) / 2}
          r="2.2"
          fill="#f59e0b"
          stroke="#78350f"
          strokeWidth="0.8"
        />
      );
    }

    return (
      <g>
        {lines}
        {pins}
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
              Studio Visualisasi Ruko Realistis
              <span className="text-[10px] bg-rose-950 text-rose-300 px-2 py-0.5 rounded-full border border-rose-800/80 font-bold hidden sm:inline-block">
                Interaktif 3D
              </span>
            </h4>
            <p className="text-[11px] text-rose-300/80">
              Lihat perubahan warna, model bukaan, dan animasi gerak lipatan harmonika langsung pada ruko Anda.
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
            title="Ubah Suasana Pencahayaan (Siang / Malam dengan Lampu Sorot)"
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
            onClick={toggleOpenClose}
            disabled={isAnimating}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 shadow-lg min-h-[38px] ${
              openRatio > 0.4
                ? "bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white border border-rose-400"
                : "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 hover:brightness-105 border border-amber-200"
            }`}
          >
            {openRatio > 0.4 ? (
              <>
                <DoorClosed className="w-4 h-4 shrink-0" />
                <span>Tutup Pintu</span>
              </>
            ) : (
              <>
                <DoorOpen className="w-4 h-4 shrink-0" />
                <span>Buka Pintu</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* REALISTIC RUKO STAGE (SVG Architectural Render) */}
      <div
        className="relative w-full overflow-hidden bg-slate-950 cursor-pointer select-none group"
        onClick={toggleOpenClose}
        title="Klik pada pintu untuk Buka / Tutup lipatan harmonika"
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

            {/* Warm LED Downlight Cone Filter */}
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

            {/* Primary Slat Gradient (Dynamic from state) */}
            <linearGradient id="slatGradPrimary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor.gradientStart} />
              <stop offset="35%" stopColor={primaryColor.hex} />
              <stop offset="70%" stopColor={primaryColor.gradientEnd} />
              <stop offset="100%" stopColor={primaryColor.gradientStart} />
            </linearGradient>

            {/* Secondary Slat Gradient for 2-Warna Mode */}
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

            {/* Tile Floor Perspective Gradient */}
            <linearGradient id="floorDay" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="30%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            <linearGradient id="floorNight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="40%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>

            {/* Glass Reflection */}
            <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* 1. SKY BACKGROUND */}
          <rect
            x="0"
            y="0"
            width="1000"
            height="700"
            fill={isNightMode ? "url(#skyNight)" : "url(#skyDay)"}
          />

          {/* Realistic Stars in Night Mode */}
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

          {/* 2. RUKO MAIN STRUCTURE (2-STOREY COMMERCIAL SHOPHOUSE) */}
          <rect
            x="60"
            y="50"
            width="880"
            height="620"
            fill={isNightMode ? "url(#facadeWallNight)" : "url(#facadeWallDay)"}
            rx="8"
          />

          {/* Left & Right Pillar Shadows for 3D Depth */}
          <rect
            x="60"
            y="50"
            width="35"
            height="620"
            fill="#000000"
            opacity={isNightMode ? 0.45 : 0.2}
          />
          <rect
            x="905"
            y="50"
            width="35"
            height="620"
            fill="#000000"
            opacity={isNightMode ? 0.45 : 0.25}
          />

          {/* Upper Floor Architectural Cladding */}
          <rect
            x="95"
            y="65"
            width="810"
            height="180"
            fill="url(#charcoalCladding)"
            rx="6"
          />

          {/* Second Floor Triple Modern Commercial Glass Windows */}
          {/* Window 1 */}
          <g transform="translate(130, 85)">
            <rect
              width="210"
              height="140"
              fill="#090d16"
              stroke="#475569"
              strokeWidth="4"
              rx="4"
            />
            <rect width="210" height="140" fill="url(#glassReflect)" />
            <line x1="105" y1="0" x2="105" y2="140" stroke="#334155" strokeWidth="3" />
            <line x1="0" y1="70" x2="210" y2="70" stroke="#334155" strokeWidth="2" />
            <rect
              x="10"
              y="10"
              width="190"
              height="120"
              fill="#fbbf24"
              opacity={isNightMode ? 0.15 : 0.05}
            />
          </g>

          {/* Window 2 */}
          <g transform="translate(395, 85)">
            <rect
              width="210"
              height="140"
              fill="#090d16"
              stroke="#475569"
              strokeWidth="4"
              rx="4"
            />
            <rect width="210" height="140" fill="url(#glassReflect)" />
            <line x1="105" y1="0" x2="105" y2="140" stroke="#334155" strokeWidth="3" />
            <line x1="0" y1="70" x2="210" y2="70" stroke="#334155" strokeWidth="2" />
            <rect
              x="10"
              y="10"
              width="190"
              height="120"
              fill="#fbbf24"
              opacity={isNightMode ? 0.18 : 0.05}
            />
          </g>

          {/* Window 3 */}
          <g transform="translate(660, 85)">
            <rect
              width="210"
              height="140"
              fill="#090d16"
              stroke="#475569"
              strokeWidth="4"
              rx="4"
            />
            <rect width="210" height="140" fill="url(#glassReflect)" />
            <line x1="105" y1="0" x2="105" y2="140" stroke="#334155" strokeWidth="3" />
            <line x1="0" y1="70" x2="210" y2="70" stroke="#334155" strokeWidth="2" />
            <rect
              x="10"
              y="10"
              width="190"
              height="120"
              fill="#fbbf24"
              opacity={isNightMode ? 0.15 : 0.05}
            />
          </g>

          {/* 3. STOREFRONT CANOPY & SIGNAGE FASCIA */}
          <g transform="translate(80, 248)">
            <rect
              width="840"
              height="42"
              fill="url(#canopyGrad)"
              stroke="#1e293b"
              strokeWidth="3"
              rx="4"
            />
            <line x1="0" y1="2" x2="840" y2="2" stroke="#94a3b8" strokeWidth="1.5" />
            <rect
              x="260"
              y="6"
              width="320"
              height="30"
              fill="#18181b"
              stroke="#f59e0b"
              strokeWidth="1.5"
              rx="3"
            />
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
              RUKO KOMERSIAL MODERN
            </text>

            {/* Recessed Warm LED Downlight Fixtures */}
            <circle cx="200" cy="39" r="4.5" fill="#fef08a" stroke="#475569" strokeWidth="1" />
            <circle cx="420" cy="39" r="4.5" fill="#fef08a" stroke="#475569" strokeWidth="1" />
            <circle cx="640" cy="39" r="4.5" fill="#fef08a" stroke="#475569" strokeWidth="1" />
          </g>

          {/* Canopy Drop Shadow */}
          <rect
            x="80"
            y="290"
            width="840"
            height="18"
            fill="#000000"
            opacity={isNightMode ? 0.6 : 0.35}
          />

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
          <rect
            x={portalX}
            y={portalY}
            width={portalWidth}
            height={portalHeight}
            fill="#090d16"
          />

          {/* ========================================================= */}
          {/* INTERIOR TOKO / SHOWROOM (Terlihat saat Harmonika Terbuka) */}
          {/* ========================================================= */}
          <g opacity={Math.min(1, openRatio * 1.4)}>
            <rect
              x={portalX}
              y={portalY}
              width={portalWidth}
              height={portalHeight}
              fill="#18181b"
            />
            <ellipse
              cx={portalX + portalWidth / 2}
              cy={portalY + 50}
              rx={portalWidth * 0.45}
              ry="45"
              fill="#fef08a"
              opacity="0.25"
            />

            {/* Left Shelf */}
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

            {/* Center Reception Desk */}
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
                OPEN FOR BUSINESS
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

            <rect
              x={portalX}
              y={portalY + portalHeight - 40}
              width={portalWidth}
              height="40"
              fill="#334155"
              opacity="0.8"
            />
          </g>

          {/* 5. TOP AND BOTTOM ROLLER RAILS FOR HARMONIKA */}
          {/* Top Guide Rail with internal roller groove */}
          <rect
            x={portalX}
            y={portalY - 2}
            width={portalWidth}
            height="18"
            fill="url(#steelRail)"
            stroke="#1e293b"
            strokeWidth="1.5"
          />
          <line
            x1={portalX}
            y1={portalY + 6}
            x2={portalX + portalWidth}
            y2={portalY + 6}
            stroke="#0f172a"
            strokeWidth="2.5"
          />

          {/* Bottom Embedded Track */}
          <rect
            x={portalX}
            y={portalY + portalHeight - 16}
            width={portalWidth}
            height="16"
            fill="url(#steelRail)"
            stroke="#1e293b"
            strokeWidth="1.5"
          />
          <line
            x1={portalX}
            y1={portalY + portalHeight - 8}
            x2={portalX + portalWidth}
            y2={portalY + portalHeight - 8}
            stroke="#0f172a"
            strokeWidth="2.5"
          />

          {/* ============================================================== */}
          {/* 6. DYNAMIC FOLDING GATE (PINTU HARMONIKA) INTERACTIVE RENDER   */}
          {/* ============================================================== */}
          
          {/* MODEL 1 PINTU (Bukaan 1 Arah - Folds completely to the Left) */}
          {model === "1_pintu" && (
            <g id="model-1-pintu">
              {/* Slats calculation */}
              {(() => {
                const closedSlatW = (portalWidth - 25) / slatCount;
                const openSlatW = 12;
                const currentSlatW =
                  closedSlatW - (closedSlatW - openSlatW) * openRatio;
                const centers: number[] = [];

                const slatElements = Array.from({ length: slatCount }).map(
                  (_, i) => {
                    const currentX = portalX + i * currentSlatW;
                    const center = currentX + currentSlatW / 2;
                    centers.push(center);

                    let fillGrad = "url(#slatGradPrimary)";
                    if (colorMode === "2_warna") {
                      fillGrad =
                        i % 2 === 0
                          ? "url(#slatGradPrimary)"
                          : "url(#slatGradSecondary)";
                    }

                    return (
                      <g key={`slat-1p-${i}`}>
                        <rect
                          x={currentX}
                          y={portalY + 14}
                          width={Math.max(1, currentSlatW - 1)}
                          height={portalHeight - 28}
                          fill={fillGrad}
                          stroke={primaryColor.borderHex}
                          strokeWidth={0.7}
                          rx="1"
                        />
                        <line
                          x1={currentX + currentSlatW * 0.45}
                          y1={portalY + 16}
                          x2={currentX + currentSlatW * 0.45}
                          y2={portalY + portalHeight - 16}
                          stroke="#000000"
                          strokeWidth="1.2"
                          opacity="0.35"
                        />
                        <line
                          x1={currentX + currentSlatW * 0.55}
                          y1={portalY + 16}
                          x2={currentX + currentSlatW * 0.55}
                          y2={portalY + portalHeight - 16}
                          stroke="#ffffff"
                          strokeWidth="1"
                          opacity="0.25"
                        />

                        {/* Accent Strip */}
                        {colorMode === "strip_warna" && (
                          <g>
                            <rect
                              x={currentX}
                              y={portalY + 60}
                              width={Math.max(1, currentSlatW - 1)}
                              height="12"
                              fill={stripColor.hex}
                            />
                            <rect
                              x={currentX}
                              y={portalY + portalHeight - 80}
                              width={Math.max(1, currentSlatW - 1)}
                              height="12"
                              fill={stripColor.hex}
                            />
                          </g>
                        )}

                        {/* Pivot Rivets */}
                        <circle
                          cx={center}
                          cy={portalY + 38}
                          r="2"
                          fill="#fcd34d"
                          stroke="#78350f"
                          strokeWidth="0.8"
                        />
                        <circle
                          cx={center}
                          cy={portalY + portalHeight / 2}
                          r="2.5"
                          fill="#fcd34d"
                          stroke="#78350f"
                          strokeWidth="0.8"
                        />
                        <circle
                          cx={center}
                          cy={portalY + portalHeight - 38}
                          r="2"
                          fill="#fcd34d"
                          stroke="#78350f"
                          strokeWidth="0.8"
                        />
                      </g>
                    );
                  }
                );

                const pillarX = portalX + slatCount * currentSlatW;

                return (
                  <>
                    {slatElements}
                    {/* Dynamic Scissor Lattice Bars */}
                    {renderScissorLattice(centers, "1p-sciss")}
                    {/* Master Lead Pillar on Right */}
                    <g transform={`translate(${pillarX}, ${portalY + 14})`}>
                      <rect
                        width="24"
                        height={portalHeight - 28}
                        fill="url(#lockPillarGrad)"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        rx="2"
                      />
                      <rect
                        x="7"
                        y={portalHeight / 2 - 60}
                        width="8"
                        height="90"
                        fill="#cbd5e1"
                        stroke="#0f172a"
                        strokeWidth="1.5"
                        rx="4"
                      />
                      <circle
                        cx="11"
                        cy={portalHeight / 2 + 55}
                        r="5"
                        fill="#0f172a"
                        stroke="#fbbf24"
                        strokeWidth="1"
                      />
                      <line
                        x1="11"
                        y1={portalHeight / 2 + 53}
                        x2="11"
                        y2={portalHeight / 2 + 58}
                        stroke="#fbbf24"
                        strokeWidth="2"
                      />
                    </g>
                  </>
                );
              })()}
            </g>
          )}

          {/* MODEL 2 PINTU (Bukaan Tengah / Double Sliding - Folds Left & Right) */}
          {model === "2_pintu" && (
            <g id="model-2-pintu">
              {/* Left Wing Slats */}
              {(() => {
                const maxWingWidth = portalWidth / 2 - 14;
                const closedSlatW = maxWingWidth / halfSlatCount;
                const openSlatW = 10;
                const currentSlatW =
                  closedSlatW - (closedSlatW - openSlatW) * openRatio;
                const leftCenters: number[] = [];

                const leftSlats = Array.from({ length: halfSlatCount }).map(
                  (_, i) => {
                    const currentX = portalX + i * currentSlatW;
                    const center = currentX + currentSlatW / 2;
                    leftCenters.push(center);

                    let fillGrad = "url(#slatGradPrimary)";
                    if (colorMode === "2_warna") {
                      fillGrad =
                        i % 2 === 0
                          ? "url(#slatGradPrimary)"
                          : "url(#slatGradSecondary)";
                    }

                    return (
                      <g key={`slat-2p-left-${i}`}>
                        <rect
                          x={currentX}
                          y={portalY + 14}
                          width={Math.max(1, currentSlatW - 1)}
                          height={portalHeight - 28}
                          fill={fillGrad}
                          stroke={primaryColor.borderHex}
                          strokeWidth={0.7}
                          rx="1"
                        />
                        <line
                          x1={currentX + currentSlatW * 0.5}
                          y1={portalY + 16}
                          x2={currentX + currentSlatW * 0.5}
                          y2={portalY + portalHeight - 16}
                          stroke="#000000"
                          strokeWidth="1.2"
                          opacity="0.35"
                        />
                        {colorMode === "strip_warna" && (
                          <g>
                            <rect
                              x={currentX}
                              y={portalY + 60}
                              width={Math.max(1, currentSlatW - 1)}
                              height="12"
                              fill={stripColor.hex}
                            />
                            <rect
                              x={currentX}
                              y={portalY + portalHeight - 80}
                              width={Math.max(1, currentSlatW - 1)}
                              height="12"
                              fill={stripColor.hex}
                            />
                          </g>
                        )}
                        <circle
                          cx={center}
                          cy={portalY + 38}
                          r="2"
                          fill="#fcd34d"
                          stroke="#78350f"
                          strokeWidth="0.8"
                        />
                        <circle
                          cx={center}
                          cy={portalY + portalHeight / 2}
                          r="2.5"
                          fill="#fcd34d"
                          stroke="#78350f"
                          strokeWidth="0.8"
                        />
                        <circle
                          cx={center}
                          cy={portalY + portalHeight - 38}
                          r="2"
                          fill="#fcd34d"
                          stroke="#78350f"
                          strokeWidth="0.8"
                        />
                      </g>
                    );
                  }
                );

                const leftPillarX = portalX + halfSlatCount * currentSlatW;

                return (
                  <>
                    {leftSlats}
                    {renderScissorLattice(leftCenters, "2p-left-sciss")}
                    {/* Left Center Interlocking Post */}
                    <g transform={`translate(${leftPillarX}, ${portalY + 14})`}>
                      <rect
                        width="16"
                        height={portalHeight - 28}
                        fill="url(#lockPillarGrad)"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        rx="2"
                      />
                      <rect
                        x="4"
                        y={portalHeight / 2 - 50}
                        width="6"
                        height="80"
                        fill="#cbd5e1"
                        stroke="#0f172a"
                        strokeWidth="1.5"
                        rx="3"
                      />
                    </g>
                  </>
                );
              })()}

              {/* Right Wing Slats */}
              {(() => {
                const maxWingWidth = portalWidth / 2 - 14;
                const closedSlatW = maxWingWidth / halfSlatCount;
                const openSlatW = 10;
                const currentSlatW =
                  closedSlatW - (closedSlatW - openSlatW) * openRatio;
                const rightCenters: number[] = [];

                const rightSlats = Array.from({ length: halfSlatCount }).map(
                  (_, i) => {
                    const currentX =
                      portalX +
                      portalWidth -
                      (halfSlatCount - i) * currentSlatW;
                    const center = currentX + currentSlatW / 2;
                    rightCenters.push(center);

                    let fillGrad = "url(#slatGradPrimary)";
                    if (colorMode === "2_warna") {
                      fillGrad =
                        i % 2 === 0
                          ? "url(#slatGradSecondary)"
                          : "url(#slatGradPrimary)";
                    }

                    return (
                      <g key={`slat-2p-right-${i}`}>
                        <rect
                          x={currentX}
                          y={portalY + 14}
                          width={Math.max(1, currentSlatW - 1)}
                          height={portalHeight - 28}
                          fill={fillGrad}
                          stroke={primaryColor.borderHex}
                          strokeWidth={0.7}
                          rx="1"
                        />
                        <line
                          x1={currentX + currentSlatW * 0.5}
                          y1={portalY + 16}
                          x2={currentX + currentSlatW * 0.5}
                          y2={portalY + portalHeight - 16}
                          stroke="#000000"
                          strokeWidth="1.2"
                          opacity="0.35"
                        />
                        {colorMode === "strip_warna" && (
                          <g>
                            <rect
                              x={currentX}
                              y={portalY + 60}
                              width={Math.max(1, currentSlatW - 1)}
                              height="12"
                              fill={stripColor.hex}
                            />
                            <rect
                              x={currentX}
                              y={portalY + portalHeight - 80}
                              width={Math.max(1, currentSlatW - 1)}
                              height="12"
                              fill={stripColor.hex}
                            />
                          </g>
                        )}
                        <circle
                          cx={center}
                          cy={portalY + 38}
                          r="2"
                          fill="#fcd34d"
                          stroke="#78350f"
                          strokeWidth="0.8"
                        />
                        <circle
                          cx={center}
                          cy={portalY + portalHeight / 2}
                          r="2.5"
                          fill="#fcd34d"
                          stroke="#78350f"
                          strokeWidth="0.8"
                        />
                        <circle
                          cx={center}
                          cy={portalY + portalHeight - 38}
                          r="2"
                          fill="#fcd34d"
                          stroke="#78350f"
                          strokeWidth="0.8"
                        />
                      </g>
                    );
                  }
                );

                const rightPillarX =
                  portalX + portalWidth - halfSlatCount * currentSlatW - 16;

                return (
                  <>
                    {rightSlats}
                    {renderScissorLattice(rightCenters, "2p-right-sciss")}
                    {/* Right Center Interlocking Post with Master Lock */}
                    <g transform={`translate(${rightPillarX}, ${portalY + 14})`}>
                      <rect
                        width="16"
                        height={portalHeight - 28}
                        fill="url(#lockPillarGrad)"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        rx="2"
                      />
                      <rect
                        x="6"
                        y={portalHeight / 2 - 50}
                        width="6"
                        height="80"
                        fill="#cbd5e1"
                        stroke="#0f172a"
                        strokeWidth="1.5"
                        rx="3"
                      />
                      <circle
                        cx="8"
                        cy={portalHeight / 2 + 50}
                        r="4"
                        fill="#0f172a"
                        stroke="#fbbf24"
                        strokeWidth="1"
                      />
                    </g>
                  </>
                );
              })()}
            </g>
          )}

          {/* MODEL EXTRA SWING (Pintu Harmonika dengan Ekstra Swing / Roda Putar Tembok) */}
          {model === "extra_swing" && (
            <g id="model-extra-swing">
              {/* Left Wing Slats */}
              {(() => {
                const wingWidth = (portalWidth - 110) / 2;
                const closedSlatW = wingWidth / 7;
                const openSlatW = 10;
                const currentSlatW =
                  closedSlatW - (closedSlatW - openSlatW) * openRatio;
                const leftCenters: number[] = [];

                const leftSlats = Array.from({ length: 7 }).map((_, i) => {
                  const currentX = portalX + i * currentSlatW;
                  const center = currentX + currentSlatW / 2;
                  leftCenters.push(center);

                  let fillGrad = "url(#slatGradPrimary)";
                  if (colorMode === "2_warna") {
                    fillGrad =
                      i % 2 === 0
                        ? "url(#slatGradPrimary)"
                        : "url(#slatGradSecondary)";
                  }

                  return (
                    <g key={`slat-extra-left-${i}`}>
                      <rect
                        x={currentX}
                        y={portalY + 14}
                        width={Math.max(1, currentSlatW - 1)}
                        height={portalHeight - 28}
                        fill={fillGrad}
                        stroke={primaryColor.borderHex}
                        strokeWidth={0.7}
                        rx="1"
                      />
                      <line
                        x1={currentX + currentSlatW * 0.5}
                        y1={portalY + 16}
                        x2={currentX + currentSlatW * 0.5}
                        y2={portalY + portalHeight - 16}
                        stroke="#000000"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                      {colorMode === "strip_warna" && (
                        <g>
                          <rect
                            x={currentX}
                            y={portalY + 60}
                            width={Math.max(1, currentSlatW - 1)}
                            height="12"
                            fill={stripColor.hex}
                          />
                          <rect
                            x={currentX}
                            y={portalY + portalHeight - 80}
                            width={Math.max(1, currentSlatW - 1)}
                            height="12"
                            fill={stripColor.hex}
                          />
                        </g>
                      )}
                    </g>
                  );
                });

                return (
                  <>
                    {leftSlats}
                    {renderScissorLattice(leftCenters, "extra-left-sciss")}
                  </>
                );
              })()}

              {/* Mid-Right Slats */}
              {(() => {
                const wingWidth = (portalWidth - 110) / 2;
                const closedSlatW = wingWidth / 7;
                const openSlatW = 10;
                const currentSlatW =
                  closedSlatW - (closedSlatW - openSlatW) * openRatio;
                const midCenters: number[] = [];

                const midSlats = Array.from({ length: 7 }).map((_, i) => {
                  const currentX =
                    portalX + portalWidth - 110 - (7 - i) * currentSlatW;
                  const center = currentX + currentSlatW / 2;
                  midCenters.push(center);

                  let fillGrad = "url(#slatGradPrimary)";
                  if (colorMode === "2_warna") {
                    fillGrad =
                      i % 2 === 0
                        ? "url(#slatGradSecondary)"
                        : "url(#slatGradPrimary)";
                  }

                  return (
                    <g key={`slat-extra-mid-${i}`}>
                      <rect
                        x={currentX}
                        y={portalY + 14}
                        width={Math.max(1, currentSlatW - 1)}
                        height={portalHeight - 28}
                        fill={fillGrad}
                        stroke={primaryColor.borderHex}
                        strokeWidth={0.7}
                        rx="1"
                      />
                      {colorMode === "strip_warna" && (
                        <g>
                          <rect
                            x={currentX}
                            y={portalY + 60}
                            width={Math.max(1, currentSlatW - 1)}
                            height="12"
                            fill={stripColor.hex}
                          />
                          <rect
                            x={currentX}
                            y={portalY + portalHeight - 80}
                            width={Math.max(1, currentSlatW - 1)}
                            height="12"
                            fill={stripColor.hex}
                          />
                        </g>
                      )}
                    </g>
                  );
                });

                return (
                  <>
                    {midSlats}
                    {renderScissorLattice(midCenters, "extra-mid-sciss")}
                  </>
                );
              })()}

              {/* SPECIAL EXTRA SWING PEDESTRIAN / FLUSH-TO-WALL PANEL (110px width on Right) */}
              {(() => {
                const swingPanelX = portalX + portalWidth - 105;
                const swingRotate = openRatio * 75; // rotates open
                return (
                  <g
                    transform={`translate(${swingPanelX + 100}, ${
                      portalY + 14
                    })`}
                  >
                    {/* Heavy Duty Pivot Swing Hinges on Wall */}
                    <circle cx="2" cy="30" r="5" fill="#f59e0b" stroke="#000" strokeWidth="1.5" />
                    <circle cx="2" cy={portalHeight - 60} r="5" fill="#f59e0b" stroke="#000" strokeWidth="1.5" />

                    {/* Swing Panel with perspective transformation */}
                    <g
                      transform={`rotate(${swingRotate}) scale(${
                        1 - openRatio * 0.15
                      }, 1)`}
                    >
                      <rect
                        x="-100"
                        y="0"
                        width="100"
                        height={portalHeight - 28}
                        fill="url(#slatGradPrimary)"
                        stroke="#fbbf24"
                        strokeWidth="2"
                        rx="3"
                      />

                      {/* Extra Swing Gold Badge */}
                      <rect
                        x="-90"
                        y="20"
                        width="80"
                        height="20"
                        fill="#090d16"
                        stroke="#f59e0b"
                        strokeWidth="1"
                        rx="3"
                      />
                      <text
                        x="-50"
                        y="34"
                        textAnchor="middle"
                        fill="#fde047"
                        fontSize="9"
                        fontWeight="900"
                        letterSpacing="1"
                      >
                        EXTRA SWING
                      </text>

                      {/* Pedestrian Handle & Key Cylinder */}
                      <rect
                        x="-92"
                        y={portalHeight / 2 - 40}
                        width="8"
                        height="65"
                        fill="#cbd5e1"
                        stroke="#0f172a"
                        strokeWidth="1.5"
                        rx="3"
                      />
                      <circle
                        cx="-88"
                        cy={portalHeight / 2 + 45}
                        r="4"
                        fill="#0f172a"
                        stroke="#fbbf24"
                        strokeWidth="1"
                      />

                      {/* Strip on swing door */}
                      {colorMode === "strip_warna" && (
                        <g>
                          <rect
                            x="-100"
                            y="60"
                            width="100"
                            height="12"
                            fill={stripColor.hex}
                          />
                          <rect
                            x="-100"
                            y={portalHeight - 80}
                            width="100"
                            height="12"
                            fill={stripColor.hex}
                          />
                        </g>
                      )}

                      {/* Heavy Duty Swing Castor Wheel at bottom */}
                      <rect
                        x="-70"
                        y={portalHeight - 28}
                        width="16"
                        height="10"
                        fill="#475569"
                        stroke="#0f172a"
                        strokeWidth="1"
                      />
                      <circle
                        cx="-62"
                        cy={portalHeight - 16}
                        r="6"
                        fill="#1e293b"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                      />
                    </g>
                  </g>
                );
              })()}
            </g>
          )}

          {/* 7. SPOTLIGHT CONES OVERLAY (In Night Mode for realism) */}
          {isNightMode && (
            <g pointerEvents="none" style={{ mixBlendMode: "screen" }}>
              <polygon
                points="280,285 140,660 420,660"
                fill="url(#spotlightL)"
              />
              <polygon
                points="500,285 360,660 640,660"
                fill="url(#spotlightM)"
              />
              <polygon
                points="720,285 580,660 860,660"
                fill="url(#spotlightR)"
              />
            </g>
          )}

          {/* 8. PAVING & SIDEWALK TILES (Realistic Perspective Ground) */}
          <g transform="translate(60, 660)">
            <rect
              width="880"
              height="35"
              fill={isNightMode ? "url(#floorNight)" : "url(#floorDay)"}
            />
            <line x1="0" y1="12" x2="880" y2="12" stroke="#000000" strokeWidth="1.5" opacity="0.4" />
            <line x1="0" y1="24" x2="880" y2="24" stroke="#000000" strokeWidth="1.5" opacity="0.4" />
            {Array.from({ length: 18 }).map((_, i) => (
              <line
                key={`pave-${i}`}
                x1={i * 50}
                y1="0"
                x2={i * 50 - 15}
                y2="35"
                stroke="#000000"
                strokeWidth="1.2"
                opacity="0.35"
              />
            ))}
          </g>

          {/* 9. INTERACTIVE HOVER / CLICK WATERMARK BADGE */}
          <g
            transform="translate(500, 630)"
            className="transition-transform duration-300 pointer-events-none"
          >
            <rect
              x="-115"
              y="-15"
              width="230"
              height="26"
              rx="13"
              fill="#000000"
              fillOpacity="0.75"
              stroke="#fbbf24"
              strokeWidth="1"
            />
            <text
              textAnchor="middle"
              y="3"
              fill="#fef08a"
              fontSize="10"
              fontWeight="bold"
              letterSpacing="0.8"
            >
              {openRatio > 0.4
                ? "✦ KLIK UNTUK TUTUP PINTU"
                : "✦ KLIK PINTU UNTUK MEMBUKA"}
            </text>
          </g>
        </svg>

        {/* Live Status Overlay Pill on top right of the stage */}
        <div className="absolute top-3 right-3 flex items-center space-x-2 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md border border-amber-400/50 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-amber-300 flex items-center shadow-lg">
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                openRatio > 0.4 ? "bg-emerald-400 animate-pulse" : "bg-red-500"
              }`}
            />
            <span>
              {openRatio > 0.4
                ? `Terbuka ${Math.round(openRatio * 100)}%`
                : "Tertutup Rapat"}
            </span>
          </div>
        </div>

        {/* Dimension indicator badge on top left */}
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-rose-900/80 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-rose-200 pointer-events-none shadow-lg">
          Ukuran Opening: <span className="font-bold text-white">{widthMeters}m</span> (L) ×{" "}
          <span className="font-bold text-white">{heightMeters}m</span> (T)
        </div>
      </div>

      {/* ============================================================== */}
      {/* VISUALIZER CONTROLS: 3 MODEL, COLOR SCHEMES, AND SLIDER       */}
      {/* ============================================================== */}
      <div className="p-4 sm:p-6 bg-gradient-to-b from-maroon-950/70 to-black space-y-5 border-t border-maroon-900/60">
        
        {/* SLIDER BUKAAN PINTU (Manual Percentage Control) */}
        <div className="bg-black/40 border border-maroon-800/60 rounded-2xl p-3.5 sm:p-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-rose-200 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              Simulasi Gerak Lipatan Harmonika:
            </label>
            <span className="text-xs font-extrabold text-amber-300">
              {Math.round(openRatio * 100)}%{" "}
              {openRatio === 0
                ? "(Tertutup Rapat)"
                : openRatio >= 0.9
                ? "(Terbuka Maksimal)"
                : "(Sedang Melipat)"}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="0.95"
            step="0.01"
            value={openRatio}
            onChange={(e) => setOpenRatio(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-maroon-900/80 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[10px] text-rose-300/70 mt-1">
            <span>0% Tertutup</span>
            <span>50% Setengah Buka</span>
            <span>100% Lipat Penuh</span>
          </div>
        </div>

        {/* 1. TIGA PILIHAN MODEL PINTU */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
              <DoorClosed className="w-4 h-4 text-amber-400" />
              1. Pilih Model Pintu Harmonika:
            </label>
            <span className="text-[10px] sm:text-xs text-amber-300 font-semibold">
              3 Pilihan Model Tersedia
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {/* Model 1: Model 1 Pintu (Bukaan 1 Arah) */}
            <button
              type="button"
              onClick={() => onModelChange("1_pintu")}
              className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all active:scale-98 min-h-[48px] ${
                model === "1_pintu"
                  ? "bg-maroon-900/90 border-amber-400 ring-2 ring-amber-400/40 text-white shadow-lg"
                  : "bg-black/40 border-maroon-900/80 text-rose-200 hover:bg-maroon-950/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-xs sm:text-sm text-white">
                  Model 1 Pintu
                </span>
                {model === "1_pintu" && (
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                )}
              </div>
              <p className="text-[11px] text-rose-300/90 leading-tight">
                Bukaan 1 Arah (Slide geser dan melipat ke satu sisi tembok).
              </p>
              <div className="text-[10px] font-bold text-emerald-400 mt-1.5">
                Ideal untuk Ruko 1 Pintu / Garasi
              </div>
            </button>

            {/* Model 2: Model 2 Pintu (Bukaan Tengah) */}
            <button
              type="button"
              onClick={() => onModelChange("2_pintu")}
              className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all active:scale-98 min-h-[48px] ${
                model === "2_pintu"
                  ? "bg-maroon-900/90 border-amber-400 ring-2 ring-amber-400/40 text-white shadow-lg"
                  : "bg-black/40 border-maroon-900/80 text-rose-200 hover:bg-maroon-950/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-xs sm:text-sm text-white">
                  Model 2 Pintu
                </span>
                {model === "2_pintu" && (
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                )}
              </div>
              <p className="text-[11px] text-rose-300/90 leading-tight">
                Bukaan Tengah (Membuka ke sisi kiri & kanan dengan kunci tengah).
              </p>
              <div className="text-[10px] font-bold text-amber-300 mt-1.5">
                Standar Favorit Ruko Komersial
              </div>
            </button>

            {/* Model 3: Model yang ada Extranya (Ekstra Swing) */}
            <button
              type="button"
              onClick={() => onModelChange("extra_swing")}
              className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all active:scale-98 min-h-[48px] ${
                model === "extra_swing"
                  ? "bg-maroon-900/90 border-amber-400 ring-2 ring-amber-400/40 text-white shadow-lg"
                  : "bg-black/40 border-maroon-900/80 text-rose-200 hover:bg-maroon-950/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-extrabold text-xs sm:text-sm text-white flex items-center gap-1.5">
                  Model Extra Swing
                  <span className="text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-black">
                    EXTRA
                  </span>
                </span>
                {model === "extra_swing" && (
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                )}
              </div>
              <p className="text-[11px] text-rose-300/90 leading-tight">
                Ada Ekstra Swing / Roda putar tembok sehingga bukaan ruko plong 100%.
              </p>
              <div className="text-[10px] font-bold text-amber-300 mt-1.5">
                + Opsi Roda Swing Termasuk (+Rp 250rb)
              </div>
            </button>
          </div>
        </div>

        {/* 2. PILIHAN SKEMA WARNA (1 WARNA, 2 WARNA, STRIP WARNA) */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-amber-400" />
              2. Pilih Skema Cat Finishing:
            </label>
            <span className="text-[10px] sm:text-xs text-rose-200/80">
              Cat Oven Duco Anti Karat
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-4">
            {/* Skema 1 Warna */}
            <button
              type="button"
              onClick={() => onColorModeChange("1_warna")}
              className={`p-3 rounded-2xl border text-left transition-all active:scale-98 min-h-[44px] ${
                colorMode === "1_warna"
                  ? "bg-maroon-900/90 border-amber-400 text-white ring-2 ring-amber-400/30"
                  : "bg-black/40 border-maroon-900/80 text-rose-200 hover:bg-maroon-950/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs sm:text-sm">1 Warna Solid</span>
                {colorMode === "1_warna" && (
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                )}
              </div>
              <span className="text-[11px] text-rose-300/70 block mt-0.5">
                1 warna serasi untuk seluruh daun & rangka pintu.
              </span>
            </button>

            {/* Skema 2 Warna */}
            <button
              type="button"
              onClick={() => onColorModeChange("2_warna")}
              className={`p-3 rounded-2xl border text-left transition-all active:scale-98 min-h-[44px] ${
                colorMode === "2_warna"
                  ? "bg-maroon-900/90 border-amber-400 text-white ring-2 ring-amber-400/30"
                  : "bg-black/40 border-maroon-900/80 text-rose-200 hover:bg-maroon-950/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs sm:text-sm">2 Warna Kombinasi</span>
                {colorMode === "2_warna" && (
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                )}
              </div>
              <span className="text-[11px] text-rose-300/70 block mt-0.5">
                Kombinasi 2 warna selang-seling kontras (+Rp 150rb).
              </span>
            </button>

            {/* Skema Tambahan Strip Warna */}
            <button
              type="button"
              onClick={() => onColorModeChange("strip_warna")}
              className={`p-3 rounded-2xl border text-left transition-all active:scale-98 min-h-[44px] ${
                colorMode === "strip_warna"
                  ? "bg-maroon-900/90 border-amber-400 text-white ring-2 ring-amber-400/30"
                  : "bg-black/40 border-maroon-900/80 text-rose-200 hover:bg-maroon-950/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs sm:text-sm flex items-center gap-1">
                  Tambahan Strip Warna
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                </span>
                {colorMode === "strip_warna" && (
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                )}
              </div>
              <span className="text-[11px] text-rose-300/70 block mt-0.5">
                Garis list strip aksen modern sporty (+Rp 150rb).
              </span>
            </button>
          </div>

          {/* PALET WARNA UTAMA */}
          <div className="space-y-3 bg-black/40 border border-maroon-900/70 rounded-2xl p-3.5 sm:p-4">
            <div>
              <label className="text-[11px] sm:text-xs font-bold text-rose-200 block mb-2">
                Pilih Warna Utama (Primary Color):
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {COLOR_PRESETS.map((color) => {
                  const isSelected = color.id === primaryColorId;
                  return (
                    <button
                      key={`prim-${color.id}`}
                      type="button"
                      onClick={() => onPrimaryColorChange(color.id)}
                      className={`flex flex-col items-center p-1.5 rounded-xl border transition-all active:scale-95 min-h-[44px] ${
                        isSelected
                          ? "border-amber-400 bg-maroon-900/90 shadow-md ring-2 ring-amber-400/40"
                          : "border-maroon-900 bg-black/40 hover:bg-maroon-950/50"
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border border-white/30 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[10px] text-rose-100 font-medium mt-1 truncate max-w-full text-center">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PALET WARNA KEDUA (Hanya tampil jika mode 2 Warna aktif) */}
            {colorMode === "2_warna" && (
              <div className="pt-3 border-t border-maroon-900/80">
                <label className="text-[11px] sm:text-xs font-bold text-amber-300 block mb-2">
                  Pilih Warna Kedua (Secondary Contrast):
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {COLOR_PRESETS.map((color) => {
                    const isSelected = color.id === secondaryColorId;
                    return (
                      <button
                        key={`sec-${color.id}`}
                        type="button"
                        onClick={() => onSecondaryColorChange(color.id)}
                        className={`flex flex-col items-center p-1.5 rounded-xl border transition-all active:scale-95 min-h-[44px] ${
                          isSelected
                            ? "border-amber-400 bg-maroon-900/90 shadow-md ring-2 ring-amber-400/40"
                            : "border-maroon-900 bg-black/40 hover:bg-maroon-950/50"
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full border border-white/30 shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[10px] text-rose-100 font-medium mt-1 truncate max-w-full text-center">
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PALET STRIP AKSEN (Hanya tampil jika mode Strip Warna aktif) */}
            {colorMode === "strip_warna" && (
              <div className="pt-3 border-t border-maroon-900/80">
                <label className="text-[11px] sm:text-xs font-bold text-amber-300 block mb-2">
                  Pilih Warna Strip List Aksen:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {STRIP_PRESETS.map((strip) => {
                    const isSelected = strip.id === stripColorId;
                    return (
                      <button
                        key={`strip-${strip.id}`}
                        type="button"
                        onClick={() => onStripColorChange(strip.id)}
                        className={`flex items-center space-x-2 p-2 rounded-xl border transition-all active:scale-95 min-h-[44px] ${
                          isSelected
                            ? "border-amber-400 bg-maroon-900/90 shadow-md ring-2 ring-amber-400/40"
                            : "border-maroon-900 bg-black/40 hover:bg-maroon-950/50"
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full border border-white/30 shadow-inner shrink-0"
                          style={{ backgroundColor: strip.hex }}
                        />
                        <span className="text-[11px] text-rose-100 font-bold truncate">
                          {strip.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
