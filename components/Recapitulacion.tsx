"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Recapitulacion as RecapitulacionType } from "../types/content";

interface RecapitulacionProps extends RecapitulacionType {}

const moduleImages = [
  "/definicion de tu cliente ideal desde cero.png",
  "/dominio de linkedin e instagram para prospeccion.png",
  "/gestion de crm para tus clientes.png",
  "/estrategias de email marketing que generan .png",
];

const extraImages = [
  "/comunidad exclusiva.png",
  "/clases grabadas, material de trabajo.png",
  "/1 sesion de consultoria.png",
];

const Recapitulacion = ({
  title,
  subtitle,
  modules,
  extras,
  totalPrice,
  finalPrice,
  futurePrice,
  priceNote,
  cta,
}: RecapitulacionProps) => {
  return (
    <section
      id="recapitulacion"
      className="py-24 relative overflow-hidden bg-gradient-to-br from-primary/5 via-white/80 to-accent/10"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [45, 0, 45] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            {subtitle || "Esto es todo lo que recibís al unirte hoy a Cromax Academy"}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Modules Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-semibold mb-8 text-primary">
              Módulos del Curso
            </h3>
            <div className="space-y-6">
              {modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="relative w-24 h-24 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-primary/10 mx-auto sm:mx-0">
                    <Image
                      src={moduleImages[index]}
                      alt={module.title}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h4 className="text-base sm:text-lg font-bold text-primary mb-1 break-words">
                      {module.title}
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base break-words">
                      {module.description}
                    </p>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-accent text-center sm:text-right whitespace-nowrap mt-2 sm:mt-0">
                    Valuado en{" "}
                    <span className="text-xl sm:text-2xl">${module.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Extras Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-semibold mb-8 text-accent">
              Bonos Exclusivos
            </h3>
            <div className="space-y-6">
              {extras.map((extra, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-xl border border-accent/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="relative w-24 h-24 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-accent/10 mx-auto sm:mx-0">
                    <Image
                      src={extraImages[index]}
                      alt={extra.title}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 break-words">
                      {extra.title}
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base break-words">
                      {extra.description}
                    </p>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-accent text-center sm:text-right whitespace-nowrap mt-2 sm:mt-0">
                    Valuado en{" "}
                    <span className="text-xl sm:text-2xl">${extra.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Total Price Section - Más llamativa y persuasiva */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative bg-gradient-to-br from-primary/90 via-accent/80 to-primary/70 rounded-3xl p-10 text-center shadow-2xl border-4 border-white/80 mb-4"
          >
            <div className="mb-4">
              <span className="block text-lg text-white/80 mb-2 font-semibold tracking-wide">
                Valor total de todo lo anterior
              </span>
              <span className="text-4xl md:text-5xl font-extrabold text-white line-through drop-shadow-lg">
                ${totalPrice}
              </span>
            </div>
            <div className="mb-4">
              <span className="block text-lg text-white/90 mb-2 font-semibold tracking-wide">
                Hoy accedés a todo por solo
              </span>
              <span className="text-5xl md:text-6xl font-extrabold text-yellow-300 drop-shadow-xl animate-pulse">
                ${finalPrice}
              </span>
            </div>

            {futurePrice && (
              <div className="mb-4">
                <span className="block text-sm text-white/70 mb-1">
                  Precio después: <span className="line-through">${futurePrice}</span>
                </span>
                {priceNote && (
                  <span className="block text-xs text-white/60 italic">
                    {priceNote}
                  </span>
                )}
              </div>
            )}
            <motion.a
              href={cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-10 py-5 rounded-2xl text-lg sm:text-2xl font-bold shadow-xl hover:bg-green-700 transition-all border-2 border-primary/30"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              {cta.text}
            </motion.a>
            <div className="mt-4 text-white/80 text-sm font-medium">
              Oferta especial por tiempo limitado. Acceso inmediato y de por
              vida.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Recapitulacion;
