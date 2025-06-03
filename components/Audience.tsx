"use client";

import { motion } from "framer-motion";
import { Audience as AudienceType } from "../types/content";
import Image from "next/image";

interface AudienceProps extends AudienceType {}

const Audience = ({ title, points }: AudienceProps) => {
  return (
    <section id="audiencia" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-72 h-72 bg-primary/5 md:bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 10,
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
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título centrado arriba */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 px-2">
            {title}
          </h2>
        </motion.div>

        {/* Imagen y textos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 max-w-6xl mx-auto">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start px-4 sm:px-0">
              <div className="relative max-w-sm sm:max-w-md lg:max-w-lg">
                <Image
                  src="/Esta formacion es para ti.webp"
                  alt={title}
                  width={400}
                  height={600}
                  className="rounded-xl sm:rounded-2xl shadow-lg w-full h-auto"
                  priority
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 px-4 sm:px-0">
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-3 h-3 sm:w-5 sm:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Audience;
