import { Metadata } from "next";
import { getSettings } from "@/lib/db";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Hubungi Kami & Lokasi Workshop Pabrik Pintu Harmonika",
  description:
    "Hubungi kontak kami untuk konsultasi, penawaran harga, dan jadwal survey lokasi gratis pintu harmonika.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function KontakPage() {
  const settings = await getSettings();

  const waUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Halo Admin ${settings.companyName}, saya ingin menanyakan lokasi workshop dan jadwal survey pintu harmonika.`
  )}`;

  return (
    <div className="space-y-16 py-12">
      {/* Header Banner: Rich Maroon */}
      <div className="bg-gradient-to-r from-maroon-950 via-[#2a040b] to-maroon-950 text-white py-14 sm:py-16 border-b-2 border-maroon-800">
        <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 text-center max-w-3xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
            Konsultasi & Layanan Cepat
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Hubungi Kami & Workshop
          </h1>
          <p className="text-rose-100/90 text-sm sm:text-base mt-4 leading-relaxed">
            Pintu komunikasi kami selalu terbuka. Tim customer care dan teknisi lapangan siap membantu kebutuhan keamanan ruko dan hunian Anda.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info Cards & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 hover:border-maroon-300 transition-colors">
              <h3 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4">
                Informasi Kantor & Pabrik
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 bg-rose-50 text-maroon-700 rounded-xl shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Alamat Kantor Pemasaran:</span>
                    <span className="text-slate-600 leading-relaxed block mt-0.5">
                      {settings.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2.5 bg-rose-50 text-maroon-700 rounded-xl shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Alamat Workshop Perakitan:</span>
                    <span className="text-slate-600 leading-relaxed block mt-0.5">
                      {settings.workshopAddress}
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Telepon / WhatsApp CS:</span>
                    <a
                      href={`tel:${settings.phone}`}
                      className="text-emerald-700 font-bold hover:underline block mt-0.5"
                    >
                      {settings.phone} / {settings.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Email Perusahaan:</span>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-slate-600 hover:text-maroon-700 block mt-0.5"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2.5 bg-rose-50 text-maroon-700 rounded-xl shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Jam Operasional:</span>
                    <span className="text-slate-600 block mt-0.5">
                      {settings.workingHours}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-700 to-maroon-900 hover:from-red-600 hover:to-maroon-800 transition-all shadow-lg border border-amber-400/30"
                >
                  <MessageCircle className="w-4 h-4 mr-2 fill-white" />
                  Hubungi CS Langsung via WhatsApp
                </a>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm p-2">
              <iframe
                src={settings.googleMapsEmbed}
                width="100%"
                height="260"
                style={{ border: 0, borderRadius: "1.25rem" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Workshop"
              />
            </div>
          </div>

          {/* Right Column: Contact & Survey Request Form */}
          <div className="lg:col-span-7">
            <ContactForm settings={settings} />
          </div>
        </div>
      </div>
    </div>
  );
}
