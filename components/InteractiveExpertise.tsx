"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Radio, Zap, Calculator, Layers, Sparkles, ArrowRight } from "lucide-react";

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
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span className="text-sm font-semibold text-terracotta">What I Do</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-stone-800 to-stone-600">
              Fields of Expertise
            </span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Combining rigorous theoretical foundations with hands-on engineering
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 gap-6">
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
                className={`group relative cursor-pointer rounded-3xl p-8 border-2 transition-all duration-500 ${
                  isExpanded
                    ? `${colors.border} ${colors.glow} shadow-2xl scale-105`
                    : `border-stone-200 hover:border-stone-300 shadow-lg hover:shadow-xl`
                }`}
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-linear-to-br ${colors.gradient} opacity-0 rounded-3xl`}
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
                      className={`absolute -top-10 -right-10 w-32 h-32 ${colors.bg} rounded-full blur-2xl`}
                    />
                  )}
                </AnimatePresence>

                <div className="relative">
                  {/* Icon */}
                  <motion.div
                    className="mb-6"
                    animate={{
                      rotate: isHovered ? [0, -10, 10, 0] : 0,
                      scale: isExpanded ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl bg-linear-to-br ${colors.gradient} p-0.5`}
                    >
                      <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                        <Icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-stone-800 mb-3">{area.title}</h3>

                  {/* Short description */}
                  <p className="text-stone-600 mb-4">{area.shortDesc}</p>

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
                        <p className="text-stone-700 mb-4 leading-relaxed">{area.fullDesc}</p>

                        {/* Skills tags */}
                        <div className="flex flex-wrap gap-2">
                          {area.skills.map((skill, i) => (
                            <motion.span
                              key={skill}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className={`px-3 py-1.5 ${colors.bg} ${colors.text} rounded-full text-sm font-medium border ${colors.border}`}
                            >
                              {skill}
                            </motion.span>
                          ))}
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
