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
          className="relative bg-linear-to-br from-primary/10 via-amber-100/20 to-secondary/10 rounded-3xl p-12 border-2 border-primary/20 shadow-2xl overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

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
              <Sparkles className="w-12 h-12 text-primary" />
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              Let&apos;s Build Something Amazing
            </h3>
            <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
              Have a project in mind or just want to discuss ideas? I&apos;m always
              open to interesting collaborations and conversations.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  className="px-8 py-4 bg-linear-to-r from-primary to-amber-600 text-white rounded-2xl font-semibold text-lg shadow-xl"
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
                  className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-stone-200 text-stone-700 rounded-2xl font-semibold text-lg hover:border-primary shadow-lg"
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
