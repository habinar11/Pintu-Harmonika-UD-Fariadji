import Link from "next/link";
import {
  ShieldCheck,
  Wrench,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageCircle,
  PhoneCall,
  Sparkles,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { getSettings, getProducts, getProjects, getTestimonials } from "@/lib/db";
import PriceCalculator from "@/components/PriceCalculator";
import BrandLogo from "@/components/BrandLogo";
import DynamicTestimonialsSection from "@/components/DynamicTestimonialsSection";
import HeroImage from "@/components/HeroImage";

// Ensure fresh dynamic rendering on every edit
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const settings = await getSettings();
  const products = await getProducts();
  const projects = await getProjects();
  const testimonials = await getTestimonials();

  const featuredProjects = projects.slice(0, 4);

  const waUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Halo Admin ${settings.companyName}, saya ingin konsultasi gratis dan jadwalkan survey lokasi untuk pemasangan pintu harmonika.`
  )}`;

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION: Rich Deep Red Maroon Palette with Prominent Full-Width Brand Logo */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#2a040b] via-[#1b0307] to-[#120205] text-white pt-8 pb-20 sm:pt-12 sm:pb-28">
        {/* Subtle decorative lighting glow - pure radial gradient with zero GPU blur filters for jitter-free scrolling */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-700/20 via-maroon-950/40 to-transparent pointer-events-none" />

        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-10">
          {/* PROMINENT FULL-WIDTH LARGE LOGO (TERPAMPANG JELAS & FULL LEBAR) */}
          <div className="w-full">
            <BrandLogo
              size="hero"
              companyName={settings.companyName}
              tagline={settings.tagline}
              logoUrl={settings.logoUrl}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-2">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-950/90 to-maroon-900/90 border border-amber-400/50 px-4 py-2 rounded-full text-xs font-bold text-amber-300 shadow-lg">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{settings.heroBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
                {settings.heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-rose-100/90 leading-relaxed max-w-2xl">
                {settings.heroSubtitle}
              </p>

              {/* Action Buttons in Red Maroon & Emerald */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-red-700 via-maroon-700 to-red-800 hover:from-red-600 hover:to-maroon-700 shadow-xl shadow-red-950/60 border border-amber-400/40 hover:scale-[1.02] active:scale-98 transition-all min-h-[48px]"
                >
                  <MessageCircle className="w-5 h-5 mr-2.5 fill-white shrink-0" />
                  Konsultasi & Free Survey via WhatsApp
                </a>

                <Link
                  href="/produk"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-bold text-rose-100 bg-white/10 hover:bg-white/15 border border-rose-400/30 transition-all hover:text-white min-h-[48px]"
                >
                  Lihat Katalog Produk
                  <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-maroon-900/70 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-rose-900/40">
                  <div className="text-xl sm:text-3xl font-black text-amber-400">
                    {settings.yearsExperience}+ Thn
                  </div>
                  <div className="text-[11px] sm:text-xs text-rose-200 mt-0.5 font-medium">Pengalaman Fabrikasi</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-rose-900/40">
                  <div className="text-xl sm:text-3xl font-black text-rose-300">
                    {settings.completedProjects.toLocaleString("id-ID")}+
                  </div>
                  <div className="text-[11px] sm:text-xs text-rose-200 mt-0.5 font-medium">Pintu Terpasang</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-rose-900/40">
                  <div className="text-xl sm:text-3xl font-black text-emerald-400">
                    {settings.warrantyYears} Tahun
                  </div>
                  <div className="text-[11px] sm:text-xs text-rose-200 mt-0.5 font-medium">Garansi Servis Resmi</div>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-rose-900/40">
                  <div className="text-xl sm:text-3xl font-black text-amber-300">
                    100% SNI
                  </div>
                  <div className="text-[11px] sm:text-xs text-rose-200 mt-0.5 font-medium">Baja Murni Pilihan</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card with dynamic workshop image & resilient SVG fallback */}
            <div className="lg:col-span-5 relative">
              <HeroImage
                src={settings.workshopImage}
                alt={`Fabrikasi Pintu Harmonika Presisi ${settings.companyName}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* KEUNGGULAN UTAMA (6 PILLARS OF EXCELLENCE) */}
      <section className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold text-maroon-700 uppercase tracking-widest block mb-2">
            Mengapa Memilih Kami?
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kualitas Tanpa Kompromi, Keamanan Maksimal
          </h2>
          <p className="text-slate-600 text-xs sm:text-base mt-2 sm:mt-3 leading-relaxed">
            Banyak pintu harmonika di pasaran menggunakan bahan tipis (banci) yang cepat melengkung dan macet. Di {settings.companyName}, kami memegang standar mutu tertinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:border-maroon-300 transition-all group">
            <div className="w-12 h-12 bg-rose-50 text-maroon-700 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-maroon-800 group-hover:text-white transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Bahan Plat SNI Tebal Murni
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Kami menjamin ketebalan plat daun dan plat silangan 100% murni sesuai surat penawaran, tidak dicampur dengan plat kaleng atau banci yang mudah dibobol.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:border-maroon-300 transition-all group">
            <div className="w-12 h-12 bg-rose-50 text-maroon-700 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-maroon-800 group-hover:text-white transition-colors">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Double Bearing Jepang (Enteng Ditarik)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Menggunakan bearing baja berkualitas tinggi dengan penutup segel debu. Pintu dapat dibuka-tutup dengan satu tangan secara halus dan tidak berisik.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:border-maroon-300 transition-all group">
            <div className="w-12 h-12 bg-rose-50 text-maroon-700 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-maroon-800 group-hover:text-white transition-colors">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Garansi Servis Hingga {settings.warrantyYears} Tahun
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Jaminan ketenangan pikiran. Tim teknisi servis kami siap sedia merespons cepat jika pintu Anda membutuhkan penyetelan rel atau pelumasan berkala.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:border-maroon-300 transition-all group">
            <div className="w-12 h-12 bg-rose-50 text-maroon-700 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-maroon-800 group-hover:text-white transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Cat Meni Epoxy & Finishing Oven
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sistem pelapisan multi-layer: cairan primer meni anti-korosi dilanjutkan cat oven kilap/matte yang tahan terhadap panas terik dan curah hujan tropis.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:border-maroon-300 transition-all group">
            <div className="w-12 h-12 bg-rose-50 text-maroon-700 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-maroon-800 group-hover:text-white transition-colors">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Produksi Cepat & Pemasangan Presisi
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dikerjakan langsung di workshop sendiri oleh tukang las dan mekanik ahli berpengalaman belasan tahun. Waktu pengerjaan disiplin tepat waktu.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:shadow-xl hover:border-maroon-300 transition-all group">
            <div className="w-12 h-12 bg-rose-50 text-maroon-700 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-maroon-800 group-hover:text-white transition-colors">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Gratis Biaya Survey & Konsultasi
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tim teknisi kami siap datang langsung ke lokasi Anda untuk mengukur lebar dan tinggi opening serta memberikan saran tipe pintu terbaik tanpa biaya.
            </p>
          </div>
        </div>
      </section>

      {/* KALKULATOR ESTIMASI BIAYA SECTION */}
      <section className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <PriceCalculator products={products} settings={settings} />
      </section>

      {/* PRODUK UNGGULAN SECTION */}
      <section className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-maroon-700 uppercase tracking-widest block mb-1">
              Katalog Pilihan
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pilihan Tipe Pintu Harmonika
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl">
              Tersedia beragam varian ketebalan plat dan spesifikasi yang dapat disesuaikan dengan kebutuhan proteksi dan anggaran Anda.
            </p>
          </div>
          <Link
            href="/produk"
            className="inline-flex items-center text-sm font-bold text-maroon-800 hover:text-red-700 transition-colors"
          >
            Lihat Semua Produk & Spesifikasi Lengkap
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {products.map((p) => {
            const productWaUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
              `Halo Admin ${settings.companyName}, saya tertarik memesan "${p.name}". Mohon informasi harga dan jadwal survey.`
            )}`;

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-maroon-300"
              >
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-red-700 to-maroon-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md border border-amber-400/30">
                      {p.badge}
                    </span>
                  )}
                  <div className="absolute bottom-2 right-2 bg-maroon-950/90 backdrop-blur-xs text-amber-300 text-xs font-extrabold px-3 py-1 rounded-xl border border-amber-400/20">
                    {p.priceDisplay}
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base mb-1.5 sm:mb-2 group-hover:text-maroon-800 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3 sm:mb-4 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-700 bg-rose-50/50 p-2.5 sm:p-3 rounded-2xl border border-rose-100 mb-3 sm:mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Tebal Daun:</span>
                        <span className="font-bold text-maroon-900">{p.daunThickness}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Plat Strip:</span>
                        <span className="font-medium text-slate-800">{p.stripThickness}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Tiang UNP:</span>
                        <span className="font-medium text-slate-800">{p.unpSize}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={productWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center py-2.5 sm:py-3 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-maroon-800 active:scale-98 transition-colors min-h-[44px]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 mr-2 shrink-0" />
                    Pesan Tipe Ini
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* EDUKASI MATERIAL PREVIEW */}
      <section className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-gradient-to-r from-maroon-950 via-[#26040a] to-maroon-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-maroon-800/60 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Penting Untuk Diketahui Pembeli
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Kenali Komponen & Kualitas Material Pintu Harmonika
              </h2>
              <p className="text-rose-100 text-sm sm:text-base leading-relaxed">
                Banyak kasus pintu harmonika macet hanya dalam 6 bulan pemakaian karena menggunakan plat strip sisa (afval) dan rel tipis. Pelajari setiap detail material kami agar Anda mendapatkan pintu yang awet hingga 20 tahun ke depan.
              </p>
              <div className="pt-2">
                <Link
                  href="/material"
                  className="inline-flex items-center px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition-colors shadow-lg shadow-amber-500/20"
                >
                  Pelajari Seluk Beluk Material Kami
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-maroon-900/80 border border-amber-400/40 p-6 rounded-2xl text-center space-y-3 shadow-xl">
                <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto" />
                <h4 className="font-extrabold text-white text-base">Jaminan Anti Plat Banci</h4>
                <p className="text-xs text-rose-200">
                  Setiap pemesan berhak menguji ketebalan plat dengan sigmat digital (vernier caliper) saat survey dan pemasangan!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIST PROJECT TERBARU */}
      <section className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-maroon-700 uppercase tracking-widest block mb-1">
              Portofolio Nyata
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Galeri Proyek Yang Telah Selesai
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl">
              Bukti nyata dedikasi dan kualitas pemasangan kami di ratusan ruko perbelanjaan, gudang, toko, dan garasi rumah tinggal.
            </p>
          </div>
          <Link
            href="/project"
            className="inline-flex items-center text-sm font-bold text-maroon-800 hover:text-red-700 transition-colors"
          >
            Lihat Semua Dokumentasi Proyek
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group hover:border-maroon-300"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 bg-maroon-950/90 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-amber-400/20">
                  {proj.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center text-[11px] text-maroon-700 font-bold mb-1.5">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  <span>{proj.location}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-2 line-clamp-2 leading-snug group-hover:text-maroon-800 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                  {proj.description}
                </p>
                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex justify-between">
                  <span>{proj.productType}</span>
                  <span className="font-semibold text-slate-600">{proj.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DYNAMIC TESTIMONIALS SECTION (Ulasan Bergerak, Foto Berjalan Marquee, Video Demonstrasi & Rata Semua) */}
      <DynamicTestimonialsSection
        testimonials={testimonials}
        settings={settings}
      />

      {/* CALL TO ACTION SECTION: Deep Maroon Banner (Full width text, Tanpa Was-Was Macet tidak terpotong) */}
      <section className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-gradient-to-r from-maroon-950 via-[#34050e] to-maroon-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden border-2 border-maroon-700/60">
          <div className="w-full space-y-5 sm:space-y-6 relative z-10">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400">
              Layanan Cepat & Bergaransi
            </span>
            <h2 className="text-xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-snug break-normal hyphens-none">
              Ingin Pasang Pintu Harmonika <span className="whitespace-nowrap">Tanpa Was-Was Macet?</span>
            </h2>
            <p className="text-rose-100 text-xs sm:text-base leading-relaxed max-w-4xl">
              Konsultasikan ukuran toko atau ruko Anda bersama tim kami. Dapatkan penawaran harga pabrik terbaik dan jadwal survey lokasi GRATIS hari ini juga!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-red-600 to-maroon-700 hover:from-red-500 hover:to-maroon-600 shadow-xl border border-amber-400/30 transition-all transform hover:-translate-y-0.5 active:scale-98 min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5 mr-2 fill-white shrink-0" />
                Chat WhatsApp Sekarang
              </a>
              <Link
                href="/kontak"
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all min-h-[48px]"
              >
                <PhoneCall className="w-4 h-4 mr-2 shrink-0" />
                Info Alamat Workshop & Kontak
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
