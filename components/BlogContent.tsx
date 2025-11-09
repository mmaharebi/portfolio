"use client";

import { motion, AnimatePresence } from "motion/react";
import { BlogPostMetadata } from "@/lib/utils";
import { useState, useMemo, useEffect } from "react";
import BlogBackground from "./backgrounds/BlogBackground";
import BlogHeader from "./BlogHeader";
import BlogSearchBar from "./BlogSearchBar";
import BlogTagFilter from "./BlogTagFilter";
import BlogEmptyState from "./BlogEmptyState";
import BlogFeaturedPost from "./BlogFeaturedPost";
import BlogPostCard from "./BlogPostCard";
import { BLOG_ANIMATION_VARIANTS } from "@/lib/constants/blog";

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

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTag(null);
  };

  return (
    <>
      <BlogBackground />
      <div className="min-h-screen relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          {/* Header Section */}
          <BlogHeader />

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 md:mb-14 max-w-4xl mx-auto"
          >
            <BlogSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <BlogTagFilter 
              allTags={allTags} 
              selectedTag={selectedTag} 
              onTagSelect={setSelectedTag} 
            />
          </motion.div>

          {/* Content */}
          {posts.length === 0 ? (
            <BlogEmptyState variant="no-posts" />
          ) : filteredPosts.length === 0 ? (
            <BlogEmptyState variant="no-results" onClearFilters={handleClearFilters} />
          ) : (
            <motion.div
              variants={BLOG_ANIMATION_VARIANTS.container}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Featured Post */}
              {!searchQuery && !selectedTag && featuredPost && (
                <BlogFeaturedPost post={featuredPost} variants={BLOG_ANIMATION_VARIANTS.item} />
              )}

              {/* Posts Grid */}
              <motion.div
                className="grid md:grid-cols-2 gap-6"
                variants={BLOG_ANIMATION_VARIANTS.container}
              >
                <AnimatePresence mode="popLayout">
                  {filteredPosts.slice(searchQuery || selectedTag ? 0 : 1).map((post) => (
                    <BlogPostCard key={post.slug} post={post} variants={BLOG_ANIMATION_VARIANTS.item} />
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
