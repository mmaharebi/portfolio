import Link from "next/link";
import { motion } from "motion/react";
import { Calendar, User, Sparkles, ArrowRight } from "lucide-react";
import { BlogPostMetadata } from "@/lib/utils";

interface BlogPostCardProps {
  post: BlogPostMetadata;
  variants: {
    hidden: { opacity: number; y: number };
    visible: {
      opacity: number;
      y: number;
      transition: { duration: number };
    };
  };
}

/**
 * BlogPostCard - Regular blog post card in grid
 */
export default function BlogPostCard({ post, variants }: BlogPostCardProps) {
  return (
    <motion.article
      key={post.slug}
      variants={variants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.9 }}
      layout
      whileHover={{ scale: 1.02, y: -4 }}
      className="group relative bg-white/80 dark:bg-[#1A1614]/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl dark:shadow-[0_4px_20px_rgba(255,159,102,0.15)] dark:hover:shadow-[0_8px_40px_rgba(255,159,102,0.25)] border-2 border-stone-200 dark:border-[#3D3530] hover:border-terracotta/50 dark:hover:border-primary/60 transition-all duration-300 overflow-hidden"
    >
      {/* Hover gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-terracotta/5 dark:from-primary/10 to-amber-100/5 dark:to-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Corner sparkle */}
      <motion.div
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <Sparkles className="w-4 h-4 text-primary" />
      </motion.div>

      <div className="relative z-10">
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl md:text-2xl font-bold text-stone-800 dark:text-stone-100 group-hover:text-primary dark:group-hover:text-primary transition-colors mb-3 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          {post.author && (
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
          )}
        </div>

        {post.description && (
          <p className="text-stone-600 dark:text-stone-300 text-sm md:text-base mb-4 leading-relaxed line-clamp-3">
            {post.description}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-terracotta/10 dark:bg-primary/20 text-terracotta dark:text-primary text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link href={`/blog/${post.slug}`}>
          <motion.div
            className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all"
          >
            <span>Read more</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </Link>
      </div>
    </motion.article>
  );
}
