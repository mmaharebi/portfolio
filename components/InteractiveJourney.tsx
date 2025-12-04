"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import type { DetailedTimelineItem } from "./SerpentineTimeline";
import JourneyItem from "./JourneyItem";

interface InteractiveJourneyProps {
  items: DetailedTimelineItem[];
}

// Helper function to extract the starting year from a year string
const getStartYear = (yearString: string): string => {
  // Handle formats like "2017", "2017-2023", "2024-Present"
  return yearString.split(/[-–]/)[0].trim();
};

// Helper function to check if we should show a year badge between two items
const shouldShowYearBadge = (
  currentItem: DetailedTimelineItem,
  nextItem: DetailedTimelineItem | undefined
): boolean => {
  if (!nextItem) return false;
  
  const currentYear = getStartYear(currentItem.year);
  const nextYear = getStartYear(nextItem.year);
  
  return currentYear !== nextYear;
};

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
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 dark:bg-primary/25 rounded-full mb-4 border-2 border-terracotta/20 dark:border-primary/40">
          <Sparkles className="w-4 h-4 text-terracotta dark:text-primary" />
          <span className="text-sm font-semibold text-terracotta dark:text-primary">Career Path</span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-stone-900 dark:text-stone-50 mb-4">
          My Technical Journey
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-stone-700 dark:text-stone-200 max-w-2xl mx-auto font-medium">
          Every milestone shaped who I am today
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto px-4 pb-24">
        {/* Vertical Line - Centered on all screen sizes, extends to the end marker */}
        <div className="absolute left-1/2 -translate-x-px top-0 h-[calc(100%+3rem)] w-0.5 bg-linear-to-b from-primary via-secondary to-accent opacity-40 dark:opacity-60 dark:shadow-[0_0_8px_rgba(255,159,102,0.5)]" />

        {/* Timeline Items */}
        <div className="space-y-8 md:space-y-12">
          {items.map((item, index) => (
            <div key={index}>
              <JourneyItem
                item={item}
                index={index}
                isExpanded={expandedIndex === index}
                isHovered={hoveredIndex === index}
                onToggleExpand={() => setExpandedIndex(expandedIndex === index ? null : index)}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              />
              
              {/* Year badge between cards when year changes */}
              {shouldShowYearBadge(item, items[index + 1]) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="relative flex justify-center"
                  style={{ margin: "3rem 0" }}
                >
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="relative group">
                      {/* Subtle glow effect */}
                      <div className="absolute -inset-1 bg-primary/20 dark:bg-primary/40 blur-sm group-hover:bg-primary/30 dark:group-hover:bg-primary/60 transition-all rounded-full" />
                      
                      {/* Badge - matches the warm cream/beige theme */}
                      <div className="relative px-4 py-1.5 bg-white/90 dark:bg-[#1A1614]/95 backdrop-blur-sm border-2 border-stone-300/50 dark:border-primary/50 text-xs md:text-sm font-bold rounded-full shadow-sm group-hover:shadow-md dark:shadow-[0_4px_16px_rgba(255,159,102,0.3)] transition-all">
                        <span className="text-stone-800 dark:text-primary">
                          {getStartYear(items[index + 1].year)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* End marker - Current time indicator with pulse animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0"
        >
          {/* Pulsing rings */}
          <motion.div
            className="absolute inset-0 -m-3"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary via-secondary to-accent" />
          </motion.div>
          
          <motion.div
            className="absolute inset-0 -m-2"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary via-secondary to-accent" />
          </motion.div>

          {/* Main gradient bullet */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-4 h-4 rounded-full bg-linear-to-br from-primary via-secondary to-accent shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
}
