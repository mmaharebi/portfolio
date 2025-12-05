"use client";

import { motion, useScroll, useTransform } from "motion/react";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import { useMounted } from "@/lib/hooks/useMounted";
import { useMousePosition } from "@/lib/hooks/useMousePosition";
import { useWindowSize } from "@/lib/hooks/useWindowSize";

export default function ArtisticHero() {
  const mounted = useMounted();
  const mousePosition = useMousePosition();
  const windowSize = useWindowSize();
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 600], [0, 150]);
  const y2 = useTransform(scrollY, [0, 600], [0, -75]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.15]);

  // Parallax effect for decorative elements
  const parallaxX = mounted && windowSize.width ? (mousePosition.x - windowSize.width / 2) / 50 : 0;
  const parallaxY = mounted && windowSize.height ? (mousePosition.y - windowSize.height / 2) / 50 : 0;

  // Don't render dynamic content until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-amber-600 to-secondary">
              Mahdy M.
            </span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-stone-700 font-semibold mb-8">
            Communication & RF Engineering Researcher
          </p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden"
      style={{ opacity }}
    >
      {/* Artistic Background Shapes */}
      <HeroBackground 
        parallaxX={parallaxX}
        parallaxY={parallaxY}
        y1={y1}
        y2={y2}
      />

      {/* Hero Content */}
      <HeroContent />
    </motion.section>
  );
}
