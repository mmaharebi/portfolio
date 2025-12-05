"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface AnimatedWrapperProps {
  children: ReactNode;
}

export function AnimatedBackground() {
  return (
    <>
      <motion.div
        className="fixed top-20 -right-20 w-64 h-64 bg-linear-to-br from-orange-400/20 to-amber-200/20 dark:from-primary/30 dark:to-secondary/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-20 -left-20 w-80 h-80 bg-linear-to-tr from-amber-300/20 to-orange-500/20 dark:from-secondary/25 dark:to-accent/30 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </>
  );
}

export function AnimatedSection({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode; 
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function AnimatedWrapper({ children }: AnimatedWrapperProps) {
  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-orange-50 to-stone-50 dark:from-[#0A0908] dark:via-[#0D0B0A] dark:to-[#100E0D]">
      <AnimatedBackground />
      {children}
    </div>
  );
}
