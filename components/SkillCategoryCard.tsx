"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { type SkillCategory, SKILL_COLOR_MAP, type Skill } from "@/lib/constants/skills";

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
              {/* Skill Name and Percentage */}
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-sm font-medium transition-colors ${
                    isHovered ? colors.text : "text-stone-700"
                  }`}
                >
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
                    x: isHovered ? ["-100%", "200%"] : "-100%",
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
}
