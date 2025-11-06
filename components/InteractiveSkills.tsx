"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Code, Cpu, Zap, Radio, Layers, Brain, Sparkles } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: "languages" | "frameworks" | "tools" | "research";
  icon?: string;
}

interface SkillCategory {
  title: string;
  icon: typeof Code;
  color: "primary" | "secondary" | "accent";
  skills: Skill[];
}

const skillsData: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code,
    color: "primary",
    skills: [
      { name: "Python", level: 95, category: "languages" },
      { name: "MATLAB", level: 90, category: "languages" },
      { name: "JavaScript / TypeScript", level: 85, category: "languages" },
      { name: "C++", level: 72, category: "languages" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: Layers,
    color: "secondary",
    skills: [
      { name: "NumPy / SciPy (SciPy Stack)", level: 92, category: "frameworks" },
      { name: "MATLAB Signal Processing & Optimization", level: 88, category: "frameworks" },
      { name: "React & Next.js", level: 82, category: "frameworks" },
      { name: "Tailwind CSS", level: 85, category: "frameworks" },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Cpu,
    color: "accent",
    skills: [
      { name: "Git & GitHub", level: 92, category: "tools" },
      { name: "Jupyter", level: 92, category: "tools" },
      { name: "VS Code", level: 95, category: "tools" },
      { name: "LaTeX", level: 90, category: "tools" },
    ],
  },
  {
    title: "Research & Simulation",
    icon: Radio,
    color: "primary",
    skills: [
      { name: "Antenna Design & Arrays", level: 90, category: "research" },
      { name: "Digital Communications & DSP", level: 88, category: "research" },
      { name: "EM Simulation (CST / HFSS / ADS)", level: 87, category: "research" },
      { name: "5G/6G Systems & Link Concepts", level: 84, category: "research" },
    ],
  },
];


const colorMap = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary",
    text: "text-primary",
    fill: "bg-primary",
    glow: "shadow-primary/30",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary",
    text: "text-secondary",
    fill: "bg-secondary",
    glow: "shadow-secondary/30",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent",
    text: "text-accent",
    fill: "bg-accent",
    glow: "shadow-accent/30",
  },
};

export default function InteractiveSkills() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="w-full scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-terracotta" />
          <span className="text-sm font-semibold text-terracotta">Technical Expertise</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Skills</h2>
        <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto">
          A blend of engineering fundamentals and modern development
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {skillsData.map((category, categoryIndex) => {
          const colors = colorMap[category.color];
          const Icon = category.icon;
          const isSelected = selectedCategory === categoryIndex;

          return (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              onHoverStart={() => setSelectedCategory(categoryIndex)}
              onHoverEnd={() => setSelectedCategory(null)}
              className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                isSelected
                  ? `${colors.border} shadow-xl ${colors.glow}`
                  : "border-stone-200 shadow-sm hover:shadow-lg"
              }`}
            >
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 ${colors.bg} opacity-0`}
                animate={{ opacity: isSelected ? 0.5 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Floating particles on hover */}
              <AnimatePresence>
                {isSelected && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full ${colors.fill}`}
                        initial={{ opacity: 0, x: Math.random() * 100 - 50, y: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          y: -100,
                          x: Math.random() * 100 - 50,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                        }}
                        style={{
                          left: `${Math.random() * 100}%`,
                          bottom: 0,
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="relative flex items-center gap-3 mb-6">
                <motion.div
                  animate={{
                    rotate: isSelected ? [0, -10, 10, 0] : 0,
                    scale: isSelected ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                  className={`w-12 h-12 rounded-xl ${colors.bg} border-2 ${colors.border} flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </motion.div>
                <h3 className="text-xl font-bold text-stone-800">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="relative space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const isHovered = hoveredSkill === `${categoryIndex}-${skillIndex}`;

                  return (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                      onHoverStart={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      className="group"
                    >
                      {/* Skill Name and Percentage */}
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium transition-colors ${
                          isHovered ? colors.text : "text-stone-700"
                        }`}>
                          {skill.name}
                        </span>
                        <motion.span
                          className={`text-xs font-bold ${colors.text}`}
                          animate={{
                            scale: isHovered ? 1.2 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-2 bg-stone-200 rounded-full overflow-hidden">
                        {/* Background shimmer */}
                        <motion.div
                          className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent"
                          animate={{
                            x: isHovered ? ['-100%', '200%'] : '-100%',
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: isHovered ? Infinity : 0,
                            ease: "linear",
                          }}
                        />

                        {/* Animated fill */}
                        <motion.div
                          className={`h-full ${colors.fill} rounded-full relative`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.2,
                            delay: skillIndex * 0.1,
                            ease: "easeOut",
                          }}
                        >
                          {/* Glow effect */}
                          <motion.div
                            className={`absolute right-0 top-0 h-full w-8 blur-sm ${colors.fill}`}
                            animate={{
                              opacity: isHovered ? [0.5, 1, 0.5] : 0.5,
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Research Interests Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 bg-linear-to-br from-terracotta/5 via-amber-50/50 to-stone-50/50 rounded-2xl p-8 border-2 border-terracotta/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-12 h-12 rounded-xl bg-terracotta/10 border-2 border-terracotta flex items-center justify-center"
          >
            <Brain className="w-6 h-6 text-terracotta" />
          </motion.div>
          <h3 className="text-2xl font-bold text-stone-800">Research Interests</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "5G/6G Communication Systems",
            "Applied Electromagnetics & RF Design",
            "Signal Processing & Optimization",
            "Scientific Computing & Simulation",
          ].map((interest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ x: 10, scale: 1.02 }}
              className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-stone-200 hover:border-terracotta/40 transition-all cursor-default"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.3,
                  repeat: Infinity,
                }}
                className="w-2 h-2 rounded-full bg-terracotta"
              />
              <span className="text-sm font-medium text-stone-700">{interest}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
