import { Award, GraduationCap, Briefcase, Calendar } from "lucide-react";

export const BRIEF_ICON_MAP = {
  award: Award,
  education: GraduationCap,
  work: Briefcase,
  milestone: Calendar,
};

export const BRIEF_COLOR_MAP = {
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
