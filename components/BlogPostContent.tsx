"use client";

import { motion } from "motion/react";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MDXContent from "@/components/MDXContent";
import Math from "@/components/Math";
import type { BlogPost } from "@/lib/utils";

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-cream-50">
      {/* Decorative background */}
      <motion.div
        className="fixed top-20 -right-20 w-64 h-64 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed bottom-20 -left-20 w-80 h-80 bg-linear-to-tr from-amber-300/20 to-terracotta/20 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <article className="relative max-w-4xl mx-auto px-6 py-12 md:py-16">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 md:mb-12"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-stone-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {post.title}
          </motion.h1>

          <motion.div
            className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-stone-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-terracotta" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-terracotta" />
                {post.author}
              </span>
            )}
          </motion.div>

          {post.tags && post.tags.length > 0 && (
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {post.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-1 px-3 py-1 bg-terracotta/10 text-terracotta text-xs md:text-sm rounded-full font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          )}
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 shadow-sm border-2 border-stone-200"
        >
          <MDXContent
            source={post.content}
            components={{
              Math,
            }}
          />
        </motion.div>

        {/* Footer - Back to blog link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 md:mt-12 pt-8 border-t-2 border-stone-200 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-terracotta to-amber-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            View All Posts
          </Link>
        </motion.div>
      </article>
    </div>
  );
}
