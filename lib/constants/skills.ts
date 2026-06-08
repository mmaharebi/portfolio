import { Code, Cpu, Layers, Radio } from "lucide-react";

export interface Skill {
  name: string;
  experience: string;
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
      { name: "Python", experience: "Broad practical use", category: "languages" },
      { name: "JavaScript / TypeScript", experience: "Practical frontend use", category: "languages" },
      { name: "C# / .NET", experience: "Bachelor thesis project", category: "languages" },
      { name: "Java", experience: "Academic / TA experience", category: "languages" },
      { name: "C++", experience: "Simulation & visualization", category: "languages" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: Layers,
    color: "secondary",
    skills: [
      { name: "React & Next.js", experience: "Practical frontend use", category: "frameworks" },
      { name: ".NET / WPF / MVVM", experience: "Bachelor thesis project", category: "frameworks" },
      { name: "PostgreSQL / Prisma", experience: "Database integration", category: "frameworks" },
      { name: "Angular", experience: "Basic exposure", category: "frameworks" },
      { name: "NumPy / SciPy", experience: "Scientific computing", category: "frameworks" },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Cpu,
    color: "accent",
    skills: [
      { name: "Git & GitHub", experience: "Daily workflow", category: "tools" },
      { name: "CSS / SCSS / Tailwind", experience: "UI styling", category: "tools" },
      { name: "Linux", experience: "Daily workflow", category: "tools" },
      { name: "VS Code", experience: "Daily workflow", category: "tools" },
      { name: "LaTeX", experience: "Academic writing", category: "tools" },
    ],
  },
  {
    title: "Research & Simulation",
    icon: Radio,
    color: "primary",
    skills: [
      { name: "Computational Modeling", experience: "Research use", category: "research" },
      { name: "Digital Communications & DSP", experience: "Academic focus", category: "research" },
      { name: "EM Simulation", experience: "RF / microwave projects", category: "research" },
      { name: "Python / C++ Scientific Computing", experience: "Practical use", category: "research" },
    ],
  },
];

export const RESEARCH_INTERESTS: ResearchInterest[] = [
  {
    name: "Communication Systems & DSP",
    description:
      "Signal processing, system modeling, and communication theory for wireless and digital systems.",
  },
  {
    name: "Applied Electromagnetics & RF Simulation",
    description:
      "Antenna, microwave, and electromagnetic field analysis using simulation-driven engineering workflows.",
  },
  {
    name: "Scientific Computing & Simulation Tools",
    description:
      "Numerical modeling, scripting, and reproducible computation for research and engineering analysis.",
  },
  {
    name: "Technical Software for Engineering Workflows",
    description:
      "Practical tools that connect data, simulation results, visualization, and documentation.",
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
