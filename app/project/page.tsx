import { Metadata } from "next";
import { getSettings, getProjects } from "@/lib/db";
import ProjectsList from "@/components/ProjectsList";

export const metadata: Metadata = {
  title: "Portofolio & List Project Pintu Harmonika Selesai Terpasang",
  description:
    "Dokumentasi proyek pemasangan pintu harmonika pada ruko, pasar modern, pergudangan industri, dan garasi rumah tinggal.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectsPage() {
  const settings = await getSettings();
  const projects = await getProjects();

  return (
    <div className="space-y-16 py-12">
      {/* Header Banner: Rich Maroon */}
      <div className="bg-gradient-to-r from-maroon-950 via-[#2a040b] to-maroon-950 text-white py-14 sm:py-16 border-b-2 border-maroon-800">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            Rekam Jejak Kualitas
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Galeri Portofolio Proyek
          </h1>
          <p className="text-rose-100/90 text-sm sm:text-base mt-4 leading-relaxed">
            Lebih dari {settings.completedProjects.toLocaleString("id-ID")}+ unit pintu harmonika telah kami pasang dengan aman dan rapi di {settings.citiesServed}+ kota. Berikut adalah sebagian dokumentasi proyek lapangan kami.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <ProjectsList projects={projects} settings={settings} />
      </div>
    </div>
  );
}
