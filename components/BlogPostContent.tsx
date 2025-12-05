import { Calendar, User, Tag } from "lucide-react";
import Link from "next/link";
import MDXContent from "@/components/MDXContent";
import Math from "@/components/Math";
import { AnimatedSection } from "@/components/AnimatedWrapper";
import BlogBackground from "@/components/backgrounds/BlogBackground";
import type { BlogPost } from "@/lib/utils";

interface BlogPostContentProps {
  post: BlogPost;
}

export default async function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <>
      <BlogBackground />
      <article className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16 overflow-x-hidden">
      {/* Title and Metadata */}
      <AnimatedSection delay={0}>
        <header className="mb-12 md:mb-16 bg-surface/95 dark:bg-gradient-to-br dark:from-surface/40 dark:via-surface/30 dark:to-surface-elevated/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl dark:shadow-primary/10 border border-border/50 dark:border-primary/20 dark:ring-1 dark:ring-primary/10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-foreground leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-surface-hover/80 dark:bg-surface-elevated/60 backdrop-blur-sm rounded-full text-sm md:text-base border border-border dark:border-primary/30 dark:shadow-lg dark:shadow-primary/5">
              <Calendar className="w-4 h-4 text-primary" />
              <time dateTime={post.date} className="text-foreground-secondary font-medium">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
            {post.author && (
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-surface-hover/80 dark:bg-surface-elevated/60 backdrop-blur-sm rounded-full text-sm md:text-base border border-border dark:border-primary/30 dark:shadow-lg dark:shadow-primary/5">
                <User className="w-4 h-4 text-primary" />
                <span className="text-foreground-secondary font-medium">{post.author}</span>
              </span>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-hover/80 dark:bg-surface-elevated/60 backdrop-blur-sm text-primary text-xs md:text-sm rounded-full font-medium border border-border dark:border-primary/30 hover:bg-surface-elevated dark:hover:bg-surface-elevated/80 dark:hover:shadow-lg dark:hover:shadow-primary/10 transition-all"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
      </AnimatedSection>

      {/* Content */}
      <AnimatedSection delay={0.1}>
        <div className="prose-wrapper overflow-x-hidden w-full bg-surface/95 dark:bg-gradient-to-br dark:from-surface/40 dark:via-surface/30 dark:to-surface-elevated/40 backdrop-blur-xl rounded-2xl p-6 md:p-10 shadow-2xl dark:shadow-primary/10 border border-border/50 dark:border-primary/20 dark:ring-1 dark:ring-primary/10">
          <MDXContent
            source={post.content}
            components={{
              Math,
            }}
          />
        </div>
      </AnimatedSection>

      {/* Bottom Navigation */}
      <AnimatedSection delay={0.2}>
        <div className="mt-16 md:mt-20 pt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-linear-to-r from-primary to-amber-600 text-white text-base md:text-lg rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
          >
            ← View All Posts
          </Link>
        </div>
      </AnimatedSection>
    </article>
    </>
  );
}
