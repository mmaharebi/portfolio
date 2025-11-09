"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Portal from "./Portal";
import BriefTimelineItemCard from "./BriefTimelineItemCard";
import { BRIEF_COLOR_MAP } from "@/lib/constants/briefTimeline";

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

export default function BriefTimeline({ items }: BriefTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [tooltipRect, setTooltipRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const activeItem = expandedIndex !== null ? items[expandedIndex] : null;
  type PaletteKey = keyof typeof BRIEF_COLOR_MAP;
  const activePalette = activeItem ? BRIEF_COLOR_MAP[(activeItem.color || "primary") as PaletteKey] : null;

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
            {items.map((item, index) => (
              <BriefTimelineItemCard
                key={index}
                item={item}
                index={index}
                isHovered={hoveredIndex === index}
                isExpanded={expandedIndex === index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                itemRef={(el) => {
                  itemRefs.current[index] = el;
                }}
                titleRef={(el) => {
                  titleRefs.current[index] = el;
                }}
              />
            ))}
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
