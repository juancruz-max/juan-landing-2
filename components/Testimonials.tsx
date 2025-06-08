"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Testimonials as TestimonialsType } from "../types/content";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface TestimonialsProps extends TestimonialsType {}

export default function Testimonials({
  title,
  subtitle,
  items,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  // Early return if no items
  if (!items || items.length === 0) {
    return (
      <section id="testimonials" className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-[#146195]/5 rounded-full blur-3xl"
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
            className="absolute bottom-0 left-0 w-80 h-80 bg-[#146195]/3 rounded-full blur-3xl"
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

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#146195] to-[#146195]/80 bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
            <div className="mt-12 p-8 bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl max-w-md mx-auto">
              <p className="text-gray-500">Próximamente testimonios de estudiantes...</p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  useEffect(() => {
    if (!isAutoPlaying || items.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, items.length]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Show one testimonial on mobile, two on desktop
  const getVisibleTestimonials = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    return direction >= 0
      ? [currentIndex, nextIndex]
      : [currentIndex, (currentIndex - 1 + items.length) % items.length];
  };



  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-[#146195]/5 rounded-full blur-3xl"
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
          className="absolute bottom-0 left-0 w-80 h-80 bg-[#146195]/3 rounded-full blur-3xl"
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

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#146195] to-[#146195]/80 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="max-w-7xl mx-auto relative px-4 pb-16">
          <div className="overflow-hidden">
            <div className="flex gap-4 md:gap-6">
              <AnimatePresence initial={false} mode="popLayout">
                {getVisibleTestimonials().map((index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: direction >= 0 ? 200 : -200,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      },
                    }}
                    exit={{
                      opacity: 0,
                      x: direction >= 0 ? -200 : 200,
                      transition: {
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      },
                    }}
                    className="w-full md:w-1/2 flex-shrink-0"
                  >
                    <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg h-full flex flex-col">
                      {/* Video */}
                      <div className="aspect-video rounded-lg overflow-hidden mb-3 md:mb-4">
                        {items[index].videoSrc ? (
                          <video
                            src={items[index].videoSrc}
                            poster={items[index].videoPoster}
                            controls
                            preload="auto"
                            controlsList="nodownload"
                            playsInline
                            webkit-playsinline="true"
                            x5-playsinline="true"
                            className="w-full h-full object-cover"
                          >
                            Tu navegador no soporta el elemento de video.
                          </video>
                        ) : (
                          <Image
                            src={items[index].thumbnail}
                            alt={`Testimonio de ${items[index].author}`}
                            fill
                            className="object-contain bg-white"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        )}
                      </div>

                      {/* Quote */}
                      <div className="flex-grow flex flex-col">
                        <p className="text-gray-600 mb-3 md:mb-4 text-xs sm:text-sm md:text-base leading-relaxed italic">
                          {items[index].quote}
                        </p>

                        {/* Author Info */}
                        <div className="mt-auto pt-3 md:pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                            <div className="flex items-center gap-2 md:gap-3 lg:gap-4 flex-1 min-w-0">
                              <div className="relative w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden flex-shrink-0">
                                <Image
                                  src={items[index].authorImage}
                                  alt={`${items[index].author}`}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <a
                                  href={items[index].profileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-semibold text-gray-800 text-sm md:text-base lg:text-lg truncate"
                                >
                                  {items[index].author}
                                </a>
                                <div className="flex items-center gap-2">
                                  <p className="text-xs sm:text-sm text-gray-600 truncate">
                                    {items[index].role}
                                  </p>
                                  <Link
                                    href={items[index].linkedinUrl}
                                    target="_blank"
                                    className="relative w-12 h-3 sm:w-14 sm:h-3.5 md:w-16 md:h-4 flex-shrink-0"
                                  >
                                    <Image
                                      src={items[index].companyLogo}
                                      alt={`${items[index].author} Company Logo`}
                                      fill
                                      className="object-contain"
                                      sizes="64px"
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-lg transition-all z-10 hover:shadow-xl"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#146195]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-lg transition-all z-10 hover:shadow-xl"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-[#146195]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-[#146195] w-4 md:w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
