"use client";

import { motion, AnimatePresence } from "motion/react";
import { Calendar, Award, GraduationCap, Briefcase, ChevronDown } from "lucide-react";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Portal from "./Portal";

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
  const [tooltipRect, setTooltipRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const activeItem = expandedIndex !== null ? items[expandedIndex] : null;
  type PaletteKey = keyof typeof colorMap;
  const activePalette = activeItem
    ? colorMap[(activeItem.color || "primary") as PaletteKey]
    : null;

  // Recompute tooltip position when expandedIndex changes or on layout changes
  useLayoutEffect(() => {
    if (expandedIndex === null) {
      setTooltipRect(null);
      return;
    }
    const el = titleRefs.current[expandedIndex] || itemRefs.current[expandedIndex];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // position tooltip centered below the title block
    setTooltipRect({ x: rect.left + rect.width / 2, y: rect.bottom, w: rect.width, h: rect.height });
  }, [expandedIndex]);

  // Update on scroll / resize to keep portal tooltip synced
  useEffect(() => {
    if (expandedIndex === null) return;
    const handler = () => {
      const el = titleRefs.current[expandedIndex] || itemRefs.current[expandedIndex];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setTooltipRect({ x: rect.left + rect.width / 2, y: rect.bottom, w: rect.width, h: rect.height });
    };
    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler, true);
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler, true);
    };
  }, [expandedIndex]);

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="relative py-12 pb-8 min-h-[280px] md:min-h-80 overflow-visible">
        {/* Animated Wavy Connecting Lines - Desktop only */}
        <svg 
          className="absolute top-1/3 md:top-1/2 left-0 right-0 h-24 -translate-y-1/2 hidden md:block pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 1200 100"
        >
          <defs>
            <linearGradient id="wavyLineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D97757" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#E8B17A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#A86843" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="wavyLineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8B17A" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#D97757" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E8B17A" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          
          {/* Main wavy line */}
          <motion.path
            d="M0,50 Q200,30 400,50 T800,50 T1200,50"
            fill="none"
            stroke="url(#wavyLineGradient1)"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{
              d: [
                "M0,50 Q200,30 400,50 T800,50 T1200,50",
                "M0,50 Q200,70 400,50 T800,50 T1200,50",
                "M0,50 Q200,30 400,50 T800,50 T1200,50",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Secondary wavy line for depth */}
          <motion.path
            d="M0,50 Q200,60 400,50 T800,50 T1200,50"
            fill="none"
            stroke="url(#wavyLineGradient2)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
            animate={{
              d: [
                "M0,50 Q200,60 400,50 T800,50 T1200,50",
                "M0,50 Q200,40 400,50 T800,50 T1200,50",
                "M0,50 Q200,60 400,50 T800,50 T1200,50",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </svg>
        
        {/* Mobile: Horizontal Scroll Carousel / Desktop: Flex Grid */}
        <div 
          ref={scrollContainerRef} 
          className="overflow-x-auto overflow-y-visible scrollbar-hide pb-4 snap-x snap-mandatory md:snap-none"
        >
          <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 min-w-full md:justify-between px-4 md:px-0 py-4 pt-8">
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
                  className="flex flex-col items-center gap-2 md:gap-3 w-[140px] sm:w-40 md:flex-1 md:min-w-0 shrink-0 snap-center cursor-pointer group relative focus:outline-none"
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  role={item.hint ? "button" : undefined}
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpandedIndex(isExpanded ? null : index);
                    }
                    if (e.key === "Escape" && isExpanded) {
                      setExpandedIndex(null);
                    }
                  }}
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
                      scale: isHovered ? 1.08 : 1,
                      rotate: isHovered ? [0, -2, 2, 0] : 0,
                    }}
                    transition={{
                      duration: 0.4,
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
                      className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full ${colors.bg} border-2 md:border-3 ${colors.border} shadow-xl ${isHovered ? colors.glow : ''} flex items-center justify-center bg-surface transition-all duration-300`}
                    >
                      <motion.div
                        animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 ${colors.icon}`} />
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Year Badge with shimmer effect */}
                  <motion.span
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                    }}
                    className={`relative inline-flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 ${colors.bg} ${colors.text} text-xs font-bold rounded-full border-2 ${colors.border} whitespace-nowrap shadow-md overflow-hidden`}
                  >
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                      />
                    )}
                    <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5 relative z-10" />
                    <span className="relative z-10 text-[10px] sm:text-xs">{item.year}</span>
                  </motion.span>

                  {/* Title with expand indicator */}
                  <motion.div
                    animate={{
                      y: isHovered ? -2 : 0,
                    }}
                    className="flex flex-col items-center gap-1 w-full px-1"
                  >
                    <p
                      className="text-center text-xs md:text-sm font-semibold text-foreground leading-tight line-clamp-3 md:line-clamp-2 w-full"
                      ref={(el) => {
                        titleRefs.current[index] = el;
                      }}
                    >
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

                  {/* Removed inline tooltip; now rendered via portal */}

                  {/* Progress indicator repositioned */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-px bg-gradient-to-r from-transparent via-current to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 0.6 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: colors.icon }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Portal Tooltip */}
      <Portal>
        <AnimatePresence>
          {expandedIndex !== null && tooltipRect && activeItem && activeItem.hint && activePalette && (
            <motion.div
              key={expandedIndex}
              initial={{ opacity: 0, scale: 0.95, x: "-50%", y: -8 }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: "-50%", y: -8 }}
              transition={{ duration: 0.18 }}
              style={{
                position: "fixed",
                top: tooltipRect.y + 8,
                left: tooltipRect.x,
                pointerEvents: "auto",
              }}
              className={`${activePalette.bg} ${activePalette.border} border-2 rounded-xl p-4 shadow-2xl backdrop-blur-sm w-60 md:w-72`}
            >
              <p className={`text-xs leading-relaxed ${activePalette.text}`}>{activeItem.hint}</p>
              <div
                style={{
                  position: "absolute",
                  top: -6,
                  left: "50%",
                  transform: "translateX(-50%) rotate(45deg)",
                  width: 12,
                  height: 12,
                }}
                className={`${activePalette.bg} ${activePalette.border} border-t-2 border-l-2`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}
