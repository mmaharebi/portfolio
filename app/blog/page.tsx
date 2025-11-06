import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Blog',
  description: 'My portfolio blog with MDX and KaTeX support',
};

export default function BlogPage() {
  const postsDirectory = path.join(process.cwd(), 'content', 'posts');
  
  let posts: string[] = [];
  try {
    posts = fs.readdirSync(postsDirectory);
  } catch (error) {
    // Directory might not exist yet or be empty
    console.log('No posts directory found or empty');
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No posts yet. Create your first post in <code>content/posts/</code>
        </p>
      ) : (
        <ul className="space-y-4">
          {posts.map((filename) => {
            const slug = filename.replace(/\.mdx$/, '');
            const title = slug
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return (
              <li key={slug}>
                <Link
                  href={`/blog/${slug}`}
                  className="text-xl text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
