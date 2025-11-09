"use client";

import { motion, type MotionValue } from "motion/react";

interface HeroBackgroundProps {
  parallaxX: number;
  parallaxY: number;
  y1: MotionValue<number>;
  y2: MotionValue<number>;
}

export default function HeroBackground({ parallaxX, parallaxY, y1, y2 }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 w-full overflow-hidden pointer-events-none">
      {/* Floating geometric shapes - responsive positioning */}
      <motion.div
        className="absolute top-20 left-4 sm:left-10 md:left-20 w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 border-4 border-primary/20 rounded-2xl"
        animate={{
          rotate: [0, 90, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          x: parallaxX * 2,
          y: parallaxY * 2,
        }}
      />

      <motion.div
        className="absolute top-1/4 right-4 sm:right-10 md:right-32 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-linear-to-br from-secondary/30 to-amber-400/20 rounded-full"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          x: -parallaxX * 1.5,
          y: y2,
        }}
      />

      <motion.div
        className="absolute bottom-32 left-1/4 w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 border-4 border-accent/20"
        style={{
          borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%",
          x: parallaxX,
          y: -parallaxY,
        }}
        animate={{
          rotate: [0, 360],
          borderRadius: [
            "60% 40% 30% 70%/60% 30% 70% 40%",
            "30% 60% 70% 40%/50% 60% 30% 60%",
            "60% 40% 30% 70%/60% 30% 70% 40%",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-40 right-1/4 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-linear-to-br from-terracotta/40 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ y: y1 }}
      />

      <motion.div
        className="absolute bottom-40 left-1/3 w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 bg-linear-to-tr from-amber-300/30 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{ y: y2 }}
      />

      {/* Particle effects */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Curved lines - Responsive SVG */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-10" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,30 Q25,10 50,30 T100,30"
          stroke="url(#gradient1)"
          strokeWidth="0.3"
          fill="none"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,50 Q25,70 50,50 T100,50"
          stroke="url(#gradient2)"
          strokeWidth="0.3"
          fill="none"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
            <stop
              offset="100%"
              stopColor="var(--secondary)"
              stopOpacity="0.3"
            />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop
              offset="100%"
              stopColor="var(--primary)"
              stopOpacity="0.3"
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
