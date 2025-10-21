"use client";

import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  academyLabel?: string;
  videoUrl?: string;
  videoPoster?: string;
  videoLabel?: string;
  lifetimeAccessLabel?: string;
  badges?: string[];
}

const Hero = ({
  title,
  subtitle,
  cta,
  ctaLink,
  academyLabel = "Cromax Academy",
  videoUrl = "https://d1yei2z3i6k35z.cloudfront.net/9799259/6846370454710_VSLACEDEMYCROMAX.mp4",
  videoPoster = "https://d1yei2z3i6k35z.cloudfront.net/9799259/684638bac781f_CromaxAcademy-Presentacion.jpg",
  videoLabel = "🎥 Video de Presentación",
  lifetimeAccessLabel = "Acceso de por vida",
  badges = ["Sin experiencia previa", "Acceso inmediato", "Comunidad incluida"],
}: HeroProps) => {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-primary/5 pt-16 sm:pt-20 lg:pt-24">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-primary/5 md:bg-primary/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-accent/5 md:bg-accent/8 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 lg:space-y-10">

          {/* Content Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl w-full"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 sm:px-6 lg:px-8 py-2 rounded-full text-sm sm:text-base lg:text-lg font-medium mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              {academyLabel}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary leading-tight mb-4 sm:mb-6 px-2">
              {title}
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-4xl mx-auto px-2">
              {subtitle}
            </p>


          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-5xl px-2 sm:px-4"
          >
            <div className="relative">
              <motion.div
                className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <video
                  className="w-full h-auto rounded-xl sm:rounded-2xl"
                  controls
                  preload="auto"
                  autoPlay
                  muted
                  playsInline
                  controlsList="nodownload"
                  poster={videoPoster}
                  webkit-playsinline="true"
                  x5-playsinline="true"
                >
                  <source src={videoUrl} type="video/mp4" />
                  Tu navegador no soporta el elemento de video.
                </video>

                {/* Video overlay badge */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-primary text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                  {videoLabel}
                </div>
              </motion.div>

              {/* Floating badge - Acceso de por vida */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -bottom-2 right-2 sm:-bottom-4 sm:right-4 bg-white/90 backdrop-blur-md border border-white/50 rounded-lg sm:rounded-xl px-2 py-1 sm:px-4 sm:py-2 shadow-lg"
              >
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <div className="text-accent font-bold">∞</div>
                  <div className="text-gray-600">{lifetimeAccessLabel}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
           {/* Single CTA Button */}
            <motion.a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl group w-full sm:w-auto max-w-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cta}
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
            </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 pb-8 sm:pb-12 text-xs sm:text-sm text-gray-500 px-4"
          >
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
