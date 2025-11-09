"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { Award, GraduationCap, Briefcase, MapPin, Calendar, ChevronDown, Sparkles } from "lucide-react";
import type { DetailedTimelineItem } from "./SerpentineTimeline";

interface InteractiveJourneyProps {
  items: DetailedTimelineItem[];
}

const iconMap = {
  award: Award,
  education: GraduationCap,
  work: Briefcase,
  milestone: Calendar,
};

const colorMap = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary",
    text: "text-primary",
    fill: "bg-primary",
    glow: "shadow-primary/30",
    dot: "bg-primary",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary",
    text: "text-secondary",
    fill: "bg-secondary",
    glow: "shadow-secondary/30",
    dot: "bg-secondary",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent",
    text: "text-accent",
    fill: "bg-accent",
    glow: "shadow-accent/30",
    dot: "bg-accent",
  },
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
          {items.map((item, index) => {
            const Icon = iconMap[item.icon || "milestone"];
            const colors = colorMap[item.color || "primary"];
            const isExpanded = expandedIndex === index;
            const isHovered = hoveredIndex === index;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-start gap-4 md:gap-8 pl-14 md:pl-0 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-6 md:left-1/2 w-3 h-3 md:w-4 md:h-4 bg-terracotta rounded-full border-2 md:border-4 border-cream shadow-lg z-10 md:-translate-x-1/2"
                  whileHover={{ scale: 1.2 }}
                  animate={isExpanded ? { scale: 1.3 } : { scale: 1 }}
                />

                {/* Content Card */}
                <motion.div
                  className="flex-1 md:w-[calc(50%-4rem)]"
                  animate={{
                    scale: isHovered ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`relative bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      isExpanded
                        ? `${colors.border} shadow-xl ${colors.glow} focus:ring-${item.color}`
                        : `border-stone-200 hover:border-stone-300 shadow-md hover:shadow-lg focus:ring-stone-400`
                    }`}
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpandedIndex(isExpanded ? null : index);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isExpanded}
                  >
                    {/* Hover glow effect */}
                    <AnimatePresence>
                      {isHovered && !isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`absolute inset-0 ${colors.bg} rounded-2xl -z-10`}
                        />
                      )}
                    </AnimatePresence>

                    {/* Floating particles */}
                    <AnimatePresence>
                      {isExpanded && (
                        <>
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`absolute w-1.5 h-1.5 rounded-full ${colors.dot}`}
                              initial={{ opacity: 0, y: 0 }}
                              animate={{
                                opacity: [0, 1, 0],
                                y: -60,
                                x: (i - 1) * 20,
                              }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 2,
                                delay: i * 0.3,
                                repeat: Infinity,
                              }}
                              style={{
                                top: "50%",
                                left: "50%",
                              }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>

                    {/* Year Badge */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                      }}
                      className={`inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 ${colors.bg} ${colors.text} rounded-full border-2 ${colors.border} mb-3 md:mb-4 font-bold text-xs md:text-sm`}
                    >
                      <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      {item.year}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-bold text-stone-800 mb-2">{item.title}</h3>

                    {/* Subtitle */}
                    {item.subtitle && (
                      <p className={`text-xs md:text-sm font-semibold ${colors.text} mb-2`}>
                        {item.subtitle}
                      </p>
                    )}

                    {/* Location */}
                    {item.location && (
                      <div className="flex items-center gap-1.5 text-stone-600 text-xs md:text-sm mb-3 md:mb-4">
                        <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        <span>{item.location}</span>
                      </div>
                    )}

                    {/* Description Preview */}
                    <motion.p
                      className="text-stone-600 text-xs md:text-sm leading-relaxed"
                      animate={{
                        height: isExpanded ? "auto" : "2.5rem",
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      {item.description}
                    </motion.p>

                    {/* Expand Button */}
                    <motion.button
                      className={`mt-3 md:mt-4 flex items-center gap-2 text-xs md:text-sm font-semibold ${colors.text} hover:underline`}
                      whileHover={{ x: 5 }}
                    >
                      <span>{isExpanded ? "Show less" : "Read more"}</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </motion.div>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Center Icon Circle - Hidden on mobile, visible on md+ */}
                <div className="hidden md:block absolute md:left-1/2 md:-translate-x-1/2 z-10">
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                      rotate: isHovered ? [0, -5, 5, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    {/* Pulse rings */}
                    <AnimatePresence>
                      {isHovered && (
                        <>
                          <motion.div
                            className={`absolute inset-0 rounded-full border-2 ${colors.border}`}
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <motion.div
                            className={`absolute inset-0 rounded-full border-2 ${colors.border}`}
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
                          />
                        </>
                      )}
                    </AnimatePresence>

                    {/* Icon container */}
                    <div
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${colors.bg} border-4 ${colors.border} bg-white flex items-center justify-center shadow-lg`}
                    >
                      <motion.div
                        animate={{
                          rotate: isHovered ? [0, -10, 10, 0] : 0,
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className={`w-6 h-6 md:w-7 md:h-7 ${colors.text}`} />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for alignment - only visible on desktop */}
                <div className="hidden md:block flex-1 md:w-[calc(50%-4rem)]" />
              </motion.div>
            );
          })}
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
