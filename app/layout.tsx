import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import HarmonikaOpeningPopup from "@/components/HarmonikaOpeningPopup";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: {
      default: `${settings.companyName} | Pabrik & Fabrikasi Pintu Harmonika`,
      template: `%s | ${settings.companyName}`,
    },
    description: `${settings.tagline}. Melayani pesanan pintu harmonika tebal murni SNI, anti anjlok, roda bearing jepang, bergaransi resmi hingga ${settings.warrantyYears} tahun.`,
    keywords: [
      "pintu harmonika",
      "pabrik pintu harmonika",
      "harga pintu harmonika per meter",
      "folding gate",
      "pintu harmonika ruko",
      "pintu harmonika garasi",
      "pintu harmonika gudang",
      "bengkel las pintu harmonika",
      "pintu besi lipat harmonika",
    ],
    authors: [{ name: settings.companyName }],
    openGraph: {
      title: `${settings.companyName} | Spesialis Pintu Harmonika Bergaransi`,
      description: settings.heroSubtitle,
      type: "website",
      locale: "id_ID",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 antialiased`}>
        <Navbar settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <WhatsAppFloating phone={settings.whatsapp} companyName={settings.companyName} />
        <HarmonikaOpeningPopup settings={settings} />
      </body>
    </html>
  );
}
