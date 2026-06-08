"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { type SkillCategory, SKILL_COLOR_MAP } from "@/lib/constants/skills";

interface SkillCategoryCardProps {
  category: SkillCategory;
  categoryIndex: number;
}

export default function SkillCategoryCard({ category, categoryIndex }: SkillCategoryCardProps) {
  const [isSelected, setIsSelected] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const colors = SKILL_COLOR_MAP[category.color];
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
      onHoverStart={() => setIsSelected(true)}
      onHoverEnd={() => setIsSelected(false)}
      className={`relative bg-white/80 dark:bg-[#1A1614]/90 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
        isSelected
          ? `${colors.border} shadow-xl ${colors.glow}`
          : "border-stone-200 dark:border-[#3D3530] shadow-sm hover:shadow-lg dark:hover:shadow-[0_4px_20px_rgba(255,159,102,0.15)]"
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
        <h3 className="text-xl font-bold text-stone-800 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,159,102,0.2)]">{category.title}</h3>
      </div>

      {/* Skills List */}
      <div className="relative space-y-4">
        {category.skills.map((skill, skillIndex) => {
          const isHovered = hoveredSkill === skillIndex;

          return (
            <motion.div
              key={skillIndex}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
              onHoverStart={() => setHoveredSkill(skillIndex)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="group"
            >
              {/* Skill Name and Experience */}
              <div className="flex flex-wrap justify-between items-center gap-2">
                <span
                  className={`text-sm font-semibold transition-colors ${
                    isHovered ? `${colors.text} dark:text-primary dark:drop-shadow-[0_0_8px_rgba(255,159,102,0.4)]` : "text-stone-700 dark:text-stone-300"
                  }`}
                >
                  {skill.name}
                </span>
                <motion.span
                  className={`px-2 py-0.5 rounded-full bg-white/70 dark:bg-[#252220] border ${colors.border} text-xs font-bold ${colors.text} dark:text-primary dark:drop-shadow-[0_0_6px_rgba(255,159,102,0.5)]`}
                  animate={{
                    scale: isHovered ? 1.04 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {skill.experience}
                </motion.span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
