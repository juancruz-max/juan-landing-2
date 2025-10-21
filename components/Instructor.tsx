"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instructor as InstructorType } from "../types/content";

interface InstructorProps extends InstructorType {}

// Function to render text with markdown-like formatting
const renderFormattedText = (text: string) => {
  // Split by double newlines to create paragraphs
  const paragraphs = text.split('\n\n');

  return paragraphs.map((paragraph, index) => {
    // Process bold text (**text**)
    const parts = paragraph.split(/(\*\*.*?\*\*)/g);

    return (
      <div key={index} className={index > 0 ? "mt-4" : ""}>
        {parts.map((part, partIndex) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            // Remove the ** and make it bold
            const boldText = part.slice(2, -2);
            return (
              <strong key={partIndex} className="font-semibold text-gray-900">
                {boldText}
              </strong>
            );
          }
          return part;
        })}
      </div>
    );
  });
};

const Instructor = ({
  name,
  title,
  description,
  image = "/juan.jpeg",
  credentials = ["Especialista en Linkedin", "Formador y Coach", "Escalamiento de negocios B2B"],
  sectionTitle = "Conoce a tu instructor",
  linkedinUrl = "https://www.linkedin.com/in/juan-cruz-cummaudo"
}: InstructorProps) => {
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
            {sectionTitle}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto"
        >
          {/* Mobile Layout - Original */}
          <div className="flex flex-col md:hidden gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0"
            >
              <Image
                src={image}
                alt={name}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </motion.div>

            <div className="flex-1 text-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {name}
                  </h3>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/80 hover:bg-white p-1.5 rounded-full transition-all shadow-sm group"
                  >
                    <svg
                      className="w-4 h-4 text-[#0A66C2]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                </div>
                <p className="text-lg text-primary font-semibold mb-6">
                  {title}
                </p>
                <div className="text-gray-700 leading-relaxed text-lg">
                  {renderFormattedText(description)}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-3 justify-center"
              >
                {credentials.map((credential, index) => {
                  const colors = [
                    "bg-primary/10 text-primary",
                    "bg-blue-100 text-blue-800",
                    "bg-purple-100 text-purple-800"
                  ];
                  return (
                    <span key={index} className={`${colors[index % colors.length]} px-4 py-2 rounded-full text-sm font-medium`}>
                      {credential}
                    </span>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout - Modified */}
          <div className="hidden md:flex flex-col gap-8">
            {/* Header section with image and name aligned */}
            <div className="flex flex-row gap-6 items-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-40 h-40 rounded-full overflow-hidden flex-shrink-0"
              >
                <Image
                  src={image}
                  alt={name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
              </motion.div>

              <div className="flex-1 text-left">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-3xl font-bold text-gray-900">
                      {name}
                    </h3>
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/80 hover:bg-white p-1.5 rounded-full transition-all shadow-sm group"
                    >
                      <svg
                        className="w-4 h-4 text-[#0A66C2]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    </a>
                  </div>
                  <p className="text-lg text-primary font-semibold mb-4">
                    {title}
                  </p>

                  {/* Tags below title in desktop */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap gap-3 mb-6"
                  >
                    {credentials.map((credential, index) => {
                      const colors = [
                        "bg-primary/10 text-primary",
                        "bg-blue-100 text-blue-800",
                        "bg-purple-100 text-purple-800"
                      ];
                      return (
                        <span key={index} className={`${colors[index % colors.length]} px-4 py-2 rounded-full text-sm font-medium`}>
                          {credential}
                        </span>
                      );
                    })}
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Description section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-left"
            >
              <div className="text-gray-700 leading-relaxed text-lg">
                {renderFormattedText(description)}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Instructor;
