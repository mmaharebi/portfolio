"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function HomeBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Gentle normalized movement
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-linear-to-br from-cream via-amber-50/30 to-stone-100 dark:from-[#0A0908] dark:via-[#121010] dark:to-[#0F0D0C]">
      {/* Animated SVG Patterns - Extended across entire page */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="dark:hidden" stopColor="#D97757" stopOpacity="0.1" />
            <stop offset="100%" className="dark:hidden" stopColor="#F59E0B" stopOpacity="0.05" />
            <stop offset="0%" className="hidden dark:block" stopColor="#FF9F66" stopOpacity="0.15" />
            <stop offset="100%" className="hidden dark:block" stopColor="#FFC078" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="dark:hidden" stopColor="#F59E0B" stopOpacity="0.08" />
            <stop offset="100%" className="dark:hidden" stopColor="#D97757" stopOpacity="0.03" />
            <stop offset="0%" className="hidden dark:block" stopColor="#FFB580" stopOpacity="0.12" />
            <stop offset="100%" className="hidden dark:block" stopColor="#FF8C42" stopOpacity="0.06" />
          </linearGradient>
          <radialGradient id="starGlow">
            <stop offset="0%" stopColor="#FFC078" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF9F66" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Wavy paths distributed across the page */}
        <motion.path
          d="M0,20 Q25,10 50,20 T100,20 L100,0 L0,0 Z"
          fill="url(#gradient1)"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ transformOrigin: "center" }}
        />

        <motion.path
          d="M0,40 Q25,50 50,40 T100,40"
          stroke="url(#gradient1)"
          strokeWidth="0.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
          animate={{
            d: [
              "M0,40 Q25,50 50,40 T100,40",
              "M0,40 Q25,30 50,40 T100,40",
              "M0,40 Q25,50 50,40 T100,40",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M0,60 Q25,55 50,60 T100,60"
          stroke="url(#gradient2)"
          strokeWidth="0.3"
          fill="none"
          vectorEffect="non-scaling-stroke"
          animate={{
            d: [
              "M0,60 Q25,55 50,60 T100,60",
              "M0,60 Q25,65 50,60 T100,60",
              "M0,60 Q25,55 50,60 T100,60",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>

      {/* Gentle floating shapes - time-based animations only */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-linear-to-br from-terracotta/10 to-primary/5 dark:from-primary/20 dark:to-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-40 right-20 w-96 h-96 bg-linear-to-bl from-amber-400/8 to-terracotta/5 dark:from-secondary/15 dark:to-primary/8 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Bubbling rubber band shapes - welcoming the content with parallax */}
      <motion.div
        className="absolute top-1/4 left-[8%] w-40 h-40 border border-secondary/20 dark:border-secondary/30 dark:shadow-[0_0_15px_rgba(255,192,120,0.12)]"
        style={{
          borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%",
          x: mousePos.x * 15,
          y: mousePos.y * 12,
        }}
        animate={{
          borderRadius: [
            "60% 40% 30% 70%/60% 30% 70% 40%",
            "40% 60% 60% 40%/70% 30% 50% 60%",
            "60% 40% 30% 70%/60% 30% 70% 40%",
          ],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          borderRadius: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 2, ease: "easeOut" },
          y: { duration: 2, ease: "easeOut" },
        }}
      />

      <motion.div
        className="absolute top-[15%] right-[10%] w-32 h-32 bg-linear-to-br from-secondary/8 to-amber-300/10 dark:from-secondary/18 dark:to-secondary/10 blur-sm"
        style={{
          borderRadius: "50% 60% 40% 50%/60% 50% 60% 40%",
          x: mousePos.x * -10,
          y: mousePos.y * -8,
        }}
        animate={{
          borderRadius: [
            "50% 60% 40% 50%/60% 50% 60% 40%",
            "60% 40% 60% 40%/50% 60% 50% 60%",
            "50% 60% 40% 50%/60% 50% 60% 40%",
          ],
          scale: [1, 1.1, 1],
        }}
        transition={{
          borderRadius: { duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 2.5, ease: "easeOut" },
          y: { duration: 2.5, ease: "easeOut" },
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-[12%] w-48 h-48 border border-amber-400/15 dark:border-secondary/25 dark:shadow-[0_0_20px_rgba(255,192,120,0.1)]"
        style={{
          borderRadius: "70% 30% 50% 50%/40% 60% 40% 60%",
          x: mousePos.x * 8,
          y: mousePos.y * 10,
        }}
        animate={{
          borderRadius: [
            "70% 30% 50% 50%/40% 60% 40% 60%",
            "30% 70% 60% 40%/60% 40% 60% 40%",
            "70% 30% 50% 50%/40% 60% 40% 60%",
          ],
          rotate: [0, -8, 8, 0],
        }}
        transition={{
          borderRadius: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 },
          rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 2.2, ease: "easeOut" },
          y: { duration: 2.2, ease: "easeOut" },
        }}
      />

      <motion.div
        className="absolute top-[55%] right-[8%] w-36 h-36 bg-linear-to-tl from-secondary/10 to-amber-300/8 dark:from-secondary/16 dark:to-secondary/8 blur-md"
        style={{
          borderRadius: "40% 60% 50% 50%/60% 40% 60% 40%",
          x: mousePos.x * -12,
          y: mousePos.y * -15,
        }}
        animate={{
          borderRadius: [
            "40% 60% 50% 50%/60% 40% 60% 40%",
            "60% 40% 40% 60%/40% 60% 40% 60%",
            "40% 60% 50% 50%/60% 40% 60% 40%",
          ],
          scale: [1, 1.15, 1],
        }}
        transition={{
          borderRadius: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          scale: { duration: 11, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 2.3, ease: "easeOut" },
          y: { duration: 2.3, ease: "easeOut" },
        }}
      />
    </div>
  );
}
