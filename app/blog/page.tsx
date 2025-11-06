import BlogContent from '@/components/BlogContent';
import { getAllPosts } from '@/lib/utils';

export const metadata = {
  title: 'Blog',
  description: 'My portfolio blog with MDX and KaTeX support',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <BlogContent posts={posts} />
  );
}
