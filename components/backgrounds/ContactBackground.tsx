"use client";

import { motion } from "motion/react";

export default function ContactBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-linear-to-br from-amber-50/50 via-cream to-stone-50 dark:from-[#0B0A09] dark:via-[#0E0D0C] dark:to-[#0A0908]">
      {/* Radial gradient mesh */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-radial-gradient from-terracotta/8 dark:from-primary/18 via-primary/5 dark:via-accent/12 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Concentric circles */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="circleGrad1">
            <stop offset="0%" stopColor="#D97757" stopOpacity="0" />
            <stop offset="100%" stopColor="#D97757" stopOpacity="0.1" />
          </radialGradient>
          <radialGradient id="circleGrad2">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.08" />
          </radialGradient>
        </defs>

        <motion.circle
          cx="50%"
          cy="30%"
          r="200"
          fill="url(#circleGrad1)"
          initial={{ r: 200, opacity: 0.3 }}
          animate={{ r: [200, 250, 200], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.circle
          cx="50%"
          cy="30%"
          r="350"
          stroke="#D97757"
          strokeWidth="1"
          fill="none"
          opacity="0.1"
          initial={{ r: 350 }}
          animate={{ r: [350, 400, 350] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.circle
          cx="50%"
          cy="30%"
          r="500"
          fill="url(#circleGrad2)"
          initial={{ r: 500, opacity: 0.2 }}
          animate={{ r: [500, 550, 500], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </svg>

      {/* Flowing wave pattern */}
      <svg className="absolute bottom-0 left-0 right-0 h-48 md:h-64 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 120">
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D97757" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
          fill="url(#waveGrad)"
          animate={{
            d: [
              "M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z",
              "M0,60 Q300,100 600,60 T1200,60 L1200,120 L0,120 Z",
              "M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z",
            ],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M0,80 Q300,40 600,80 T1200,80 L1200,120 L0,120 Z"
          fill="url(#waveGrad)"
          opacity="0.6"
          animate={{
            d: [
              "M0,80 Q300,40 600,80 T1200,80 L1200,120 L0,120 Z",
              "M0,80 Q300,120 600,80 T1200,80 L1200,120 L0,120 Z",
              "M0,80 Q300,40 600,80 T1200,80 L1200,120 L0,120 Z",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>

      {/* Floating connection dots */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2.5 h-2.5 bg-terracotta/30 dark:bg-primary/45 dark:shadow-[0_0_8px_rgba(255,159,102,0.6)] rounded-full"
          style={{
            top: `${25 + (i * 5)}%`,
            left: `${15 + (i % 6) * 14}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 7 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Subtle corner accents */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 bg-linear-to-br from-primary/10 to-transparent rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-20 -right-20 w-64 h-64 bg-linear-to-tl from-terracotta/10 to-transparent rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -180, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}
