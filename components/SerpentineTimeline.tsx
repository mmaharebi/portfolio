"use client";

import { motion } from "motion/react";
import { Calendar, Award, GraduationCap, Briefcase, MapPin } from "lucide-react";

export interface DetailedTimelineItem {
  year: string;
  title: string;
  subtitle?: string;
  location?: string;
  description: string;
  icon?: "award" | "education" | "work" | "milestone";
  color?: "primary" | "secondary" | "accent";
}

interface SerpentineTimelineProps {
  items: DetailedTimelineItem[];
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
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary",
    text: "text-secondary",
    icon: "text-secondary",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent",
    text: "text-accent",
    icon: "text-accent",
  },
};

export default function SerpentineTimeline({ items }: SerpentineTimelineProps) {
  // Group items into rows (serpentine pattern)
  const rows: DetailedTimelineItem[][] = [];
  const itemsPerRow = 3;
  
  for (let i = 0; i < items.length; i += itemsPerRow) {
    rows.push(items.slice(i, i + itemsPerRow));
  }

  return (
    <div className="relative py-12">
      {/* SVG Serpentine Path */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block"
        style={{ minHeight: `${rows.length * 400}px` }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="serpentineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" />
            <stop offset="50%" stopColor="var(--secondary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <motion.path
          d={generateSerpentinePath(rows.length)}
          stroke="url(#serpentineGradient)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="8,4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Timeline Items in Serpentine Layout */}
      <div className="relative space-y-16 md:space-y-24">
        {rows.map((row, rowIndex) => {
          const isLeftToRight = rowIndex % 2 === 0;
          const displayRow = isLeftToRight ? row : [...row].reverse();

          return (
            <div
              key={rowIndex}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                isLeftToRight ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {displayRow.map((item, itemIndex) => {
                const actualIndex = isLeftToRight ? itemIndex : row.length - 1 - itemIndex;
                const globalIndex = rowIndex * itemsPerRow + actualIndex;
                const Icon = iconMap[item.icon || "milestone"];
                const colors = colorMap[item.color || "primary"];

                return (
                  <motion.div
                    key={globalIndex}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: itemIndex * 0.15 }}
                    className="flex-1 relative"
                  >
                    {/* Connection Circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: itemIndex * 0.15 + 0.2 }}
                      className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full ${colors.bg} border-3 ${colors.border} shadow-lg flex items-center justify-center bg-surface z-10`}
                    >
                      <Icon className={`w-5 h-5 ${colors.icon}`} />
                    </motion.div>

                    {/* Content Card */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className={`mt-8 ${colors.bg} backdrop-blur-sm rounded-2xl p-6 border-2 ${colors.border} shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      {/* Year Badge & Location */}
                      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 ${colors.bg} ${colors.text} text-sm font-bold rounded-full border ${colors.border}`}
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          {item.year}
                        </span>
                        {item.location && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-foreground-muted">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </span>
                        )}
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className={`text-sm md:text-base font-semibold ${colors.text} mb-3`}>
                          {item.subtitle}
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-sm text-foreground-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Generate serpentine SVG path (zigzag pattern)
function generateSerpentinePath(rowCount: number): string {
  const rowHeight = 400;
  const padding = 50;
  const width = 100; // percentage
  
  let path = `M ${padding} ${rowHeight / 2}`; // Start left

  for (let i = 0; i < rowCount; i++) {
    const y = i * rowHeight + rowHeight / 2;
    const isLeftToRight = i % 2 === 0;

    if (i === 0) {
      // First row: straight line to the right
      path += ` L ${width - padding} ${y}`;
    } else {
      // Add semicircle to next row
      const previousY = (i - 1) * rowHeight + rowHeight / 2;
      const nextY = y;
      const midY = (previousY + nextY) / 2;
      
      if (isLeftToRight) {
        // Coming from right, curve down to left
        path += ` Q ${width - padding} ${midY}, ${padding} ${nextY}`;
        if (i < rowCount - 1) {
          // Continue to the right if not last row
          path += ` L ${width - padding} ${nextY}`;
        }
      } else {
        // Coming from left, curve down to right
        path += ` Q ${padding} ${midY}, ${width - padding} ${nextY}`;
        if (i < rowCount - 1) {
          // Continue to the left if not last row
          path += ` L ${padding} ${nextY}`;
        }
      }
    }
  }

  return path;
}
