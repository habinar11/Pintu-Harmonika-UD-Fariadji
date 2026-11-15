"use client";

import { useState } from "react";
import { CompanySettings } from "@/lib/types";
import { Send, CheckCircle2, MessageCircle } from "lucide-react";

export default function ContactForm({ settings }: { settings: CompanySettings }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState<"survey_request" | "inquiry">("survey_request");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
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
          name,
          phone,
          email,
          city,
          type,
          width,
          height,
          productInterest: "Pintu Harmonika",
          message,
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setName("");
        setPhone("");
        setEmail("");
        setCity("");
        setWidth("");
        setHeight("");
        setMessage("");
      }
    } catch {
      alert("Gagal mengirim pesan, silakan hubungi kami via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const waUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Halo Admin ${settings.companyName}, saya ingin pesan survey lokasi untuk pintu harmonika.`
  )}`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl hover:border-maroon-300 transition-colors">
      <div className="mb-6">
        <span className="text-xs font-bold text-maroon-700 uppercase tracking-wider block mb-1">
          Layanan Pelanggan
        </span>
        <h3 className="text-2xl font-black text-slate-900">
          Kirim Pesan / Request Survey Lokasi Gratis
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Tim teknisi kami siap datang langsung untuk mengukur lokasi dan mendiskusikan tipe pintu harmonika yang paling tepat.
        </p>
      </div>

      {isSuccess ? (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 sm:p-8 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h4 className="text-xl font-black text-emerald-900">
            Permintaan Anda Telah Diterima!
          </h4>
          <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
            Tim customer care {settings.companyName} akan segera menghubungi nomor WhatsApp Anda untuk konfirmasi jadwal survey lokasi.
          </p>
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat Langsung via WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nama Lengkap Anda *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Bpk. H. Hendra"
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
                placeholder="0812-3456-7890"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Kota / Lokasi Bangunan *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Contoh: Surabaya Barat / Sidoarjo"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Jenis Layanan Yang Diinginkan
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700 bg-white"
              >
                <option value="survey_request">Survey Pengukuran ke Lokasi (Gratis)</option>
                <option value="inquiry">Konsultasi Harga & Spesifikasi</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Perkiraan Lebar (Opsional, meter)
              </label>
              <input
                type="text"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Contoh: 4.2"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Perkiraan Tinggi (Opsional, meter)
              </label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Contoh: 3.5"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Pesan / Catatan Tambahan
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Sebutkan alamat lengkap untuk survey lokasi atau pertanyaan seputar spesifikasi teknis..."
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
              {isSubmitting ? "Mengirim..." : "Kirim Jadwal Survey"}
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Fast Response WhatsApp CS
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
