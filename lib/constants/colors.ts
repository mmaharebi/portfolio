export type ColorVariant = "primary" | "secondary" | "accent" | "terracotta";

export interface ColorPalette {
  bg: string;
  border: string;
  text: string;
  glow: string;
  gradient: string;
}

export const COLOR_PALETTES: Record<ColorVariant, ColorPalette> = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary",
    text: "text-primary",
    glow: "shadow-primary/30",
    gradient: "from-primary to-amber-600",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary",
    text: "text-secondary",
    glow: "shadow-secondary/30",
    gradient: "from-secondary to-amber-400",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent",
    text: "text-accent",
    glow: "shadow-accent/30",
    gradient: "from-accent to-amber-700",
  },
  terracotta: {
    bg: "bg-terracotta/10",
    border: "border-terracotta",
    text: "text-terracotta",
    glow: "shadow-terracotta/30",
    gradient: "from-terracotta to-primary",
  },
};
