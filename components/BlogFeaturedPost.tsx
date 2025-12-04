import Link from "next/link";
import { motion } from "motion/react";
import { Calendar, User, Sparkles, ArrowRight } from "lucide-react";
import { BlogPostMetadata } from "@/lib/utils";

interface BlogFeaturedPostProps {
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
 * BlogFeaturedPost - Large featured article card
 */
export default function BlogFeaturedPost({ post, variants }: BlogFeaturedPostProps) {
  return (
    <motion.div variants={variants}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary dark:text-primary" />
        <span className="text-sm font-bold text-primary dark:text-primary uppercase tracking-wide">
          Featured Article
        </span>
      </div>
      <Link href={`/blog/${post.slug}`}>
        <motion.article
          whileHover={{ scale: 1.01, y: -4 }}
          className="group relative bg-white/90 dark:bg-[#1A1614]/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl dark:shadow-[0_12px_50px_rgba(255,159,102,0.3)] border-2 border-primary/30 dark:border-primary/50 hover:border-primary dark:hover:border-primary hover:shadow-2xl dark:hover:shadow-[0_16px_60px_rgba(255,159,102,0.4)] transition-all duration-300 overflow-hidden"
        >
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-primary/20 dark:from-primary/40 to-transparent rounded-bl-full" />
          
          {/* Glowing orb on hover */}
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 dark:bg-primary/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-extrabold text-stone-900 dark:text-stone-50 group-hover:text-primary dark:group-hover:text-primary transition-colors mb-4">
              {post.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 dark:text-stone-400 mb-4">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              {post.author && (
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
              )}
            </div>

            {post.description && (
              <p className="text-stone-600 dark:text-stone-300 text-base md:text-lg mb-6 leading-relaxed font-medium">
                {post.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary text-xs font-semibold rounded-full border border-primary/20 dark:border-primary/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <motion.div
                className="flex items-center gap-2 text-primary font-semibold"
                whileHover={{ x: 5 }}
              >
                <span>Read Article</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
