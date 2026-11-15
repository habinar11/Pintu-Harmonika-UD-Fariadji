"use client";

import React, { useState } from "react";
import { Handshake, Building2, ShieldCheck, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface PartnerItem {
  id: string;
  name: string;
  tagline: string;
  category: "Kontraktor" | "Developer" | "Toko & Retail" | "Pergudangan";
  project: string;
  yearsPartnership: string;
  logo: React.ReactNode;
}

export const defaultPartners: PartnerItem[] = [
  {
    id: "p1",
    name: "PT Artha Graha Konstruksi",
    tagline: "Kontraktor Sipil & Gedung Komersial",
    category: "Kontraktor",
    project: "Pemasangan 16 Unit Pintu Harmonika Ruko",
    yearsPartnership: "Mitra Sejak 2021",
    logo: (
      <svg viewBox="0 0 60 60" className="w-12 h-12 shrink-0" fill="none">
        <rect width="60" height="60" rx="14" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
        <path d="M15 45 L30 15 L45 45" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="20" y1="36" x2="40" y2="36" stroke="#38bdf8" strokeWidth="2.5" />
        <circle cx="30" cy="27" r="4" fill="#f8fafc" />
        <rect x="27" y="38" width="6" height="7" fill="#f59e0b" />
      </svg>
    ),
  },
  {
    id: "p2",
    name: "Central Park Property Group",
    tagline: "Developer Ruko & Pusat Perbelanjaan",
    category: "Developer",
    project: "Proyek Kawasan Ruko Bisnis 3 Lantai",
    yearsPartnership: "Mitra Sejak 2019",
    logo: (
      <svg viewBox="0 0 60 60" className="w-12 h-12 shrink-0" fill="none">
        <rect width="60" height="60" rx="14" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
        <path d="M16 44 L30 16 L44 44 Z" stroke="#34d399" strokeWidth="2.5" fill="#047857" />
        <path d="M24 44 L30 30 L36 44 Z" fill="#a7f3d0" />
        <circle cx="30" cy="18" r="3" fill="#fef08a" />
      </svg>
    ),
  },
  {
    id: "p3",
    name: "Sumber Makmur Jaya Distrindo",
    tagline: "Distributor Bahan Bangunan & Toko Emas",
    category: "Toko & Retail",
    project: "Pintu Harmonika Super Heavy Plat 1.5mm",
    yearsPartnership: "Mitra Sejak 2020",
    logo: (
      <svg viewBox="0 0 60 60" className="w-12 h-12 shrink-0" fill="none">
        <rect width="60" height="60" rx="14" fill="#4c0519" stroke="#fbbf24" strokeWidth="2" />
        <circle cx="30" cy="30" r="18" stroke="#fcd34d" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M20 38 L24 24 L30 32 L36 24 L40 38" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="30" cy="22" r="2.5" fill="#f59e0b" />
      </svg>
    ),
  },
  {
    id: "p4",
    name: "Apotek 24 Jam Sehat Sentosa",
    tagline: "Jaringan Apotek & Klinik Terbuka",
    category: "Toko & Retail",
    project: "Pengadaan Pintu Harmonika 12 Cabang",
    yearsPartnership: "Mitra Sejak 2022",
    logo: (
      <svg viewBox="0 0 60 60" className="w-12 h-12 shrink-0" fill="none">
        <rect width="60" height="60" rx="14" fill="#042f2e" stroke="#2dd4bf" strokeWidth="2" />
        <circle cx="30" cy="30" r="19" stroke="#14b8a6" strokeWidth="1.5" opacity="0.6" />
        <rect x="25" y="18" width="10" height="24" rx="3" fill="#2dd4bf" />
        <rect x="18" y="25" width="24" height="10" rx="3" fill="#2dd4bf" />
        <circle cx="30" cy="30" r="3" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: "p5",
    name: "Surya Logistik Nusantara",
    tagline: "Kawasan Industri & Pergudangan Logistik",
    category: "Pergudangan",
    project: "8 Unit Pintu Gudang Bentang Lebar 9 Meter",
    yearsPartnership: "Mitra Sejak 2020",
    logo: (
      <svg viewBox="0 0 60 60" className="w-12 h-12 shrink-0" fill="none">
        <rect width="60" height="60" rx="14" fill="#0c1938" stroke="#f97316" strokeWidth="2" />
        <path d="M16 38 L30 20 L44 38 L37 38 L30 29 L23 38 Z" fill="#f97316" />
        <rect x="20" y="40" width="20" height="4" rx="2" fill="#38bdf8" />
        <circle cx="30" cy="18" r="3" fill="#fbbf24" />
      </svg>
    ),
  },
  {
    id: "p6",
    name: "Mitra Bangun Persada",
    tagline: "Biro Arsitektur & Perancang Properti",
    category: "Kontraktor",
    project: "Pemasangan Ruko Komersial 8 Pintu",
    yearsPartnership: "Mitra Sejak 2021",
    logo: (
      <svg viewBox="0 0 60 60" className="w-12 h-12 shrink-0" fill="none">
        <rect width="60" height="60" rx="14" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
        <path d="M30 15 L45 23 L45 40 L30 48 L15 40 L15 23 Z" stroke="#818cf8" strokeWidth="2" fill="#312e81" />
        <line x1="30" y1="15" x2="30" y2="48" stroke="#a5b4fc" strokeWidth="2" />
        <line x1="15" y1="23" x2="30" y2="31" stroke="#a5b4fc" strokeWidth="2" />
        <line x1="45" y1="23" x2="30" y2="31" stroke="#a5b4fc" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "p7",
    name: "Indo Prima Retail Mart",
    tagline: "Jaringan Toserba & Pusat Belanja",
    category: "Toko & Retail",
    project: "Pintu Harmonika Toko Retail & Kios Pasar",
    yearsPartnership: "Mitra Sejak 2023",
    logo: (
      <svg viewBox="0 0 60 60" className="w-12 h-12 shrink-0" fill="none">
        <rect width="60" height="60" rx="14" fill="#3f0e1d" stroke="#f43f5e" strokeWidth="2" />
        <path d="M16 22 L22 22 L27 38 L39 38 L43 27 L25 27" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="43" r="3" fill="#fde047" />
        <circle cx="38" cy="43" r="3" fill="#fde047" />
        <path d="M32 18 L34 22 L38 22 L35 24 L36 28 L32 25 L28 28 L29 24 L26 22 L30 22 Z" fill="#fde047" />
      </svg>
    ),
  },
  {
    id: "p8",
    name: "Mega Baja Steel Works",
    tagline: "Spesialis Konstruksi & Fabrikasi Baja",
    category: "Kontraktor",
    project: "Partner Penyediaan Plat SNI & Bearing",
    yearsPartnership: "Mitra Sejak 2018",
    logo: (
      <svg viewBox="0 0 60 60" className="w-12 h-12 shrink-0" fill="none">
        <rect width="60" height="60" rx="14" fill="#18181b" stroke="#eab308" strokeWidth="2" />
        <rect x="18" y="18" width="24" height="6" fill="#eab308" />
        <rect x="18" y="36" width="24" height="6" fill="#eab308" />
        <rect x="27" y="24" width="6" height="12" fill="#ca8a04" />
        <circle cx="30" cy="30" r="2.5" fill="#fef08a" />
        <path d="M16 30 L12 28 L14 30 L12 32 Z M44 30 L48 28 L46 30 L48 32 Z" fill="#fef08a" />
      </svg>
    ),
  },
];

export default function PartnerLogosSection({
  partners = defaultPartners,
  className = "",
}: {
  partners?: PartnerItem[];
  className?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = ["Semua", "Kontraktor", "Developer", "Toko & Retail", "Pergudangan"];

  const filteredPartners =
    selectedCategory === "Semua"
      ? partners
      : partners.filter((p) => p.category === selectedCategory);

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Title & Introduction Header */}
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-rose-200 pb-4 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-maroon-700 uppercase tracking-widest block mb-1">
                Kemitraan Strategis
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-maroon-800 border border-amber-400/40">
                <Sparkles className="w-3 h-3 mr-1 text-amber-500" />
                Logo Bergerak
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Mitra Kerja Sama & Klien Korporasi Terpercaya
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
              Telah dipercaya oleh puluhan kontraktor gedung, pengembang ruko perbelanjaan, dan kawasan pergudangan industri di seluruh Indonesia.
            </p>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <span className="text-xs text-slate-500 hidden sm:inline">
              * Arahkan kursor untuk menjeda putaran
            </span>
            <Link
              href="/kerjasama"
              className="inline-flex items-center text-xs sm:text-sm font-bold text-maroon-800 hover:text-red-700 transition-colors"
            >
              Ajukan Kerja Sama Mitra
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>

        {/* Filter Pills with smooth horizontal scrolling on mobile */}
        <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-2 pt-3 pb-1 -mx-1 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap min-h-[40px] flex items-center active:scale-95 ${
                selectedCategory === cat
                  ? "bg-maroon-800 text-white shadow-md shadow-maroon-900/30 border border-amber-400/40"
                  : "bg-white text-slate-600 hover:bg-rose-50 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CONTINUOUS MOVING LOGO MARQUEE (Animasi Bergerak) */}
      <div className="w-full overflow-hidden bg-gradient-to-r from-[#200308] via-[#140205] to-[#200308] py-6 sm:py-8 border-y-2 border-maroon-800 shadow-2xl relative group">
        
        {/* Subtle left & right gradient fade masks for smooth infinite ticker look */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#200308] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#200308] to-transparent z-10 pointer-events-none" />

        {/* Infinite Moving Marquee Ticker */}
        <div className="animate-marquee flex items-center">
          {/* We repeat the items 3 times for a seamless, infinite marquee loop */}
          {[...filteredPartners, ...filteredPartners, ...filteredPartners].map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="shrink-0 w-72 sm:w-84 md:w-96 mx-2.5 sm:mx-3.5 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-maroon-600/70 p-3.5 sm:p-4 shadow-xl hover:border-amber-400/80 hover:bg-white/15 transition-all duration-300 group/card cursor-default"
            >
              <div className="flex items-center space-x-3.5">
                {/* Vector Brand Logo */}
                <div className="p-1 rounded-2xl bg-black/40 border border-amber-400/40 shadow-md group-hover/card:scale-105 transition-transform shrink-0">
                  {partner.logo}
                </div>

                {/* Partner Information */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 truncate">
                      {partner.category}
                    </span>
                    <span className="text-[10px] text-rose-300/80 font-medium shrink-0">
                      {partner.yearsPartnership}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-white truncate group-hover/card:text-amber-300 transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-[11px] text-rose-200/80 truncate">
                    {partner.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom Proyek Detail Badge */}
              <div className="mt-3 pt-2.5 border-t border-maroon-800/80 flex items-center justify-between text-[11px]">
                <span className="text-rose-200/90 font-medium truncate flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 shrink-0" />
                  <span className="truncate">{partner.project}</span>
                </span>
                <span className="text-[10px] font-bold text-amber-400 shrink-0 ml-2">
                  ✓ Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
