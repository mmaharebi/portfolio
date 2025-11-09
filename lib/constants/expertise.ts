import { Radio, Zap, Calculator, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ExpertiseArea {
  icon: LucideIcon;
  title: string;
  shortDesc: string;
  fullDesc: string;
  color: "primary" | "secondary" | "accent" | "terracotta";
  skills: string[];
}

export const EXPERTISE_DATA: ExpertiseArea[] = [
  {
    icon: Radio,
    title: "Communication Systems",
    shortDesc: "5G/6G signal processing & optimization",
    fullDesc:
      "Advancing signal processing and system optimization for next-generation networks.",
    color: "primary",
    skills: [
      "5G/6G",
      "Digital Modulation",
      "Channel Estimation",
      "MATLAB",
      "Python",
    ],
  },
  {
    icon: Zap,
    title: "RF & Microwave Engineering",
    shortDesc: "Antenna & circuit design via EM simulation",
    fullDesc:
      "Designing microwave circuits, antennas, and front-end systems through EM simulation and numerical methods.",
    color: "accent",
    skills: [
      "CST Studio",
      "HFSS",
      "Antenna Design",
      "RF Circuits",
      "EM Theory",
    ],
  },
  {
    icon: Calculator,
    title: "Computational Electromagnetics & Modeling",
    shortDesc: "Wave analysis & numerical simulation",
    fullDesc:
      "Developing and applying computational models to analyze electromagnetic wave behavior and optimize device performance.",
    color: "secondary",
    skills: ["FDTD", "FEM", "MATLAB", "Python", "Numerical Analysis"],
  },
  {
    icon: Layers,
    title: "Mathematical Foundations",
    shortDesc: "Theory underlying modern communication & EM",
    fullDesc:
      "Bridging abstract theory and practical engineering through applied mathematics and physics.",
    color: "terracotta",
    skills: [
      "Linear Algebra",
      "Probability",
      "Quantum Mechanics",
      "Numerical Analysis",
    ],
  },
];
