"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Calendar, User, Tag, BookOpen } from "lucide-react";
import { BlogPostMetadata } from "@/lib/utils";

interface BlogContentProps {
  posts: BlogPostMetadata[];
}

export default function BlogContent({ posts }: BlogContentProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 md:mb-14 text-center"
      >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-4">
            <BookOpen className="w-4 h-4 text-terracotta" />
            <span className="text-sm font-semibold text-terracotta">Articles</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-terracotta">
              Blog Posts
            </span>
          </h1>
          <p className="text-base md:text-lg text-stone-700">
            Thoughts on mathematics, physics, and technology
          </p>
        </motion.div>
        
        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-stone-500 text-base md:text-lg">
              No blog posts yet. Add MDX files to the /blog folder.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-5 md:space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {posts.map((post) => (
              <motion.article
                key={post.slug}
                variants={itemVariants}
                whileHover={{ scale: 1.01, y: -2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-xl border-2 border-stone-200 hover:border-terracotta/50 transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="group">
                  <h2 className="text-xl md:text-2xl font-bold group-hover:text-terracotta transition-colors mb-2 md:mb-3 text-stone-800">
                    {post.title}
                  </h2>
                </Link>
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-stone-500 mb-3 md:mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 md:w-4 h-3 md:h-4" />
                    {post.date}
                  </span>
                  {post.author && (
                    <span className="flex items-center gap-1">
                      <User className="w-3 md:w-4 h-3 md:h-4" />
                      {post.author}
                    </span>
                  )}
                </div>
                
                {post.description && (
                  <p className="text-stone-600 text-sm md:text-base mb-4 leading-relaxed">
                    {post.description}
                  </p>
                )}
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2 md:px-3 py-1 bg-terracotta/10 text-terracotta text-xs rounded-full font-medium"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </motion.div>
        )}
    </div>
  );
}
