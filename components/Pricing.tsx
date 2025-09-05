"use client";

import { motion } from "framer-motion";
import { Pricing as PricingType } from "../types/content";

interface PricingProps extends PricingType {}

const Pricing = ({ title, note, cta, limitedOffer }: PricingProps) => {
  return (
    <section
      id="precios"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-40 h-40 sm:w-60 sm:h-60 lg:w-72 lg:h-72 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white px-2">
            {title}
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-sm sm:max-w-md mx-auto px-4 sm:px-0"
          >
            <motion.div
              className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl"
              whileHover={{
                scale: 1.02,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center">
                {/* Badge de urgencia */}
                {limitedOffer?.isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-bold mb-4 sm:mb-6 shadow-lg"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      🔥
                    </motion.span>
                    {limitedOffer.urgencyText}
                  </motion.div>
                )}

                <div className="mb-4 sm:mb-6">
                  {/* Precio original */}
                  <div className="mb-4">
                    <span className="text-lg sm:text-xl text-gray-500 line-through">
                      {limitedOffer?.originalPrice || "$2,197 USD"}
                    </span>
                  </div>

                  {/* Precio actual destacado */}
                  <div className="flex flex-col items-center justify-center gap-2 mb-3">
                    {limitedOffer?.isActive && (
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-lg text-sm font-bold"
                      >
                        AHORA
                      </motion.div>
                    )}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
                        $300
                      </span>
                      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                        USD
                      </span>
                    </div>
                  </div>

                  {/* Precio futuro - después del precio actual */}
                  {limitedOffer?.isActive && (
                    <div className="mb-2">
                      <span className="text-sm sm:text-base text-gray-400 line-through">
                        Precio después: {limitedOffer.futurePrice}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-6 sm:mb-8 text-xs sm:text-sm px-2">
                  {note}
                </p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mb-4 sm:mb-6"
                >
                  <a
                    href={cta.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full bg-green-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                  >
                    {cta.text}
                  </a>
                </motion.div>

                <div className="flex items-center justify-center space-x-2 text-primary">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">
                    Pago seguro
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4"
          >
            <div className="text-center text-white">
              <div className="mb-2">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-blue-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-sm sm:text-base">
                Acceso Inmediato
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm">
                Comienza hoy mismo
              </p>
            </div>

            <div className="text-center text-white">
              <div className="mb-2">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-blue-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-sm sm:text-base">
                De por vida
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm">
                Sin pagos recurrentes
              </p>
            </div>

            <div className="text-center text-white">
              <div className="mb-2">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-blue-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-1 text-sm sm:text-base">
                Actualizaciones
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm">
                Contenido nuevo incluido
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
