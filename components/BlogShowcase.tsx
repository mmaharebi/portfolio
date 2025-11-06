"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { BookOpen, Calendar, User, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import type { BlogPostMetadata } from "@/lib/utils";

interface BlogShowcaseProps {
  posts: BlogPostMetadata[];
}

export default function BlogShowcase({ posts }: BlogShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (posts.length === 0) return null;

  return (
    <section className="relative py-20 px-6">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-terracotta" />
            <span className="text-sm font-semibold text-terracotta">Latest Writings</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-stone-800">Recent Posts</h2>
          <div className="flex items-center justify-center gap-2">
            <Link
              href="/blog"
              className="text-primary hover:text-amber-600 font-semibold flex items-center gap-2 group transition-colors"
            >
              View all articles
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group h-full"
              >
                <Link href={`/blog/${post.slug}`}>
                  <motion.div
                    className="h-full bg-white/80 backdrop-blur-sm rounded-3xl p-6 border-2 border-stone-200 shadow-lg transition-all duration-300 flex flex-col"
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
                      <h3 className="text-xl font-bold text-stone-800 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>

                      {/* Description */}
                      {post.description && (
                        <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
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
          })}
        </div>

        {/* Featured highlight if there are posts */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <Link href="/blog">
              <motion.button
                className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary to-amber-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="w-5 h-5" />
                <span>Explore All Articles</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
