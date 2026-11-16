"use client";

import React from "react";

export interface ClientLogo {
  id: string;
  name: string;
  logo: React.ReactNode;
}

export const clientLogos: ClientLogo[] = [
  {
    id: "ugm",
    name: "Universitas Gadjah Mada (UGM)",
    logo: (
      <svg viewBox="0 0 100 100" className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-sm" fill="none">
        {/* Outer lotus petals (embossed cream & gold) */}
        <circle cx="50" cy="50" r="46" fill="#fef08a" opacity="0.3" />
        <path
          d="M50 4 L56 22 L72 10 L68 28 L86 26 L74 40 L92 48 L76 58 L90 70 L72 74 L78 92 L60 84 L50 98 L40 84 L22 78 L28 74 L10 70 L24 58 L8 48 L26 40 L14 26 L32 28 L28 10 L44 22 Z"
          fill="#fef9c3"
          stroke="#ca8a04"
          strokeWidth="1.5"
        />
        {/* Inner concentric ring */}
        <circle cx="50" cy="50" r="32" fill="#854d0e" stroke="#eab308" strokeWidth="2" />
        <circle cx="50" cy="50" r="28" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
        {/* Inner emblem rays */}
        <circle cx="50" cy="50" r="18" fill="#ca8a04" />
        <circle cx="50" cy="50" r="12" fill="#78350f" />
        <circle cx="50" cy="50" r="6" fill="#fef08a" />
        {/* Text ring simulation */}
        <circle cx="50" cy="50" r="23" stroke="#854d0e" strokeWidth="1.2" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    id: "pupr",
    name: "Kementerian Pekerjaan Umum dan Perumahan Rakyat (PUPR)",
    logo: (
      <svg viewBox="0 0 100 100" className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-sm" fill="none">
        {/* Yellow square background */}
        <rect width="100" height="100" rx="6" fill="#facc15" />
        {/* Blue PU logo graphic */}
        <path
          d="M20 20 H50 C66 20 78 30 78 46 C78 62 66 72 50 72 H38 V80 H20 Z"
          fill="#1e3a8a"
        />
        <circle cx="48" cy="46" r="14" fill="#facc15" />
        <rect x="20" y="36" width="16" height="44" fill="#1e3a8a" />
        <path
          d="M62 46 C62 55 54 62 45 62 C36 62 30 55 30 46 C30 37 36 30 45 30 C54 30 62 37 62 46 Z"
          fill="#1e3a8a"
        />
        <circle cx="45" cy="46" r="8" fill="#facc15" />
        {/* Right leg */}
        <path d="M72 55 V80 H60 V55 Z" fill="#1e3a8a" />
      </svg>
    ),
  },
  {
    id: "ugm-residence",
    name: "UGM Residence",
    logo: (
      <svg viewBox="0 0 100 100" className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-sm" fill="none">
        {/* Circular blue badge */}
        <circle cx="50" cy="50" r="47" fill="#0f4c81" stroke="#38bdf8" strokeWidth="2.5" />
        {/* Modern roof silhouette gradient */}
        <path
          d="M16 62 Q50 30 84 62 L80 66 Q50 38 20 66 Z"
          fill="#38bdf8"
        />
        <path
          d="M26 58 Q50 36 74 58 L71 62 Q50 42 29 62 Z"
          fill="#bae6fd"
        />
        {/* White typography */}
        <text
          x="50"
          y="72"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="14"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1"
        >
          UGM
        </text>
        <text
          x="50"
          y="83"
          textAnchor="middle"
          fill="#7dd3fc"
          fontSize="7"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1.5"
        >
          RESIDENCE
        </text>
      </svg>
    ),
  },
  {
    id: "wika-adhibumn",
    name: "PT Wijaya Karya (WIKA) & BUMN Konstruksi",
    logo: (
      <svg viewBox="0 0 100 100" className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-sm" fill="none">
        {/* Stylized geometric gold corporate emblem */}
        <path
          d="M20 20 H48 L36 80 H20 Z"
          fill="#eab308"
        />
        <path
          d="M48 20 H80 L68 80 H50 Z"
          fill="#ca8a04"
        />
        <path
          d="M38 42 H65 L60 62 H34 Z"
          fill="#fef08a"
        />
        <path
          d="M45 28 L72 28 L66 52 L50 52 Z"
          fill="#a16207"
          opacity="0.85"
        />
      </svg>
    ),
  },
  {
    id: "bca",
    name: "Bank Central Asia (BCA)",
    logo: (
      <svg viewBox="0 0 120 100" className="h-16 w-20 sm:h-20 sm:w-24 object-contain drop-shadow-sm" fill="none">
        {/* BCA Classic Blue Rounded Shield */}
        <rect x="10" y="15" width="100" height="70" rx="18" fill="#0060af" />
        <text
          x="60"
          y="58"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="24"
          fontWeight="900"
          fontFamily="Arial, sans-serif"
          letterSpacing="1.5"
        >
          BCA
        </text>
      </svg>
    ),
  },
  {
    id: "mandiri",
    name: "Bank Mandiri",
    logo: (
      <svg viewBox="0 0 120 100" className="h-16 w-20 sm:h-20 sm:w-24 object-contain drop-shadow-sm" fill="none">
        <rect x="5" y="15" width="110" height="70" rx="14" fill="#003d79" />
        {/* Golden ribbon arch */}
        <path
          d="M20 62 C45 35 75 35 100 62"
          stroke="#f59e0b"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <text
          x="60"
          y="54"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="14"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          mandiri
        </text>
      </svg>
    ),
  },
  {
    id: "adhi-karya",
    name: "PT Adhi Karya (Persero) Tbk",
    logo: (
      <svg viewBox="0 0 100 100" className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-sm" fill="none">
        {/* Red circular construction crest */}
        <circle cx="50" cy="50" r="44" fill="#dc2626" />
        <path
          d="M50 18 L76 74 H60 L50 50 L40 74 H24 Z"
          fill="#ffffff"
        />
        <circle cx="50" cy="38" r="4.5" fill="#dc2626" />
      </svg>
    ),
  },
  {
    id: "pt-pp",
    name: "PT PP (Persero) Tbk Konstruksi",
    logo: (
      <svg viewBox="0 0 100 100" className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-sm" fill="none">
        <rect width="100" height="100" rx="16" fill="#1e293b" />
        <circle cx="36" cy="50" r="18" fill="#e11d48" />
        <circle cx="64" cy="50" r="18" fill="#2563eb" />
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="18"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          PP
        </text>
      </svg>
    ),
  },
  {
    id: "indomaret",
    name: "Indomaret / Retail Network",
    logo: (
      <svg viewBox="0 0 110 100" className="h-16 w-20 sm:h-20 sm:w-24 object-contain drop-shadow-sm" fill="none">
        <rect x="5" y="20" width="100" height="60" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
        <rect x="5" y="20" width="100" height="18" fill="#dc2626" rx="8" />
        <rect x="5" y="38" width="100" height="24" fill="#2563eb" />
        <rect x="5" y="62" width="100" height="18" fill="#facc15" rx="8" />
        <text
          x="55"
          y="55"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="11"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          letterSpacing="1"
        >
          INDOMARET
        </text>
      </svg>
    ),
  },
  {
    id: "ciputra",
    name: "Ciputra Group / Commercial Property",
    logo: (
      <svg viewBox="0 0 100 100" className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-sm" fill="none">
        <circle cx="50" cy="50" r="44" fill="#047857" />
        <circle cx="50" cy="50" r="38" stroke="#fef08a" strokeWidth="2" fill="none" />
        <path
          d="M50 24 L60 44 L40 44 Z M35 50 L65 50 L50 78 Z"
          fill="#fef08a"
        />
        <text
          x="50"
          y="90"
          textAnchor="middle"
          fill="#065f46"
          fontSize="8"
          fontWeight="bold"
        >
          CIPUTRA
        </text>
      </svg>
    ),
  },
];

export default function PartnerLogosSection({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`w-full py-10 sm:py-14 bg-white ${className}`}>
      {/* Centered Clean Header (Persis seperti Gambar 4) */}
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          Klien Kami
        </h2>
        {/* Accent Underline Bar Hijau/Emerald seperti Gambar 4 */}
        <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full mt-2.5 mb-3" />
        <p className="text-slate-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Banyak perusahaan dan institusi yang telah mempercayakan kebutuhan pintu harmonika dan keamanan propertinya kepada UD.Fariadji.
        </p>
      </div>

      {/* CONTINUOUS MOVING LOGO MARQUEE (Hanya Logo & Animasi Bergerak Murni) */}
      <div className="w-full overflow-hidden py-4 sm:py-6 relative group">
        {/* Subtle left & right gradient fade masks for smooth seamless looping */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Infinite Moving Marquee Ticker */}
        <div className="animate-marquee flex items-center">
          {/* Repeated 3 times for a completely seamless, infinite animation loop */}
          {[...clientLogos, ...clientLogos, ...clientLogos].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="shrink-0 mx-6 sm:mx-10 md:mx-14 flex items-center justify-center p-2 hover:scale-110 transition-transform duration-300 cursor-default"
              title={item.name}
            >
              {item.logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
