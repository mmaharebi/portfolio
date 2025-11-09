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
        className="mt-12 bg-linear-to-br from-terracotta/5 via-amber-50/50 to-stone-50/50 rounded-2xl p-8 border-2 border-terracotta/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-12 h-12 rounded-xl bg-terracotta/10 border-2 border-terracotta flex items-center justify-center"
          >
            <Brain className="w-6 h-6 text-terracotta" />
          </motion.div>
          <h3 className="text-2xl font-bold text-stone-800">Research Interests</h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {RESEARCH_INTERESTS.map((interest, index) => (
            <ResearchInterestCard key={index} interest={interest} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
