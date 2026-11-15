import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  companyName?: string;
  tagline?: string;
  logoUrl?: string;
  className?: string;
  showText?: boolean;
}

export default function BrandLogo({
  size = "md",
  companyName = "UD.Fariadji",
  tagline = "FABRIKASI PINTU HARMONIKA PRESISI",
  logoUrl = "/images/company-logo.png",
  className = "",
  showText = true,
}: BrandLogoProps) {
  if (size === "hero") {
    return (
      <div className={`w-full flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#32050e] via-[#200308] to-[#140104] border-2 border-maroon-700/70 shadow-2xl ${className}`}>
        {/* Left Side: Large Emblem + Title */}
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          {/* Large Circular Emblem Icon */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1 shadow-2xl shadow-red-950/70 border-2 border-amber-400 flex items-center justify-center transform hover:scale-105 transition-transform overflow-hidden">
              <img
                src={logoUrl || "/images/company-logo.png"}
                alt={companyName}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            {/* Quality Seal Badge */}
            <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-lg border border-amber-300">
              SNI STEEL
            </span>
          </div>

          {/* Text Details */}
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-amber-400/20 border border-amber-400/40 text-[11px] font-extrabold text-amber-300 uppercase tracking-widest">
              <span>★ PABRIK RESMI & SPESIALIS PINTU HARMONIKA INDONESIA ★</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
              {companyName}
            </h2>
            <p className="text-xs sm:text-sm font-bold text-rose-200 tracking-wide uppercase">
              {tagline}
            </p>
            <p className="text-xs text-rose-100/70 pt-0.5">
              Plat Baja Roll SNI Tebal Asli • Roda Double Bearing Jepang • Kunci Anti-Linggis
            </p>
          </div>
        </div>

        {/* Right Side: Trust Seals (Wide Banner) */}
        <div className="hidden lg:flex items-center space-x-4 border-l border-maroon-800/80 pl-6 shrink-0">
          <div className="text-right">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Garansi Resmi</div>
            <div className="text-lg font-black text-white">Hingga 5 Tahun</div>
            <div className="text-[11px] text-rose-200">Free Survey & Ukur</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-black text-lg">
            ✓
          </div>
        </div>
      </div>
    );
  }

  // Navbar & standard size
  const iconSizeClass =
    size === "lg"
      ? "w-13 h-13 sm:w-14 sm:h-14"
      : size === "sm"
      ? "w-9 h-9"
      : "w-11 h-11 sm:w-12 sm:h-12";

  return (
    <div className={`flex items-center space-x-3 group ${className}`}>
      {/* Circular Emblem Icon */}
      <div
        className={`${iconSizeClass} rounded-full bg-white p-0.5 flex items-center justify-center shadow-md border-2 border-amber-400 group-hover:scale-105 transition-transform shrink-0 overflow-hidden`}
      >
        <img
          src={logoUrl || "/images/company-logo.png"}
          alt={companyName}
          className="w-full h-full object-contain rounded-full"
        />
      </div>

      {showText && (
        <div>
          <span className="font-black text-slate-900 text-lg sm:text-xl tracking-tight block leading-tight group-hover:text-maroon-800 transition-colors">
            {companyName}
          </span>
          <span className="text-[11px] text-maroon-700 font-bold tracking-wider uppercase block">
            {tagline}
          </span>
        </div>
      )}
    </div>
  );
}
