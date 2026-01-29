"use client";

import InteractiveJourney from "@/components/InteractiveJourney";
import InteractiveSkills from "@/components/InteractiveSkills";
import ProjectShowcase, { type Project } from "@/components/ProjectShowcase";
import AboutBackground from "@/components/backgrounds/AboutBackground";
import type { DetailedTimelineItem } from "@/components/SerpentineTimeline";
import { User, FileText, Download } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

// Detailed timeline data
const detailedTimelineData: DetailedTimelineItem[] = [
  {
    year: "2017",
    title: "Physics Olympiad (Silver Medal)",
    subtitle: "Age 17",
    location: "Tehran, Iran",
    description:
      "Silver Medal in Iran’s National Physics Olympiad. Recognized by Iran’s National Elites Foundation. Sparked a lifelong passion for theoretical and applied physics.",
    icon: "award",
    color: "primary",
  },
  {
    year: "2017 - 2023",
    title: "Sharif University of Technology",
    subtitle: "B.Sc. Electrical Engineering",
    location: "Tehran, Iran",
    description:
      "Admitted to Iran’s top technical university. Focused on electromagnetics, microwaves, and signal processing. Served as Teaching Assistant in both EE and CE courses.",
    icon: "education",
    color: "secondary",
  },
  {
    year: "2019",
    title: "Industry Internship",
    subtitle: "MTCI / Hamrah-e Aval",
    location: "Sharif University",
    description:
      "Designed and programmed a motion-controlled 5G demo platform using Arduino and Leap Motion. Combined software and hardware design for real-time control.",
    icon: "work",
    color: "accent",
  },
  {
    year: "2021 - 2023",
    title: "Research & Course Projects",
    subtitle: "B.Sc. Electrical Engineering",
    location: "Sharif University of Technology",
    description:
      "Completed multiple high-level course projects under supervision of faculty in the Electromagnetics group. Focused on antenna design, microwave circuits, and simulation-based analysis using HFSS, ADS, and MATLAB.",
    icon: "work",
    color: "accent",
  },
  {
    year: "2021 - 2023",
    title: "Teaching Assistant",
    subtitle: "B.Sc. Electrical Engineering",
    location: "Sharif University of Technology",
    description:
      "Assisted professors in conducting laboratory sessions and grading assignments. Provided support to students in understanding complex concepts in circuit and programming.",
    icon: "work",
    color: "accent",
  },
  {
    year: "2024 - Present",
    title: "University of Kassel",
    subtitle: "M.Sc. Electrical Communication Engineering",
    location: "Kassel, Germany",
    description:
      "Pursuing advanced studies in communication systems, signal processing, and applied electromagnetics. Focusing on 5G systems, digital modulation techniques, and modern wireless technologies.",
    icon: "education",
    color: "secondary",
  },
  {
    year: "2024-Present",
    title: "Research & Development Engineer",
    subtitle: "Communication Systems & Software Engineering",
    location: "Kassel, Germany",
    description:
      "Combining theoretical research with practical software development. Building simulation tools, web applications, and exploring the intersection of electromagnetics, mathematics, and modern software engineering.",
    icon: "work",
    color: "primary",
  },
];

