import { Code, Cpu, Layers, Radio } from "lucide-react";

export interface Skill {
  name: string;
  level: number;
  category: "languages" | "frameworks" | "tools" | "research";
  icon?: string;
}

export interface SkillCategory {
  title: string;
  icon: typeof Code;
  color: "primary" | "secondary" | "accent";
  skills: Skill[];
}

export interface ResearchInterest {
  name: string;
  description: string;
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code,
    color: "primary",
    skills: [
      { name: "Python", level: 95, category: "languages" },
      { name: "MATLAB", level: 90, category: "languages" },
      { name: "JavaScript / TypeScript", level: 85, category: "languages" },
      { name: "C++", level: 72, category: "languages" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: Layers,
    color: "secondary",
    skills: [
      { name: "NumPy / SciPy (SciPy Stack)", level: 92, category: "frameworks" },
      { name: "MATLAB Signal Processing & Optimization", level: 88, category: "frameworks" },
      { name: "React & Next.js", level: 82, category: "frameworks" },
      { name: "Tailwind CSS", level: 85, category: "frameworks" },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Cpu,
    color: "accent",
    skills: [
      { name: "Git & GitHub", level: 92, category: "tools" },
      { name: "Jupyter", level: 92, category: "tools" },
      { name: "VS Code", level: 95, category: "tools" },
      { name: "LaTeX", level: 90, category: "tools" },
    ],
  },
  {
    title: "Research & Simulation",
    icon: Radio,
    color: "primary",
    skills: [
      { name: "Antenna Design & Arrays", level: 90, category: "research" },
      { name: "Digital Communications & DSP", level: 88, category: "research" },
      { name: "EM Simulation (CST / HFSS / ADS)", level: 87, category: "research" },
      { name: "5G/6G Systems & Link Concepts", level: 84, category: "research" },
    ],
  },
];

export const RESEARCH_INTERESTS: ResearchInterest[] = [
  {
    name: "5G/6G Communication Systems",
    description:
      "Signal processing, system modeling, and link-level optimization for next-generation wireless networks.",
  },
  {
    name: "Applied Electromagnetics & RF Design",
    description:
      "Antenna arrays, microwave circuits, and electromagnetic wave propagation analysis through simulation and measurement.",
  },
  {
    name: "Signal Processing & Optimization",
    description:
      "Algorithm design for detection, estimation, and adaptive filtering with applications in communication and sensing.",
  },
  {
    name: "Computational Electromagnetics & Simulation",
    description:
      "Numerical modeling (FEM, FDTD) and multi-domain simulation for microwave and communication system analysis.",
  },
];

export const SKILL_COLOR_MAP = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary",
    text: "text-primary",
    fill: "bg-primary",
    glow: "shadow-primary/30",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary",
    text: "text-secondary",
    fill: "bg-secondary",
    glow: "shadow-secondary/30",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent",
    text: "text-accent",
    fill: "bg-accent",
    glow: "shadow-accent/30",
  },
};
