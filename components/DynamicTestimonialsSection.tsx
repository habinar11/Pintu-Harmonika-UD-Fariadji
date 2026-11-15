"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  Film,
  Camera,
  MessageSquare,
  ChevronRight as ArrowIcon,
  CheckCircle2,
} from "lucide-react";
import { TestimonialItem, CompanySettings } from "@/lib/types";

export default function DynamicTestimonialsSection({
  testimonials,
  settings,
}: {
  testimonials: TestimonialItem[];
  settings: CompanySettings;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  // Gallery photos (from settings or fallback)
  const galleryPhotos = settings.galleryPhotos && settings.galleryPhotos.length > 0 ? settings.galleryPhotos : [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      caption: "Pemasangan Pintu Ruko Central Park Surabaya",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=800&q=80",
      caption: "Cat Oven Duco Anti Karat Mengkilap",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      caption: "Perakitan Daun Plat SNI Murni di Workshop",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      caption: "Pintu Harmonika Garasi Minimalis Hitam Doff",
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      caption: "Gudang Logistik Industri Bentang Lebar",
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
      caption: "Double Bearing Jepang Anti Macet Enteng",
    },
  ];

  // Review videos
  const reviewVideos = settings.reviewVideos && settings.reviewVideos.length > 0 ? settings.reviewVideos : [
    {
      id: "v-1",
      title: "Uji Tarik Enteng Pintu Harmonika Cukup 1 Jari",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      clientName: "Bpk. Bambang Trihatmojo",
      location: "Surabaya Barat",
      thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "v-2",
      title: "Dokumentasi Selesai Pasang 8 Unit Ruko Central Business",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      clientName: "PT Sinar Surya Properti",
      location: "Surabaya Timur",
      thumbnail: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "v-3",
      title: "Review Kontraktor Konstruksi Proyek Ruko Komersial",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      clientName: "Ir. Denny Pratama, IAI",
      location: "Malang",
      thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Auto moving slider for testimonials
  useEffect(() => {
    if (!isPlaying || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Get 3 visible items based on currentIndex (sliding wrap-around)
  const visibleTestimonials = testimonials.length <= 3
    ? testimonials
    : [
        testimonials[currentIndex % testimonials.length],
        testimonials[(currentIndex + 1) % testimonials.length],
        testimonials[(currentIndex + 2) % testimonials.length],
      ];

  return (
    <section className="bg-gradient-to-b from-rose-50/70 via-white to-rose-50/50 py-16 sm:py-24 border-y border-rose-100 overflow-hidden space-y-20">
      {/* ================= 1. BAGIAN ULASAN TESTIMONI PELANGGAN (BERGERAK & RATA SEMUA DI BAWAH) ================= */}
      <div
        className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-maroon-700 uppercase tracking-widest block mb-1">
                Kepuasan Pelanggan Nyata
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-maroon-800 border border-amber-400/40">
                Bergerak Otomatis
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Apa Kata Pemilik Ruko & Mitra Kontraktor?
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Ulasan asli dari pemilik toko, developer properti, dan perorangan yang telah mempercayakan pintu harmonika kepada kami.
            </p>
          </div>

          {/* Slider manual arrows + Indicator */}
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-xs text-slate-500 font-medium">
              {((currentIndex % testimonials.length) + 1)} / {testimonials.length}
            </span>
            <button
              onClick={handlePrev}
              className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-maroon-50 hover:text-maroon-800 transition-colors shadow-sm"
              aria-label="Ulasan Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-maroon-50 hover:text-maroon-800 transition-colors shadow-sm"
              aria-label="Ulasan Berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grid of Testimonial Cards: TULISAN BAWAH 100% RATA SEMUA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {visibleTestimonials.map((t, idx) => {
            return (
              <div
                key={`${t.id}-${idx}`}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:border-maroon-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Thumbnail with fallback */}
                  {t.photoUrl ? (
                    <div className="h-44 w-full mb-4 rounded-2xl overflow-hidden bg-slate-100 relative">
                      <img
                        src={t.photoUrl}
                        alt={t.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-2 left-2 bg-maroon-950/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-400/30">
                        Foto Hasil Pasang
                      </span>
                    </div>
                  ) : (
                    <div className="h-44 w-full mb-4 rounded-2xl overflow-hidden bg-slate-100 relative">
                      <img
                        src="/images/pintu-harmonika-hero.svg"
                        alt="Hasil Pasang Pintu Harmonika"
                        className="w-full h-full object-cover opacity-90"
                      />
                      <span className="absolute bottom-2 left-2 bg-maroon-950/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-400/30">
                        Pintu Harmonika Terpasang
                      </span>
                    </div>
                  )}

                  {/* Rating Stars */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">{t.date}</span>
                  </div>

                  {/* Review Content with guaranteed min-height for even alignment */}
                  <div className="min-h-[88px] mb-4">
                    <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed line-clamp-4">
                      &ldquo;{t.content}&rdquo;
                    </p>
                  </div>
                </div>

                {/* FOOTER KARTU TESTIMONI: 100% RATA SEMUA SEJAJAR DI BAWAH */}
                <div className="pt-4 border-t border-slate-100 mt-auto">
                  <div className="h-12 flex flex-col justify-center">
                    <h4 className="font-extrabold text-slate-900 text-sm truncate" title={t.name}>
                      {t.name}
                    </h4>
                    <p className="text-xs text-slate-500 truncate" title={t.role}>{t.role}</p>
                  </div>

                  {/* Equalized Bottom Row */}
                  <div className="h-9 flex justify-between items-center text-[11px] pt-2 border-t border-slate-100/80">
                    <span className="font-bold text-maroon-800 truncate max-w-[160px]" title={t.projectType}>
                      {t.projectType}
                    </span>
                    <span className="text-slate-500 truncate max-w-[140px] text-right" title={t.companyOrLocation}>
                      {t.companyOrLocation}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Link to all testimonials */}
        <div className="text-right pt-4">
          <Link
            href="/testimoni"
            className="inline-flex items-center text-xs sm:text-sm font-bold text-maroon-800 hover:text-red-700 transition-colors"
          >
            Lihat Semua Ulasan & Kirim Testimoni Anda
            <ArrowIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      {/* ================= 2. BAGIAN FOTO DOKUMENTASI BERJALAN (INFINITE MARQUEE ANIMASI) ================= */}
      <div className="w-full space-y-4">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between border-b border-rose-200 pb-3">
            <div>
              <span className="text-xs font-bold text-maroon-700 uppercase tracking-widest block">
                Galeri Lapangan
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Dokumentasi Foto Pemasangan & Workshop (Meluncur Otomatis)
              </h3>
            </div>
            <span className="hidden sm:inline text-xs text-slate-500">
              * Arahkan kursor untuk jeda
            </span>
          </div>
        </div>

        {/* Continuous Horizontal Marquee Container spanning full width */}
        <div className="w-full overflow-hidden bg-gradient-to-r from-[#2a040b] via-[#1a0206] to-[#2a040b] py-6 border-y-2 border-maroon-800 shadow-2xl">
          <div className="animate-marquee">
            {/* Repeated for continuous infinite marquee */}
            {[...galleryPhotos, ...galleryPhotos, ...galleryPhotos].map((photo, i) => (
              <div
                key={i}
                className="shrink-0 w-72 sm:w-84 mx-3 rounded-2xl overflow-hidden bg-black/40 border border-maroon-700/80 group shadow-lg"
              >
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold truncate">
                    {photo.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 3. BAGIAN VIDEO HASIL PEMASANGAN & UJI TARIK PINTU ================= */}
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <div className="flex items-center justify-between border-b border-rose-200 pb-3">
          <div>
            <span className="text-xs font-bold text-maroon-700 uppercase tracking-widest block">
              Bukti Nyata Video
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Video Hasil Pemasangan & Uji Tarik Enteng Pintu
            </h3>
          </div>
          <span className="text-xs font-bold text-maroon-700">
            {reviewVideos.length} Video Dokumentasi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviewVideos.map((vid) => (
            <div
              key={vid.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group hover:border-maroon-300 flex flex-col justify-between"
            >
              <div
                onClick={() => setActiveVideoModal(vid.videoUrl)}
                className="relative h-52 bg-slate-900 overflow-hidden cursor-pointer"
              >
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-red-600 transition-all border-2 border-white">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-3 left-3 bg-black/80 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                  Klik untuk Putar Video
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-maroon-800 transition-colors">
                    {vid.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Klien: <strong className="text-slate-800">{vid.clientName}</strong> ({vid.location})
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveVideoModal(vid.videoUrl)}
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-900 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 mr-1.5 fill-white" />
                  Tonton Video Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl max-w-3xl w-full p-4 overflow-hidden relative shadow-2xl border border-slate-700">
              <button
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-red-600 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
              <div className="relative pt-[56.25%] w-full rounded-2xl overflow-hidden bg-black">
                <iframe
                  src={activeVideoModal}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video Dokumentasi Pintu Harmonika"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
