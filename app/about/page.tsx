import InteractiveJourney from "@/components/InteractiveJourney";
import InteractiveSkills from "@/components/InteractiveSkills";
import ProjectShowcase, { type Project } from "@/components/ProjectShowcase";
import type { DetailedTimelineItem } from "@/components/SerpentineTimeline";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";

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
    year: "2021",
    title: "Teaching Assistant",
    subtitle: "Communication Systems Lab",
    location: "University of Kassel",
    description:
      "Guided students through hands-on experiments in digital communications, signal processing, and RF measurements. Developed lab materials and mentored project work.",
    icon: "work",
    color: "accent",
  },
  {
    year: "2022-Present",
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
    demoUrl: "/blog/fdtd-pec-cavity", // if keeping the blog slug
  },
  {
    title: "5G Demo Platform (Internship)",
    description:
      "Gesture-controlled demo for Iran’s first 5G showcase: Arduino + Leap Motion for real-time robotic control illustrating low-latency links.",
    technologies: ["Arduino", "C++", "Leap Motion"],
    tags: ["5G", "IoT", "Real-Time Systems"],
    year: "2019",
    category: "Software",
    githubUrl: "https://github.com/mmaharebi/Manager", // replace if you publish a dedicated repo
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-orange-50 to-stone-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        {/* Decorative background - animated blobs */}
        <div
          className="absolute top-20 -right-20 md:right-10 w-64 h-64 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-20 -left-20 md:left-10 w-80 h-80 bg-linear-to-tr from-amber-300/20 to-terracotta/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-6">
              <User className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-semibold text-terracotta">
                About Me
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-800 mb-6">
              Who Am I?
            </h1>

            <div className="relative max-w-3xl mx-auto text-base">
              {/* Decorative quote mark */}
              <div className="absolute -top-6 -left-4 text-8xl text-terracotta/10 font-serif leading-none">
                "
              </div>

              <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-stone-200/50">
                {/* Top accent line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-linear-to-r from-transparent via-terracotta to-transparent rounded-full" />

                <div className="space-y-6 text-stone-700">
                  <p className="text-lg md:text-xl leading-relaxed">
                    I'm{" "}
                    <span className="font-semibold text-primary">Mahdy M.</span>
                    , a master's student in Electrical Communication Engineering
                    at the University of Kassel, focusing on{" "}
                    <span className="text-terracotta font-medium">
                      communication systems
                    </span>
                    ,{" "}
                    <span className="text-terracotta font-medium">
                      applied electromagnetics
                    </span>
                    , and{" "}
                    <span className="text-terracotta font-medium">
                      computational modeling
                    </span>
                    .
                  </p>

                  <div className="h-px bg-linear-to-r from-transparent via-stone-300 to-transparent" />

                  <p className="text-lg md:text-xl leading-relaxed">
                    My journey began with a{" "}
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                      Silver Medal
                    </span>{" "}
                    in Iran's National Physics Olympiad, which earned me
                    recognition from the Iran National Elites Foundation. Since
                    then, I've been fascinated by the intersection of
                    mathematics, electromagnetics, and software — pursuing
                    projects that bridge theory, simulation, and real-world
                    engineering.
                  </p>

                  <div className="h-px bg-linear-to-r from-transparent via-stone-300 to-transparent" />

                  <p className="text-lg md:text-xl leading-relaxed">
                    I'm currently seeking a{" "}
                    <span className="px-2 py-0.5 bg-terracotta/10 text-terracotta font-medium rounded">
                      funded master's thesis (2026) opportunity
                    </span>{" "}
                    in Germany or Europe that aligns with my research interests
                    in 5G/6G systems, optimization, and electromagnetic design.
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-linear-to-r from-transparent via-terracotta to-transparent rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <InteractiveJourney items={detailedTimelineData} />
        </div>
      </section>

      {/* Projects Section */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <ProjectShowcase projects={projectsData} />
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <InteractiveSkills />
        </div>
      </section>
    </div>
  );
}
