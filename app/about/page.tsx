"use client";

import { motion } from "motion/react";
import {
  GraduationCap,
  Radio,
  Zap,
  Calculator,
  Code2,
  Mail,
  Github,
  Linkedin,
  Brain,
  Waves,
  Server,
  BookOpen,
  Lightbulb,
  Target,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function AboutPage() {
  const researchFocus = [
    {
      icon: Radio,
      title: "Communication Systems",
      description:
        "Deep diving into digital modulation techniques, channel coding, and wireless communication protocols. Exploring 5G/6G technologies and their practical implementations.",
    },
    {
      icon: Zap,
      title: "Applied Electromagnetics",
      description:
        "Investigating antenna design, RF circuit analysis, and electromagnetic wave propagation. Bridging theoretical foundations with real-world RF engineering challenges.",
    },
    {
      icon: Calculator,
      title: "Mathematical Modeling",
      description:
        "Leveraging advanced mathematics and signal processing for system optimization. Applying linear algebra, probability theory, and numerical methods to communication problems.",
    },
    {
      icon: Code2,
      title: "Software Engineering",
      description:
        "Building simulation tools and visualization platforms for complex ECE concepts. Combining theoretical knowledge with practical software development skills.",
    },
  ];

  const technicalToolkit = [
    {
      category: "Simulation & Analysis",
      tools: "MATLAB, Python (NumPy, SciPy), GNU Radio",
    },
    {
      category: "RF & Hardware",
      tools: "CST Studio, ADS, LTSpice, Oscilloscopes",
    },
    {
      category: "Programming",
      tools: "Python, C++, JavaScript/TypeScript, MATLAB",
    },
    {
      category: "Mathematical Tools",
      tools: "LaTeX, Mathematica, MATLAB Symbolic",
    },
    {
      category: "Web Technologies",
      tools: "React, Next.js, Node.js, Tailwind CSS",
    },
    { category: "Development Tools", tools: "Git, Linux, Docker, VS Code" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-cream-50">
      {/* Hero Section with Decorative Background */}
      <section className="relative py-16 md:py-32 overflow-hidden">
        {/* Floating Background Elements */}
        <motion.div
          className="absolute top-10 md:top-20 -right-20 md:right-10 w-48 md:w-64 h-48 md:h-64 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 md:bottom-20 -left-20 md:left-10 w-56 md:w-80 h-56 md:h-80 bg-linear-to-tr from-amber-300/20 to-terracotta/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="p-4 md:p-5 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-2xl backdrop-blur-sm">
                <GraduationCap className="w-12 md:w-14 h-12 md:h-14 text-terracotta" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6">
              <span className="text-terracotta">About Me</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-stone-700 leading-relaxed max-w-3xl mx-auto">
              I’m an engineer who enjoys turning theory into working systems. My
              interests sit at the intersection of communication systems,
              applied electromagnetics, and scientific software. I like clean
              models, reproducible simulations, and clear writing that others
              can build on.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Journey & Motivation Section */}
      <section className="py-16 md:py-20 px-6 md:px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariants}
            className="mb-8 md:mb-10 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-4">
              <Target className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-semibold text-terracotta">
                My Journey
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="prose prose-lg max-w-none mx-auto"
          >
            <p className="text-stone-700 leading-relaxed text-base md:text-lg mb-5 md:mb-6">
              My fascination with electrical engineering began with a simple
              question:{" "}
              <em>
                How do invisible electromagnetic waves carry information across
                vast distances?
              </em>{" "}
              This curiosity led me to pursue a Master's degree in ECE, where
              I'm exploring the intricate mathematics and physics that power
              modern communication systems.
            </p>

            <p className="text-stone-700 leading-relaxed text-base md:text-lg mb-5 md:mb-6">
              At the University of Kassel, I'm diving deep into signal
              processing, antenna design, and wireless communication protocols.
              But beyond the coursework, I'm driven by the challenge of making
              complex technical concepts accessible and intuitive—both through
              software visualizations and clear technical writing.
            </p>

            <p className="text-stone-700 leading-relaxed text-base md:text-lg">
              This portfolio serves as a digital laboratory where I document my
              learning journey, share insights from my research, and build
              interactive tools that bring theoretical concepts to life. Whether
              it's explaining Fourier transforms with animated visualizations or
              designing antennas with electromagnetic simulations, I believe in
              learning by doing—and sharing that knowledge with others.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Research Focus Areas */}
      <section className="py-16 md:py-20 px-6 md:px-6 bg-linear-to-b from-transparent to-amber-50/50">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-10 md:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-4">
              <Brain className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-semibold text-terracotta">
                Research Focus
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800 mb-3 md:mb-4">
              Areas of Expertise
            </h2>
            <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto">
              Combining rigorous mathematical foundations with hands-on
              engineering to solve real-world challenges
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-8">
            {researchFocus.map((area, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative p-5 md:p-8 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-stone-200 hover:border-terracotta/50 transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-linear-to-br from-terracotta/0 to-amber-100/0 group-hover:from-terracotta/5 group-hover:to-amber-100/10 rounded-2xl transition-all duration-300" />

                <div className="relative">
                  <div className="flex items-start gap-3 md:gap-4 mb-3">
                    <div className="p-2.5 md:p-3 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-xl group-hover:from-terracotta/30 group-hover:to-amber-200/30 transition-all duration-300 shrink-0">
                      <area.icon className="w-5 md:w-6 h-5 md:h-6 text-terracotta" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-stone-800 mb-2">
                        {area.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Technical Toolkit */}
      <section className="py-16 md:py-20 px-6 md:px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-10 md:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-4">
              <Server className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-semibold text-terracotta">
                Technical Skills
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800 mb-3 md:mb-4">
              Toolkit & Technologies
            </h2>
            <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto">
              A versatile skill set spanning simulation, hardware, programming,
              and modern web development
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {technicalToolkit.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-4 md:p-5 bg-white/80 backdrop-blur-sm rounded-xl border-2 border-stone-200 hover:border-terracotta/30 transition-all duration-300"
              >
                <h3 className="text-sm md:text-base font-bold text-stone-800 mb-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-terracotta rounded-full shrink-0" />
                  {item.category}
                </h3>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                  {item.tools}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About This Portfolio */}
      <section className="py-16 md:py-20 px-6 md:px-6 bg-linear-to-b from-amber-50/50 to-transparent">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-8 md:mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-4">
              <BookOpen className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-semibold text-terracotta">
                This Platform
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              About This Portfolio
            </h2>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="prose prose-lg max-w-none"
          >
            <p className="text-stone-700 leading-relaxed text-base md:text-lg mb-5 md:mb-6">
              This website serves multiple purposes: it's a{" "}
              <strong>digital laboratory</strong> for experimenting with web
              technologies, a <strong>technical blog</strong> where I share
              insights from my ECE studies, and a <strong>portfolio</strong>{" "}
              showcasing projects that bridge theory and practice.
            </p>

            <p className="text-stone-700 leading-relaxed text-base md:text-lg mb-5 md:mb-6">
              Built with <strong>Next.js 15</strong>, <strong>React</strong>,
              and <strong>TypeScript</strong>, the site features MDX-powered
              blog posts with <strong>MathJax</strong> integration for
              mathematical expressions, smooth animations using the{" "}
              <strong>Motion</strong> library, and a warm, modern design system
              crafted with <strong>Tailwind CSS</strong>.
            </p>

            <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-terracotta/5 border-l-4 border-terracotta rounded-r-xl">
              <Lightbulb className="w-5 md:w-6 h-5 md:h-6 text-terracotta shrink-0 mt-0.5 md:mt-1" />
              <p className="text-stone-700 leading-relaxed text-sm md:text-lg m-0">
                <strong>Philosophy:</strong> I believe complex technical
                concepts become clearer when explained with intuitive
                visualizations and clean code. This portfolio is an ongoing
                experiment in making ECE topics more accessible through
                interactive demos and thoughtful explanations.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Connect Section */}
      <section className="py-16 md:py-24 px-6 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-5 md:mb-6">
              <Waves className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-semibold text-terracotta">
                Let's Connect
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800 mb-4 md:mb-6">
              Interested in Collaboration?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-stone-600 mb-8 md:mb-10 leading-relaxed">
              Whether you're working on communication systems research, building
              educational tools for ECE concepts, or just want to discuss the
              latest in RF engineering—I'd love to hear from you!
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3"
          >
            <a
              href="mailto:your.email@example.com"
              className="group inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-linear-to-r from-primary to-amber-600 text-white text-sm md:text-base font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Mail className="w-4 md:w-5 h-4 md:h-5" />
              Email Me
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-white border-2 border-stone-200 text-stone-700 text-sm md:text-base font-semibold rounded-xl hover:border-terracotta hover:text-terracotta hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Github className="w-4 md:w-5 h-4 md:h-5" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-white border-2 border-stone-200 text-stone-700 text-sm md:text-base font-semibold rounded-xl hover:border-terracotta hover:text-terracotta hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Linkedin className="w-4 md:w-5 h-4 md:h-5" />
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
