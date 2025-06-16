import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
/* import Header from "@/components/Header"; */
import Footer from "@/components/Footer";
import content from "@/data/content.json";
import { Content } from "../types/content";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cromax Academy - Academia de Marketing Digital",
  description:
    "Aprende desde cero una de las profesiones más rentables para comenzar a generar ingresos por internet. Sin experiencia previa necesaria.",
  keywords: "marketing digital, academia online, ingresos por internet, formación digital, cromax academy",
  authors: [{ name: "Cromax Academy" }],
  creator: "Cromax Academy",
  publisher: "Cromax Academy",

  // Open Graph meta tags para redes sociales
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://academy.cromaxstrategies.com",
    siteName: "Cromax Academy",
    title: "Cromax Academy - Academia de Marketing Digital",
    description: "Aprende desde cero una de las profesiones más rentables para comenzar a generar ingresos por internet. Sin experiencia previa necesaria.",
    images: [
      {
        url: "/cromax.png",
        width: 1200,
        height: 630,
        alt: "Cromax Academy - Academia de Marketing Digital",
        type: "image/png",
      },
    ],
  },

  // Twitter Card meta tags
  twitter: {
    card: "summary_large_image",
    site: "@cromax_academy", // Reemplaza con tu handle de Twitter si lo tienes
    creator: "@cromax_academy",
    title: "Cromax Academy - Academia de Marketing Digital",
    description: "Aprende desde cero una de las profesiones más rentables para comenzar a generar ingresos por internet. Sin experiencia previa necesaria.",
    images: ["/cromax.png"],
  },

  // Meta tags adicionales
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verificación y otros meta tags
  verification: {
    // google: "tu-codigo-de-verificacion-google", // Descomenta y agrega tu código cuando lo tengas
    // yandex: "tu-codigo-de-verificacion-yandex",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body
        className={`${inter.className} antialiased bg-gradient-to-br from-white via-gray-50 to-blue-50 min-h-screen`}
      >
        {/* Background mesh gradient */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      {/*   <Header /> */}
        <main>{children}</main>
        <Footer {...(content as Content).footer} />
      </body>
    </html>
  );
}
