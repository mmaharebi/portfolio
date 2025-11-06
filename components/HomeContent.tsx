"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, BookOpen, Code, Lightbulb, Radio, Zap, Calculator, Layers } from "lucide-react";
import type { BlogPostMetadata } from "@/lib/utils";

interface HomeContentProps {
  recentPosts: BlogPostMetadata[];
}

export default function HomeContent({ recentPosts }: HomeContentProps) {
  // Animation variants
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
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-cream-50">
      {/* Hero Section */}
      <motion.section
        className="relative pt-16 pb-8 md:pt-32 md:pb-20 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Decorative background */}
        <motion.div
          className="absolute top-10 md:top-20 -right-20 md:right-10 w-48 md:w-64 h-48 md:h-64 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
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
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={itemVariants}
            className="mb-6 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full">
              <Sparkles className="w-4 h-4 text-terracotta" />
              <span className="text-sm text-terracotta font-semibold">
                ECE @ Uni Kassel
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6"
          >
            <span className="text-amber-700">Mahdy M.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-stone-900 mb-4 md:mb-6"
          >
            Enthusiastic Engineer
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-stone-600 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Blending electromagnetics, mathematics, and code to design smarter
            engineering systems.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex gap-3 md:gap-4 justify-center flex-wrap"
          >
            <Link
              href="/blog"
              className="bg-linear-to-r from-primary to-amber-600 group inline-flex items-center gap-2 px-5 md:px-8 py-2.5 md:py-3 text-white text-sm md:text-base rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
            >
              <BookOpen className="w-4 md:w-5 h-4 md:h-5 group-hover:rotate-12 transition-transform" />
              View Projects & Articles
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 md:px-8 py-2.5 md:py-3 bg-white border-2 border-stone-200 text-stone-700 text-sm md:text-base rounded-xl hover:border-primary hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <motion.section
          className="px-6 pt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="text-center mb-10 md:mb-14"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-4">
                <BookOpen className="w-4 h-4 text-terracotta" />
                <span className="text-sm font-semibold text-terracotta">
                  Latest Articles
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800 mb-3 md:mb-4">
                Recent Posts
              </h2>
              <div className="flex justify-center">
                <Link
                  href="/blog"
                  className="text-terracotta hover:text-amber-600 font-medium text-sm md:text-base flex items-center gap-2 group"
                >
                  View all
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
              variants={containerVariants}
            >
              {recentPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group"
                >
                  <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-xl border-2 border-stone-200 hover:border-terracotta/50 transition-all duration-300">
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-stone-800 group-hover:text-terracotta transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-stone-500 text-xs md:text-sm mb-3">
                      {post.date}
                      {post.author && ` • ${post.author}`}
                    </p>
                    {post.description && (
                      <p className="text-stone-600 text-sm md:text-base mb-4 line-clamp-2 leading-relaxed">
                        {post.description}
                      </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 md:px-3 py-1 bg-terracotta/10 text-terracotta text-xs rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Topics Section */}
      <motion.section
        className="py-16 md:py-20 px-6 bg-linear-to-b from-transparent to-amber-50/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={itemVariants}
            className="text-center mb-10 md:mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-4">
              <Code className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-semibold text-terracotta">
                Expertise
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800 mb-3 md:mb-4">
              Fields of Expertise
            </h2>
            <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto">
              Combining rigorous theoretical foundations with hands-on
              engineering
            </p>
          </motion.div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="group relative p-5 md:p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-stone-200 hover:border-terracotta/50 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-br from-terracotta/0 to-amber-100/0 group-hover:from-terracotta/5 group-hover:to-amber-100/10 rounded-2xl transition-all duration-300" />
              <div className="relative">
                <div className="p-3 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-xl w-fit mb-4">
                  <Radio className="w-5 md:w-6 h-5 md:h-6 text-terracotta" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2 text-stone-800">
                  Communication Systems & Signal Processing
                </h3>
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                  Digital modulation, 5G signal processing, and system
                  optimization. Experienced in MATLAB & Python for
                  high-performance communication systems.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="group relative p-5 md:p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-stone-200 hover:border-terracotta/50 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-br from-terracotta/0 to-amber-100/0 group-hover:from-terracotta/5 group-hover:to-amber-100/10 rounded-2xl transition-all duration-300" />
              <div className="relative">
                <div className="p-3 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-xl w-fit mb-4">
                  <Zap className="w-5 md:w-6 h-5 md:h-6 text-terracotta" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2 text-stone-800">
                  Applied Electromagnetics & RF Engineering
                </h3>
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                  Microwave circuits, antenna design, and RF front-ends. Skilled
                  in EM theory, numerical methods, and simulation-based design.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="group relative p-5 md:p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-stone-200 hover:border-terracotta/50 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-br from-terracotta/0 to-amber-100/0 group-hover:from-terracotta/5 group-hover:to-amber-100/10 rounded-2xl transition-all duration-300" />
              <div className="relative">
                <div className="p-3 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-xl w-fit mb-4">
                  <Calculator className="w-5 md:w-6 h-5 md:h-6 text-terracotta" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2 text-stone-800">
                  Mathematics & Physics Foundations
                </h3>
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                  Linear algebra, probability, quantum & statistical mechanics.
                  Bridging abstract theory with practical engineering through
                  computational modeling.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="group relative p-5 md:p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-stone-200 hover:border-terracotta/50 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-linear-to-br from-terracotta/0 to-amber-100/0 group-hover:from-terracotta/5 group-hover:to-amber-100/10 rounded-2xl transition-all duration-300" />
              <div className="relative">
                <div className="p-3 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-xl w-fit mb-4">
                  <Layers className="w-5 md:w-6 h-5 md:h-6 text-terracotta" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-2 text-stone-800">
                  Software Engineering & Scientific Computing
                </h3>
                <p className="text-stone-600 text-xs md:text-sm leading-relaxed">
                  Full-stack web apps and simulation environments. Python,
                  MATLAB, Next.js, React, Tailwind. Building scalable
                  architectures for research and engineering.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}