import { Award, GraduationCap, Briefcase, Calendar } from "lucide-react";

export const ICON_MAP = {
  award: Award,
  education: GraduationCap,
  work: Briefcase,
  milestone: Calendar,
};

export const JOURNEY_COLOR_MAP = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary",
    text: "text-primary",
    fill: "bg-primary",
    glow: "shadow-primary/30",
    dot: "bg-primary",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary",
    text: "text-secondary",
    fill: "bg-secondary",
    glow: "shadow-secondary/30",
    dot: "bg-secondary",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent",
    text: "text-accent",
    fill: "bg-accent",
    glow: "shadow-accent/30",
    dot: "bg-accent",
  },
};
