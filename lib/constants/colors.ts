export type ColorVariant = "primary" | "secondary" | "accent" | "terracotta";

export interface ColorPalette {
  bg: string;
  border: string;
  text: string;
  glow: string;
  gradient: string;
  borderColor: string;
}

export const COLOR_PALETTES: Record<ColorVariant, ColorPalette> = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary",
    text: "text-primary",
    glow: "shadow-primary/30",
    gradient: "from-primary to-amber-600",
    borderColor: "#D97757",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary",
    text: "text-secondary",
    glow: "shadow-secondary/30",
    gradient: "from-secondary to-amber-400",
    borderColor: "#F59E0B",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent",
    text: "text-accent",
    glow: "shadow-accent/30",
    gradient: "from-accent to-amber-700",
    borderColor: "#EA580C",
  },
  terracotta: {
    bg: "bg-terracotta/10",
    border: "border-terracotta",
    text: "text-terracotta",
    glow: "shadow-terracotta/30",
    gradient: "from-terracotta to-primary",
    borderColor: "#D97757",
  },
};
