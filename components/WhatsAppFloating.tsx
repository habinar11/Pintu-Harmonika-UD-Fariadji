"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFloating({
  phone,
  companyName,
}: {
  phone: string;
  companyName: string;
}) {
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    `Halo Admin ${companyName}, saya ingin konsultasi mengenai pembuatan pintu harmonika.`
  )}`;

  return (
    <aside aria-label="Kontak Cepat WhatsApp" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center space-x-3 group">
      <div className="hidden sm:block bg-slate-900 text-white text-xs font-semibold py-2 px-3.5 rounded-xl shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Konsultasi & Survey Gratis via WhatsApp
      </div>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group-hover:shadow-emerald-500/50 touch-manipulation"
        aria-label="Hubungi kami di WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-300 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
      </a>
    </aside>
  );
}
