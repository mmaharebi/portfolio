"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { User, ArrowRight } from "lucide-react";
import BriefTimeline, { type BriefTimelineItem } from "./BriefTimeline";

interface TimelineSectionProps {
  items: BriefTimelineItem[];
}

export default function TimelineSection({ items }: TimelineSectionProps) {
  return (
    <motion.section
      className="relative py-16 md:py-20 px-4 sm:px-6 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-terracotta/5 dark:bg-primary/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-56 md:w-80 h-56 md:h-80 bg-amber-300/5 dark:bg-secondary/15 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 dark:bg-primary/25 rounded-full mb-6 border-2 border-terracotta/20 dark:border-primary/40">
            <User className="w-4 h-4 text-terracotta dark:text-primary" />
            <span className="text-sm font-semibold text-terracotta dark:text-primary">
              Career Journey
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-stone-900 dark:text-stone-50 mb-4 tracking-tight">
            Academic & Research Journey
          </h2>
          <p className="text-base md:text-lg text-stone-700 dark:text-stone-200 max-w-2xl mx-auto font-medium">
            From theoretical physics to applied electromagnetic and
            communication research.
          </p>
        </motion.div>

        <BriefTimeline items={items} />

        {/* CTA to About Page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-12 md:mt-16 px-4"
        >
          <Link href="/about">
            <motion.button
              className="group relative px-6 md:px-8 py-3 md:py-4 bg-white/80 dark:bg-[#1A1614]/90 backdrop-blur-sm border-2 border-stone-200 dark:border-[#3D3530] text-stone-700 dark:text-stone-200 rounded-2xl font-semibold text-base md:text-lg shadow-xl dark:shadow-[0_8px_40px_rgba(255,159,102,0.2)] overflow-hidden w-full sm:w-auto"
              whileHover={{
                scale: 1.05,
                borderColor: "var(--primary)",
                boxShadow: "0 20px 40px rgba(217, 119, 87, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-primary/10 to-amber-400/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative flex items-center gap-3">
                <User className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Who Am I? - Full Journey</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
