import { motion } from "motion/react";
import { BookOpen, Search } from "lucide-react";

interface BlogEmptyStateProps {
  variant: "no-posts" | "no-results";
  onClearFilters?: () => void;
}

/**
 * BlogEmptyState - Display when no posts exist or search returns no results
 */
export default function BlogEmptyState({ variant, onClearFilters }: BlogEmptyStateProps) {
  if (variant === "no-posts") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-20"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <BookOpen className="w-16 h-16 text-stone-300 mx-auto mb-4" />
        </motion.div>
        <h3 className="text-2xl font-bold text-stone-700 mb-2">No Posts Yet</h3>
        <p className="text-stone-500 text-lg">
          Add MDX files to the content/posts folder to see them here.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-20"
    >
      <Search className="w-16 h-16 text-stone-300 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-stone-700 mb-2">No Results Found</h3>
      <p className="text-stone-500 text-lg mb-6">
        Try adjusting your search or filter criteria
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClearFilters}
        className="px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
      >
        Clear Filters
      </motion.button>
    </motion.div>
  );
}
