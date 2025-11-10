"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function AboutBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-linear-to-br from-cream via-stone-50 to-amber-50/50">
      {/* Extended gradient orbs with parallax scroll effect */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-linear-to-br from-terracotta/20 via-primary/15 to-amber-400/10 rounded-full blur-3xl"
        style={{
          y: scrollY * 0.3,
        }}
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/4 -right-60 w-[600px] h-[600px] bg-linear-to-bl from-amber-300/15 via-terracotta/12 to-primary/8 rounded-full blur-3xl"
        style={{
          y: scrollY * 0.2,
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -120, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-linear-to-tr from-primary/12 via-amber-400/10 to-terracotta/8 rounded-full blur-3xl"
        style={{
          y: scrollY * 0.15,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 60, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="absolute bottom-20 left-1/3 w-[550px] h-[550px] bg-linear-to-tl from-terracotta/18 via-amber-500/12 to-primary/10 rounded-full blur-3xl"
        style={{
          y: scrollY * 0.25,
        }}
        animate={{
          scale: [1, 1.25, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-linear-to-br from-amber-400/14 via-primary/11 to-terracotta/9 rounded-full blur-3xl"
        style={{
          y: scrollY * 0.18,
        }}
        animate={{
          scale: [1, 1.18, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-terracotta/25 rounded-full"
          style={{
            top: `${10 + (i * 7)}%`,
            left: `${5 + (i % 4) * 25}%`,
            y: scrollY * (0.05 + i * 0.02),
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
