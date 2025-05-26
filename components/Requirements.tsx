"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Requirements as RequirementsType } from "../types/content";

interface RequirementsProps extends RequirementsType {}

const Requirements = ({ title, subtitle, cta, items }: RequirementsProps) => {
  const getIconForIndex = (index: number) => {
    const icons = [
      <svg
        key="icon-1"
        className="w-6 h-6 text-[#4188fa]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>,
      <svg
        key="icon-2"
        className="w-6 h-6 text-[#4188fa]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>,
      <svg
        key="icon-3"
        className="w-6 h-6 text-[#4188fa]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ];

    return icons[index % icons.length];
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-blue-50 opacity-70" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-lg relative overflow-hidden">
            {/* Decorative background blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4188fa]/5 to-transparent opacity-50 pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 text-center">
                Requisitos
              </h3>
              <div className="space-y-6">
                {items.map((req, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/30 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0 mt-1 bg-[#4188fa]/10 p-3 rounded-lg">
                        {getIconForIndex(index)}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">
                          {req.title}
                        </h4>
                        <p className="text-gray-600 text-lg">
                          {req.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6 text-lg">
            Si cumples con estos requisitos, agenda una llamada gratuita para
            explorar cómo podemos ayudarte
          </p>
          <Link
            href="#agenda"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("agenda");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#4188fa] hover:bg-[#2563eb] transition-colors duration-300"
          >
            {cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Requirements;
