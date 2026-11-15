import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { CompanySettings } from "@/lib/types";
import BrandLogo from "@/components/BrandLogo";

export default function Footer({ settings }: { settings: CompanySettings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#120205] text-slate-300 pt-16 pb-12 border-t-2 border-maroon-900">
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-maroon-900/60">
          {/* Column 1: Company Profile Info */}
          <div className="space-y-4">
            <BrandLogo
              size="md"
              companyName={settings.companyName}
              tagline="Fabrikasi Pintu Harmonika"
              logoUrl={settings.logoUrl}
            />
            <p className="text-sm text-rose-100/80 leading-relaxed pt-2">
              {settings.tagline}. Melayani pesanan pintu harmonika berkualitas tinggi dengan material baja SNI asli, rakitan presisi, dan garansi resmi.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs text-amber-300 bg-maroon-950/80 border border-amber-400/40 px-3 py-2.5 rounded-xl shadow-md">
              <Shield className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Garansi Perbaikan & Servis Resmi {settings.warrantyYears} Tahun</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-white text-base font-extrabold mb-4 tracking-wide border-l-4 border-rose-600 pl-3">
              Halaman Utama
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-rose-300 transition-colors flex items-center">
                  <span className="text-rose-500 mr-2">›</span> Beranda
                </Link>
              </li>
              <li>
                <Link href="/produk" className="hover:text-rose-300 transition-colors flex items-center">
                  <span className="text-rose-500 mr-2">›</span> Katalog Produk
                </Link>
              </li>
              <li>
                <Link href="/material" className="hover:text-rose-300 transition-colors flex items-center">
                  <span className="text-rose-500 mr-2">›</span> Spesifikasi Material
                </Link>
              </li>
              <li>
                <Link href="/project" className="hover:text-rose-300 transition-colors flex items-center">
                  <span className="text-rose-500 mr-2">›</span> Galeri List Project
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-rose-300 transition-colors flex items-center">
                  <span className="text-rose-500 mr-2">›</span> Profil Perusahaan
                </Link>
              </li>
              <li>
                <Link href="/testimoni" className="hover:text-rose-300 transition-colors flex items-center">
                  <span className="text-rose-500 mr-2">›</span> Testimoni Klien
                </Link>
              </li>
              <li>
                <Link href="/kerjasama" className="hover:text-rose-300 transition-colors flex items-center">
                  <span className="text-rose-500 mr-2">›</span> Kerja Sama Kontraktor
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-rose-300 transition-colors flex items-center">
                  <span className="text-rose-500 mr-2">›</span> Hubungi Kami & Peta
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Jam Kerja & Jaminan */}
          <div>
            <h3 className="text-white text-base font-extrabold mb-4 tracking-wide border-l-4 border-rose-600 pl-3">
              Keunggulan Layanan
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2.5 mt-0.5 shrink-0" />
                <span>Bebas Biaya Survey Lokasi & Konsultasi Ukuran</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2.5 mt-0.5 shrink-0" />
                <span>Plat Daun SNI Murni (Anti Plat Banci)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2.5 mt-0.5 shrink-0" />
                <span>Roda Double Bearing Jepang (Enteng Ditarik)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2.5 mt-0.5 shrink-0" />
                <span>Kunci Pengaman Anti Linggis & Cairan Kimia</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2.5 mt-0.5 shrink-0" />
                <span>Pemasangan Cepat, Rapi & Bergaransi</span>
              </li>
            </ul>
            <div className="mt-5 p-3.5 rounded-2xl bg-maroon-950/70 border border-maroon-800 text-xs">
              <div className="flex items-center text-rose-300 mb-1">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                <span className="font-bold">Jam Operasional:</span>
              </div>
              <p className="text-slate-200 font-medium">{settings.workingHours}</p>
            </div>
          </div>

          {/* Column 4: Contact & Workshop */}
          <div>
            <h3 className="text-white text-base font-extrabold mb-4 tracking-wide border-l-4 border-rose-600 pl-3">
              Kontak & Workshop
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-rose-400 mt-1 shrink-0" />
                <span className="text-slate-300">{settings.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <a
                href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
                  "Halo " + settings.companyName + ", saya ingin tanya produk pintu harmonika."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-4 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-700 to-maroon-900 hover:from-red-600 hover:to-maroon-800 transition-all shadow-lg border border-amber-400/30 min-h-[48px] active:scale-98"
              >
                Chat WhatsApp CS 24 Jam
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & admin link */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-rose-300/60 gap-4">
          <p>
            © {currentYear} {settings.companyName}. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className="flex items-center text-slate-400 hover:text-amber-400 transition-colors"
            >
              <Lock className="w-3 h-3 mr-1" />
              <span>Kelola Website (Admin Panel)</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
