"use client";

import { motion } from "framer-motion";
import { Modules as ModulesType } from "../types/content";
import Image from "next/image";

interface ModulesProps extends ModulesType {}

const getModuleImage = (index: number) => {
  const images = [
    "/definicion de tu cliente ideal desde cero.png",
    "/dominio de linkedin e instagram para prospeccion.png",
    "/gestion de crm para tus clientes.png",
    "/estrategias de email marketing que generan .png"
  ];
  return images[index % images.length];
};

const getModuleIcon = (index: number) => {
  const icons = [
    // Fundamentos - icono de personas/networking
    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>,
    // Estrategias - icono de estrategia/planificación
    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0-8h2a2 2 0 012 2v6a2 2 0 01-2 2H9m0-8v8m0-8h6m-6 8h6m6-8v8a2 2 0 01-2 2h-6m8-10V7a2 2 0 00-2-2h-6a2 2 0 00-2 2v2m8 0V7a2 2 0 00-2-2h-6a2 2 0 00-2 2v2" />
    </svg>,
    // Análisis - icono de gráficos/analytics
    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>,
    // Comunicación - icono de email/mensajes
    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ];
  return icons[index % icons.length];
};

const Modules = ({ title, sections }: ModulesProps) => {
  return (
    <section id="modulos" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-72 h-72 bg-primary/5 md:bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/5 md:bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full transform-gpu relative overflow-hidden group shadow-[0_4px_20px_-1px_rgba(20,97,149,0.05)] hover:shadow-[0_8px_30px_rgba(20,97,149,0.12)]"
                whileHover={{
                  scale: 1.02,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white/40 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="mb-6 relative w-full h-48 rounded-xl overflow-hidden bg-gray-50">
                    <Image
                      src={getModuleImage(index)}
                      alt={section.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modules;
