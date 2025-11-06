"use client";

import { motion } from "motion/react";
import { Calendar, Award, GraduationCap, Briefcase } from "lucide-react";

export interface BriefTimelineItem {
  year: string;
  title: string;
  icon?: "award" | "education" | "work" | "milestone";
  color?: "primary" | "secondary" | "accent";
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

export default function BriefTimeline({ items }: BriefTimelineProps) {
  return (
    <div className="relative py-8">
      {/* Horizontal Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-linear-to-r from-primary/20 via-secondary/30 to-accent/20 -translate-y-1/2" />
      
      {/* Timeline Items */}
      <div className="relative flex justify-between items-center gap-4 md:gap-8 overflow-x-auto pb-4 px-4">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon || "milestone"];
          const colors = colorMap[item.color || "primary"];

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center gap-3 min-w-[120px] md:min-w-40"
            >
              {/* Icon Circle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-full ${colors.bg} border-3 ${colors.border} shadow-lg flex items-center justify-center bg-surface`}
              >
                <Icon className={`w-6 h-6 md:w-7 md:h-7 ${colors.icon}`} />
              </motion.div>

              {/* Year Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${colors.bg} ${colors.text} text-xs font-bold rounded-full border ${colors.border}`}
              >
                <Calendar className="w-3 h-3" />
                {item.year}
              </span>

              {/* Title */}
              <p className="text-center text-xs md:text-sm font-semibold text-foreground leading-tight line-clamp-2">
                {item.title}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
