import { Metadata } from "next";
import { getSettings, getProducts } from "@/lib/db";
import {
  ShieldCheck,
  Check,
  MessageCircle,
} from "lucide-react";
import PriceCalculator from "@/components/PriceCalculator";

export const metadata: Metadata = {
  title: "Katalog Produk Pintu Harmonika Berbagai Tipe & Ketebalan",
  description:
    "Pilihan lengkap pintu harmonika tipe Standar, Medium, dan Super Heavy. Menggunakan daun baja SNI, roda double bearing jepang, dan kunci anti linggis.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductsPage() {
  const settings = await getSettings();
  const products = await getProducts();

  return (
    <div className="space-y-16 py-12">
      {/* Header Banner: Rich Maroon */}
      <div className="bg-gradient-to-r from-maroon-950 via-[#2a040b] to-maroon-950 text-white py-14 sm:py-16 border-b-2 border-maroon-800">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            Pabrik Resmi Pintu Harmonika
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Katalog Produk & Spesifikasi
          </h1>
          <p className="text-rose-100/90 text-sm sm:text-base mt-4 leading-relaxed">
            Semua produk kami dirakit dengan presisi tinggi menggunakan plat baja SNI asli, sistem bearing halus, dan lapisan cat oven anti korosi bergaransi resmi {settings.warrantyYears} tahun.
          </p>
        </div>
      </div>

      {/* TABEL PERBANDINGAN LENGKAP VARIAN (GAMBAR 5 & 6) */}
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg p-6 sm:p-8">
          <div className="mb-6">
            <span className="text-xs font-bold text-maroon-700 uppercase tracking-wider block">
              Daftar Spesifikasi & Rekomendasi Penggunaan
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Tabel Komparasi Varian Pintu Harmonika
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Bandingkan rincian galaran, silangan, rel, cagak tiang, daun rol, dan harga per m² secara transparan.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-maroon-900/20">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-maroon-900 text-white font-bold text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-3 text-center border-r border-maroon-800">NO</th>
                  <th className="py-3.5 px-4 border-r border-maroon-800 whitespace-nowrap">VARIAN KUALITAS</th>
                  <th className="py-3.5 px-3 border-r border-maroon-800 text-center whitespace-nowrap">GALARAN</th>
                  <th className="py-3.5 px-3 border-r border-maroon-800 text-center whitespace-nowrap">SILANGAN</th>
                  <th className="py-3.5 px-3 border-r border-maroon-800 text-center whitespace-nowrap">REL / B. BESAR</th>
                  <th className="py-3.5 px-3 border-r border-maroon-800 text-center whitespace-nowrap">CAGAK TIANG</th>
                  <th className="py-3.5 px-3 border-r border-maroon-800 text-center whitespace-nowrap">DAUN ROL</th>
                  <th className="py-3.5 px-3 border-r border-maroon-800 text-center whitespace-nowrap">PIPA KOTAK</th>
                  <th className="py-3.5 px-3 border-r border-maroon-800 text-center whitespace-nowrap">PLAT TOPI</th>
                  <th className="py-3.5 px-4 border-r border-maroon-800">REKOMENDASI PENGGUNAAN</th>
                  <th className="py-3.5 px-4 text-right whitespace-nowrap">HARGA / M²</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {products.map((p, idx) => (
                  <tr
                    key={p.id}
                    className={`hover:bg-rose-50/60 transition-colors ${
                      idx % 2 === 1 ? "bg-slate-50/70" : "bg-white"
                    }`}
                  >
                    <td className="py-3.5 px-3 text-center font-bold text-slate-500 border-r border-slate-200">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-black text-maroon-900 border-r border-slate-200 whitespace-nowrap">
                      {p.name}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-700 border-r border-slate-200 whitespace-nowrap">
                      {p.galaran || "-"}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-700 border-r border-slate-200 whitespace-nowrap">
                      {p.silangan || p.stripThickness}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-700 border-r border-slate-200 whitespace-nowrap">
                      {p.relBesar || "-"}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-700 border-r border-slate-200 whitespace-nowrap">
                      {p.cagakTiang || p.cakakTiang || "-"}
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                      {p.daunThickness}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-700 border-r border-slate-200 whitespace-nowrap">
                      {p.pipaKotak || "-"}
                    </td>
                    <td className="py-3.5 px-3 text-center text-slate-700 border-r border-slate-200 whitespace-nowrap">
                      {p.platTopi || "10 cm"}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 border-r border-slate-200 text-xs leading-relaxed min-w-[220px]">
                      {p.usageRecommendation || p.description}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-slate-900 whitespace-nowrap">
                      {p.priceDisplay}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="space-y-12">
          {products.map((product) => {
            const waUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
              `Halo Admin ${settings.companyName}, saya tertarik dengan varian "${product.name}". Mohon info estimasi harga dan jadwal survey lokasi.`
            )}`;

            return (
              <div
                key={product.id}
                className={`bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 hover:border-maroon-300 ${
                  product.isPopular ? "ring-2 ring-maroon-600" : ""
                }`}
              >
                {/* Product Image Column */}
                <div className="lg:col-span-5 relative bg-slate-100 min-h-[300px] lg:min-h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-700 to-maroon-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-amber-400/40">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 bg-maroon-950/90 backdrop-blur-md rounded-2xl p-4 text-white border border-maroon-800">
                    <span className="text-xs text-rose-200 block">Estimasi Harga Pabrik:</span>
                    <span className="text-xl font-extrabold text-amber-300">
                      {product.priceDisplay}
                    </span>
                    <span className="text-[11px] text-rose-200/80 block mt-0.5">
                      Sudah termasuk pemasangan dan rel lengkap.
                    </span>
                  </div>
                </div>

                {/* Product Details Column */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 text-xs font-bold text-maroon-700 uppercase tracking-wider mb-1">
                      <span>Varian Pintu Harmonika</span>
                      {product.isPopular && (
                        <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                          Paling Banyak Dipilih
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
                      {product.name}
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Specification Table */}
                    <div className="bg-rose-50/40 rounded-2xl p-5 border border-rose-100 mb-6">
                      <h4 className="text-xs font-bold text-maroon-900 uppercase tracking-wider mb-3">
                        Rincian Spesifikasi Material Lengkap:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                        <div className="flex justify-between border-b border-rose-100 pb-1.5">
                          <span className="text-slate-500">Tebal Daun Rol:</span>
                          <span className="font-bold text-slate-900">{product.daunThickness}</span>
                        </div>
                        <div className="flex justify-between border-b border-rose-100 pb-1.5">
                          <span className="text-slate-500">Spesifikasi Rangka:</span>
                          <span className="font-bold text-slate-900">{product.frameSpec || product.unpSize}</span>
                        </div>
                        <div className="flex justify-between border-b border-rose-100 pb-1.5">
                          <span className="text-slate-500">Galaran:</span>
                          <span className="font-bold text-slate-900">{product.galaran || "-"}</span>
                        </div>
                        <div className="flex justify-between border-b border-rose-100 pb-1.5">
                          <span className="text-slate-500">Plat Silangan:</span>
                          <span className="font-bold text-slate-900">{product.silangan || product.stripThickness}</span>
                        </div>
                        <div className="flex justify-between border-b border-rose-100 pb-1.5">
                          <span className="text-slate-500">Rel / B. Besar:</span>
                          <span className="font-bold text-slate-900">{product.relBesar || "-"}</span>
                        </div>
                        <div className="flex justify-between border-b border-rose-100 pb-1.5">
                          <span className="text-slate-500">Cagak Tiang:</span>
                          <span className="font-bold text-slate-900">{product.cagakTiang || product.cakakTiang || "-"}</span>
                        </div>
                        <div className="flex justify-between border-b border-rose-100 pb-1.5">
                          <span className="text-slate-500">Pipa Kotak:</span>
                          <span className="font-bold text-slate-900">{product.pipaKotak || "-"}</span>
                        </div>
                        <div className="flex justify-between border-b border-rose-100 pb-1.5">
                          <span className="text-slate-500">Plat Topi:</span>
                          <span className="font-bold text-slate-900">{product.platTopi || "10 cm"}</span>
                        </div>
                        <div className="flex justify-between border-b border-rose-100 pb-1.5">
                          <span className="text-slate-500">Roda Bearing:</span>
                          <span className="font-bold text-slate-900">{product.bearingType}</span>
                        </div>
                        <div className="flex justify-between border-b border-rose-100 pb-1.5">
                          <span className="text-slate-500">Sistem Kunci:</span>
                          <span className="font-bold text-slate-900">{product.lockType}</span>
                        </div>
                      </div>
                      {product.usageRecommendation && (
                        <div className="mt-3 pt-2 text-xs text-slate-700">
                          <span className="font-bold text-maroon-900">Rekomendasi Penggunaan: </span>
                          <span>{product.usageRecommendation}</span>
                        </div>
                      )}
                    </div>

                    {/* Key features bullets */}
                    <div>
                      <h4 className="text-xs font-bold text-maroon-800 uppercase tracking-wider mb-2.5">
                        Keunggulan Varian Ini:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-700 to-maroon-900 hover:from-red-600 hover:to-maroon-800 transition-all shadow-lg shadow-maroon-900/20 border border-amber-400/30"
                    >
                      <MessageCircle className="w-4 h-4 mr-2 fill-white" />
                      Konsultasi / Pesan Tipe Ini
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded Calculator */}
      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 pt-8">
        <PriceCalculator products={products} settings={settings} />
      </div>
    </div>
  );
}
