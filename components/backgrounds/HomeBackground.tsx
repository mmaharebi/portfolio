"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function HomeBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-linear-to-br from-cream via-amber-50/30 to-stone-100">
      {/* Animated SVG Patterns - Extended across entire page */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97757" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#D97757" stopOpacity="0.03" />
          </linearGradient>
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

        <motion.path
          d="M0,80 Q25,85 50,80 T100,80 L100,100 L0,100 Z"
          fill="url(#gradient2)"
          vectorEffect="non-scaling-stroke"
          animate={{
            d: [
              "M0,80 Q25,85 50,80 T100,80 L100,100 L0,100 Z",
              "M0,80 Q25,75 50,80 T100,80 L100,100 L0,100 Z",
              "M0,80 Q25,85 50,80 T100,80 L100,100 L0,100 Z",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Floating organic shapes with parallax */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-linear-to-br from-terracotta/10 to-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-40 right-20 w-96 h-96 bg-linear-to-bl from-amber-400/8 to-terracotta/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: -mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="absolute bottom-40 left-1/4 w-80 h-80 bg-linear-to-tr from-primary/6 to-amber-300/4 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: mousePosition.x * 0.3,
          y: -mousePosition.y * 0.3,
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="absolute bottom-20 right-1/3 w-72 h-72 bg-linear-to-tl from-terracotta/7 to-amber-500/3 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.25, 1],
          x: -mousePosition.x * 0.4,
          y: -mousePosition.y * 0.4,
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Scattered small geometric accents */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-terracotta/20 rounded-full"
          style={{
            top: `${15 + i * 12}%`,
            left: `${10 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
