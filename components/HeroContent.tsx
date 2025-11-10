"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, Rocket, Zap, Code2 } from "lucide-react";

export default function HeroContent() {
  return (
    <>
      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full border-2 border-terracotta/20 shadow-lg"
            whileHover={{ scale: 1.05, borderColor: "var(--primary)" }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sparkles className="w-4 h-4 text-terracotta" />
            </motion.div>
            <span className="text-sm text-terracotta font-bold">
              ECE @ Uni Kassel • R&D Engineer
            </span>
          </motion.div>
        </motion.div>

        {/* Name with gradient animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-2">
            <motion.span
              className="inline-block bg-clip-text text-transparent bg-linear-[135deg] from-terracotta from-10% via-primary via-50% to-amber-600 to-90%"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Mahdy M.
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle with typing effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-stone-800 mb-4">
            Communication & RF Engineering Researcher
            <motion.span
              className="text-primary"
              animate={{
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              |
            </motion.span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base md:text-lg lg:text-xl text-stone-600 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Exploring{" "}
          <span className="font-semibold text-primary">electromagnetics</span>,{" "}
          <span className="font-semibold text-secondary">mathematics</span>, and{" "}
          <span className="font-semibold text-accent">
            computational methods
          </span>{" "}
          to design smarter engineering systems.
        </motion.p>

        {/* Call to Action - Master Thesis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-10 max-w-3xl mx-auto"
        >
          <div className="relative bg-linear-to-r from-primary/10 via-amber-100/30 to-secondary/10 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-6 md:p-8 shadow-xl">
            {/* Decorative corner glow */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-start gap-3 mb-3">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles className="w-6 h-6 text-primary mt-1" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-stone-800 mb-2">
                    Seeking Funded Master&apos;s Thesis (2026)
                  </h3>
                  <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                    Open to research collaborations in <span className="font-semibold text-primary">communication systems</span> or{" "}
                    <span className="font-semibold text-secondary">RF engineering</span> with German academic institutions or industry partners.
                    Passionate about bridging theory with real-world applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap gap-4 justify-center items-center"
        >
          <Link href="/blog">
            <motion.button
              className="group relative px-8 py-4 bg-linear-to-r from-primary to-amber-600 text-white rounded-2xl font-semibold text-base md:text-lg overflow-hidden shadow-xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(217, 119, 87, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%", skewX: -15 }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                View Projects & Articles
              </span>
            </motion.button>
          </Link>

          <Link href="/contact">
            <motion.button
              className="group px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-stone-200 text-stone-700 rounded-2xl font-semibold text-base md:text-lg hover:border-primary shadow-lg"
              whileHover={{
                scale: 1.05,
                borderColor: "var(--primary)",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 group-hover:text-primary transition-colors" />
                Get In Touch
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[Code2, Zap, Rocket].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-12 h-12 text-primary/20" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator - outside content div, positioned at bottom of hero section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 md:bottom-16 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-stone-400"
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 border-2 border-stone-300 rounded-full flex justify-center pt-2"
            whileHover={{ borderColor: "var(--primary)" }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