// Projects data (curated from resume + GitHub)
const projectsData: Project[] = [
  {
    title: "Adaptive FEM Post-Processing Tool",
    description:
      "C#/WPF tool to parse and visualize EM field results (potential, E/H, Poynting vector) with Delaunay triangulation. Automates parameter extraction and plotting for research workflows.",
    technologies: ["C#", "WPF", "Gnuplot"],
    tags: ["Visualization", "Automation", "Numerical Methods"],
    year: "2023",
    category: "Software",
    githubUrl: "https://github.com/mmaharebi/AdaptiveFEM",
    highlight: true,
  },
  {
    title: "High-Gain Horn Antenna Design (7 GHz)",
    description:
      "Designed and simulated a 16 dBi horn antenna in HFSS. Performed parametric sweeps and impedance matching to meet radiation and gain targets.",
    technologies: ["HFSS", "Antenna Theory", "EM Simulation"],
    tags: ["Microwave", "RF Design", "Radiation Patterns"],
    year: "2023",
    category: "RF/Microwave",
    githubUrl: "https://github.com/mmaharebi/AntennaLabProjects",
    highlight: true,
  },
  {
    title: "Rotated-Beam Dipole Array (15 dBi)",
    description:
      "Modeled a dipole array with electronic beam rotation. Studied phasing networks, mutual coupling, and array factor to achieve steerable patterns.",
    technologies: ["HFSS", "MATLAB", "Array Theory"],
    tags: ["Beamforming", "Antenna Arrays", "Modeling"],
    year: "2023",
    category: "RF/Microwave",
    githubUrl: "https://github.com/mmaharebi/AntennaLabProjects",
    highlight: true,
  },
  {
    title: "Microstrip Branch-Line Coupler (10 GHz)",
    description:
      "Designed a 3-dB branch-line coupler in ADS; optimized for equal power split, isolation, and low insertion loss. Validated via S-parameter analysis.",
    technologies: ["ADS", "Microwave Circuits", "S-Parameters"],
    tags: ["RF Components", "Optimization", "Circuit Design"],
    year: "2021",
    category: "RF/Microwave",
    githubUrl: "https://github.com/mmaharebi/MicrostripCircuitDesign",
  },
  {
    title: "Waveguide–Antenna Matching (End-Diaphragm)",
    description:
      "HFSS study of waveguide–antenna transition using an end-diaphragm resonator near 10 GHz; improved impedance match and transmission.",
    technologies: ["HFSS", "Network Analysis", "Smith Chart"],
    tags: ["Waveguides", "Impedance Matching", "Resonators"],
    year: "2021",
    category: "RF/Microwave",
    githubUrl: "https://github.com/mmaharebi/MicrowaveWaveguideAntennaDesign",
  },
  {
    title: "Resonator Design & Analysis",
    description:
      "Compared cavity/diaphragm resonators for RF filtering. Analyzed Q-factor, coupling, and resonance behavior; implications for frequency-selective networks.",
    technologies: ["HFSS", "EM Theory"],
    tags: ["Filters", "Quality Factor", "RF Design"],
    year: "2021",
    category: "RF/Microwave",
    githubUrl: "https://github.com/mmaharebi/MicrowaveWaveguideAntennaDesign",
  },
  {
    title: "2D FDTD Cavity — PEC Validation",
    description:
      "From-scratch finite-difference time-domain solver for 2D PEC cavity; validated field evolution and resonant modes with <1% error.",
    technologies: ["Python", "NumPy", "FDTD"],
    tags: ["Computational EM", "Numerical Simulation", "Verification"],
    year: "2025",
    category: "Research",
    githubUrl: "https://github.com/mmaharebi/fdtd-pec-cavity",
    demoUrl: "/blog/fdtd2d-pec-cavity",
  },
  {
    title: "Fiber Mode Perturbation Analysis",
    description:
      "Rigorous Sturm–Liouville operator theory applied to optical fiber eigenmodes. First-order perturbation formulas for index, radius, and absorption; validated numerically with publication-quality results.",
    technologies: ["Python", "SciPy", "Operator Theory"],
    tags: ["Photonics", "Perturbation Theory", "Waveguides"],
    year: "2025",
    category: "Research",
    githubUrl: "https://github.com/mmaharebi/fiber-perturbation",
    demoUrl: "/blog/fiber-mode-perturbation",
    highlight: true,
  },
  {
    title: "5G Demo Platform (Internship)",
    description:
      "Gesture-controlled demo for Iran's first 5G showcase: Arduino + Leap Motion for real-time robotic control illustrating low-latency links.",
    technologies: ["Arduino", "C++", "Leap Motion"],
    tags: ["5G", "IoT", "Real-Time Systems"],
    year: "2019",
    category: "Software",
    githubUrl: "https://github.com/mmaharebi/Manager", // replace if you publish a dedicated repo
  },
];

