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
      className="relative w-full"
    >
      {/* Main card */}
      <div className="group relative cursor-pointer">
        {/* Card content */}
        <motion.div
          className={`relative bg-white/90 dark:bg-[#1A1614]/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 transition-all duration-500 overflow-hidden ${
            isExpanded
              ? `${colors.border} dark:border-primary/60 shadow-2xl dark:shadow-[0_8px_40px_rgba(255,159,102,0.3)]`
              : `border-stone-200/60 dark:border-[#3D3530]/60 hover:border-stone-300 dark:hover:border-[#3D3530] shadow-lg hover:shadow-xl dark:shadow-[0_4px_20px_rgba(255,159,102,0.1)]`
          }`}
          animate={{
            y: isHovered ? -4 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated wavy lines background */}
          <svg 
            className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
            style={{ opacity: (isHovered || isExpanded) ? 0.15 : 0 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className={colors.text} stopOpacity="0.3" />
                <stop offset="100%" className={colors.text} stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            <motion.path
              d="M0,20 Q25,15 50,20 T100,20"
              stroke={`url(#grad-${index})`}
              strokeWidth="1.5"
              fill="none"
              vectorEffect="non-scaling-stroke"
              animate={{
                d: [
                  "M0,20 Q25,15 50,20 T100,20",
                  "M0,20 Q25,25 50,20 T100,20",
                  "M0,20 Q25,15 50,20 T100,20",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.path
              d="M0,40 Q25,45 50,40 T100,40"
              stroke={`url(#grad-${index})`}
              strokeWidth="1"
              fill="none"
              vectorEffect="non-scaling-stroke"
              animate={{
                d: [
                  "M0,40 Q25,45 50,40 T100,40",
                  "M0,40 Q25,35 50,40 T100,40",
                  "M0,40 Q25,45 50,40 T100,40",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            
            <motion.path
              d="M0,65 Q25,60 50,65 T100,65"
              stroke={`url(#grad-${index})`}
              strokeWidth="0.8"
              fill="none"
              vectorEffect="non-scaling-stroke"
              animate={{
                d: [
                  "M0,65 Q25,60 50,65 T100,65",
                  "M0,65 Q25,70 50,65 T100,65",
                  "M0,65 Q25,60 50,65 T100,65",
                ],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            
            <motion.path
              d="M0,85 Q25,88 50,85 T100,85"
              stroke={`url(#grad-${index})`}
              strokeWidth="0.6"
              fill="none"
              vectorEffect="non-scaling-stroke"
              animate={{
                d: [
                  "M0,85 Q25,88 50,85 T100,85",
                  "M0,85 Q25,82 50,85 T100,85",
                  "M0,85 Q25,88 50,85 T100,85",
                ],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />
          </svg>

          {/* Floating particles */}
          {(isHovered || isExpanded) && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 ${colors.bg} rounded-full`}
                  initial={{ 
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: 0 
                  }}
                  animate={{ 
                    y: [0, -60, -120],
                    x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 2 + i,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                  style={{
                    left: `${20 + i * 25}%`,
                    bottom: '20%',
                  }}
                />
              ))}
            </>
          )}

          <div className="relative">
            {/* Layout with icon and title in same row */}
            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
              {/* Artistic Icon Container */}
              <motion.div
                className="shrink-0 relative"
                animate={{
                  rotate: isHovered ? [0, -5, 5, 0] : 0,
                  scale: isExpanded ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-linear-[135deg] ${colors.gradient} p-0.5`}
                >
                  <div className="w-full h-full bg-white dark:bg-[#0A0908] rounded-xl flex items-center justify-center">
                    <Icon className={`w-6 h-6 md:w-7 md:h-7 ${colors.text}`} />
                  </div>
                </div>

                {/* Orbiting dot */}
                <motion.div
                  className={`absolute w-1.5 h-1.5 ${colors.bg} rounded-full`}
                  animate={{
                    rotate: isHovered || isExpanded ? 360 : 0,
                  }}
                  transition={{
                    duration: 3,
                    repeat: isHovered || isExpanded ? Infinity : 0,
                    ease: "linear"
                  }}
                  style={{
                    top: '50%',
                    left: '50%',
                    marginLeft: '20px',
                    marginTop: '-3px',
                  }}
                />
              </motion.div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-stone-800 dark:text-stone-100">
                  {area.title}
                </h3>
              </div>

              {/* Chevron indicator - always visible */}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0"
              >
                <ChevronDown className={`w-5 h-5 ${colors.text}`} />
              </motion.div>
            </div>

            {/* Short description */}
            <p className="text-sm md:text-base text-stone-600 dark:text-stone-300 mb-3 md:mb-4 leading-relaxed">
              {area.shortDesc}
            </p>

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
                    {/* Decorative divider */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className={`h-0.5 w-16 bg-linear-to-r ${colors.gradient} rounded-full mb-4 md:hidden`}
                    />

                    <p className="text-sm md:text-base text-stone-700 dark:text-stone-300 mb-4 leading-relaxed">
                      {area.fullDesc}
                    </p>

                    {/* Skills tags with stagger animation */}
                    <div className="flex flex-wrap gap-2">
                      {area.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: i * 0.05, type: "spring" }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className={`px-3 py-1.5 bg-white/90 dark:bg-[#0A0908]/80 ${colors.text} dark:${colors.text} rounded-lg text-xs md:text-sm font-semibold border-2 ${colors.border} dark:${colors.border} shadow-sm hover:shadow-md dark:hover:shadow-[0_4px_12px_rgba(255,159,102,0.3)] transition-all backdrop-blur-sm`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expand indicator with artistic touch */}
            <motion.div
              className={`mt-4 flex items-center gap-2 text-sm font-semibold ${colors.text} relative`}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span>{isExpanded ? "Show less" : "Learn more"}</span>
              <motion.div
                animate={{
                  rotate: isExpanded ? 90 : 0,
                  x: isHovered ? [0, 4, 0] : 0,
                }}
                transition={{ 
                  rotate: { duration: 0.3 },
                  x: { duration: 1.5, repeat: isHovered ? Infinity : 0 }
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
              
              {/* Animated underline */}
              <motion.div
                className={`absolute -bottom-1 left-0 h-0.5 bg-linear-to-r ${colors.gradient} rounded-full`}
                initial={{ width: 0 }}
                animate={{ 
                  width: isHovered || isExpanded ? "100%" : 0 
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>

          {/* Animated corner accent dots */}
          <motion.div
            className={`absolute top-4 right-4 w-2 h-2 rounded-full ${colors.bg}`}
            animate={{
              scale: isHovered ? [1, 1.5, 1] : 1,
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          <motion.div
            className={`absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full ${colors.bg}`}
            animate={{
              scale: isHovered ? [1, 1.3, 1] : 1,
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 0.5,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
