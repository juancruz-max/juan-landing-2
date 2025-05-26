"use client";

import { motion } from "framer-motion";
import { Problems as ProblemsType } from "../types/content";

interface ProblemsProps extends ProblemsType {}

export default function Problems({ title, items }: ProblemsProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-title max-w-4xl mx-auto"
        >
          {title}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card group"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-[#4188fa]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#4188fa] transition-colors duration-300">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
              </div>
              <div className="flex items-center text-[#4188fa] font-medium">
                <span>{item.solution}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
