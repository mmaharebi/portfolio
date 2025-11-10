"use client";

import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { ICON_MAP, JOURNEY_COLOR_MAP } from "@/lib/constants/journey";
import type { DetailedTimelineItem } from "./SerpentineTimeline";

interface JourneyItemProps {
  item: DetailedTimelineItem;
  index: number;
  isExpanded: boolean;
  isHovered: boolean;
  onToggleExpand: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function JourneyItem({
  item,
  index,
  isExpanded,
  isHovered,
  onToggleExpand,
  onHoverStart,
  onHoverEnd,
}: JourneyItemProps) {
  const Icon = ICON_MAP[item.icon || "milestone"];
  const colors = JOURNEY_COLOR_MAP[item.color || "primary"];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      {/* Content Card - Full width on mobile, half width on desktop */}
      <motion.div
        className="w-full md:w-[calc(50%-4rem)]"
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`relative bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isExpanded
              ? `${colors.border} shadow-xl ${colors.glow} focus:ring-${item.color}`
              : `border-stone-200 hover:border-stone-300 shadow-md hover:shadow-lg focus:ring-stone-400`
          }`}
          onClick={onToggleExpand}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggleExpand();
            }
          }}
          tabIndex={0}
          role="button"
          aria-expanded={isExpanded}
        >
          {/* Hover glow effect */}
          <AnimatePresence>
            {isHovered && !isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`absolute inset-0 ${colors.bg} rounded-2xl -z-10`}
              />
            )}
          </AnimatePresence>

          {/* Floating particles */}
          <AnimatePresence>
            {isExpanded && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1.5 h-1.5 rounded-full ${colors.dot}`}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: -60,
                      x: (i - 1) * 20,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                    }}
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Year Badge */}
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            className={`inline-flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 ${colors.bg} ${colors.text} rounded-full border-2 ${colors.border} mb-3 md:mb-4 font-bold text-xs md:text-sm`}
          >
            <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
            {item.year}
          </motion.div>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-stone-800 mb-2">{item.title}</h3>

          {/* Subtitle */}
          {item.subtitle && (
            <p className={`text-xs md:text-sm font-semibold ${colors.text} mb-2`}>{item.subtitle}</p>
          )}

          {/* Location */}
          {item.location && (
            <div className="flex items-center gap-1.5 text-stone-600 text-xs md:text-sm mb-3 md:mb-4">
              <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5" />
              <span>{item.location}</span>
            </div>
          )}

          {/* Description Preview */}
          <motion.p
            className="text-stone-600 text-xs md:text-sm leading-relaxed"
            animate={{
              height: isExpanded ? "auto" : "2.5rem",
            }}
            style={{ overflow: "hidden" }}
          >
            {item.description}
          </motion.p>

          {/* Expand Button */}
          <motion.button
            className={`mt-3 md:mt-4 flex items-center gap-2 text-xs md:text-sm font-semibold ${colors.text} hover:underline`}
            whileHover={{ x: 5 }}
          >
            <span>{isExpanded ? "Show less" : "Read more"}</span>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      {/* Center Icon Circle - Hidden on mobile, visible on md+ */}
      <div className="hidden md:block absolute md:left-1/2 md:-translate-x-1/2 z-10">
        <motion.div
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? [0, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Pulse rings */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div
                  className={`absolute inset-0 rounded-full border-2 ${colors.border}`}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className={`absolute inset-0 rounded-full border-2 ${colors.border}`}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Icon container */}
          <div
            className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${colors.bg} border-4 ${colors.border} bg-white flex items-center justify-center shadow-lg`}
          >
            <motion.div
              animate={{
                rotate: isHovered ? [0, -10, 10, 0] : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              <Icon className={`w-6 h-6 md:w-7 md:h-7 ${colors.text}`} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Spacer for alignment - only visible on desktop */}
      <div className="hidden md:block flex-1 md:w-[calc(50%-4rem)]" />
    </motion.div>
  );
}
