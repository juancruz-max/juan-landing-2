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
