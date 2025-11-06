"use client";

import { motion, AnimatePresence } from "motion/react";
import { Calendar, Award, GraduationCap, Briefcase, ChevronDown } from "lucide-react";
import { useState } from "react";

export interface BriefTimelineItem {
  year: string;
  title: string;
  icon?: "award" | "education" | "work" | "milestone";
  color?: "primary" | "secondary" | "accent";
  hint?: string; // Short extra info shown on hover/click
}

interface BriefTimelineProps {
  items: BriefTimelineItem[];
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
    icon: "text-primary",
    glow: "shadow-primary/20",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary",
    text: "text-secondary",
    icon: "text-secondary",
    glow: "shadow-secondary/20",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent",
    text: "text-accent",
    icon: "text-accent",
    glow: "shadow-accent/20",
  },
};

export default function BriefTimeline({ items }: BriefTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-full overflow-visible">
      <div className="relative py-12 pb-8 min-h-[280px] md:min-h-80 overflow-visible">
        {/* Animated Horizontal Line */}
        <svg 
          className="absolute top-1/3 md:top-1/2 left-8 right-8 h-1 -translate-y-1/2 hidden md:block pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 2"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
              <stop offset="50%" stopColor="var(--secondary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.line
            x1="0"
            y1="1"
            x2="100"
            y2="1"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeDasharray="4,2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Timeline Items Container */}
        <div className="overflow-x-auto overflow-y-visible scrollbar-hide -mx-6 px-6 pb-4">
          <div className="flex justify-between items-start gap-6 md:gap-8 min-w-max md:min-w-0 min-h-full py-4 pt-8">
            {items.map((item, index) => {
              const Icon = iconMap[item.icon || "milestone"];
              const colors = colorMap[item.color || "primary"];
              const isHovered = hoveredIndex === index;
              const isExpanded = expandedIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="flex flex-col items-center gap-3 w-36 md:w-auto md:flex-1 shrink-0 cursor-pointer group relative"
                >
                  {/* Floating particles effect on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute top-0 w-1.5 h-1.5 rounded-full ${colors.bg} ${colors.border} border`}
                            initial={{ opacity: 0, y: 0, x: 0 }}
                            animate={{ 
                              opacity: [0, 1, 0],
                              y: -30 - i * 10,
                              x: (i - 1) * 15,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ 
                              duration: 1.5,
                              delay: i * 0.2,
                              repeat: Infinity,
                              repeatDelay: 0.5
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Connecting dot on line */}
                  <motion.div
                    className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-surface hidden md:block"
                    animate={{
                      scale: isHovered ? [1, 1.3, 1] : 1,
                      boxShadow: isHovered 
                        ? `0 0 20px ${colors.icon}`
                        : `0 0 0px ${colors.icon}`,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`w-full h-full rounded-full ${colors.bg} ${colors.border} border-2`} />
                  </motion.div>

                  {/* Icon Circle with pulse effect */}
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.15 : 1,
                      rotateY: isHovered ? 360 : 0,
                    }}
                    transition={{ 
                      scale: { duration: 0.3 },
                      rotateY: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="relative z-10"
                  >
                    {/* Pulse ring on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className={`absolute inset-0 rounded-full ${colors.border} border-2`}
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </AnimatePresence>
                    
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${colors.bg} border-3 ${colors.border} shadow-xl ${isHovered ? colors.glow : ''} flex items-center justify-center bg-surface transition-all duration-300`}
                    >
                      <motion.div
                        animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className={`w-7 h-7 md:w-9 md:h-9 ${colors.icon}`} />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Year Badge with shimmer effect */}
                  <motion.span
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                    }}
                    className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 ${colors.bg} ${colors.text} text-xs font-bold rounded-full border-2 ${colors.border} whitespace-nowrap shadow-md overflow-hidden`}
                  >
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                      />
                    )}
                    <Calendar className="w-3.5 h-3.5 relative z-10" />
                    <span className="relative z-10">{item.year}</span>
                  </motion.span>

                  {/* Title with expand indicator */}
                  <motion.div
                    animate={{
                      y: isHovered ? -2 : 0,
                    }}
                    className="flex flex-col items-center gap-1 w-full"
                  >
                    <p className="text-center text-xs md:text-sm font-semibold text-foreground leading-tight line-clamp-2 w-full px-1">
                      {item.title}
                    </p>
                    
                    {item.hint && (
                      <motion.div
                        animate={{ 
                          opacity: isHovered ? 1 : 0.4,
                          y: isHovered ? 0 : -5
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className={`w-3 h-3 ${colors.icon} ${isExpanded ? 'rotate-180' : ''} transition-transform duration-300`} />
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Expandable hint tooltip */}
                  <AnimatePresence>
                    {isExpanded && item.hint && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full mt-2 ${colors.bg} ${colors.border} border-2 rounded-xl p-3 shadow-xl backdrop-blur-sm z-20 w-48 md:w-56`}
                      >
                        <p className={`text-xs ${colors.text} block leading-relaxed`}>
                          {item.hint}
                        </p>
                        {/* Arrow pointer */}
                        <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 ${colors.bg} ${colors.border} border-t-2 border-l-2 rotate-45`} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Progress indicator */}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-current to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ 
                      scaleX: isHovered ? 1 : 0,
                      opacity: isHovered ? 0.5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ color: colors.icon }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
