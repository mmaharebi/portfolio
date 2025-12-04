"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <motion.section
      className="relative py-24 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-linear-to-br from-primary/10 dark:from-primary/25 via-amber-100/20 dark:via-accent/20 to-secondary/10 dark:to-secondary/25 rounded-3xl p-12 border-2 border-primary/20 dark:border-primary/50 shadow-2xl dark:shadow-[0_20px_60px_rgba(255,159,102,0.4)] overflow-hidden backdrop-blur-sm"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 dark:bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 dark:bg-secondary/30 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-12 h-12 text-primary dark:text-primary dark:drop-shadow-[0_0_16px_rgba(255,159,102,0.8)]" />
            </motion.div>

            <h3 className="text-3xl md:text-5xl font-extrabold text-stone-900 dark:text-stone-50 mb-4">
              Let&apos;s Build Something Amazing
            </h3>
            <p className="text-lg md:text-xl text-stone-700 dark:text-stone-200 mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
              Have a project in mind or just want to discuss ideas? I&apos;m always
              open to interesting collaborations and conversations.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 bg-linear-to-r from-primary to-amber-600 dark:from-primary dark:to-accent text-white dark:text-[#0A0908] rounded-2xl font-bold text-lg shadow-xl dark:shadow-[0_12px_40px_rgba(255,159,102,0.5)]"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(217, 119, 87, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    Get In Touch
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </motion.button>
              </Link>

              <Link href="/about">
                <motion.button
                  className="px-8 py-4 bg-white/80 dark:bg-[#1A1614]/90 backdrop-blur-sm border-2 border-stone-200 dark:border-[#3D3530] text-stone-700 dark:text-stone-200 rounded-2xl font-bold text-lg hover:border-primary dark:hover:border-primary shadow-lg dark:shadow-[0_8px_30px_rgba(255,159,102,0.2)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More About Me
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
