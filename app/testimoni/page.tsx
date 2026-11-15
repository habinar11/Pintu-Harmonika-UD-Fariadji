import { Metadata } from "next";
import { getSettings, getTestimonials } from "@/lib/db";
import TestimonialListAndForm from "@/components/TestimonialListAndForm";

export const metadata: Metadata = {
  title: "Testimoni & Ulasan Pelanggan Pintu Harmonika",
  description:
    "Ulasan nyata dari pemilik ruko, toko emas, gudang pabrik, dan kontraktor yang telah memasang pintu harmonika kami.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TestimonialsPage() {
  const settings = await getSettings();
  const testimonials = await getTestimonials();

  return (
    <div className="space-y-16 py-12">
      {/* Header Banner: Rich Maroon */}
      <div className="bg-gradient-to-r from-maroon-950 via-[#2a040b] to-maroon-950 text-white py-14 sm:py-16 border-b-2 border-maroon-800">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            Pengalaman Pengguna Nyata
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ulasan & Testimoni Pelanggan
          </h1>
          <p className="text-rose-100/90 text-sm sm:text-base mt-4 leading-relaxed">
            Dengarkan langsung cerita pelanggan kami tentang kekuatan bahan, dorongan roda yang ringan tanpa macet, serta komitmen garansi servis kami.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <TestimonialListAndForm testimonials={testimonials} settings={settings} />
      </div>
    </div>
  );
}
