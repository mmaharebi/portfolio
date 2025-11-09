"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, User, Tag, BookOpen, Search, Sparkles, ArrowRight, Filter, X } from "lucide-react";
import { BlogPostMetadata } from "@/lib/utils";
import { useState, useMemo, useEffect } from "react";
import BlogBackground from "./backgrounds/BlogBackground";

interface BlogContentProps {
  posts: BlogPostMetadata[];
}

export default function BlogContent({ posts }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // Filter posts based on search and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTag = selectedTag === null || post.tags?.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  const featuredPost = posts[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <BlogBackground />
      <div className="min-h-screen relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full border-2 border-terracotta/20 shadow-lg mb-6"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sparkles className="w-4 h-4 text-terracotta" />
            </motion.div>
            <span className="text-sm font-bold text-terracotta">Knowledge Hub</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-terracotta via-primary to-amber-600">
              Blog & Articles
            </span>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto">
            Exploring <span className="font-semibold text-primary">electromagnetics</span>,{" "}
            <span className="font-semibold text-secondary">mathematics</span>, and{" "}
            <span className="font-semibold text-accent">engineering insights</span>
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 md:mb-14 max-w-4xl mx-auto"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search articles by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border-2 border-stone-200 rounded-2xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-stone-700 placeholder:text-stone-400"
            />
            {searchQuery && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-stone-500" />
              </motion.button>
            )}
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-2 text-sm font-semibold text-stone-600">
                <Filter className="w-4 h-4" />
                <span>Filter:</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTag(null)}
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
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
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
          )}
        </motion.div>

        {posts.length === 0 ? (
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
        ) : filteredPosts.length === 0 ? (
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
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
              }}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Featured Post */}
            {!searchQuery && !selectedTag && featuredPost && (
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-primary uppercase tracking-wide">
                    Featured Article
                  </span>
                </div>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <motion.article
                    whileHover={{ scale: 1.01, y: -4 }}
                    className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border-2 border-primary/30 hover:border-primary hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full" />
                    
                    {/* Glowing orb on hover */}
                    <motion.div
                      className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />

                    <div className="relative z-10">
                      <h2 className="text-2xl md:text-4xl font-bold text-stone-800 group-hover:text-primary transition-colors mb-4">
                        {featuredPost.title}
                      </h2>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500 mb-4">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {featuredPost.date}
                        </span>
                        {featuredPost.author && (
                          <span className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {featuredPost.author}
                          </span>
                        )}
                      </div>

                      {featuredPost.description && (
                        <p className="text-stone-600 text-base md:text-lg mb-6 leading-relaxed">
                          {featuredPost.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        {featuredPost.tags && featuredPost.tags.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {featuredPost.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full"
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
            )}

            {/* Posts Grid */}
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={containerVariants}
            >
              <AnimatePresence mode="popLayout">
                {filteredPosts.slice(searchQuery || selectedTag ? 0 : 1).map((post, index) => (
                  <motion.article
                    key={post.slug}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.9 }}
                    layout
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl border-2 border-stone-200 hover:border-terracotta/50 transition-all duration-300 overflow-hidden"
                  >
                    {/* Hover gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-amber-100/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                        <h3 className="text-xl md:text-2xl font-bold text-stone-800 group-hover:text-primary transition-colors mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mb-3">
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
                        <p className="text-stone-600 text-sm md:text-base mb-4 leading-relaxed line-clamp-3">
                          {post.description}
                        </p>
                      )}

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 bg-terracotta/10 text-terracotta text-xs font-medium rounded-full"
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
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
        </div>
      </div>
    </>
  );
}
