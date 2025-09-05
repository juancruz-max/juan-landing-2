"use client";

import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Audience from "../components/Audience";
import Benefits from "../components/Benefits";
import Modules from "../components/Modules";
import Extras from "../components/Extras";
import ExpertModules from "../components/ExpertModules";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Instructor from "../components/Instructor";
import FAQ from "../components/FAQ";
import Recapitulacion from "../components/Recapitulacion";
import content from "@/data/content.json";
import { Content } from "../types/content";

const typedContent = content as Content;

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Hero
        title={typedContent.hero.title}
        subtitle={typedContent.hero.subtitle}
        cta={typedContent.hero.cta}
        ctaLink={typedContent.hero.ctaLink}
      />

      {/* Testimonials */}
      <Testimonials
        title={typedContent.testimonials.title}
        subtitle={typedContent.testimonials.subtitle}
        viewText={typedContent.testimonials.viewText}
        items={typedContent.testimonials.items}
      />

      {/* Target Audience */}
      {typedContent.audience && (
        <Audience
          title={typedContent.audience.title}
          columns={typedContent.audience.columns}
        />
      )}

      {/* Benefits */}
      <Benefits
        title={typedContent.benefits.title}
        items={typedContent.benefits.items}
      />

      {/* Course Modules */}
      {typedContent.modules && (
        <Modules
          title={typedContent.modules.title}
          sections={typedContent.modules.sections}
        />
      )}

      {/* Extras */}
      {typedContent.extras && (
        <Extras
          title={typedContent.extras.title}
          items={typedContent.extras.items}
        />
      )}

      {/* Expert Modules */}
      {typedContent.expertModules && (
        <ExpertModules
          title={typedContent.expertModules.title}
          subtitle={typedContent.expertModules.subtitle}
          experts={typedContent.expertModules.experts}
        />
      )}

      {/* Recapitulacion */}
      {typedContent.recapitulacion && (
        <Recapitulacion
          title={typedContent.recapitulacion.title}
          subtitle={typedContent.recapitulacion.subtitle}
          modules={typedContent.recapitulacion.modules}
          extras={typedContent.recapitulacion.extras}
          totalPrice={typedContent.recapitulacion.totalPrice}
          finalPrice={typedContent.recapitulacion.finalPrice}
          futurePrice={typedContent.recapitulacion.futurePrice}
          priceNote={typedContent.recapitulacion.priceNote}
          cta={typedContent.recapitulacion.cta}
        />
      )}

      {/* Instructor */}
      {typedContent.instructor && (
        <Instructor
          name={typedContent.instructor.name}
          title={typedContent.instructor.title}
          description={typedContent.instructor.description}
        />
      )}

      {/* Pricing */}
      {typedContent.pricing && (
        <Pricing
          title={typedContent.pricing.title}
          note={typedContent.pricing.note}
          cta={typedContent.pricing.cta}
          limitedOffer={typedContent.pricing.limitedOffer}
        />
      )}

      {/* FAQ */}
      <FAQ title={typedContent.faq.title} items={typedContent.faq.items} />

      {/* Simple CTA Button */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.a
            href={typedContent.hero.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {typedContent.hero.cta}
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.a>
        </div>
      </section>
    </main>
  );
}
