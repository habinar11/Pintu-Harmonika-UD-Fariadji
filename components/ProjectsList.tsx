"use client";

import { useState } from "react";
import { ProjectItem, CompanySettings } from "@/lib/types";
import { MapPin, MessageCircle } from "lucide-react";

export default function ProjectsList({
  projects,
  settings,
}: {
  projects: ProjectItem[];
  settings: CompanySettings;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const categories = [
    "Semua",
    "Ruko & Komersial",
    "Gudang & Industri",
    "Garasi Rumah",
    "Toko & Pasar",
  ];

  const filteredProjects =
    selectedCategory === "Semua"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-10">
      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? "bg-maroon-800 text-white shadow-md shadow-maroon-900/30 border border-amber-400/30"
                  : "bg-white text-slate-700 hover:bg-rose-50 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => {
          const waUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
            `Halo Admin ${settings.companyName}, saya melihat proyek "${project.title}" di website. Saya ingin memesan pintu harmonika dengan model serupa.`
          )}`;

          return (
            <div
              key={project.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-maroon-300"
            >
              <div className="relative h-60 overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-maroon-950/90 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30">
                  {project.category}
                </div>
                {project.isFeatured && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-1 rounded-full shadow-md">
                    Proyek Pilihan
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center text-xs font-bold text-maroon-700 mb-2">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-lg mb-2 leading-snug group-hover:text-maroon-800 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700 bg-rose-50/40 p-3.5 rounded-2xl border border-rose-100">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Klien / Pemilik:</span>
                      <span className="font-semibold text-slate-900">{project.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tipe Pintu:</span>
                      <span className="font-semibold text-maroon-800">{project.productType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Volume / Unit:</span>
                      <span className="font-medium text-slate-800">{project.unitsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tahun Pasang:</span>
                      <span className="font-medium text-slate-800">{project.year}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-maroon-800 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                  Pesan Model Serupa Seperti Ini
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
          <p className="text-slate-500 text-sm">Tidak ada proyek dalam kategori ini.</p>
        </div>
      )}
    </div>
  );
}
