import HomeContent from "@/components/HomeContent";
import { BlogPostMetadata, getAllPosts, getAllPostSlugs } from "@/lib/utils";

export default function Home() {
  const recentPosts: BlogPostMetadata[] = getAllPosts().slice(0, 3); // Fetch recent 3 posts
  return <HomeContent recentPosts={recentPosts} />;
}