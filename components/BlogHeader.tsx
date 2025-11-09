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
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full border-2 border-terracotta/20 shadow-lg mb-6"
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
          <Sparkles className="w-4 h-4 text-terracotta" />
        </motion.div>
        <span className="text-sm font-bold text-terracotta">Knowledge Hub</span>
      </motion.div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
        <span className="bg-clip-text text-transparent bg-linear-to-r from-terracotta via-primary to-amber-600">
          Blog & Articles
        </span>
      </h1>
      <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto">
        Exploring <span className="font-semibold text-primary">electromagnetics</span>,{" "}
        <span className="font-semibold text-secondary">mathematics</span>, and{" "}
        <span className="font-semibold text-accent">engineering insights</span>
      </p>
    </motion.div>
  );
}
