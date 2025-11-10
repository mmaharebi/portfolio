import { Calendar, User, Tag } from "lucide-react";
import Link from "next/link";
import MDXContent from "@/components/MDXContent";
import Math from "@/components/Math";
import { AnimatedSection } from "@/components/AnimatedWrapper";
import type { BlogPost } from "@/lib/utils";

interface BlogPostContentProps {
  post: BlogPost;
}

export default async function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-16 overflow-x-hidden">
      {/* Title and Metadata */}
      <AnimatedSection delay={0}>
        <header className="mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-stone-800 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-sm md:text-base border border-primary/20">
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
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-sm md:text-base border border-primary/20">
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 backdrop-blur-sm text-primary text-xs md:text-sm rounded-full font-medium border border-primary/20 hover:bg-primary/20 transition-colors"
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
        <div className="prose-wrapper overflow-x-hidden w-full">
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
  );
}
