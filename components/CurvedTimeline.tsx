"use client";

import { motion } from "motion/react";
import { Calendar, Award, GraduationCap, Briefcase, MapPin } from "lucide-react";

export interface TimelineItem {
  year: string;
  title: string;
  subtitle?: string;
  location?: string;
  description: string;
  icon?: "award" | "education" | "work" | "milestone";
  color?: "primary" | "secondary" | "accent";
}

interface CurvedTimelineProps {
  items: TimelineItem[];
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

export default function CurvedTimeline({ items }: CurvedTimelineProps) {
  return (
    <div className="relative py-12">
      {/* SVG Curved Path */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 1200"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="var(--secondary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <motion.path
          d={generateCurvyPath(items.length)}
          stroke="url(#pathGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* Timeline Items */}
      <div className="relative space-y-8 md:space-y-12">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const Icon = iconMap[item.icon || "milestone"];
          const colors = colorMap[item.color || "primary"];
          const position = getItemPosition(index, items.length);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } flex-col gap-6 md:gap-12`}
              style={{
                marginLeft: `${position.x}%`,
              }}
            >
              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className={`w-full md:w-5/12 ${colors.bg} backdrop-blur-sm rounded-2xl p-6 border-2 ${colors.border} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                {/* Year Badge */}
                <div className="flex items-center gap-3 mb-3">
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
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className={`text-sm md:text-base font-semibold ${colors.text} mb-3`}>
                    {item.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-sm md:text-base text-foreground-secondary leading-relaxed">
                  {item.description}
                </p>
              </motion.div>

              {/* Icon Circle (Center) */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                className={`relative z-10 shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full ${colors.bg} border-4 ${colors.border} shadow-lg flex items-center justify-center bg-surface`}
              >
                <Icon className={`w-8 h-8 md:w-10 md:h-10 ${colors.icon}`} />
              </motion.div>

              {/* Spacer for opposite side */}
              <div className="hidden md:block w-5/12"></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Generate curved SVG path based on number of items
function generateCurvyPath(itemCount: number): string {
  const height = itemCount * 180; // Spacing between items
  const width = 800;
  const amplitude = 150; // How much the curve waves

  let path = `M ${width / 2} 0`; // Start at top center

  for (let i = 0; i < itemCount; i++) {
    const y = (i + 1) * 180;
    const direction = i % 2 === 0 ? 1 : -1;
    const x = width / 2 + direction * amplitude;

    // Create smooth curve using quadratic bezier
    const controlX = width / 2 + (direction * amplitude) / 2;
    const controlY = y - 90;

    path += ` Q ${controlX} ${controlY}, ${x} ${y}`;

    // If not last item, curve back towards center
    if (i < itemCount - 1) {
      const nextDirection = (i + 1) % 2 === 0 ? 1 : -1;
      const nextX = width / 2 + nextDirection * amplitude;
      const nextY = (i + 2) * 180;
      const nextControlX = width / 2 - (direction * amplitude) / 2;
      const nextControlY = y + 90;

      path += ` Q ${nextControlX} ${nextControlY}, ${width / 2} ${y + 90}`;
    }
  }

  return path;
}

// Calculate horizontal position for each item
function getItemPosition(index: number, total: number): { x: number; y: number } {
  const isEven = index % 2 === 0;
  const maxOffset = 15; // Maximum percentage offset from center
  const offset = isEven ? -maxOffset : maxOffset;

  return {
    x: offset,
    y: index * 20,
  };
}
