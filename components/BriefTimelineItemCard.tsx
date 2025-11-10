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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 80,
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
      className="relative flex flex-col items-center cursor-pointer group"
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
      {/* Artistic Icon Container with glow */}
      <div className="relative mb-4 md:mb-6">
        {/* Animated glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full blur-xl opacity-0`}
          style={{ backgroundColor: colors.borderColor }}
          animate={{
            opacity: isHovered ? 0.3 : 0,
            scale: isHovered ? 1.3 : 1,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Pulse ring on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                className={`absolute inset-0 rounded-full border-2`}
                style={{ borderColor: colors.borderColor }}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                className={`absolute inset-0 rounded-full border-2`}
                style={{ borderColor: colors.borderColor }}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Main Icon Circle */}
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
            rotate: isHovered ? [0, -3, 3, 0] : 0,
            y: isHovered ? -4 : 0,
          }}
          transition={{ duration: 0.5 }}
          className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full ${colors.bg} border-2 shadow-lg flex items-center justify-center bg-white overflow-hidden`}
          style={{ borderColor: colors.borderColor }}
        >
          {/* Subtle gradient overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background: `linear-gradient(135deg, ${colors.borderColor} 0%, transparent 100%)`,
            }}
          />

          <motion.div
            animate={{
              rotate: isHovered ? [0, -8, 8, 0] : 0,
            }}
            transition={{ duration: 0.6 }}
          >
            <Icon className={`w-7 h-7 md:w-9 md:h-9 relative z-10`} style={{ color: colors.borderColor }} />
          </motion.div>
        </motion.div>
      </div>

      {/* Year Badge - Redesigned */}
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? -2 : 0,
        }}
        className="relative mb-2 md:mb-3"
      >
        <div
          className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 bg-white shadow-sm`}
          style={{ borderColor: colors.borderColor }}
        >
          {/* Shimmer effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{
                background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)`,
              }}
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.5 }}
            />
          )}
          
          <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 relative z-10" style={{ color: colors.borderColor }} />
          <span
            className="text-xs md:text-sm font-bold relative z-10"
            style={{ color: colors.borderColor }}
          >
            {item.year}
          </span>
        </div>
      </motion.div>

      {/* Title */}
      <motion.p
        ref={titleRef}
        className="text-center text-sm md:text-base font-semibold text-stone-800 leading-snug px-2 mb-1"
        animate={{
          y: isHovered ? -1 : 0,
        }}
      >
        {item.title}
      </motion.p>

      {/* Hint indicator */}
      {item.hint && (
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0.5,
            y: isExpanded ? 2 : 0,
            rotate: isExpanded ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="mt-1"
        >
          <ChevronDown className="w-4 h-4" style={{ color: colors.borderColor }} />
        </motion.div>
      )}

      {/* Decorative underline on hover */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
        style={{ backgroundColor: colors.borderColor }}
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isHovered ? "60%" : 0,
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
