"use client";

import { useState } from "react";
import {
  Calculator,
  MessageCircle,
  Check,
  ArrowRight,
  Sparkles,
  Eye,
  Sliders,
  ShieldCheck,
} from "lucide-react";
import { Product, CompanySettings } from "@/lib/types";
import HarmonikaVisualizer, {
  BukaanType,
  ColorMode,
  StripStyle,
  COLOR_PRESETS,
  STRIP_PRESETS,
} from "./HarmonikaVisualizer";

export default function PriceCalculator({
  products,
  settings,
}: {
  products: Product[];
  settings: CompanySettings;
}) {
  const [width, setWidth] = useState<number>(3.5);
  const [height, setHeight] = useState<number>(3.0);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedProductId, setSelectedProductId] = useState<string>(
    products[0]?.id || ""
  );

  // Visualizer interactive states
  const [bukaanType, setBukaanType] = useState<BukaanType>("2_bukaan");
  const [hasPintuExtra, setHasPintuExtra] = useState<boolean>(false);
  const [colorMode, setColorMode] = useState<ColorMode>("1_warna");
  const [hasStrip, setHasStrip] = useState<boolean>(false);
  const [stripStyle, setStripStyle] = useState<StripStyle>("1_garis");
  const [primaryColorId, setPrimaryColorId] = useState<string>("maroon");
  const [secondaryColorId, setSecondaryColorId] = useState<string>("black");
  const [stripColorId, setStripColorId] = useState<string>("gold");

  // Synchronized options
  const isCustomColor = colorMode === "2_warna" || hasStrip || colorMode === "strip_warna";

  const handleCustomColorToggle = (checked: boolean) => {
    if (checked) {
      setHasStrip(true);
    } else {
      setHasStrip(false);
      setColorMode("1_warna");
    }
  };

  const selectedProduct =
    products.find((p) => p.id === selectedProductId) || products[0];

  const primaryColorObj =
    COLOR_PRESETS.find((c) => c.id === primaryColorId) || COLOR_PRESETS[0];
  const secondaryColorObj =
    COLOR_PRESETS.find((c) => c.id === secondaryColorId) || COLOR_PRESETS[1];
  const stripColorObj =
    STRIP_PRESETS.find((s) => s.id === stripColorId) || STRIP_PRESETS[0];

  const safeQuantity = Math.max(1, quantity || 1);
  const areaPerDoor = Math.max(0, width * height);
  // Ketentuan standar fabrikasi minimal 7 m² per pintu
  const effectiveAreaPerDoor = areaPerDoor < 7 && areaPerDoor > 0 ? 7 : areaPerDoor;
  const totalActualArea = areaPerDoor * safeQuantity;
  const totalCalculatedArea = effectiveAreaPerDoor * safeQuantity;

  const baseRate = selectedProduct ? selectedProduct.pricePerMeter : 1200000;
  const baseCost = totalCalculatedArea * baseRate;

  // Harga extra mengikuti harga dasarnya (dihitung per pintu jika dipilih)
  const extraCost = hasPintuExtra ? baseRate * safeQuantity : 0;
  // Finishing cat oven kombinasi / strip (Rp 350.000 per unit pintu)
  const dualColorCost = isCustomColor ? 350000 * safeQuantity : 0;
  const totalCost = baseCost + extraCost + dualColorCost;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getBukaanLabel = () => {
    const base =
      bukaanType === "1_bukaan"
        ? "Model 1 Bukaan (Geser 1 Arah)"
        : "Model 2 Bukaan (Tengah / Kupu-Tarung)";
    return hasPintuExtra ? `${base} + Pintu Extra (Bukaan Intip)` : base;
  };

  const getColorLabel = () => {
    let label = "";
    if (colorMode === "2_warna") {
      label = `Kombinasi 2 Warna Atas-Bawah (${primaryColorObj.name} Atas + ${secondaryColorObj.name} Bawah)`;
    } else {
      label = `1 Warna Solid (${primaryColorObj.name})`;
    }
    if (hasStrip || colorMode === "strip_warna") {
      label += ` + List Strip ${stripStyle === "1_garis" ? "1 Garis" : "2 Garis"} (${stripColorObj.name})`;
    }
    return label;
  };

  const selectedWarranty =
    selectedProduct?.warrantyInfo ||
    (selectedProduct?.name?.includes("SUPER") ? "Garansi 5 Tahun" : "Ber-garansi Servis Resmi");

  const generateWhatsAppMessage = () => {
    const text = `Halo Admin ${settings.companyName}, saya mau estimasi & pemesanan pintu harmonika:
- Ukuran: Lebar ${width} m x Tinggi ${height} m (@ ${areaPerDoor.toFixed(2)} m²/pintu)
- Jumlah Pintu: ${safeQuantity} Unit (Total Luas: ${totalCalculatedArea.toFixed(2)} m²)
- Tipe Varian: ${selectedProduct?.name} (Daun: ${selectedProduct?.daunThickness})
- Jaminan Garansi: ${selectedWarranty}
- Spesifikasi Rangka: ${selectedProduct?.frameSpec || selectedProduct?.unpSize}
- Galaran: ${selectedProduct?.galaran || "-"} | Silangan: ${selectedProduct?.silangan || selectedProduct?.stripThickness || "-"}
- Rel / Cakak / Pipa: ${selectedProduct?.relBesar || "-"} / ${selectedProduct?.cakakTiang || "-"} / ${selectedProduct?.pipaKotak || "-"}
- Model Bukaan: ${getBukaanLabel()}
- Skema Cat Oven: ${getColorLabel()}
- Opsi Pintu Extra (Bukaan Intip): ${hasPintuExtra ? `Ya (${safeQuantity} unit @ ${formatRupiah(baseRate)} mengikuti harga dasar)` : "Tidak"}
- Opsi Finishing Cat Kombinasi/Strip: ${isCustomColor ? `Ya (${safeQuantity} unit @ Rp 350.000)` : "Tidak"}
- Perkiraan Estimasi Web: ${formatRupiah(totalCost)}

Saya sudah mencoba simulasi visualisasi ruko di web. Mohon info ketersediaan jadwal survey lokasi gratis (se-Jawa Timur & se-Jawa Tengah) dan penawaran resminya. Terima kasih!`;

    return `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="bg-gradient-to-br from-[#2c040b] via-[#1c0206] to-[#120104] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl border-2 border-maroon-700/60 relative overflow-hidden space-y-8 sm:space-y-10">
      {/* Decorative background glow in maroon & gold */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-maroon-900/80">
          <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
            <div className="p-3 bg-red-950/80 border border-amber-400/50 rounded-2xl text-amber-400 shadow-xl shrink-0">
              <Calculator className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-amber-400 font-extrabold block">
                  Simulasi Cepat & Transparan
                </span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-black">
                  ✦ TERINTEGRASI VISUALISASI
                </span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                Kalkulator & Studio Visualisasi Pintu Harmonika Ruko
              </h3>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-2 text-xs text-rose-200 bg-black/40 border border-maroon-800/80 px-4 py-2 rounded-2xl">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Standard SNI Tebal Murni • Garansi Servis {settings.warrantyYears} Thn</span>
          </div>
        </div>

        <p className="text-rose-100/90 text-xs sm:text-sm mt-3 leading-relaxed max-w-4xl">
          Eksplorasi langsung model bukaan pintu harmonika (1 Pintu, 2 Pintu, atau Model Extra Swing), kustomisasi pilihan warna cat oven (1 Warna, 2 Warna, atau Tambahan Strip Aksen), serta hitung estimasi biaya instan sesuai ukuran ruko Anda.
        </p>
      </div>

      {/* ========================================================= */}
      {/* 1. VISUALISASI PINTU HARMONIKA RUKO (INTERACTIVE 3D STAGE) */}
      {/* ========================================================= */}
      <div className="relative z-10">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h4 className="text-xs sm:text-sm font-black text-amber-300 uppercase tracking-wider">
              Visualisasi Pintu Harmonika Pada Ruko
            </h4>
          </div>
          <span className="text-[11px] text-rose-300">
            Klik pintu pada gambar ruko untuk membuka / menutup animasi
          </span>
        </div>

        <HarmonikaVisualizer
          bukaanType={bukaanType}
          onBukaanTypeChange={setBukaanType}
          hasPintuExtra={hasPintuExtra}
          onHasPintuExtraChange={setHasPintuExtra}
          colorMode={colorMode}
          onColorModeChange={setColorMode}
          hasStrip={hasStrip}
          onHasStripChange={setHasStrip}
          primaryColorId={primaryColorId}
          onPrimaryColorChange={setPrimaryColorId}
          secondaryColorId={secondaryColorId}
          onSecondaryColorChange={setSecondaryColorId}
          stripColorId={stripColorId}
          onStripColorChange={setStripColorId}
          stripStyle={stripStyle}
          onStripStyleChange={setStripStyle}
          widthMeters={width}
          heightMeters={height}
        />
      </div>

      {/* ========================================================= */}
      {/* 2. CONTROLS & KALKULASI ESTIMASI BIAYA                    */}
      {/* ========================================================= */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start pt-4 border-t border-maroon-900/80">
        {/* Controls Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5 uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-amber-400" />
              Sesuaikan Ukuran & Spesifikasi Bahan:
            </h4>
            <span className="text-[11px] text-rose-300">
              Total Luas: <strong className="text-amber-300">{totalActualArea.toFixed(2)} m²</strong> ({safeQuantity} Unit @ {areaPerDoor.toFixed(2)} m²)
            </span>
          </div>

          {/* Input Dimensi Lebar, Tinggi & Jumlah Pintu */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-black/40 border border-maroon-800/80 rounded-2xl p-3.5 sm:p-4">
              <label className="text-xs font-bold text-rose-200 block mb-1">
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
                Contoh: 3.5 m per opening pintu
              </span>
            </div>

            <div className="bg-black/40 border border-maroon-800/80 rounded-2xl p-3.5 sm:p-4">
              <label className="text-xs font-bold text-rose-200 block mb-1">
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
                Contoh: 3.0 m tinggi plafon ruko
              </span>
            </div>

            <div className="bg-black/40 border border-maroon-800/80 rounded-2xl p-3.5 sm:p-4">
              <label className="text-xs font-bold text-rose-200 block mb-1">
                Jumlah Pintu (Unit)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="50"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-maroon-950/80 border border-maroon-700 rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-white font-bold text-base sm:text-lg focus:outline-none focus:border-amber-400"
                />
                <span className="text-sm font-bold text-rose-300">Unit</span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-rose-300/70 mt-1 block">
                Contoh: 1 unit, 2 unit ruko, dst.
              </span>
            </div>
          </div>

          {/* Select Product Type */}
          <div className="space-y-3">
            <label className="text-xs sm:text-sm font-bold text-white block">
              Pilih Varian Kualitas & Ketebalan Plat Daun:
            </label>

            {/* Row 1: SUPER 1 & SUPER 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {(products.filter((p) => p.name.includes("SUPER")).length > 0
                ? products.filter((p) => p.name.includes("SUPER"))
                : products.slice(0, 2)
              ).map((p) => {
                const isSelected = p.id === selectedProductId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedProductId(p.id)}
                    className={`text-left p-3 sm:p-3.5 rounded-2xl border transition-all active:scale-98 min-h-[48px] ${
                      isSelected
                        ? "bg-maroon-900/90 border-amber-400 ring-2 ring-amber-400/40 text-white shadow-lg"
                        : "bg-black/40 border-maroon-900 text-rose-200 hover:bg-maroon-950/50"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-black text-xs sm:text-sm text-white whitespace-nowrap">
                          {p.name}
                        </span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/25 to-amber-500/20 text-amber-300 border border-amber-400/50 shadow-xs whitespace-nowrap shrink-0">
                        <ShieldCheck className="w-3 h-3 text-amber-400 fill-amber-400/20" />
                        {p.warrantyInfo || "Garansi 5 Tahun"}
                      </span>
                    </div>
                    <div className="text-[11px] sm:text-xs text-rose-200 leading-snug">
                      Daun: <span className="text-amber-300 font-bold">{p.daunThickness}</span> • Rangka:{" "}
                      <span className="text-rose-100 font-medium">{p.frameSpec || p.unpSize}</span>
                    </div>
                    <div className="text-[11px] sm:text-xs font-bold text-emerald-400 mt-1">
                      {p.priceDisplay}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Row 2: KELAS 1, KELAS 2, KELAS 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {(products.filter((p) => !p.name.includes("SUPER")).length > 0
                ? products.filter((p) => !p.name.includes("SUPER"))
                : products.slice(2)
              ).map((p) => {
                const isSelected = p.id === selectedProductId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedProductId(p.id)}
                    className={`text-left p-3 sm:p-3.5 rounded-2xl border transition-all active:scale-98 min-h-[48px] ${
                      isSelected
                        ? "bg-maroon-900/90 border-amber-400 ring-2 ring-amber-400/40 text-white shadow-lg"
                        : "bg-black/40 border-maroon-900 text-rose-200 hover:bg-maroon-950/50"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-black text-xs sm:text-sm text-white whitespace-nowrap">
                          {p.name}
                        </span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[9.5px] font-black px-1.5 py-0.5 rounded-full bg-gradient-to-r from-slate-400/20 to-slate-200/20 text-slate-200 border border-slate-300/40 shadow-xs whitespace-nowrap shrink-0">
                        <ShieldCheck className="w-2.5 h-2.5 text-slate-300" />
                        {p.warrantyInfo || "Ber-garansi Servis Resmi"}
                      </span>
                    </div>
                    <div className="text-[11px] sm:text-xs text-rose-200 leading-snug">
                      Daun: <span className="text-amber-300 font-bold">{p.daunThickness}</span> • Rangka:{" "}
                      <span className="text-rose-100 font-medium">{p.frameSpec || p.unpSize}</span>
                    </div>
                    <div className="text-[11px] sm:text-xs font-bold text-emerald-400 mt-1">
                      {p.priceDisplay}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Extra Options (Pintu Extra & Dual Color) */}
          <div className="space-y-2.5 sm:space-y-3 pt-3 border-t border-maroon-900">
            <div className="flex items-center justify-between">
              <label className="text-[11px] sm:text-xs font-bold uppercase text-amber-300 tracking-wider block">
                Opsi Tambahan Terintegrasi:
              </label>
              <span className="text-[10px] text-rose-300/80">
                Terkoneksi langsung dengan visualizer di atas
              </span>
            </div>

            {/* Opsi Pintu Extra (Harga mengikuti harga dasar) */}
            <label className="flex items-center space-x-3 bg-black/40 border border-maroon-900 p-3 sm:p-3.5 rounded-2xl cursor-pointer hover:bg-maroon-950/50 transition-colors active:scale-98">
              <input
                type="checkbox"
                checked={hasPintuExtra}
                onChange={(e) => setHasPintuExtra(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 focus:ring-amber-400 bg-maroon-950 border-maroon-700 shrink-0"
              />
              <span className="font-bold text-xs sm:text-sm text-white block">
                Pakai Pintu Extra / Bukaan Intip (+{formatRupiah(baseRate)})
              </span>
            </label>

            {/* Opsi Cat Duco Oven 2 Warna Atas-Bawah / Strip (Rp 350.000) */}
            <label className="flex items-center space-x-3 bg-black/40 border border-maroon-900 p-3 sm:p-3.5 rounded-2xl cursor-pointer hover:bg-maroon-950/50 transition-colors active:scale-98">
              <input
                type="checkbox"
                checked={isCustomColor}
                onChange={(e) => handleCustomColorToggle(e.target.checked)}
                className="w-4 h-4 rounded text-red-600 focus:ring-amber-400 bg-maroon-950 border-maroon-700 shrink-0"
              />
              <span className="font-bold text-xs sm:text-sm text-white block">
                Finishing Cat Oven Khusus (Kombinasi 2 Warna / List Strip Aksen) (+Rp 350.000)
              </span>
            </label>
          </div>
        </div>

        {/* Result & Summary Column (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-maroon-900/90 via-maroon-950 to-black/95 border-2 border-amber-400/50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4">
          <div>
            <span className="text-[10px] sm:text-xs uppercase font-extrabold text-amber-400 tracking-wider block mb-1">
              Ringkasan Estimasi Biaya
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">
              {formatRupiah(totalCost)}
            </div>
            <p className="text-[11px] text-rose-200/80 mt-0.5">
              Sudah termasuk perakitan komplit, rel atas-bawah, kunci, dan pemasangan.
            </p>
          </div>

          <div className="space-y-2 text-xs text-rose-100 pb-4 border-b border-maroon-800">
            <div className="flex justify-between">
              <span>Dimensi Opening:</span>
              <span className="font-bold text-white">
                {width} m × {height} m ({areaPerDoor.toFixed(2)} m² / pintu)
              </span>
            </div>

            <div className="flex justify-between">
              <span>Jumlah Pintu:</span>
              <span className="font-bold text-amber-300">
                {safeQuantity} Unit
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Luas Terhitung:</span>
              <span className="font-bold text-white">
                {totalCalculatedArea.toFixed(2)} m²
              </span>
            </div>

            {areaPerDoor < 7 && areaPerDoor > 0 && (
              <div className="text-[10px] sm:text-[11px] text-amber-300 italic bg-amber-950/40 border border-amber-500/30 p-2 rounded-xl">
                * Ketentuan standar fabrikasi: luas opening di bawah 7 m² per unit dihitung minimal 7 m² (7 m² × {safeQuantity} unit = {totalCalculatedArea.toFixed(2)} m²).
              </div>
            )}

            <div className="flex justify-between items-center">
              <span>Tipe Varian:</span>
              <span className="font-extrabold text-amber-300">
                {selectedProduct?.name}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Jaminan Garansi:</span>
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  selectedProduct?.warrantyInfo?.includes("5") || selectedProduct?.name?.includes("SUPER")
                    ? "text-amber-300 bg-amber-950/80 border border-amber-400/50 shadow-xs"
                    : "text-slate-200 bg-slate-800/80 border border-slate-300/40 shadow-xs"
                }`}
              >
                <ShieldCheck
                  className={`w-3.5 h-3.5 ${
                    selectedProduct?.warrantyInfo?.includes("5") || selectedProduct?.name?.includes("SUPER")
                      ? "text-amber-400 fill-amber-400/20"
                      : "text-slate-300"
                  }`}
                />
                {selectedWarranty}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Harga Dasar / m²:</span>
              <span className="font-semibold text-emerald-400">
                {formatRupiah(baseRate)} / m²
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tebal Daun Rol:</span>
              <span className="font-semibold text-white">
                {selectedProduct?.daunThickness}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Spesifikasi Rangka:</span>
              <span className="font-medium text-white text-right max-w-[200px]">
                {selectedProduct?.frameSpec || selectedProduct?.unpSize}
              </span>
            </div>

            {selectedProduct?.galaran && (
              <div className="flex justify-between text-rose-200/90">
                <span>Galaran:</span>
                <span className="font-medium text-white">{selectedProduct.galaran}</span>
              </div>
            )}

            {selectedProduct?.silangan && (
              <div className="flex justify-between text-rose-200/90">
                <span>Plat Silangan:</span>
                <span className="font-medium text-white">{selectedProduct.silangan}</span>
              </div>
            )}

            {selectedProduct?.relBesar && (
              <div className="flex justify-between text-rose-200/90">
                <span>Rel / B. Besar:</span>
                <span className="font-medium text-white">{selectedProduct.relBesar}</span>
              </div>
            )}

            {selectedProduct?.cakakTiang && (
              <div className="flex justify-between text-rose-200/90">
                <span>Cakak Tiang:</span>
                <span className="font-medium text-white">{selectedProduct.cakakTiang}</span>
              </div>
            )}

            {selectedProduct?.pipaKotak && (
              <div className="flex justify-between text-rose-200/90">
                <span>Pipa Kotak:</span>
                <span className="font-medium text-white">{selectedProduct.pipaKotak}</span>
              </div>
            )}

            {selectedProduct?.platTopi && (
              <div className="flex justify-between text-rose-200/90">
                <span>Plat Topi:</span>
                <span className="font-medium text-white">{selectedProduct.platTopi}</span>
              </div>
            )}

            {selectedProduct?.usageRecommendation && (
              <div className="text-[11px] text-amber-200/90 pt-1 border-t border-maroon-800/60">
                <span className="block text-slate-400 text-[10px] uppercase font-bold">Rekomendasi:</span>
                <span>{selectedProduct.usageRecommendation}</span>
              </div>
            )}

            <div className="flex justify-between pt-1 border-t border-maroon-800/60">
              <span>Model Bukaan:</span>
              <span className="font-bold text-amber-300 text-right max-w-[170px] truncate">
                {getBukaanLabel()}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Finishing Warna:</span>
              <span className="font-medium text-rose-200 text-right max-w-[170px] truncate">
                {getColorLabel()}
              </span>
            </div>

            {hasPintuExtra && (
              <div className="flex justify-between text-amber-300 font-bold bg-maroon-950/70 p-2 rounded-xl border border-amber-500/30">
                <span>+ Pintu Extra {safeQuantity > 1 ? `(${safeQuantity} unit × ${formatRupiah(baseRate)})` : "(Harga Dasar)"}:</span>
                <span>{formatRupiah(extraCost)}</span>
              </div>
            )}

            {isCustomColor && (
              <div className="flex justify-between text-amber-300 font-bold bg-maroon-950/70 p-2 rounded-xl border border-amber-500/30">
                <span>+ Finishing Cat Oven {safeQuantity > 1 ? `(${safeQuantity} unit × Rp 350.000)` : "(Kombinasi / Strip)"}:</span>
                <span>{formatRupiah(dualColorCost)}</span>
              </div>
            )}
          </div>

          <div className="py-1 space-y-1.5 text-xs text-emerald-400 font-medium">
            <div className="flex items-center">
              <Check className="w-3.5 h-3.5 mr-2 shrink-0 text-emerald-400" />
              <span>Survey Lokasi & Pengukuran Gratis Se-Jawa Timur & Se-Jawa Tengah</span>
            </div>
            <div className="flex items-center">
              <Check className="w-3.5 h-3.5 mr-2 shrink-0 text-emerald-400" />
              <span>Pemasangan Presisi Teknisi Berpengalaman</span>
            </div>
            <div className="flex items-center">
              <Check className="w-3.5 h-3.5 mr-2 shrink-0 text-emerald-400" />
              <span>
                {selectedProduct?.warrantyInfo?.includes("5") || selectedProduct?.name?.includes("SUPER")
                  ? "Garansi Servis Resmi 5 Tahun"
                  : "Ber-garansi Servis Resmi"}
              </span>
            </div>
          </div>

          <a
            href={generateWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full inline-flex items-center justify-center px-5 py-3.5 sm:py-4 rounded-2xl font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 transition-all shadow-xl shadow-amber-500/20 active:scale-98 border border-amber-200 min-h-[48px]"
          >
            <MessageCircle className="w-4 h-4 mr-2 fill-slate-950 shrink-0" />
            Kirim Hasil Simulasi ke WhatsApp
            <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
          </a>

          <p className="text-[10px] sm:text-[11px] text-center text-rose-300/80">
            Estimasi harga dapat disesuaikan dengan kondisi lapangan saat survey resmi.
          </p>
        </div>
      </div>
    </div>
  );
}
