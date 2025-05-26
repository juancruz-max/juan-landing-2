import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Panel de Administración - Cromax",
  description: "Panel de administración para gestionar el contenido del sitio web",
};

export default function AdminLayout({
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
        <main>{children}</main>
      </body>
    </html>
  );
}
