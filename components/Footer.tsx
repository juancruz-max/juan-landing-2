"use client";

import Image from "next/image";
import { FooterSettings } from "../types/content";

interface FooterProps extends FooterSettings {}

const Footer = ({
  companyName,
  email,
  socialLinks
}: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const handleScrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Inicio", href: "#" },
    { name: "Beneficios", href: "#beneficios" },
    { name: "Testimonios", href: "#testimonials" },
    { name: "Precios", href: "#precios" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <footer className="border-t border-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Desktop layout - Flex row */}
        <div className="hidden md:flex md:items-center md:justify-between">
          {/* Logo y LinkedIn */}
          <div className="flex items-center">
            <Image
              src="/cromax.png"
              alt="Cromax"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="ml-2 text-base font-medium text-gray-800">
              {companyName}
            </span>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="ml-2"
            >
              <svg
                className="w-4 h-4 text-[#0A66C2]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          </div>

          {/* Enlaces de navegación */}
          <nav>
            <ul className="flex items-center gap-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleScrollToSection(link.href)}
                    className="text-sm text-gray-500 hover:text-[#4188fa] transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="flex items-center space-x-5">
            <a
              href={`mailto:${email}`}
              className="text-sm text-gray-500 hover:text-[#4188fa] transition-colors"
            >
              {email}
            </a>
          </div>
        </div>

        {/* Mobile layout - Stack */}
        <div className="flex flex-col md:hidden">
          {/* Logo y LinkedIn */}
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/cromax.png"
              alt="Cromax"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="ml-2 text-base font-medium text-gray-800">
              {companyName}
            </span>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="ml-2"
            >
              <svg
                className="w-4 h-4 text-[#0A66C2]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          </div>

          {/* Enlaces de navegación */}
          <nav className="mb-6">
            <ul className="flex flex-wrap justify-center gap-5">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleScrollToSection(link.href)}
                    className="text-sm text-gray-500 hover:text-[#4188fa] transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <a
              href={`mailto:${email}`}
              className="text-sm text-gray-500 hover:text-[#4188fa] transition-colors"
            >
              {email}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-xs mt-8">
          © {currentYear} {companyName}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
