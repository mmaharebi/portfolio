"use client";

import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { ExpertiseArea } from "@/lib/constants/expertise";
import { COLOR_PALETTES } from "@/lib/constants/colors";

interface ExpertiseCardProps {
  area: ExpertiseArea;
  index: number;
  isExpanded: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

export default function ExpertiseCard({
  area,
  index,
  isExpanded,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
}: ExpertiseCardProps) {
  const Icon = area.icon;
  const colors = COLOR_PALETTES[area.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
      className={`group relative cursor-pointer rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 transition-all duration-500 w-full ${
        isExpanded
          ? `${colors.border} ${colors.glow} shadow-2xl md:scale-105`
          : `border-stone-200 hover:border-stone-300 shadow-lg hover:shadow-xl`
      }`}
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-linear-to-br ${colors.gradient} opacity-0 rounded-2xl md:rounded-3xl`}
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
              className={`w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-linear-to-br ${colors.gradient} p-0.5`}
            >
              <div className="w-full h-full bg-white rounded-xl md:rounded-2xl flex items-center justify-center">
                <Icon className={`w-7 h-7 md:w-8 md:h-8 ${colors.text}`} />
              </div>
            </div>
          </motion.div>

          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-lg md:text-2xl font-bold text-stone-800 mb-2 md:mb-3">
              {area.title}
            </h3>

            {/* Short description - visible on mobile */}
            <p className="text-sm md:text-base text-stone-600 mb-0 md:mb-4 line-clamp-2 md:line-clamp-none">
              {area.shortDesc}
            </p>
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
                <p className="text-sm md:text-base text-stone-700 mb-4 leading-relaxed">
                  {area.fullDesc}
                </p>

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
}
