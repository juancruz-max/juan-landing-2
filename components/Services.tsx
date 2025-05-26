"use client";

import { motion } from "framer-motion";
import {
  Services as ServicesType,
  ServiceFeature as ServiceFeatureType,
} from "../types/content";

interface ServiceFeature extends ServiceFeatureType {
  icon: JSX.Element;
}

interface ServicesProps extends ServicesType {}

const getServiceIcon = (title: string): JSX.Element => {
  switch (title) {
    case "Prospeccion por Linkedin":
      return (
        <svg
          className="w-6 h-6 text-[#4188fa] group-hover:text-white transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      );
    case "Email Marketing Efectivo":
      return (
        <svg
          className="w-6 h-6 text-[#4188fa] group-hover:text-white transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    default:
      return (
        <svg
          className="w-6 h-6 text-[#4188fa] group-hover:text-white transition-colors duration-300"
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
      );
  }
};



export default function Services({ title, subtitle, items }: ServicesProps) {
  const servicesWithUI = items.map((item) => ({
    ...item,
    icon: getServiceIcon(item.title),
  }));

  return (
    <section id="services" className="py-24 relative overflow-hidden">
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
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesWithUI.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative px-4 md:px-0"
            >
              {/* Service Card */}
              <motion.div
                className="bg-white/60 md:bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-4 md:p-6 shadow-lg h-full transform-gpu"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
                  <motion.div
                    className={`bg-${
                      index === 0 ? "blue" : index === 1 ? "purple" : "blue"
                    }-100 p-3 rounded-xl`}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, 5, -5, 0],
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0px rgba(59, 130, 246, 0.2)",
                        "0 0 0 4px rgba(59, 130, 246, 0)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3
                      className="text-xl font-semibold mb-2"
                      whileHover={{
                        color:
                          index === 0
                            ? "rgb(59, 130, 246)"
                            : index === 1
                            ? "rgb(147, 51, 234)"
                            : "rgb(59, 130, 246)",
                      }}
                    >
                      {item.title}
                    </motion.h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {item.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 + featureIndex * 0.1,
                      }}
                      className="flex items-center gap-2 group"
                      whileHover={{ x: 5 }}
                    >
                      <motion.svg
                        className="w-5 h-5 text-primary flex-shrink-0"
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
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Preview Card */}
                <motion.div
                  className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-white/50 rounded-xl p-6 text-sm shadow-lg relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4188fa]/5 to-transparent" />
                  <div className="relative z-10">
                    <p className="font-semibold text-base mb-3 text-[#4188fa]">
                      {item.exampleTitle || "Ejemplo"}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {item.exampleContent || ""}
                    </p>
                    {item.stats && item.stats.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {item.stats.map((stat, statIndex) => (
                          <div
                            key={statIndex}
                            className="bg-white/50 backdrop-blur-sm rounded-lg p-3 text-center h-[80px] flex flex-col justify-center items-center"
                          >
                            <p className="text-gray-500 text-xs mb-2">{stat.label}</p>
                            <p className="font-bold text-[#4188fa] text-base">
                              {stat.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
