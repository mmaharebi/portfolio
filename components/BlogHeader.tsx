import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

/**
 * BlogHeader - Hero section for the blog page
 */
export default function BlogHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 md:mb-16"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-[#1A1614]/90 backdrop-blur-md rounded-full border-2 border-terracotta/20 dark:border-primary/50 shadow-lg dark:shadow-[0_0_20px_rgba(255,159,102,0.3)] mb-6"
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
          <Sparkles className="w-4 h-4 text-terracotta dark:text-primary" />
        </motion.div>
        <span className="text-sm font-bold text-terracotta dark:text-primary">Knowledge Hub</span>
      </motion.div>

      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
        <span className="bg-clip-text text-transparent bg-linear-[135deg] from-terracotta from-10% via-primary via-50% to-amber-600 to-90% dark:from-primary dark:via-secondary dark:to-accent">
          Blog & Articles
        </span>
      </h1>
      <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto font-medium">
        Exploring <span className="font-semibold text-primary">electromagnetics</span>,{" "}
        <span className="font-semibold text-secondary">mathematics</span>, and{" "}
        <span className="font-semibold text-accent">engineering insights</span>
      </p>
    </motion.div>
  );
}
