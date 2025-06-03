"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FAQ as FAQType } from "../types/content";

interface FAQProps extends FAQType {}

const FAQ = ({ title, items }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const faqs = items.map((item) => ({
    ...item,
    icon: (
      <svg
        className="w-6 h-6 text-[#4188fa]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    category: "General",
  }));

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 -right-20 w-72 h-72 bg-blue-500/5 md:bg-blue-500/10 rounded-full blur-3xl"
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
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/5 md:bg-purple-500/10 rounded-full blur-3xl"
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

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 px-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Resolvemos tus dudas sobre nuestro servicio de prospección
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-6 relative"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Category Tag with enhanced animations */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.9 }}
                    className="absolute -left-4 md:-left-24 top-6 bg-white/80 md:bg-white/40 backdrop-blur-xl border border-white/50 rounded-lg px-3 py-1 shadow-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.span
                      className="text-xs font-medium text-gray-800 md:text-gray-600"
                      animate={{
                        color: ["#1F2937", "#3B82F6", "#1F2937"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {faq.category}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="bg-white/60 md:bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg overflow-hidden relative transform-gpu"
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Decorative gradient with animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-30 md:opacity-50 pointer-events-none"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full p-4 md:p-6 text-left transition-all duration-300 relative z-10 group"
                >
                  <div className="flex items-start md:items-center justify-between gap-4">
                    <div className="flex items-start md:items-center gap-3 md:gap-4">
                      <motion.div
                        className="flex-shrink-0 bg-gradient-to-r from-blue-100 to-purple-100 p-2 rounded-lg mt-1 md:mt-0"
                        whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                        animate={
                          openIndex === index
                            ? {
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                              }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        {faq.icon}
                      </motion.div>
                      <motion.h3
                        className="text-base md:text-lg font-semibold pr-8 md:pr-0"
                        whileHover={{ scale: 1.02 }}
                        animate={
                          openIndex === index
                            ? {
                                color: "#3B82F6",
                              }
                            : {}
                        }
                      >
                        {faq.question}
                      </motion.h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, type: "spring" }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute right-4 md:right-6 top-5 md:top-6"
                    >
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                        animate={{ opacity: 1, height: "auto", scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, type: "spring" }}
                      >
                        <motion.p
                          className="mt-4 text-sm md:text-base text-gray-800 md:text-gray-600 bg-white/80 md:bg-white/30 backdrop-blur-md rounded-xl p-4 border border-white/20"
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          exit={{ y: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {faq.answer}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>

              {/* Enhanced Floating Dots */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -right-4 md:-right-12 top-1/2 transform -translate-y-1/2 flex flex-col gap-2"
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                          y: [0, -3, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
