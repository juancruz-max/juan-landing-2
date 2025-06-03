"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instructor as InstructorType } from "../types/content";

interface InstructorProps extends InstructorType {}

const Instructor = ({ name, title, description }: InstructorProps) => {
  return (
    <section id="instructor" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-72 h-72 bg-primary/5 md:bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/5 md:bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 18,
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
            Conoce a tu instructor
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0"
            >
              <Image
                src="/juan.jpeg"
                alt={name}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                  {name}
                </h3>
                <p className="text-lg text-primary font-semibold mb-6">
                  {title}
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start"
              >
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Marketing Digital
                </span>
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  Prospección B2B
                </span>
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                  Consultoría
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Instructor;
