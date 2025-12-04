"use client";

import { motion } from "motion/react";
import { type ResearchInterest } from "@/lib/constants/skills";

interface ResearchInterestCardProps {
  interest: ResearchInterest;
  index: number;
}

export default function ResearchInterestCard({ interest, index }: ResearchInterestCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ x: 10, scale: 1.02 }}
      className="flex flex-col gap-2 p-4 bg-white/70 dark:bg-[#1A1614]/70 backdrop-blur-sm rounded-xl border border-stone-200 dark:border-[#3D3530] hover:border-terracotta dark:hover:border-primary/60 transition-all cursor-default group shadow-sm dark:shadow-[0_2px_8px_rgba(255,159,102,0.1)]"
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            delay: index * 0.3,
            repeat: Infinity,
          }}
          className="w-2 h-2 rounded-full bg-terracotta dark:bg-primary dark:shadow-[0_0_6px_rgba(255,159,102,0.8)] shrink-0"
        />
        <span className="text-sm font-semibold text-stone-800 dark:text-stone-100 group-hover:text-terracotta dark:group-hover:text-primary transition-colors">
          {interest.name}
        </span>
      </div>
      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pl-5">{interest.description}</p>
    </motion.div>
  );
}
