"use client";

import type { BlogPostMetadata } from "@/lib/utils";
import ArtisticHero from "./ArtisticHero";
import InteractiveExpertise from "./InteractiveExpertise";
import BlogShowcase from "./BlogShowcase";
import TimelineSection from "./TimelineSection";
import FinalCTA from "./FinalCTA";
import HomeBackground from "./backgrounds/HomeBackground";
import { BRIEF_TIMELINE_DATA } from "@/lib/constants/timeline";

interface HomeContentProps {
  recentPosts: BlogPostMetadata[];
}

export default function HomeContent({ recentPosts }: HomeContentProps) {
  return (
    <>
      <HomeBackground />
      <div className="min-h-screen relative">
        {/* Artistic Hero Section */}
        <ArtisticHero />

        {/* Interactive Expertise Section */}
        <InteractiveExpertise />

        {/* Blog Showcase */}
        <BlogShowcase posts={recentPosts} />

        {/* Timeline Section */}
        <TimelineSection items={BRIEF_TIMELINE_DATA} />

        {/* Final CTA Section */}
        <FinalCTA />
      </div>
    </>
  );
}
