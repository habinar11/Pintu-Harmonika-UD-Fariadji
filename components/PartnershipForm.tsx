"use client";

import { useState } from "react";
import { CompanySettings } from "@/lib/types";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";

export default function PartnershipForm({
  settings,
}: {
  settings: CompanySettings;
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [partnerType, setPartnerType] = useState("Kontraktor / Pemborong");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${name} (${company || "Perorangan"})`,
          phone,
          email,
          city,
          type: "partnership",
          message: `Kategori: ${partnerType}. Pesan/Kebutuhan: ${message}`,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setName("");
        setCompany("");
        setPhone("");
        setEmail("");
        setCity("");
        setMessage("");
      }
    } catch {
      alert("Gagal mengirim data, silakan hubungi kami langsung via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const waB2BUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Halo Tim B2B ${settings.companyName}, saya tertarik menjalin kemitraan/kerja sama proyek pintu harmonika untuk kontraktor/developer.`
  )}`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl hover:border-maroon-300 transition-colors">
      <div className="mb-8">
        <span className="text-xs font-bold text-maroon-700 uppercase tracking-wider block mb-1">
          Formulir Pengajuan Kemitraan
        </span>
        <h3 className="text-2xl font-black text-slate-900">
          Daftar Menjadi Mitra / Ajukan Tender Proyek
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Isi formulir di bawah ini, tim manajemen kemitraan kami akan menghubungi Anda dalam waktu 1x24 jam untuk mendiskusikan skema harga dan penawaran khusus.
        </p>
      </div>

      {isSuccess ? (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h4 className="text-xl font-black text-emerald-900">
            Pengajuan Kerja Sama Berhasil Terkirim!
          </h4>
          <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
            Terima kasih atas minat Anda. Tim business development {settings.companyName} akan segera menghubungi nomor WhatsApp Anda.
          </p>
          <div className="pt-2">
            <a
              href={waB2BUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Langsung Chat PIC Kemitraan via WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nama Lengkap PIC *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Bpk. Ir. Danang"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nama Perusahaan / Bengkel / CV
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Contoh: PT Bangun Cipta Pratama"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nomor WhatsApp Aktif *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="081234567890"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Email Perusahaan
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pengadaan@perusahaan.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Kota Operasional Proyek *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Contoh: Surabaya / Semarang / Balikpapan"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Kategori Bisnis Anda
              </label>
              <select
                value={partnerType}
                onChange={(e) => setPartnerType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700 bg-white"
              >
                <option value="Kontraktor / Pemborong">Kontraktor / Pemborong Bangunan</option>
                <option value="Developer Ruko & Perumahan">Developer Ruko & Perumahan</option>
                <option value="Arsitek / Konsultan Perencana">Arsitek / Konsultan Perencana</option>
                <option value="Toko Bahan Besi / Reseller">Toko Bahan Besi / Reseller Daerah</option>
                <option value="Bengkel Las Rekanan">Bengkel Las Rekanan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Rincian Kebutuhan / Volume Proyek
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Jelaskan perkiraan jumlah unit pintu, lokasi proyek, atau pertanyaan Anda seputar kerja sama..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-700 to-maroon-800 hover:from-red-600 hover:to-maroon-700 transition-all border border-amber-400/30 disabled:opacity-50"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Mengirim Formulir..." : "Kirim Pengajuan Kemitraan"}
            </button>
            <a
              href={waB2BUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat PIC B2B WhatsApp Langsung
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
