"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Eye,
} from "lucide-react";
import { CompanySettings } from "@/lib/types";

interface HarmonikaOpeningPopupProps {
  settings: CompanySettings;
}

export default function HarmonikaOpeningPopup({
  settings,
}: HarmonikaOpeningPopupProps) {
  const [isOpen, setIsOpen] = useState(false); // Modal visibility
  const [isDoorOpen, setIsDoorOpen] = useState(false); // Gate open/close state
  const [isAnimating, setIsAnimating] = useState(false);

  // Automatically trigger popup on page load
  useEffect(() => {
    // Show modal immediately on first mount
    const timer = setTimeout(() => {
      setIsOpen(true);
      // Doors start closed, then open after 600ms for a dramatic entrance
      const doorTimer = setTimeout(() => {
        setIsDoorOpen(true);
      }, 700);
      return () => clearTimeout(doorTimer);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleReplay = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    // Close the doors first
    setIsDoorOpen(false);

    // After closing transition, open them again
    setTimeout(() => {
      setIsDoorOpen(true);
      setIsAnimating(false);
    }, 1100);
  };

  const waUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Halo Admin ${settings.companyName}, saya tertarik dengan promo pintu harmonika yang kuat dan awet. Mohon info estimasi harga dan jadwal konsultasi / survey.`
  )}`;

  return (
    <>
      {/* Floating trigger button in bottom-left for visitors to reopen animation anytime */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsDoorOpen(false);
            setTimeout(() => setIsDoorOpen(true), 600);
          }}
          className="fixed bottom-6 left-6 z-40 flex items-center space-x-2.5 bg-gradient-to-r from-maroon-900 via-red-800 to-maroon-950 text-white px-4 py-3 rounded-full shadow-2xl border-2 border-amber-400/60 hover:scale-105 transition-all text-xs font-bold group"
          title="Buka Animasi Pintu Harmonika"
        >
          <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/60 flex items-center justify-center text-amber-300">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </div>
          <span>✦ Pintu Harmonika Interaktif</span>
        </button>
      )}

      {/* POPUP MODAL OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-300">
          {/* Main Card Container */}
          <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#24040a] via-[#160206] to-[#0e0104] rounded-3xl border-2 border-maroon-600/80 shadow-[0_0_60px_rgba(190,18,60,0.35)] overflow-hidden flex flex-col">
            
            {/* Top Bar of the Modal */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-black/50 border-b border-maroon-800/80 z-30">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-3.5" />
                <span className="text-xs font-extrabold text-amber-300 tracking-wider uppercase">
                  Simulasi Pintu Harmonika Double
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-maroon-900/80 border border-amber-400/30 text-[10px] font-bold text-rose-200">
                  {isDoorOpen ? "Bukaan Ganda Terbuka" : "Pintu Tertutup Rapat"}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                {/* Replay door animation button */}
                <button
                  type="button"
                  onClick={handleReplay}
                  disabled={isAnimating}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-rose-200 border border-rose-400/30 transition-all hover:text-white"
                  title="Putar Ulang Animasi Buka Tutup"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isAnimating ? "animate-spin" : ""}`} />
                  <span className="hidden sm:inline">Putar Ulang</span>
                </button>

                {/* Close modal button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-red-600 text-rose-200 hover:text-white transition-colors"
                  aria-label="Tutup Pop Up"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* INTERACTIVE STAGE: The Pintu Harmonika Opening Scene */}
            <div className="relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center p-4 sm:p-8 overflow-hidden">
              
              {/* BACKSTAGE CONTENT (Terungkap saat pintu harmonika double terbuka) */}
              <div
                className={`relative z-10 w-full max-w-2xl mx-auto text-center space-y-5 transition-all duration-1000 ${
                  isDoorOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                }`}
              >
                {/* Gold Highlight Badge */}
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border border-amber-400/50 shadow-lg text-amber-300 text-xs font-extrabold tracking-widest uppercase animate-pulse">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>PABRIK & SPESIALIS PINTU HARMONIKA PRESISI</span>
                </div>

                {/* Company Logo Badge with new uploaded circular logo */}
                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-3.5 bg-gradient-to-r from-maroon-950/90 via-black/80 to-maroon-950/90 px-6 py-2.5 rounded-2xl border-2 border-amber-400/40 shadow-xl">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-amber-400 p-0.5 flex items-center justify-center shadow-lg overflow-hidden shrink-0">
                      <img
                        src={settings.logoUrl || "/images/company-logo.png"}
                        alt={settings.companyName}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none">
                        {settings.companyName}
                      </h3>
                      <span className="text-[11px] text-amber-400 font-bold tracking-wide">
                        STANDAR SNI • DOUBLE BEARING
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Headline Requested */}
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] drop-shadow-md">
                  Butuh Pintu Harmonika yang <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 bg-clip-text text-transparent">Kuat dan Awet?</span>
                </h2>

                {/* Subtitle Description Requested */}
                <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed max-w-xl mx-auto">
                  Produksi, pemasangan, dan konsultasi pintu harmonika sesuai kebutuhan bangunan Anda.
                </p>

                {/* 3 Pillars / Quality Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 max-w-lg mx-auto text-left">
                  <div className="flex items-center space-x-2 bg-white/5 border border-rose-900/50 px-3 py-2 rounded-xl text-xs text-rose-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold">Plat Tebal SNI Asli</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/5 border border-rose-900/50 px-3 py-2 rounded-xl text-xs text-rose-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold">Roda Double Bearing</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/5 border border-rose-900/50 px-3 py-2 rounded-xl text-xs text-rose-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold">Garansi Servis 5 Thn</span>
                  </div>
                </div>

                {/* Action Buttons: Konsultasi Sekarang */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl text-base font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-xl shadow-amber-500/20 border-2 border-amber-200 hover:scale-[1.03] transition-all"
                  >
                    <MessageCircle className="w-5 h-5 mr-2.5 fill-slate-950" />
                    Konsultasi Sekarang
                  </a>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-2xl text-sm font-bold text-rose-100 bg-white/10 hover:bg-white/15 border border-rose-400/30 transition-all hover:text-white"
                  >
                    Masuk ke Website
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>

              {/* ======================================================== */}
              {/* THE DOUBLE PINTU HARMONIKA SLIDING MECHANISM OVERLAY     */}
              {/* ======================================================== */}
              
              {/* Top Rail Guide (Rel Atas) */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-b border-amber-400/40 z-25 flex items-center justify-between px-4 shadow-md">
                <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-600" />
                <div className="h-1.5 w-full mx-4 bg-slate-950 rounded-full" />
                <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-600" />
              </div>

              {/* Bottom Track (Rel Bawah Tanam) */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-slate-950 via-slate-800 to-slate-700 border-t border-amber-400/40 z-25 flex items-center justify-between px-4 shadow-inner">
                <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-600" />
                <div className="h-1.5 w-full mx-4 bg-slate-950 rounded-full" />
                <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-600" />
              </div>

              {/* LEFT FOLDING WING (Sayap Kiri - Melipat & Bergeser ke Kiri) */}
              <div
                className={`absolute top-6 bottom-6 left-0 w-1/2 z-20 transition-all duration-[1300ms] cubic-bezier(0.25, 1, 0.5, 1) origin-left flex ${
                  isDoorOpen
                    ? "-translate-x-[75%] sm:-translate-x-[78%] scale-x-[0.25] opacity-90 shadow-2xl"
                    : "translate-x-0 scale-x-100 opacity-100 shadow-xl"
                }`}
                style={{
                  perspective: "1000px",
                }}
              >
                {/* Visual Slats & Scissor Lattice for Left Door */}
                <div className="relative w-full h-full flex bg-gradient-to-r from-[#32040b] via-[#4c0519] to-[#3a050f] border-r-4 border-amber-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-hidden">
                  {/* Left Jamb Stiffener */}
                  <div className="w-6 h-full bg-gradient-to-r from-slate-800 to-slate-900 border-r border-slate-700 shrink-0" />

                  {/* 5 Interconnected Slats */}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-full border-r border-maroon-900/80 relative flex items-center justify-center bg-gradient-to-r from-maroon-900 via-rose-950 to-maroon-900"
                    >
                      {/* Vertical UNP rib profile */}
                      <div className="w-2.5 h-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 shadow-md" />

                      {/* Top, Mid, Bottom Rivets */}
                      <div className="absolute top-8 w-2 h-2 rounded-full bg-amber-400 shadow-sm border border-amber-200" />
                      <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm border border-amber-200" />
                      <div className="absolute bottom-8 w-2 h-2 rounded-full bg-amber-400 shadow-sm border border-amber-200" />
                    </div>
                  ))}

                  {/* Accordion Scissor Lattice (Silangan Harmonika Kuningan) */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                  >
                    <path
                      d="M0 20 L25 35 L50 20 L75 35 L100 20 M0 35 L25 20 L50 35 L75 20 L100 35 M0 50 L25 65 L50 50 L75 65 L100 50 M0 65 L25 50 L50 65 L75 50 L100 65 M0 80 L25 95 L50 80 L75 95 L100 80 M0 95 L25 80 L50 95 L75 80 L100 95"
                      stroke="#fcd34d"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>

                  {/* Left Master Lock Pillar / Tiang Kunci */}
                  <div className="w-9 h-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 border-l border-amber-400 flex flex-col justify-center items-center shrink-0 relative">
                    <div className="w-6 h-16 rounded-md bg-slate-950 border border-amber-400/60 shadow-lg flex flex-col items-center justify-center space-y-2">
                      <div className="w-2.5 h-6 rounded-full bg-amber-400/80 shadow-inner" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT FOLDING WING (Sayap Kanan - Melipat & Bergeser ke Kanan) */}
              <div
                className={`absolute top-6 bottom-6 right-0 w-1/2 z-20 transition-all duration-[1300ms] cubic-bezier(0.25, 1, 0.5, 1) origin-right flex ${
                  isDoorOpen
                    ? "translate-x-[75%] sm:translate-x-[78%] scale-x-[0.25] opacity-90 shadow-2xl"
                    : "translate-x-0 scale-x-100 opacity-100 shadow-xl"
                }`}
                style={{
                  perspective: "1000px",
                }}
              >
                {/* Visual Slats & Scissor Lattice for Right Door */}
                <div className="relative w-full h-full flex bg-gradient-to-r from-[#3a050f] via-[#4c0519] to-[#32040b] border-l-4 border-amber-400 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-hidden">
                  {/* Right Master Strike Pillar / Tiang Kunci Temu */}
                  <div className="w-9 h-full bg-gradient-to-r from-slate-950 via-slate-800 to-slate-900 border-r border-amber-400 flex flex-col justify-center items-center shrink-0 relative">
                    <div className="w-6 h-16 rounded-md bg-slate-950 border border-amber-400/60 shadow-lg flex flex-col items-center justify-center space-y-2">
                      <div className="w-2.5 h-6 rounded-full bg-amber-400/80 shadow-inner" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    </div>
                  </div>

                  {/* 5 Interconnected Slats */}
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-full border-r border-maroon-900/80 relative flex items-center justify-center bg-gradient-to-r from-maroon-900 via-rose-950 to-maroon-900"
                    >
                      {/* Vertical UNP rib profile */}
                      <div className="w-2.5 h-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 shadow-md" />

                      {/* Top, Mid, Bottom Rivets */}
                      <div className="absolute top-8 w-2 h-2 rounded-full bg-amber-400 shadow-sm border border-amber-200" />
                      <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm border border-amber-200" />
                      <div className="absolute bottom-8 w-2 h-2 rounded-full bg-amber-400 shadow-sm border border-amber-200" />
                    </div>
                  ))}

                  {/* Accordion Scissor Lattice (Silangan Harmonika Kuningan) */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                  >
                    <path
                      d="M0 20 L25 35 L50 20 L75 35 L100 20 M0 35 L25 20 L50 35 L75 20 L100 35 M0 50 L25 65 L50 50 L75 65 L100 50 M0 65 L25 50 L50 65 L75 50 L100 65 M0 80 L25 95 L50 80 L75 95 L100 80 M0 95 L25 80 L50 95 L75 80 L100 95"
                      stroke="#fcd34d"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>

                  {/* Right Jamb Stiffener */}
                  <div className="w-6 h-full bg-gradient-to-r from-slate-900 to-slate-800 border-l border-slate-700 shrink-0" />
                </div>
              </div>

              {/* Status Clickable Hint on the Closed Door */}
              {!isDoorOpen && (
                <div
                  onClick={() => setIsDoorOpen(true)}
                  className="absolute z-25 inset-0 flex items-center justify-center cursor-pointer group"
                >
                  <div className="bg-black/90 text-amber-300 px-6 py-3 rounded-2xl border-2 border-amber-400 font-black text-sm tracking-wide shadow-2xl flex items-center space-x-2.5 group-hover:scale-105 transition-transform animate-bounce">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Klik Untuk Buka Pintu Harmonika</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer strip of the modal */}
            <div className="px-6 py-3 bg-black/60 border-t border-maroon-900/60 flex flex-wrap justify-between items-center text-xs text-rose-300/80 gap-2">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Pabrikasi Resmi Bergaransi {settings.warrantyYears} Tahun</span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="hover:text-amber-400 transition-colors font-semibold"
              >
                ✕ Tutup Tampilan Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
