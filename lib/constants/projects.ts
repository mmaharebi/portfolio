import { Radio, Zap, Cpu, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProjectCategory = "RF/Microwave" | "Signal Processing" | "Software" | "Research";

export interface CategoryColors {
  bg: string;
  border: string;
  text: string;
  icon: LucideIcon;
  glow: string;
}

export const CATEGORY_COLORS: Record<ProjectCategory, CategoryColors> = {
  "RF/Microwave": {
    bg: "from-primary/10 to-amber-100/20",
    border: "border-primary/30",
    text: "text-primary",
    icon: Radio,
    glow: "group-hover:shadow-primary/20",
  },
  "Signal Processing": {
    bg: "from-secondary/10 to-blue-100/20",
    border: "border-secondary/30",
    text: "text-secondary",
    icon: Zap,
    glow: "group-hover:shadow-secondary/20",
  },
  Software: {
    bg: "from-accent/10 to-purple-100/20",
    border: "border-accent/30",
    text: "text-accent",
    icon: Cpu,
    glow: "group-hover:shadow-accent/20",
  },
  Research: {
    bg: "from-terracotta/10 to-amber-100/20",
    border: "border-terracotta/30",
    text: "text-terracotta",
    icon: Sparkles,
    glow: "group-hover:shadow-terracotta/20",
  },
};
