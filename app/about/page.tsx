import SerpentineTimeline, { type DetailedTimelineItem } from "@/components/SerpentineTimeline";
import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";

// Detailed timeline data
const detailedTimelineData: DetailedTimelineItem[] = [
  {
    year: "2012",
    title: "National Physics Olympiad Silver Medal",
    subtitle: "Age 17",
    location: "Tehran, Iran",
    description: "Achieved silver medal in Iran's National Physics Olympiad, competing among top students nationwide. This recognition opened doors to prestigious universities and solidified my passion for physics and mathematics.",
    icon: "award",
    color: "primary",
  },
  {
    year: "2013",
    title: "Sharif University of Technology",
    subtitle: "B.Sc. Electrical Engineering",
    location: "Tehran, Iran",
    description: "Admitted to Iran's most prestigious technical university. Focused on electromagnetics, signal processing, and communication systems. Built strong foundations in mathematics, physics, and engineering principles.",
    icon: "education",
    color: "secondary",
  },
  {
    year: "2017",
    title: "Research Assistant",
    subtitle: "Antenna Design & RF Engineering",
    location: "Sharif University",
    description: "Conducted research on microwave antennas and RF circuits. Developed computational models for electromagnetic simulations using MATLAB and specialized EM solvers.",
    icon: "work",
    color: "accent",
  },
  {
    year: "2020",
    title: "University of Kassel",
    subtitle: "M.Sc. Electrical Communication Engineering",
    location: "Kassel, Germany",
    description: "Pursuing advanced studies in communication systems, signal processing, and applied electromagnetics. Focusing on 5G systems, digital modulation techniques, and modern wireless technologies.",
    icon: "education",
    color: "secondary",
  },
  {
    year: "2021",
    title: "Teaching Assistant",
    subtitle: "Communication Systems Lab",
    location: "University of Kassel",
    description: "Guided students through hands-on experiments in digital communications, signal processing, and RF measurements. Developed lab materials and mentored project work.",
    icon: "work",
    color: "accent",
  },
  {
    year: "2022-Present",
    title: "Research & Development Engineer",
    subtitle: "Communication Systems & Software Engineering",
    location: "Kassel, Germany",
    description: "Combining theoretical research with practical software development. Building simulation tools, web applications, and exploring the intersection of electromagnetics, mathematics, and modern software engineering.",
    icon: "work",
    color: "primary",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-orange-50 to-stone-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-20 -right-20 md:right-10 w-64 h-64 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-20 md:left-10 w-80 h-80 bg-linear-to-tr from-amber-300/20 to-terracotta/20 rounded-full blur-3xl" />
        
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
            
            <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed mb-8">
              I'm <span className="font-semibold text-primary">Mahdy M.</span>, 
              an electrical engineer passionate about electromagnetics, signal processing, 
              and software engineering. Here's my journey from a curious student to a researcher 
              and developer.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              My Technical Journey
            </h2>
            <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto">
              Every milestone shaped who I am today
            </p>
          </div>

          <SerpentineTimeline items={detailedTimelineData} />
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section className="px-6 pb-24 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              Core Competencies
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Technical Skills */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-stone-200 shadow-sm">
              <h3 className="text-xl font-bold text-stone-800 mb-4">Technical Skills</h3>
              <div className="space-y-2 text-stone-600">
                <p>• <strong>Languages:</strong> Python, MATLAB, JavaScript/TypeScript, C++</p>
                <p>• <strong>Frameworks:</strong> Next.js, React, Tailwind CSS, NumPy, SciPy</p>
                <p>• <strong>Tools:</strong> Git, VSCode, LaTeX, Jupyter</p>
                <p>• <strong>EM Simulation:</strong> CST, HFSS, COMSOL</p>
              </div>
            </div>

            {/* Research Interests */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-stone-200 shadow-sm">
              <h3 className="text-xl font-bold text-stone-800 mb-4">Research Interests</h3>
              <div className="space-y-2 text-stone-600">
                <p>• 5G/6G Communication Systems</p>
                <p>• Applied Electromagnetics & RF Design</p>
                <p>• Signal Processing & Optimization</p>
                <p>• Scientific Computing & Simulation</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
