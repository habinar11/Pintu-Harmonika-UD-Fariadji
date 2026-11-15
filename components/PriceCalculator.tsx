"use client";

import { useState } from "react";
import { Calculator, MessageCircle, Check, ArrowRight } from "lucide-react";
import { Product, CompanySettings } from "@/lib/types";

export default function PriceCalculator({
  products,
  settings,
}: {
  products: Product[];
  settings: CompanySettings;
}) {
  const [width, setWidth] = useState<number>(3.5);
  const [height, setHeight] = useState<number>(3.0);
  const [selectedProductId, setSelectedProductId] = useState<string>(
    products[0]?.id || ""
  );
  const [isSwing, setIsSwing] = useState<boolean>(false);
  const [isDualColor, setIsDualColor] = useState<boolean>(false);

  const selectedProduct =
    products.find((p) => p.id === selectedProductId) || products[0];

  const area = Math.max(0, width * height);
  const effectiveArea = area < 7 && area > 0 ? 7 : area;

  const baseRate = selectedProduct ? selectedProduct.pricePerMeter : 600000;
  const baseCost = effectiveArea * baseRate;

  const swingCost = isSwing ? 250000 : 0;
  const dualColorCost = isDualColor ? 150000 : 0;
  const totalCost = baseCost + swingCost + dualColorCost;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const generateWhatsAppMessage = () => {
    const text = `Halo Admin ${settings.companyName}, saya mau estimasi pintu harmonika:
- Ukuran: Lebar ${width} m x Tinggi ${height} m (Luas: ${area.toFixed(2)} m²)
- Tipe Pintu: ${selectedProduct?.name} (${selectedProduct?.daunThickness})
- Opsi Swing/Lipat Tembok: ${isSwing ? "Ya" : "Tidak"}
- Opsi Cat Duco Oven Dua Warna: ${isDualColor ? "Ya" : "Tidak"}
- Perkiraan Estimasi Web: ${formatRupiah(totalCost)}

Mohon info ketersediaan jadwal survey lokasi gratis dan penawaran resminya. Terima kasih!`;

    return `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-gradient-to-br from-[#2c040b] via-[#1c0206] to-[#120104] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl border-2 border-maroon-700/60 relative overflow-hidden">
      {/* Decorative background glow in maroon */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
          <div className="p-2.5 sm:p-3 bg-red-950/80 border border-amber-400/40 rounded-2xl text-amber-400 shadow-lg shrink-0">
            <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-amber-400 font-bold block">
              Simulasi Cepat & Transparan
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Kalkulator Estimasi Biaya Pintu Harmonika
            </h3>
          </div>
        </div>

        <p className="text-rose-100/90 text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed max-w-3xl">
          Hitung perkiraan biaya pintu harmonika sesuai ukuran opening toko, ruko, atau garasi Anda. Hasil kalkulasi sudah termasuk perakitan, rel, kunci, dan pemasangan.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Controls column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Input Dimensi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-black/30 border border-maroon-800/80 rounded-2xl p-3.5 sm:p-4">
                <label className="text-xs font-semibold text-rose-200 block mb-1">
                  Lebar Opening (Meter)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="20"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                    className="w-full bg-maroon-950/80 border border-maroon-700 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-white font-bold text-base sm:text-lg focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-sm font-bold text-rose-300">m</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-rose-300/70 mt-1 block">
                  Contoh: 3.5 m untuk ruko standar
                </span>
              </div>

              <div className="bg-black/30 border border-maroon-800/80 rounded-2xl p-3.5 sm:p-4">
                <label className="text-xs font-semibold text-rose-200 block mb-1">
                  Tinggi Opening (Meter)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="8"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                    className="w-full bg-maroon-950/80 border border-maroon-700 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-white font-bold text-base sm:text-lg focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-sm font-bold text-rose-300">m</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-rose-300/70 mt-1 block">
                  Contoh: 3.0 m untuk tinggi plafon ruko
                </span>
              </div>
            </div>

            {/* Select Product Type */}
            <div>
              <label className="text-xs sm:text-sm font-bold text-white block mb-2">
                Pilih Tipe Ketebalan & Kualitas:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {products.map((p) => {
                  const isSelected = p.id === selectedProductId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProductId(p.id)}
                      className={`text-left p-3 sm:p-3.5 rounded-2xl border transition-all active:scale-98 min-h-[48px] ${
                        isSelected
                          ? "bg-maroon-900/90 border-amber-400 ring-2 ring-amber-400/40 text-white shadow-lg"
                          : "bg-black/30 border-maroon-900 text-rose-200 hover:bg-maroon-950/50"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-extrabold text-xs sm:text-sm text-white line-clamp-1">
                          {p.name}
                        </span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-amber-400 shrink-0 ml-1" />
                        )}
                      </div>
                      <div className="text-[11px] sm:text-xs text-rose-200">
                        Daun: <span className="text-amber-300 font-bold">{p.daunThickness}</span>
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-emerald-400 mt-0.5">
                        {p.priceDisplay}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Extra Options */}
            <div className="space-y-2.5 sm:space-y-3 pt-2 border-t border-maroon-900">
              <label className="text-[11px] sm:text-xs font-bold uppercase text-amber-300 tracking-wider block">
                Opsi Tambahan (Opsional)
              </label>

              <label className="flex items-center space-x-3 bg-black/30 border border-maroon-900 p-3 sm:p-3.5 rounded-2xl cursor-pointer hover:bg-maroon-950/50 transition-colors active:scale-98">
                <input
                  type="checkbox"
                  checked={isSwing}
                  onChange={(e) => setIsSwing(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-amber-400 bg-maroon-950 border-maroon-700 shrink-0"
                />
                <div className="text-xs">
                  <span className="font-bold text-white block">
                    Sistem Roda Swing (+Rp 250.000)
                  </span>
                  <span className="text-rose-200/80 text-[11px] sm:text-xs">
                    Pintu bisa dilipat memutar mepet tembok agar tidak makan ruang bukaan
                  </span>
                </div>
              </label>

              <label className="flex items-center space-x-3 bg-black/30 border border-maroon-900 p-3 sm:p-3.5 rounded-2xl cursor-pointer hover:bg-maroon-950/50 transition-colors active:scale-98">
                <input
                  type="checkbox"
                  checked={isDualColor}
                  onChange={(e) => setIsDualColor(e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 focus:ring-amber-400 bg-maroon-950 border-maroon-700 shrink-0"
                />
                <div className="text-xs">
                  <span className="font-bold text-white block">
                    Kombinasi Cat Duco Oven 2 Warna (+Rp 150.000)
                  </span>
                  <span className="text-rose-200/80 text-[11px] sm:text-xs">
                    Warna daun pintu dan tiang kontras sesuai logo/branding ruko Anda
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Result card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-maroon-900/90 via-maroon-950 to-black/90 border-2 border-amber-400/40 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl">
            <span className="text-[10px] sm:text-xs uppercase font-extrabold text-amber-400 tracking-wider block mb-1">
              Ringkasan Estimasi Biaya
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white mb-4 drop-shadow-md">
              {formatRupiah(totalCost)}
            </div>

            <div className="space-y-2 text-xs text-rose-100 pb-4 border-b border-maroon-800">
              <div className="flex justify-between">
                <span>Luas Bidang:</span>
                <span className="font-bold text-white">
                  {width} m × {height} m = {area.toFixed(2)} m²
                </span>
              </div>
              {area < 7 && area > 0 && (
                <div className="text-[10px] sm:text-[11px] text-amber-300 italic">
                  * Ketentuan standar fabrikasi: luas di bawah 7 m² dihitung minimal 7 m².
                </div>
              )}
              <div className="flex justify-between">
                <span>Tipe Dipilih:</span>
                <span className="font-semibold text-white line-clamp-1 max-w-[180px] text-right">
                  {selectedProduct?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ketebalan Daun:</span>
                <span className="font-semibold text-amber-300">
                  {selectedProduct?.daunThickness}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Plat Silangan:</span>
                <span className="font-semibold text-white">
                  {selectedProduct?.stripThickness}
                </span>
              </div>
              {isSwing && (
                <div className="flex justify-between text-amber-300">
                  <span>+ Sistem Roda Swing:</span>
                  <span>Rp 250.000</span>
                </div>
              )}
              {isDualColor && (
                <div className="flex justify-between text-amber-300">
                  <span>+ Cat Oven 2 Warna:</span>
                  <span>Rp 150.000</span>
                </div>
              )}
            </div>

            <div className="py-3.5 space-y-1.5 text-xs text-emerald-400 font-medium">
              <div className="flex items-center">
                <Check className="w-3.5 h-3.5 mr-2 shrink-0 text-emerald-400" />
                <span>Termasuk Survey Lokasi Gratis</span>
              </div>
              <div className="flex items-center">
                <Check className="w-3.5 h-3.5 mr-2 shrink-0 text-emerald-400" />
                <span>Termasuk Pengelasan & Pemasangan Teknisi Ahli</span>
              </div>
              <div className="flex items-center">
                <Check className="w-3.5 h-3.5 mr-2 shrink-0 text-emerald-400" />
                <span>Garansi Resmi Perbaikan {settings.warrantyYears} Tahun</span>
              </div>
            </div>

            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full inline-flex items-center justify-center px-5 py-3.5 sm:py-4 rounded-2xl font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 transition-all shadow-xl shadow-amber-500/20 active:scale-98 border border-amber-200 min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4 mr-2 fill-slate-950 shrink-0" />
              Kirim Ukuran Ini ke WhatsApp
              <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
            </a>

            <p className="text-[10px] sm:text-[11px] text-center text-rose-300/80 mt-3">
              Harga final dapat menyesuaikan kondisi lapangan saat survey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
