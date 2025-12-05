"use client";

import { motion } from "motion/react";

export default function BlogBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-linear-to-br from-stone-50 via-cream to-amber-50/40 dark:from-[#0A0908] dark:via-[#0A0908] dark:to-[#0D0B0A]">
      {/* Geometric grid pattern with parallax layers */}
      <svg className="absolute inset-0 w-full h-full opacity-40 dark:opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" className="dark:hidden" fill="#D97757" opacity="0.15" />
            <circle cx="20" cy="20" r="1" className="hidden dark:block" fill="#FF9F66" opacity="0.25" />
          </pattern>
          <linearGradient id="blogGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="dark:hidden" stopColor="#D97757" stopOpacity="0.08" />
            <stop offset="100%" className="dark:hidden" stopColor="#F59E0B" stopOpacity="0.04" />
            <stop offset="0%" className="hidden dark:block" stopColor="#FF9F66" stopOpacity="0.12" />
            <stop offset="100%" className="hidden dark:block" stopColor="#FFC078" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Diagonal stripe pattern */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-full w-px bg-linear-to-b from-transparent via-terracotta/10 dark:via-primary/20 to-transparent"
            style={{
              left: `${15 + i * 15}%`,
              transform: "rotate(15deg)",
              transformOrigin: "top left",
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>

      {/* Floating abstract shapes */}
      <motion.div
        className="absolute top-20 right-1/4 w-96 h-96"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full bg-linear-to-br from-terracotta/5 dark:from-primary/12 to-transparent rounded-full blur-2xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-1/3 w-80 h-80"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full bg-linear-to-tl from-amber-400/6 dark:from-secondary/14 to-transparent rounded-full blur-2xl" />
      </motion.div>

      {/* Wavy lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M0,30 Q30,25 60,30 T120,30"
          stroke="#D97757"
          strokeWidth="0.5"
          fill="none"
          opacity="0.2"
          vectorEffect="non-scaling-stroke"
          animate={{
            d: [
              "M0,30 Q30,25 60,30 T120,30",
              "M0,30 Q30,35 60,30 T120,30",
              "M0,30 Q30,25 60,30 T120,30",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M0,70 Q30,75 60,70 T120,70"
          stroke="#F59E0B"
          strokeWidth="0.4"
          fill="none"
          opacity="0.15"
          vectorEffect="non-scaling-stroke"
          animate={{
            d: [
              "M0,70 Q30,75 60,70 T120,70",
              "M0,70 Q30,65 60,70 T120,70",
              "M0,70 Q30,75 60,70 T120,70",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>

      {/* Scattered geometric elements */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${
            i % 3 === 0 ? "w-4 h-4 rounded-full" : i % 3 === 1 ? "w-3 h-3 rotate-45" : "w-2 h-2"
          } bg-terracotta/20 dark:bg-primary/35 dark:shadow-[0_0_6px_rgba(255,159,102,0.5)]`}
          style={{
            top: `${20 + (i * 8)}%`,
            left: `${10 + (i % 5) * 18}%`,
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 180, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}