export default function AboutPage() {
  return (
    <>
      <AboutBackground />
      <div className="min-h-screen relative">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
          <div className="relative max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 dark:bg-[#1A1614]/90 rounded-full mb-6 border-2 border-terracotta/20 dark:border-primary/30 dark:shadow-[0_0_20px_rgba(255,159,102,0.15)]">
              <User className="w-4 h-4 text-terracotta dark:text-primary dark:drop-shadow-[0_0_8px_rgba(255,159,102,0.6)]" />
              <span className="text-sm font-semibold text-terracotta dark:text-primary">
                About Me
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-stone-800 dark:text-white mb-6 dark:drop-shadow-[0_0_30px_rgba(255,159,102,0.3)]">
              Who Am I?
            </h1>

            <div className="relative max-w-3xl mx-auto text-base">
              {/* Decorative quote mark */}
              <div className="absolute -top-6 -left-4 text-8xl text-terracotta/10 dark:text-primary/20 font-serif leading-none dark:drop-shadow-[0_0_15px_rgba(255,159,102,0.2)]">
                "
              </div>

              <div className="relative bg-white/60 dark:bg-[#1A1614]/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_60px_rgba(255,159,102,0.1)] border border-stone-200/50 dark:border-primary/20">
                {/* Top accent line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-linear-to-r from-transparent via-terracotta dark:via-primary to-transparent rounded-full dark:shadow-[0_0_8px_rgba(255,159,102,0.6)]" />

                <div className="space-y-6 text-stone-700 dark:text-stone-300">
                  <p className="text-lg md:text-xl leading-relaxed font-medium">
                    I'm{" "}
                    <span className="font-bold text-primary dark:text-primary dark:drop-shadow-[0_0_8px_rgba(255,159,102,0.4)]">Mahdy M.</span>
                    , a master's student in Electrical Communication Engineering
                    at the University of Kassel, focusing on{" "}
                    <span className="text-terracotta dark:text-secondary font-semibold">
                      communication systems
                    </span>
                    ,{" "}
                    <span className="text-terracotta dark:text-secondary font-semibold">
                      applied electromagnetics
                    </span>
                    , and{" "}
                    <span className="text-terracotta dark:text-secondary font-semibold">
                      computational modeling
                    </span>
                    .
                  </p>

                  <div className="h-px bg-linear-to-r from-transparent via-stone-300 dark:via-primary/30 to-transparent dark:shadow-[0_0_4px_rgba(255,159,102,0.3)]" />

                  <p className="text-lg md:text-xl leading-relaxed font-medium">
                    My journey began with a{" "}
                    <span className="inline-flex items-center gap-1 font-bold text-amber-700 dark:text-[#FFC078] dark:drop-shadow-[0_0_6px_rgba(255,192,120,0.5)]">
                      Silver Medal
                    </span>{" "}
                    in Iran's National Physics Olympiad, which earned me
                    recognition from the Iran National Elites Foundation. Since
                    then, I've been fascinated by the intersection of
                    mathematics, electromagnetics, and software — pursuing
                    projects that bridge theory, simulation, and real-world
                    engineering.
                  </p>

                  <div className="h-px bg-linear-to-r from-transparent via-stone-300 dark:via-primary/30 to-transparent dark:shadow-[0_0_4px_rgba(255,159,102,0.3)]" />

                  <p className="text-lg md:text-xl leading-relaxed font-medium">
                    I'm preparing for my<span className="px-2 py-0.5 bg-terracotta/10 dark:bg-primary/20 text-terracotta dark:text-primary font-bold rounded dark:shadow-[0_0_12px_rgba(255,159,102,0.3)] dark:border dark:border-primary/30">
                      Master&apos;s Thesis (2026)
                      </span>by building validated simulation projects and documenting them with short blog write-ups and full reports in the corresponding <Link href="https://github.com/mmaharebi" className="text-secondary underline dark:text-secondary" target="_blank">Github repositories</Link>.
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-linear-to-r from-transparent via-terracotta dark:via-primary to-transparent rounded-full dark:shadow-[0_0_8px_rgba(255,159,102,0.6)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CV/Resume Download Section */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Centered decorative badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-[#1A1614]/80 backdrop-blur-md rounded-full border border-secondary/30 dark:border-secondary/50 shadow-lg dark:shadow-[0_0_20px_rgba(232,177,122,0.2)]">
                <FileText className="w-4 h-4 text-secondary dark:text-secondary" />
                <span className="text-sm text-stone-700 dark:text-stone-200 font-semibold">
                  Download Credentials
                </span>
              </div>
            </div>

            {/* Download card */}
            <div className="relative bg-white/60 dark:bg-[#1A1614]/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl dark:shadow-[0_8px_40px_rgba(232,177,122,0.25)] border border-stone-200/50 dark:border-secondary/30">
              {/* Subtle corner glow */}
              <div className="absolute -top-3 -right-3 w-32 h-32 bg-secondary/20 dark:bg-secondary/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-3 -left-3 w-32 h-32 bg-amber-500/10 dark:bg-accent/20 rounded-full blur-3xl" />

              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-linear-to-r from-transparent via-secondary dark:via-secondary to-transparent rounded-full dark:shadow-[0_0_8px_rgba(232,177,122,0.5)]" />

              <div className="relative z-10 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-stone-100 mb-3">
                  Professional Documents
                </h3>
                <p className="text-base md:text-lg text-stone-600 dark:text-stone-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Download my curriculum vitae and resume to learn more about my academic background and professional experience.
                </p>

                <div className="flex flex-wrap gap-4 justify-center items-center">
                  <motion.a
                    href="/cv.pdf"
                    download
                    className="group relative px-7 py-3.5 bg-linear-to-r from-secondary to-amber-500 dark:from-secondary dark:to-accent text-white dark:text-[#0A0908] rounded-2xl font-semibold text-base md:text-lg overflow-hidden shadow-lg dark:shadow-[0_8px_30px_rgba(232,177,122,0.4)]"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 12px 32px rgba(232, 177, 122, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%", skewX: -15 }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Download CV
                    </span>
                  </motion.a>

                  <motion.a
                    href="/resume.pdf"
                    download
                    className="group px-7 py-3.5 bg-white/80 dark:bg-[#1A1614]/80 backdrop-blur-sm border-2 border-stone-200 dark:border-[#3D3530] text-stone-700 dark:text-stone-200 rounded-2xl font-semibold text-base md:text-lg hover:border-secondary dark:hover:border-secondary hover:bg-secondary/5 dark:hover:bg-secondary/10 shadow-lg dark:shadow-[0_4px_20px_rgba(232,177,122,0.15)] transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Download Resume
                    </span>
                  </motion.a>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-linear-to-r from-transparent via-secondary dark:via-secondary to-transparent rounded-full dark:shadow-[0_0_8px_rgba(232,177,122,0.5)]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <InteractiveJourney items={detailedTimelineData} />
        </div>
      </section>

      {/* Projects Section */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <ProjectShowcase projects={projectsData} />
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <InteractiveSkills />
        </div>
      </section>
      </div>
    </>
  );
}
