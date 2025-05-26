"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Methodology as MethodologyType,
  MethodologyItem,
} from "../types/content";

interface MethodologyProps extends MethodologyType {}

interface StepWithUI extends MethodologyItem {
  metric: {
    value: string;
    label: string;
    color: string;
  };
}

const Methodology = ({ title, subtitle, items }: MethodologyProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const steps: StepWithUI[] = items.map(
    (item: MethodologyItem, index: number) => ({
      ...item,
      icon: item.icon || (
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      metric: {
        value: `+${(index + 1) * 25}%`,
        label: "Mejora",
        color: "blue",
      },
    })
  );

  return (
    <section id="methodology" className="py-24 relative overflow-hidden">
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
            {subtitle}
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-[#4188fa]/20" />

          {steps.map((step: StepWithUI, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative mb-16 last:mb-0"
            >
              {/* Background blur circle */}
              {index === 0 && (
                <motion.div
                  className="absolute w-48 h-48 md:w-72 md:h-72 -top-20 -right-10 md:-right-20 bg-blue-500/5 md:bg-blue-500/10 rounded-full blur-2xl md:blur-3xl"
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
              )}
              {index === steps.length - 1 && (
                <motion.div
                  className="absolute w-48 h-48 md:w-72 md:h-72 -bottom-20 -left-10 md:-left-20 bg-purple-500/5 md:bg-purple-500/10 rounded-full blur-2xl md:blur-3xl"
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
              )}

              {/* Step number circle with pulse effect */}
              <motion.div
                className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg z-10"
                whileHover={{ scale: 1.2 }}
                animate={{
                  boxShadow: [
                    "0 0 0 0px rgba(59, 130, 246, 0.5)",
                    "0 0 0 4px rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
              />

              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-start gap-8`}
              >
                <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8">
                  {/* Step content */}
                  <motion.div
                    className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-lg transform-gpu"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`bg-${step.metric.color}-100 p-3 rounded-xl flex-shrink-0`}
                      >
                        {step.icon}
                      </div>
                      <div>
                        <motion.h3
                          className="text-xl font-semibold mb-2 text-gray-800"
                          whileHover={{
                            color: `var(--color-${step.metric.color}-600)`,
                          }}
                        >
                          {step.title}
                        </motion.h3>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                      </div>
                    </div>

                    {/* Step items */}
                    <ul className="space-y-2 mt-4">
                      {step.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: 0.1 + itemIndex * 0.1,
                          }}
                          className="flex items-center gap-2 group"
                          whileHover={{ x: 5 }}
                        >
                          <motion.svg
                            className="w-5 h-5 text-green-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            whileHover={{ scale: 1.2 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                          <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                <div className="w-full md:w-1/2 pl-16 md:pl-0">
                  {/* Floating metric card */}
                  <div
                    className={`flex ${
                      index % 2 === 0
                        ? "justify-start md:justify-end"
                        : "justify-start"
                    } px-4`}
                  >
                    <motion.div
                      className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-4 shadow-lg inline-block"
                      whileHover={{
                        scale: 1.05,
                        rotate: [0, -2, 2, 0],
                      }}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, -3, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`bg-${step.metric.color}-100 p-2 rounded-lg`}
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <svg
                            className={`w-4 h-4 text-${step.metric.color}-600`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          </svg>
                        </motion.div>
                        <div>
                          <motion.p
                            className={`text-${step.metric.color}-600 text-lg font-bold`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {step.metric.value}
                          </motion.p>
                          <p className="text-sm text-gray-600">
                            {step.metric.label}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
