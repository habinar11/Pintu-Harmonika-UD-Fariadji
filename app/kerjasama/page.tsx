import { Metadata } from "next";
import { getSettings } from "@/lib/db";
import {
  Handshake,
  Percent,
  Clock,
  Truck,
  Award,
  Users,
} from "lucide-react";
import PartnershipForm from "@/components/PartnershipForm";

export const metadata: Metadata = {
  title: "Program Kerja Sama Kontraktor, Developer & Reseller Pintu Harmonika",
  description:
    "Peluang kemitraan B2B fabrikasi pintu harmonika untuk kontraktor konstruksi, pengembang ruko, dan toko besi dengan harga pabrik khusus serta proteksi komisi.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function KerjasamaPage() {
  const settings = await getSettings();

  const benefits = [
    {
      icon: <Percent className="w-6 h-6 text-maroon-700" />,
      title: "Harga Khusus Tender / Proyek (Volume Discount)",
      desc: "Dapatkan harga pabrik langsung dengan margin potongan signifikan untuk pengadaan skala multi-unit ruko, pergudangan, maupun tender peremajaan pasar.",
    },
    {
      icon: <Clock className="w-6 h-6 text-maroon-700" />,
      title: "Prioritas Jalur Antrean Produksi Cepat",
      desc: "Proyek mitra diprioritaskan di workshop kami dengan timeline produksi disiplin agar serah terima gedung/ruko Anda tepat waktu tanpa keterlambatan.",
    },
    {
      icon: <Truck className="w-6 h-6 text-amber-600" />,
      title: "Layanan Kirim & Pasang Teknisi Bersertifikat",
      desc: "Tim perakitan kami siap mengantar dan melakukan instalasi langsung di lokasi proyek Anda, lengkap dengan pengelasan dan penyetelan presisi.",
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600" />,
      title: "Sertifikasi Mutu & Garansi Resmi Tertulis",
      desc: "Kami sediakan spesifikasi teknis lengkap, surat garansi resmi hingga 5 tahun, dan kepastian bahan baja SNI murni untuk laporan pengawasan proyek.",
    },
    {
      icon: <Users className="w-6 h-6 text-rose-600" />,
      title: "Program Reseller Bengkel Las & Toko Besi",
      desc: "Bagi bengkel las daerah yang tidak memiliki mesin press tekuk daun atau alat roll rel, Anda bisa memesan daun/komponen rakitan siap rangkai di tempat kami.",
    },
    {
      icon: <Handshake className="w-6 h-6 text-emerald-600" />,
      title: "Fee Referral & Proteksi Komisi Transparan",
      desc: "Bagi arsitek, drafter, dan konsultan proyek yang mereferensikan klien kepada kami, kami menyediakan skema komisi resmi yang saling menguntungkan.",
    },
  ];

  return (
    <div className="space-y-16 py-12">
      {/* Header Banner: Rich Maroon */}
      <div className="bg-gradient-to-r from-maroon-950 via-[#2a040b] to-maroon-950 text-white py-14 sm:py-16 border-b-2 border-maroon-800">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            Kolaborasi Saling Menguntungkan
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Kemitraan Kontraktor & Reseller
          </h1>
          <p className="text-rose-100/90 text-sm sm:text-base mt-4 leading-relaxed">
            Bergabunglah bersama puluhan kontraktor terkemuka dan developer perumahan di Indonesia. Kami siap menjadi partner fabrikasi pintu harmonika terbaik untuk proyek Anda.
          </p>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Keuntungan Menjadi Mitra {settings.companyName}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Fasilitas komprehensif yang dirancang untuk mendukung kelancaran proyek dan profitabilitas bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-maroon-300 transition-all space-y-3"
            >
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center">
                {b.icon}
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                {b.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Submission Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PartnershipForm settings={settings} />
      </div>
    </div>
  );
}
