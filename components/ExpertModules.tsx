"use client";

import { motion } from "framer-motion";
import { ExpertModules as ExpertModulesType } from "../types/content";
import Image from "next/image";

interface ExpertModulesProps extends ExpertModulesType {}

const ExpertModules = ({ title, subtitle, experts }: ExpertModulesProps) => {
  return (
    <section id="expert-modules" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-red-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Badge de urgencia */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg"
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎁
            </motion.span>
            BONOS EXCLUSIVOS
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Expert Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {experts.map((expert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <motion.div
                className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-6 sm:p-8 h-full min-h-[600px] lg:min-h-[650px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Header with photo and title */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
                  <motion.div
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-gradient-to-r from-orange-400 to-red-400 flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 80px, 96px"
                    />
                  </motion.div>
                  <div className="text-center sm:text-left flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                      {expert.name}
                    </h3>
                    <p className="text-orange-600 font-semibold text-base sm:text-lg mb-1">
                      {expert.title}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {expert.location}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-6 flex-shrink-0">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {expert.bio}
                  </p>
                </div>

                {/* Learning Points */}
                <div className="mb-6 flex-grow">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    ¿Qué van a aprender{expert.title.includes('módulo') ? ' en este módulo' : ''}?
                  </h4>
                  <ul className="space-y-2">
                    {expert.learningPoints.map((point, pointIndex) => (
                      <motion.li
                        key={pointIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: pointIndex * 0.05 }}
                        className="flex items-start gap-3 text-sm sm:text-base"
                      >
                        <span className="text-orange-500 text-lg flex-shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="text-gray-700 leading-relaxed">
                          {point}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Final Note */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 sm:p-6 border border-orange-200/50 flex-shrink-0 mt-auto">
                  <p className="text-gray-800 font-semibold text-sm sm:text-base mb-2">
                    {expert.finalNote}
                  </p>
                  {expert.highlights && expert.highlights.map((highlight, highlightIndex) => (
                    <p key={highlightIndex} className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {highlight}
                    </p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto border border-orange-200/50">
            <p className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              🎯 Estos módulos están incluidos GRATIS
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Solo para los próximos estudiantes que se inscriban ahora
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertModules;
