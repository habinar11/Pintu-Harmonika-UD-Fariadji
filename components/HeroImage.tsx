"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

interface HeroImageProps {
  src?: string;
  alt: string;
}

export default function HeroImage({
  src,
  alt = "Fabrikasi Pintu Harmonika Presisi UD.Fariadji",
}: HeroImageProps) {
  const fallbackLocal = "/images/pintu-harmonika-hero.svg";
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackLocal);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackLocal);
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-maroon-700/60 bg-gradient-to-br from-maroon-950 to-black group">
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#140205] via-[#140205]/40 to-transparent pointer-events-none" />

      {/* Floating highlight badge */}
      <div className="absolute top-4 left-4 bg-maroon-950/90 backdrop-blur-xs border border-amber-400/40 rounded-xl px-3.5 py-2 text-xs font-bold text-amber-300 flex items-center space-x-2 shadow-lg z-10">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Teknologi Las CO2 & Plat Murni</span>
      </div>

      <div className="absolute bottom-5 left-5 right-5 bg-maroon-950/95 border border-maroon-800 rounded-2xl p-4 shadow-xl z-10">
        <div className="flex items-center justify-between text-xs text-rose-200 mb-1">
          <span className="font-extrabold text-white text-sm">Pintu Harmonika Langsung Pabrik</span>
          <span className="text-amber-400 font-extrabold">Harga Terbaik</span>
        </div>
        <p className="text-xs text-rose-200/80">
          Tanpa perantara agen. Siap kirim dan pasang ke ruko, kios, toko, dan gudang Anda.
        </p>
      </div>
    </div>
  );
}
