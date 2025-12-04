import { motion } from "motion/react";
import { Search, X } from "lucide-react";

interface BlogSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

/**
 * BlogSearchBar - Search input with clear button
 */
export default function BlogSearchBar({ searchQuery, onSearchChange }: BlogSearchBarProps) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
      <input
        type="text"
        placeholder="Search articles by title, description, or tags..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-12 py-4 bg-white/80 dark:bg-[#1A1614]/90 backdrop-blur-sm border-2 border-stone-200 dark:border-[#3D3530] rounded-2xl focus:border-primary dark:focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-primary/30 transition-all text-stone-700 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-500"
      />
      {searchQuery && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => onSearchChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-stone-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-stone-500" />
        </motion.button>
      )}
    </div>
  );
}
