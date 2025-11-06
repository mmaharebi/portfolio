"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, Code2, Rocket, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ArtisticHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Parallax effect for decorative elements
  const parallaxX = (mousePosition.x - window.innerWidth / 2) / 50;
  const parallaxY = (mousePosition.y - window.innerHeight / 2) / 50;

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Artistic Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border-4 border-primary/20 rounded-2xl"
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
          className="absolute top-1/4 right-32 w-24 h-24 bg-linear-to-br from-secondary/30 to-amber-400/20 rounded-full"
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
          className="absolute bottom-32 left-1/4 w-40 h-40 border-4 border-accent/20"
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
          className="absolute top-40 right-1/4 w-64 h-64 bg-linear-to-br from-terracotta/40 to-transparent rounded-full blur-3xl"
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
          className="absolute bottom-40 left-1/3 w-96 h-96 bg-linear-to-tr from-amber-300/30 to-transparent rounded-full blur-3xl"
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

        {/* Curved lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.path
            d="M0,300 Q400,100 800,300 T1600,300"
            stroke="url(#gradient1)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,500 Q400,700 800,500 T1600,500"
            stroke="url(#gradient2)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
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
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-2">
            <motion.span
              className="inline-block bg-clip-text text-transparent bg-linear-to-r from-terracotta via-primary to-amber-600"
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-stone-800 mb-4">
            <span className="inline-block">Enthusiastic Engineer</span>
            <motion.span
              className="inline-block ml-2 text-primary"
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
          className="text-lg md:text-xl text-stone-600 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Blending{" "}
          <span className="font-semibold text-primary">electromagnetics</span>,{" "}
          <span className="font-semibold text-secondary">mathematics</span>, and{" "}
          <span className="font-semibold text-accent">code</span> to design
          smarter engineering systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap gap-4 justify-center items-center"
        >
          <Link href="/blog">
            <motion.button
              className="group relative px-8 py-4 bg-linear-to-r from-primary to-amber-600 text-white rounded-2xl font-semibold text-base md:text-lg overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(217, 119, 87, 0.4)" }}
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
      </div>
    </motion.section>
  );
}
