"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface CalendlyEmbedProps {
  url: string;
}

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Adjust height to prevent internal scrolling
    const handleCalendlyLoad = () => {
      // Give Calendly time to initialize
      setTimeout(() => {
        if (calendlyRef.current) {
          // Find the iframe inside the widget
          const iframe = calendlyRef.current.querySelector('iframe');
          if (iframe) {
            // Adjust the height to match content
            iframe.style.height = '650px';
            iframe.style.overflow = 'hidden';
          }
        }
      }, 1000);
    };

    script.onload = handleCalendlyLoad;

    // Clean up
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="agenda" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4188fa]/5 to-white">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-[#4188fa]/10 rounded-full blur-3xl"
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
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-[#4188fa]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#4188fa] to-[#4188fa]/80 bg-clip-text text-transparent">
            Agenda una llamada
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre cómo podemos ayudarte a conseguir más clientes para tu empresa de tecnología
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto"
        >
          <div
            ref={calendlyRef}
            className="calendly-inline-widget"
            data-url={url}
            style={{
              minWidth: "320px",
              height: "750px",
              overflow: "hidden"
            }}
          ></div>
        </motion.div>
      </div>
    </section>
  );
}
