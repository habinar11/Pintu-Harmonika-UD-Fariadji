import { Metadata } from "next";
import { getSettings } from "@/lib/db";
import {
  CheckCircle2,
  Target,
  Eye,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Profil Perusahaan & Workshop Spesialis Pintu Harmonika",
  description:
    "Mengenal lebih dekat sejarah, visi misi, tenaga teknisi ahli, dan komitmen mutu dari pabrik pintu harmonika terpercaya.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProfilPage() {
  const settings = await getSettings();

  const waUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Halo Admin ${settings.companyName}, saya ingin konsultasi langsung dengan pimpinan/workshop pintu harmonika.`
  )}`;

  return (
    <div className="space-y-16 py-12">
      {/* Header Banner: Rich Maroon */}
      <div className="bg-gradient-to-r from-maroon-950 via-[#2a040b] to-maroon-950 text-white py-14 sm:py-16 border-b-2 border-maroon-800">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            Tentang Kami
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Profil {settings.companyName}
          </h1>
          <p className="text-rose-100/90 text-sm sm:text-base mt-4 leading-relaxed">
            {settings.tagline} dengan dedikasi tinggi pada keamanan properti, kerapian pengelasan, dan keawetan struktural.
          </p>
        </div>
      </div>

      {/* Story & History Section */}
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-maroon-700 uppercase tracking-widest block">
              Sejarah & Dedikasi Kami
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Lebih Dari {settings.yearsExperience} Tahun Mengamankan Ruko & Properti Indonesia
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {settings.aboutStory}
            </p>
            <div className="p-4 bg-rose-50 border-l-4 border-maroon-700 rounded-r-2xl text-xs sm:text-sm text-maroon-950 italic">
              &ldquo;Prinsip utama kami sangat sederhana: tidak pernah mengurangi ketebalan plat yang telah disepakati dan memastikan setiap pintu yang keluar dari workshop kami dapat ditarik enteng dengan satu jari.&rdquo;
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-maroon-800 group">
              <img
                src={settings.aboutImage || settings.workshopImage || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"}
                alt="Workshop Fabrikasi Pintu Harmonika"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs text-amber-400 font-bold block mb-1">
                  Workshop & Perakitan Mandiri
                </span>
                <p className="text-sm font-semibold">
                  {settings.workshopAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visi & Misi */}
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 hover:border-maroon-300 transition-colors">
            <div className="w-12 h-12 bg-rose-50 text-maroon-700 rounded-2xl flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Visi Perusahaan</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {settings.vision}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 hover:border-maroon-300 transition-colors">
            <div className="w-12 h-12 bg-rose-50 text-maroon-700 rounded-2xl flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Misi Perusahaan</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {settings.mission.map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Numbers & Achievements in Rich Maroon */}
      <div className="bg-gradient-to-r from-maroon-950 via-[#26040a] to-maroon-950 text-white py-14 border-y border-maroon-800">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-5xl font-black text-amber-400">
                {settings.yearsExperience}+
              </div>
              <div className="text-xs sm:text-sm text-rose-200 mt-2 font-medium">Tahun Pengalaman</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-black text-rose-300">
                {settings.completedProjects.toLocaleString("id-ID")}+
              </div>
              <div className="text-xs sm:text-sm text-rose-200 mt-2 font-medium">Unit Pintu Terpasang</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-black text-emerald-400">
                {settings.citiesServed}+
              </div>
              <div className="text-xs sm:text-sm text-rose-200 mt-2 font-medium">Kota Wilayah Layanan</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-black text-amber-300">
                {settings.warrantyYears} Thn
              </div>
              <div className="text-xs sm:text-sm text-rose-200 mt-2 font-medium">Garansi Pemeliharaan Resmi</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
          Siap Mewujudkan Pintu Harmonika Impian Anda?
        </h3>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Kunjungi workshop kami untuk melihat sampel langsung, atau jadwalkan teknisi survey gratis ke lokasi Anda sekarang.
        </p>
        <div className="pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-7 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-red-700 to-maroon-800 hover:from-red-600 hover:to-maroon-700 shadow-xl border border-amber-400/30"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Hubungi Workshop & Pimpinan via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
