"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Radio, Zap, Calculator, Layers, Sparkles, ArrowRight, ChevronDown } from "lucide-react";

interface ExpertiseArea {
  icon: typeof Radio;
  title: string;
  shortDesc: string;
  fullDesc: string;
  color: "primary" | "secondary" | "accent" | "terracotta";
  skills: string[];
}

const expertiseData: ExpertiseArea[] = [
  {
    icon: Radio,
    title: "Communication Systems",
    shortDesc: "5G/6G signal processing & optimization",
    fullDesc:
      "Advancing signal processing and system optimization for next-generation networks.",
    color: "primary",
    skills: [
      "5G/6G",
      "Digital Modulation",
      "Channel Estimation",
      "MATLAB",
      "Python",
    ],
  },
  {
    icon: Zap,
    title: "RF & Microwave Engineering",
    shortDesc: "Antenna & circuit design via EM simulation",
    fullDesc:
      "Designing microwave circuits, antennas, and front-end systems through EM simulation and numerical methods.",
    color: "accent",
    skills: [
      "CST Studio",
      "HFSS",
      "Antenna Design",
      "RF Circuits",
      "EM Theory",
    ],
  },
  {
    icon: Calculator,
    title: "Computational Electromagnetics & Modeling",
    shortDesc: "Wave analysis & numerical simulation",
    fullDesc:
      "Developing and applying computational models to analyze electromagnetic wave behavior and optimize device performance.",
    color: "secondary",
    skills: ["FDTD", "FEM", "MATLAB", "Python", "Numerical Analysis"],
  },
  {
    icon: Layers,
    title: "Mathematical Foundations",
    shortDesc: "Theory underlying modern communication & EM",
    fullDesc:
      "Bridging abstract theory and practical engineering through applied mathematics and physics.",
    color: "terracotta",
    skills: [
      "Linear Algebra",
      "Probability",
      "Quantum Mechanics",
      "Numerical Analysis",
    ],
  },
];

const colorMap = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary",
    text: "text-primary",
    glow: "shadow-primary/30",
    gradient: "from-primary to-amber-600",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary",
    text: "text-secondary",
    glow: "shadow-secondary/30",
    gradient: "from-secondary to-amber-400",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent",
    text: "text-accent",
    glow: "shadow-accent/30",
    gradient: "from-accent to-amber-700",
  },
  terracotta: {
    bg: "bg-terracotta/10",
    border: "border-terracotta",
    text: "text-terracotta",
    glow: "shadow-terracotta/30",
    gradient: "from-terracotta to-primary",
  },
};

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span className="text-sm font-semibold text-terracotta">What I Do</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-stone-800 to-stone-600">
              Fields of Expertise
            </span>
          </h2>
          <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto px-4">
            Combining rigorous theoretical foundations with hands-on engineering
          </p>
        </motion.div>

        {/* Mobile: Vertical Stack / Desktop: Grid */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 max-w-full">
          {expertiseData.map((area, index) => {
            const Icon = area.icon;
            const colors = colorMap[area.color];
            const isExpanded = expandedIndex === index;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className={`group relative cursor-pointer rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 transition-all duration-500 w-full ${
                  isExpanded
                    ? `${colors.border} ${colors.glow} shadow-2xl md:scale-105`
                    : `border-stone-200 hover:border-stone-300 shadow-lg hover:shadow-xl`
                }`}
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 rounded-2xl md:rounded-3xl`}
                  animate={{
                    opacity: isHovered || isExpanded ? 0.05 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Glowing orb on hover */}
                <AnimatePresence>
                  {(isHovered || isExpanded) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.3 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className={`absolute -top-6 md:-top-10 -right-6 md:-right-10 w-24 md:w-32 h-24 md:h-32 ${colors.bg} rounded-full blur-2xl`}
                    />
                  )}
                </AnimatePresence>

                <div className="relative">
                  {/* Mobile: Horizontal layout with icon left, text right, chevron */}
                  <div className="flex items-start gap-4 md:block">
                    {/* Icon */}
                    <motion.div
                      className="shrink-0 md:mb-6"
                      animate={{
                        rotate: isHovered ? [0, -10, 10, 0] : 0,
                        scale: isExpanded ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${colors.gradient} p-0.5`}
                      >
                        <div className="w-full h-full bg-white rounded-xl md:rounded-2xl flex items-center justify-center">
                          <Icon className={`w-7 h-7 md:w-8 md:h-8 ${colors.text}`} />
                        </div>
                      </div>
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className="text-lg md:text-2xl font-bold text-stone-800 mb-2 md:mb-3">{area.title}</h3>

                      {/* Short description - visible on mobile */}
                      <p className="text-sm md:text-base text-stone-600 mb-0 md:mb-4 line-clamp-2 md:line-clamp-none">{area.shortDesc}</p>
                    </div>

                    {/* Chevron indicator - mobile only */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="md:hidden shrink-0"
                    >
                      <ChevronDown className={`w-5 h-5 ${colors.text}`} />
                    </motion.div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 md:pt-0">
                          <p className="text-sm md:text-base text-stone-700 mb-4 leading-relaxed">{area.fullDesc}</p>

                          {/* Skills tags */}
                          <div className="flex flex-wrap gap-2">
                          {area.skills.map((skill, i) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className={`px-2.5 md:px-3 py-1 md:py-1.5 ${colors.bg} ${colors.text} rounded-full text-xs md:text-sm font-medium border ${colors.border}`}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expand indicator */}
                  <motion.div
                    className={`mt-4 flex items-center gap-2 text-sm font-semibold ${colors.text}`}
                    animate={{
                      x: isHovered ? 5 : 0,
                    }}
                  >
                    <span>{isExpanded ? "Show less" : "Learn more"}</span>
                    <motion.div
                      animate={{
                        rotate: isExpanded ? 90 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Corner accent */}
                <motion.div
                  className={`absolute top-4 right-4 w-2 h-2 rounded-full ${colors.bg}`}
                  animate={{
                    scale: isHovered ? [1, 1.5, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isHovered ? Infinity : 0,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
