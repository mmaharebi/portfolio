"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, Rocket, Zap, Code2, SquareArrowOutUpRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroContent() {
  const fullText = "M.Sc. Student in Electrical Communication Engineering";
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 80); // 80ms per character for smooth typing

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <>
      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
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
          className="mb-4"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-stone-800 dark:text-stone-100 mb-4">
            {displayedText}
            <motion.span
              className="text-primary"
              animate={{
                opacity: isTypingComplete ? [1, 0, 1] : 1,
              }}
              transition={{
                duration: isTypingComplete ? 1.5 : 0,
                repeat: isTypingComplete ? Infinity : 0,
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
          className="text-base md:text-lg lg:text-xl text-stone-600 dark:text-stone-300 mb-7 max-w-3xl mx-auto leading-relaxed"
        >
          Exploring{" "}
          <span className="font-semibold text-primary dark:text-primary">electromagnetics</span>,{" "}
          <span className="font-semibold text-secondary dark:text-secondary">mathematics</span>, and{" "}
          <span className="font-semibold text-accent dark:text-accent">
            computational methods
          </span>{" "}
          to design smarter engineering systems.
        </motion.p>

        {/* Call to Action - Master Thesis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-8 max-w-3xl mx-auto"
        >
          <div className="relative bg-linear-to-r from-primary/10 dark:from-primary/20 via-amber-100/30 dark:via-accent/15 to-secondary/10 dark:to-secondary/20 backdrop-blur-sm border-2 border-primary/30 dark:border-primary/50 rounded-2xl p-5 md:p-8 shadow-xl dark:shadow-[0_8px_32px_rgba(255,159,102,0.3)]">
            {/* Decorative corner glow */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-primary/20 dark:bg-primary/40 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <h3 className="text-lg md:text-2xl font-bold text-stone-800 dark:text-stone-100 mb-2.5 md:mb-3">
                Master Thesis Focus (2026)
              </h3>
              <div>
                <div>
                  <p className="text-sm md:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
                    {/* Announcement */}
                    Validated simulations and research-style write-ups in <span className="font-semibold text-primary">computational electromagnetics</span>,{" "}
                    <span className="font-semibold text-secondary">RF &amp; microwave engineering</span>,{" "}
                    <span className="font-semibold text-accent">communication systems</span> &mdash; with reproducible code and reports linked in the blog.
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
          className="flex flex-wrap gap-4 justify-center items-center mb-10 md:mb-0"
        >
          <Link href="/blog">
            <motion.button
              className="group relative px-8 py-4 bg-linear-to-r from-primary to-amber-600 dark:from-primary dark:to-accent text-white dark:text-[#0A0908] rounded-2xl font-semibold text-base md:text-lg overflow-hidden shadow-xl dark:shadow-[0_8px_30px_rgba(255,159,102,0.4)]"
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
              className="group px-8 py-4 bg-white/80 dark:bg-[#1A1614]/80 backdrop-blur-sm border-2 border-stone-200 dark:border-[#3D3530] text-stone-700 dark:text-stone-200 rounded-2xl font-semibold text-base md:text-lg hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 shadow-lg dark:shadow-[0_4px_20px_rgba(255,159,102,0.15)] transition-colors"
              whileHover={{
                scale: 1.05,
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

        {/* Scroll indicator - positioned after buttons on mobile, at bottom on desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex md:hidden justify-center"
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

      {/* Scroll indicator - for desktop at bottom of viewport */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="hidden md:flex absolute bottom-16 left-1/2 -translate-x-1/2 z-20"
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
