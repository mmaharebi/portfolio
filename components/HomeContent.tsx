"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { User, Sparkles, ArrowRight } from "lucide-react";
import type { BlogPostMetadata } from "@/lib/utils";
import BriefTimeline, { type BriefTimelineItem } from "./BriefTimeline";
import ArtisticHero from "./ArtisticHero";
import InteractiveExpertise from "./InteractiveExpertise";
import BlogShowcase from "./BlogShowcase";

interface HomeContentProps {
  recentPosts: BlogPostMetadata[];
}

// Brief timeline data for home page
const briefTimelineData: BriefTimelineItem[] = [
  {
    year: "2017",
    title: "Physics Olympiad (Silver Medal)",
    icon: "award",
    color: "primary",
    hint: "Silver Medal at Iran's National Physics Olympiad. Recognized by Iran's National Elites Foundation (Bonyad-e Melli-ye Nokhbegan). Sparked my lifelong pursuit of physics and engineering.",
  },
  {
    year: "2017-2023",
    title: "Sharif University of Technology (B.Sc., EE)",
    icon: "education",
    color: "secondary",
    hint: "Focused on electromagnetics, microwave circuits, and signal processing. Developed strong foundations in analytical methods and computational modeling.",
  },
  {
    year: "2019",
    title: "Industry Internship (MTCI / Hamrah-e Aval)",
    icon: "work",
    color: "accent",
    hint: "Built and programmed a motion-controlled demo system for Iran's first 5G showcase. Combined software and hardware integration with real-time control.",
  },
  {
    year: "2021 - 2023",
    title: "Teaching Assistant",
    icon: "education",
    color: "secondary",
    hint: "Teaching Assistant for EE & CE core courses; Circuit Theory and Object-Oriented Programming (Java). Guided students in analytical and coding assignments.",
  },
  {
    year: "2024 - Present",
    title: "Uni Kassel",
    icon: "education",
    color: "primary",
    hint: "Specializing in communication systems, RF/microwave design, and computational electromagnetics. Researching signal optimization and modeling.",
  },
];

export default function HomeContent({ recentPosts }: HomeContentProps) {
  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-orange-50 to-stone-50">
      {/* Artistic Hero Section */}
      <ArtisticHero />

      {/* Interactive Expertise Section */}
      <InteractiveExpertise />

      {/* Blog Showcase */}
      <BlogShowcase posts={recentPosts} />

      {/* Timeline Section */}
      <motion.section
        className="relative py-20 px-6 overflow-visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-amber-300/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto overflow-visible z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-6">
              <User className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-semibold text-terracotta">
                Career Journey
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
              Academic & Research Journey
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              From theoretical physics to applied electromagnetic and
              communication research.
            </p>
          </motion.div>

          <BriefTimeline items={briefTimelineData} />

          {/* CTA to About Page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mt-16"
          >
            <Link href="/about">
              <motion.button
                className="group relative px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-stone-200 text-stone-700 rounded-2xl font-semibold text-lg shadow-xl overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  borderColor: "var(--primary)",
                  boxShadow: "0 20px 40px rgba(217, 119, 87, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-primary/10 to-amber-400/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative flex items-center gap-3">
                  <User className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>Who Am I? - Full Journey</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="relative py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-linear-to-br from-primary/10 via-amber-100/20 to-secondary/10 rounded-3xl p-12 border-2 border-primary/20 shadow-2xl overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="inline-block mb-6"
              >
                <Sparkles className="w-12 h-12 text-primary" />
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
                Let's Build Something Amazing
              </h3>
              <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
                Have a project in mind or just want to discuss ideas? I'm always
                open to interesting collaborations and conversations.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    className="px-8 py-4 bg-linear-to-r from-primary to-amber-600 text-white rounded-2xl font-semibold text-lg shadow-xl"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(217, 119, 87, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-2">
                      Get In Touch
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </motion.button>
                </Link>

                <Link href="/about">
                  <motion.button
                    className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-stone-200 text-stone-700 rounded-2xl font-semibold text-lg hover:border-primary shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More About Me
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}