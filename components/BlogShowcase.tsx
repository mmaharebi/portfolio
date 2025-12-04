"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { BlogPostMetadata } from "@/lib/utils";
import BlogCard from "./BlogCard";

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 dark:bg-primary/20 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-terracotta dark:text-primary" />
            <span className="text-sm font-semibold text-terracotta dark:text-primary">Latest Writings</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-stone-800 dark:text-stone-100">Recent Posts</h2>
          <div className="flex items-center justify-center gap-2">
            <Link
              href="/blog"
              className="text-primary dark:text-primary hover:text-amber-600 dark:hover:text-secondary font-semibold flex items-center gap-2 group transition-colors"
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
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              index={index}
              isHovered={hoveredIndex === index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            />
          ))}
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
