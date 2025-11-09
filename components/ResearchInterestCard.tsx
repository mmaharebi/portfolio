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
      className="flex flex-col gap-2 p-4 bg-white/60 rounded-xl border border-stone-200 hover:border-terracotta/40 transition-all cursor-default group"
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
          className="w-2 h-2 rounded-full bg-terracotta shrink-0"
        />
        <span className="text-sm font-semibold text-stone-800 group-hover:text-terracotta transition-colors">
          {interest.name}
        </span>
      </div>
      <p className="text-xs text-stone-600 leading-relaxed pl-5">{interest.description}</p>
    </motion.div>
  );
}
