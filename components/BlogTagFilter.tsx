import { motion } from "motion/react";
import { Filter } from "lucide-react";

interface BlogTagFilterProps {
  allTags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

/**
 * BlogTagFilter - Tag filter buttons with "All Posts" option
 */
export default function BlogTagFilter({ allTags, selectedTag, onTagSelect }: BlogTagFilterProps) {
  if (allTags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex items-center gap-2 text-sm font-semibold text-stone-600">
        <Filter className="w-4 h-4" />
        <span>Filter:</span>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onTagSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selectedTag === null
            ? "bg-primary text-white shadow-md"
            : "bg-white/80 text-stone-600 border-2 border-stone-200 hover:border-primary"
        }`}
      >
        All Posts
      </motion.button>
      {allTags.map((tag) => (
        <motion.button
          key={tag}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedTag === tag
              ? "bg-primary text-white shadow-md"
              : "bg-white/80 text-stone-600 border-2 border-stone-200 hover:border-primary"
          }`}
        >
          {tag}
        </motion.button>
      ))}
    </div>
  );
}
