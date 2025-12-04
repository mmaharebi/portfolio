"use client";

import { motion } from "motion/react";
import { Calendar, User, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import type { BlogPostMetadata } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPostMetadata;
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function BlogCard({
  post,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="group h-full"
    >
      <Link href={`/blog/${post.slug}`}>
        <motion.div
          className="h-full bg-white/80 dark:bg-[#1A1614]/90 backdrop-blur-sm rounded-3xl p-6 border-2 border-stone-200 dark:border-[#3D3530] shadow-lg dark:shadow-[0_4px_20px_rgba(255,159,102,0.15)] transition-all duration-300 flex flex-col"
          whileHover={{
            y: -8,
            borderColor: "var(--primary)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-primary/5 to-amber-400/5 rounded-3xl opacity-0"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="relative flex-1 flex flex-col">
            {/* Meta info */}
            <div className="flex items-center gap-4 text-xs text-stone-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 mb-3 line-clamp-2 group-hover:text-primary dark:group-hover:text-primary transition-colors">
              {post.title}
            </h3>

            {/* Description */}
            {post.description && (
              <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                {post.description}
              </p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Read more */}
            <motion.div
              className="flex items-center gap-2 text-primary font-semibold text-sm"
              animate={{
                x: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <span>Read article</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Decorative corner */}
          <motion.div
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-linear-to-br from-primary/20 to-amber-400/20 flex items-center justify-center"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              rotate: isHovered ? [0, 180] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
        </motion.div>
      </Link>
    </motion.article>
  );
}
