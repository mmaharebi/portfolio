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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      <div className="relative py-16 md:py-20">
        {/* Artistic Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating decorative circles */}
          <motion.div
            className="absolute top-10 left-[10%] w-24 h-24 rounded-full bg-terracotta/5 dark:bg-primary/15 blur-2xl"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 right-[15%] w-32 h-32 rounded-full bg-primary/5 dark:bg-primary/20 blur-2xl"
            animate={{
              y: [0, 15, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central flowing timeline line - Desktop */}
          <div className="hidden md:block absolute left-0 right-0 top-24 h-0.5 overflow-hidden">
            <motion.div
              className="h-full bg-linear-[90deg] from-transparent via-terracotta/30 dark:via-primary/50 to-transparent dark:shadow-[0_0_8px_rgba(255,159,102,0.4)]"
              animate={{
                scaleX: [0.8, 1, 0.8],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Journey Items */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory md:snap-none pb-8 md:pb-0"
            style={{ paddingTop: '120px', paddingBottom: '120px' }}
          >
            <div className="flex gap-4 md:gap-0 md:justify-between px-4 md:px-0 min-w-max md:min-w-full">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center snap-center md:snap-none shrink-0"
                  style={{
                    width: '160px',
                    minWidth: '160px',
                  }}
                >
                  {/* Connecting dot on timeline */}
                  <motion.div
                    className="hidden md:block absolute left-1/2 top-24 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white dark:bg-[#0A0908] border-2 shadow-lg dark:shadow-[0_0_12px_rgba(255,159,102,0.6)] z-10"
                    style={{
                      borderColor: BRIEF_COLOR_MAP[(item.color || "primary") as PaletteKey].borderColor,
                    }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.3 }}
                  />

                  <BriefTimelineItemCard
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
                </div>
              ))}
            </div>
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
