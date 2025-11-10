"use client";

import { motion } from "motion/react";
import { Sparkles, Brain } from "lucide-react";
import SkillCategoryCard from "./SkillCategoryCard";
import ResearchInterestCard from "./ResearchInterestCard";
import { SKILLS_DATA, RESEARCH_INTERESTS } from "@/lib/constants/skills";

export default function InteractiveSkills() {
  return (
    <div className="w-full scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-terracotta" />
          <span className="text-sm font-semibold text-terracotta">Technical Expertise</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">Skills</h2>
        <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto">
          A blend of engineering fundamentals and modern development
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {SKILLS_DATA.map((category, categoryIndex) => (
          <SkillCategoryCard
            key={categoryIndex}
            category={category}
            categoryIndex={categoryIndex}
          />
        ))}
      </div>

      {/* Research Interests Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 relative"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-amber-50/50 to-secondary/5 rounded-3xl blur-3xl -z-10" />
        
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-stone-200/50 shadow-xl overflow-hidden">
          {/* Decorative corner accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/10 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-secondary/10 to-transparent rounded-tr-full" />
          
          {/* Floating particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-terracotta/20 rounded-full"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                top: `${20 + i * 30}%`,
                right: `${10 + i * 15}%`,
              }}
            />
          ))}

          {/* Header */}
          <div className="relative mb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center justify-center mb-4"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative"
              >
                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 -m-2 rounded-2xl border-2 border-terracotta/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary via-terracotta to-amber-600 flex items-center justify-center shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            </motion.div>

            <h3 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-terracotta to-amber-600">
                Research Interests
              </span>
            </h3>
            <p className="text-stone-600 text-sm md:text-base max-w-2xl mx-auto">
              Areas where theory meets innovation and curiosity drives discovery
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 relative">
            {RESEARCH_INTERESTS.map((interest, index) => (
              <ResearchInterestCard key={index} interest={interest} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
