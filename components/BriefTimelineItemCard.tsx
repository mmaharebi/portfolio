"use client";

import { motion, AnimatePresence } from "motion/react";
import { Calendar, ChevronDown } from "lucide-react";
import { BRIEF_ICON_MAP, BRIEF_COLOR_MAP } from "@/lib/constants/briefTimeline";
import type { BriefTimelineItem } from "./BriefTimeline";

interface BriefTimelineItemCardProps {
  item: BriefTimelineItem;
  index: number;
  isHovered: boolean;
  isExpanded: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  itemRef: (el: HTMLDivElement | null) => void;
  titleRef: (el: HTMLParagraphElement | null) => void;
}

export default function BriefTimelineItemCard({
  item,
  index,
  isHovered,
  isExpanded,
  onHoverStart,
  onHoverEnd,
  onClick,
  itemRef,
  titleRef,
}: BriefTimelineItemCardProps) {
  const Icon = BRIEF_ICON_MAP[item.icon || "milestone"];
  const colors = BRIEF_COLOR_MAP[item.color || "primary"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
      className="flex flex-col items-center gap-2 md:gap-3 w-[140px] sm:w-40 md:flex-1 md:min-w-0 shrink-0 snap-center cursor-pointer group relative focus:outline-none"
      ref={itemRef}
      role={item.hint ? "button" : undefined}
      tabIndex={0}
      aria-expanded={isExpanded}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
        if (e.key === "Escape" && isExpanded) {
          onClick();
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
                  repeatDelay: 0.5,
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
          boxShadow: isHovered ? `0 0 20px ${colors.icon}` : `0 0 0px ${colors.icon}`,
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
          className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full ${colors.bg} border-2 md:border-3 ${colors.border} shadow-xl ${
            isHovered ? colors.glow : ""
          } flex items-center justify-center bg-surface transition-all duration-300`}
        >
          <motion.div animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }} transition={{ duration: 0.5 }}>
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
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
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
          ref={titleRef}
        >
          {item.title}
        </p>

        {item.hint && (
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0.4,
              y: isHovered ? 0 : -5,
            }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown
              className={`w-3 h-3 ${colors.icon} ${isExpanded ? "rotate-180" : ""} transition-transform duration-300`}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Progress indicator repositioned */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-px bg-linear-to-r from-transparent via-current to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ color: colors.icon }}
      />
    </motion.div>
  );
}
