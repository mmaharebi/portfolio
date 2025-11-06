import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://your-domain.com';
  
  // Get all blog posts
  const postsDirectory = path.join(process.cwd(), 'content', 'posts');
  
  let posts: MetadataRoute.Sitemap = [];
  
  try {
    const filenames = fs.readdirSync(postsDirectory);
    posts = filenames.map((filename) => ({
      url: `${baseUrl}/blog/${filename.replace(/\.mdx$/, '')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    // Directory might not exist yet
    console.log('No posts directory found');
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...posts,
  ];
}
