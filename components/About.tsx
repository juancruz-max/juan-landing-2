"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

interface AboutProps {
  title?: string;
  company?: {
    title: string;
    description: string[];
    commitment: string;
    image?: string;
    imageLink?: string;
    tags: string[];
  };
  founder?: {
    name: string;
    role: string;
    description: string;
    image?: string;
    tags: string[];
  };
}

const About = ({ title = "Quiénes Somos", company, founder }: AboutProps) => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-[#4188fa]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-[#4188fa] to-[#4188fa]/80 bg-clip-text text-transparent">
            {title}
          </h2>
        </motion.div>

        {/* About Company */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 shadow-xl max-w-6xl mx-auto mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[400px] rounded-xl overflow-hidden"
            >
              <Image
                src={company?.image || "/logo.jpeg"}
                alt="Cromax"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-xl p-8"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4188fa]/10 to-transparent" />
              <a
                href={company?.imageLink || "https://www.linkedin.com/company/cromax-crecimientomaximo/"}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-all shadow-lg group"
              >
                <svg
                  className="w-5 h-5 text-[#0A66C2]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </motion.div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  {company?.title || "Especialistas en Prospección B2B para Empresas de TI"}
                </h3>
                <div className="space-y-6 text-gray-600">
                  {company?.description && company.description.map((desc, idx) => (
                    <p key={idx}>{desc}</p>
                  ))}
                  {!company?.description && (
                    <>
                      <p>
                        En Cromax, acompañamos a empresas de tecnología y software,
                        que ya cuentan con una base de clientes, a eliminar su
                        dependencia de referidos y expandirse a nuevos mercados.
                      </p>
                      <p>
                        <span className="font-semibold text-gray-800">
                          Nos enfocamos
                        </span>{" "}
                        en construir sistemas de prospección efectivos que generen
                        entre 15 y 35 reuniones calificadas en menos de 90 días.
                        <span className="text-[#4188fa]">
                          {" "}
                          +30 reuniones calificadas
                        </span>{" "}
                        en menos de 90 días.
                      </p>
                    </>
                  )}
                  <div className="pt-4">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Nuestro compromiso:
                    </h4>
                    <p className="italic">
                      "{company?.commitment || "Aumentar la cantidad de reuniones con clientes potenciales, brindando un proceso estructurado que ayude a entender mejor cómo venderles y, además, transferir el know-how para que su equipo pueda seguir escalando la estrategia a largo plazo."}"
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-6"
              >
                {(company?.tags || [
                  "Linkedin",
                  "Email Masivo Personalizado",
                  "Prospectos Calificados",
                  "Analisis de mercado",
                ]).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#4188fa]/10 text-[#4188fa] px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* About Juan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0"
            >
              <Image
                src={founder?.image || "/juan.png"}
                alt={founder?.name || "Juan Cruz Cummaudo"}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
            </motion.div>

            <div className="flex-grow text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#4188fa] to-[#4188fa]/80 bg-clip-text text-transparent">
                  {founder?.name || "Juan Cruz Cummaudo"}
                </h3>
                <a
                  href="https://www.linkedin.com/in/juan-cruz-cummaudo"
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
              <h4 className="text-lg text-gray-700 mb-4">{founder?.role || "Fundador & CEO"}</h4>
              <p className="text-gray-600 mb-6">
                {founder?.description || "Después de invertir más de $6,000 en capacitaciones y años de experiencia en el campo, Juan desarrolló un sistema efectivo de prospección B2B. Su experiencia y metodología son la base de Cromax, ayudando a empresas TI a conseguir reuniones calificadas de manera consistente."}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {(founder?.tags || [
                  "Especialista en Linkedin",
                  "Lider de equipo",
                  "Analista de negocios B2B",
                ]).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-[#4188fa]/5 text-[#4188fa] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
