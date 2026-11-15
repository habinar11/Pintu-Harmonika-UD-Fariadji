"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  ShieldCheck,
  MessageCircle,
  Lock,
  ChevronRight,
} from "lucide-react";
import { CompanySettings } from "@/lib/types";
import BrandLogo from "@/components/BrandLogo";

export default function Navbar({ settings }: { settings: CompanySettings }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Produk", href: "/produk" },
    { label: "Material", href: "/material" },
    { label: "List Project", href: "/project" },
    { label: "Profil Perusahaan", href: "/profil" },
    { label: "Testimoni", href: "/testimoni" },
    { label: "Kerja Sama", href: "/kerjasama" },
    { label: "Kontak", href: "/kontak" },
  ];

  const waUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    "Halo Admin " + settings.companyName + ", saya ingin konsultasi dan tanya harga pintu harmonika."
  )}`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      {/* Top microbar in rich dark maroon */}
      <div className="bg-gradient-to-r from-[#200308] via-[#150205] to-[#200308] text-slate-300 text-[11px] sm:text-xs py-2 px-3 sm:px-8 border-b border-maroon-900/40">
        <div className="w-full max-w-[1650px] mx-auto flex flex-wrap justify-between items-center gap-1.5 sm:gap-2">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="flex items-center text-amber-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-amber-400 shrink-0" />
              <span>Garansi Resmi {settings.warrantyYears} Thn</span>
            </span>
            <span className="hidden sm:inline text-maroon-800">|</span>
            <span className="hidden md:inline text-rose-200 truncate">
              Pabrik Spesialis Perakitan Pintu Harmonika SNI
            </span>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center text-slate-200 hover:text-amber-400 transition-colors font-medium py-0.5"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 text-rose-400 shrink-0" />
              <span>{settings.phone}</span>
            </a>
            <Link
              href="/admin"
              className="flex items-center text-slate-300 hover:text-amber-400 transition-colors pl-2.5 sm:pl-3 border-l border-maroon-800 py-0.5"
              title="Panel Kelola Konten / Admin"
            >
              <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 text-amber-400 shrink-0" />
              <span>{isAdmin ? "Admin" : "Login"}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="w-full max-w-[1650px] mx-auto px-3 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-18 sm:h-22 py-2">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center shrink-0 min-w-0 pr-2">
            <BrandLogo
              size="lg"
              companyName={settings.companyName}
              tagline="Spesialis Pintu Harmonika"
              logoUrl={settings.logoUrl}
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-0.5 2xl:space-x-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs 2xl:text-sm font-bold transition-all whitespace-nowrap min-h-[40px] flex items-center ${
                    isActive
                      ? "text-maroon-800 bg-rose-50 shadow-xs border border-rose-200/60"
                      : "text-slate-700 hover:text-maroon-800 hover:bg-rose-50/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA for Tablet and Desktop */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-700 via-maroon-800 to-red-800 hover:from-red-600 hover:to-maroon-700 shadow-md hover:shadow-xl hover:shadow-maroon-900/30 transition-all border border-amber-400/30 transform hover:-translate-y-0.5 whitespace-nowrap min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 mr-2 fill-white shrink-0" />
              Konsultasi WhatsApp
            </a>
          </div>

          {/* Mobile menu and fast action button */}
          <div className="flex xl:hidden items-center space-x-2 shrink-0">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-maroon-800 text-white hover:bg-maroon-900 shadow-md md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95 transition-transform"
              aria-label="WhatsApp UD.Fariadji"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-maroon-800 hover:bg-rose-50 transition-colors border border-slate-200 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
              aria-label={isOpen ? "Tutup Menu" : "Buka Menu"}
            >
              {isOpen ? <X className="w-6 h-6 text-maroon-800" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer with backdrop overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 top-[100px] sm:top-[112px] bg-black/50 backdrop-blur-xs z-40 xl:hidden animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-50 xl:hidden bg-white border-b border-rose-100 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-112px)] overflow-y-auto">
            <div className="grid gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold min-h-[48px] active:scale-98 transition-all ${
                      isActive
                        ? "bg-rose-50 text-maroon-800 border border-rose-200"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100 space-y-2.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-700 to-maroon-800 hover:from-red-600 hover:to-maroon-700 shadow-md min-h-[48px] active:scale-98 transition-transform"
              >
                <MessageCircle className="w-4 h-4 mr-2 fill-white" />
                Konsultasi WhatsApp Sekarang
              </a>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 min-h-[44px]"
              >
                <Lock className="w-4 h-4 mr-2 text-maroon-800" />
                Kelola Website (Admin Panel)
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
