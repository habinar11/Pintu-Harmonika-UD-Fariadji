"use client";

import { useState } from "react";
import { TestimonialItem, CompanySettings } from "@/lib/types";
import { Star, MessageSquarePlus, CheckCircle2 } from "lucide-react";

export default function TestimonialListAndForm({
  testimonials,
  settings,
}: {
  testimonials: TestimonialItem[];
  settings: CompanySettings;
}) {
  const [items, setItems] = useState<TestimonialItem[]>(testimonials);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [companyOrLocation, setCompanyOrLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [projectType, setProjectType] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          role: role || "Pelanggan",
          companyOrLocation,
          rating,
          projectType: projectType || "Pintu Harmonika",
          content,
          date: new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        }),
      });

      if (res.ok) {
        const newItem = await res.json();
        setItems([newItem, ...items]);
        setSuccessMsg("Terima kasih! Ulasan Anda berhasil ditambahkan.");
        setName("");
        setRole("");
        setCompanyOrLocation("");
        setContent("");
        setProjectType("");
        setTimeout(() => setShowForm(false), 2500);
      }
    } catch {
      alert("Gagal mengirim ulasan, silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Top summary card: Rich Maroon */}
      <div className="bg-gradient-to-r from-maroon-950 via-[#2d050e] to-maroon-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-maroon-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
            <span className="text-white font-extrabold ml-2 text-lg">5.0 / 5.0</span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Kepuasan Pelanggan Adalah Prioritas Mutlak
          </h2>
          <p className="text-rose-100/90 text-xs sm:text-sm max-w-xl">
            Semua ulasan di bawah ini berasal dari pemilik toko, developer ruko, kontraktor, dan pelanggan perorangan yang telah mempercayakan pintu harmonikanya kepada kami.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 transition-all shrink-0 shadow-lg border border-amber-300"
        >
          <MessageSquarePlus className="w-4 h-4 mr-2" />
          {showForm ? "Tutup Formulir Ulasan" : "Tulis Ulasan Anda"}
        </button>
      </div>

      {/* Review submission form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-rose-200 shadow-xl space-y-5 animate-in slide-in-from-top-4 duration-300"
        >
          <h3 className="text-xl font-black text-slate-900">Tulis Pengalaman & Ulasan Anda</h3>
          <p className="text-xs text-slate-500">
            Bagikan testimoni Anda mengenai kualitas bahan, kerapian pemasangan, dan kelancaran dorongan pintu harmonika kami.
          </p>

          {successMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nama Lengkap *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Bpk. H. Rudi Hartono"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Profesi / Jabatan
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Contoh: Owner Toko Mas / Kontraktor"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Lokasi / Kota
              </label>
              <input
                type="text"
                value={companyOrLocation}
                onChange={(e) => setCompanyOrLocation(e.target.value)}
                placeholder="Contoh: Surabaya Timur"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Tipe Pintu Yang Dipasang
              </label>
              <input
                type="text"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                placeholder="Contoh: Tipe Super Heavy Daun 1.2mm"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Beri Rating Bintang
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setRating(num)}
                  className={`p-2 rounded-xl border text-sm font-bold flex items-center space-x-1 ${
                    rating >= num
                      ? "bg-amber-50 border-amber-300 text-amber-600"
                      : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}
                >
                  <Star className={`w-4 h-4 ${rating >= num ? "fill-amber-400" : ""}`} />
                  <span>{num}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Ulasan / Pesan Anda *
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Ceritakan pengalaman Anda menggunakan pintu harmonika dari kami..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-maroon-800 hover:bg-maroon-900 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Sedang Mengirim..." : "Kirim Ulasan Sekarang"}
          </button>
        </form>
      )}

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col justify-between hover:border-maroon-300 hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400">{t.date}</span>
              </div>
              <p className="text-slate-700 text-sm italic leading-relaxed mb-6">
                &ldquo;{t.content}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-extrabold text-slate-900 text-base">{t.name}</h4>
              <p className="text-xs text-slate-500">{t.role}</p>
              <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                <span className="text-maroon-800 font-bold">{t.projectType}</span>
                <span>{t.companyOrLocation}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
