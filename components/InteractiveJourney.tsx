"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import type { DetailedTimelineItem } from "./SerpentineTimeline";
import JourneyItem from "./JourneyItem";

interface InteractiveJourneyProps {
  items: DetailedTimelineItem[];
}

export default function InteractiveJourney({ items }: InteractiveJourneyProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16 px-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-terracotta" />
          <span className="text-sm font-semibold text-terracotta">Career Path</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-800 mb-4">
          My Technical Journey
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-stone-600 max-w-2xl mx-auto">
          Every milestone shaped who I am today
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto px-4">
        {/* Vertical Line - Responsive positioning */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary via-secondary to-accent opacity-30 md:-translate-x-px" />

        {/* Timeline Items */}
        <div className="space-y-8 md:space-y-12">
          {items.map((item, index) => (
            <JourneyItem
              key={index}
              item={item}
              index={index}
              isExpanded={expandedIndex === index}
              isHovered={hoveredIndex === index}
              onToggleExpand={() => setExpandedIndex(expandedIndex === index ? null : index)}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* End marker */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute left-8 md:left-1/2 md:-translate-x-1/2 bottom-0 translate-y-12"
        >
          <div className="w-4 h-4 rounded-full bg-linear-to-br from-primary via-secondary to-accent shadow-lg" />
        </motion.div>
      </div>
    </div>
  );
}
