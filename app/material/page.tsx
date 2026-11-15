import { Metadata } from "next";
import { getSettings, getMaterials } from "@/lib/db";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Material & Spesifikasi Teknis Pintu Harmonika",
  description:
    "Pelajari rincian spesifikasi daun, plat silangan, UNP, double bearing jepang, rel tanam as padat, dan cat oven anti karat pada pintu harmonika.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MaterialPage() {
  const settings = await getSettings();
  const materials = await getMaterials();

  const waUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Halo Admin ${settings.companyName}, saya membaca info material di website dan ingin tanya lebih lanjut mengenai spesifikasi pintu harmonika.`
  )}`;

  return (
    <div className="space-y-16 py-12">
      {/* Header Banner: Rich Maroon */}
      <div className="bg-gradient-to-r from-maroon-950 via-[#2a040b] to-maroon-950 text-white py-14 sm:py-16 border-b-2 border-maroon-800">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            Transparansi Kualitas & Edukasi Pelanggan
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Bedah Anatomi Material Pintu Harmonika
          </h1>
          <p className="text-rose-100/90 text-sm sm:text-base mt-4 leading-relaxed">
            Kekuatan dan keawetan pintu harmonika hingga puluhan tahun bertumpu pada integritas setiap komponen. Ketahui standar material yang kami gunakan agar terhindar dari penipuan bahan murahan.
          </p>
        </div>
      </div>

      {/* EDUKASI KHUSUS: BAHAYA PLAT BANCI */}
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-gradient-to-r from-amber-50 to-rose-50 border-2 border-amber-300 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="p-4 bg-amber-500 text-slate-950 rounded-2xl shrink-0 shadow-lg">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-maroon-800">
                Peringatan Penting Untuk Konsumen
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Waspada Penipuan &ldquo;Plat Banci&rdquo; di Pasaran!
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Banyak bengkel las nakal yang menawarkan harga sangat murah di awal, namun kenyataannya menggunakan daun dan plat silangan <strong>&ldquo;banci&rdquo;</strong> (misalnya mengaku tebal 1.2 mm tetapi setelah diukur dengan jangka sorong/sigmat ternyata hanya 0.8 mm). Akibatnya, pintu mudah jebol, oleng saat ditiup angin, dan roda cepat anjlok dalam hitungan bulan.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-maroon-900">
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 mr-1.5" />
                  <span>Di {settings.companyName}: Ukuran Tebal 100% Real Sesuai Sigmat</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 mr-1.5" />
                  <span>Konsumen Berhak Mengukur Sendiri Saat Survey & Serah Terima</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL MATERIAL CARDS */}
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="space-y-12">
          {materials.map((mat, idx) => (
            <div
              key={mat.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 hover:border-maroon-300"
            >
              <div className="lg:col-span-5 relative bg-slate-100 min-h-[260px] lg:min-h-full">
                <img
                  src={mat.image}
                  alt={mat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-maroon-950 text-amber-400 font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-lg border border-amber-400/30">
                  Komponen 0{idx + 1}
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs font-bold text-maroon-700 uppercase tracking-wider block mb-1">
                    {mat.subtitle}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                    {mat.name}
                  </h3>
                  <div className="inline-block bg-rose-50 text-maroon-900 text-xs font-bold px-3 py-1.5 rounded-xl mb-4 border border-rose-200">
                    Spesifikasi: {mat.specs}
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {mat.description}
                  </p>

                  <h4 className="text-xs font-bold text-maroon-800 uppercase tracking-wider mb-3">
                    Keunggulan Komponen Ini:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {mat.advantages.map((adv, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA SECTION: Rich Maroon */}
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-gradient-to-r from-maroon-950 via-[#30050d] to-maroon-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-5 border-2 border-maroon-700/60 shadow-xl">
          <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Ingin Membuktikan Kualitas Bahan Kami Langsung?
          </h3>
          <p className="text-rose-100 text-sm max-w-2xl mx-auto leading-relaxed">
            Tim survey kami akan membawakan sampel potongan daun, plat silangan, dan bearing saat berkunjung ke lokasi Anda. Hubungi kami untuk jadwal survey tanpa dipungut biaya!
          </p>
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 to-maroon-800 hover:from-red-500 hover:to-maroon-700 shadow-xl border border-amber-400/30 transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2 fill-white" />
              Jadwalkan Survey Lokasi & Cek Sampel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
