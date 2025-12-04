"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import ExpertiseCard from "./ExpertiseCard";
import { EXPERTISE_DATA } from "@/lib/constants/expertise";

export default function InteractiveExpertise() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 dark:bg-primary/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-terracotta dark:text-primary" />
            <span className="text-sm font-semibold text-terracotta dark:text-primary">
              What I Do
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-stone-800 dark:from-stone-100 to-stone-600 dark:to-stone-300">
              Fields of Expertise
            </span>
          </h2>
          <p className="text-base md:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto px-4">
            Combining rigorous theoretical foundations with hands-on engineering
          </p>
        </motion.div>

        {/* Mobile: Vertical Stack / Desktop: Grid */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 max-w-full">
          {EXPERTISE_DATA.map((area, index) => (
            <ExpertiseCard
              key={index}
              area={area}
              index={index}
              isExpanded={expandedIndex === index}
              isHovered={hoveredIndex === index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
