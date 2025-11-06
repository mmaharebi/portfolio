import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author?: string;
  description?: string;
  tags?: string[];
  content: string;
}

export interface BlogPostMetadata {
  slug: string;
  title: string;
  date: string;
  author?: string;
  description?: string;
  tags?: string[];
}

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    // New: Read from folder structure
    const postPath = path.join(postsDirectory, slug);
    const mdxPath = path.join(postPath, 'index.mdx');
    
    if (!fs.existsSync(mdxPath)) {
      console.error(`Post not found: ${slug}/index.mdx`);
      return null;
    }

    const fileContents = fs.readFileSync(mdxPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      author: data.author,
      description: data.description,
      tags: data.tags || [],
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): BlogPostMetadata[] {
  try {
    // New: Read folders instead of files
    const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
    
    const posts = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => {
        const slug = entry.name;
        const mdxPath = path.join(postsDirectory, slug, 'index.mdx');
        
        // Skip if index.mdx doesn't exist
        if (!fs.existsSync(mdxPath)) {
          return null;
        }

        const fileContents = fs.readFileSync(mdxPath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug,
          title: data.title || slug,
          date: data.date || new Date().toISOString(),
          author: data.author,
          description: data.description,
          tags: data.tags || [],
        } as BlogPostMetadata;
      })
      .filter((post): post is NonNullable<BlogPostMetadata> => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export function getAllPostSlugs(): string[] {
  try {
    const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch (error) {
    return [];
  }
}

/**
 * Get list of images for a post
 */
export function getPostImages(slug: string): string[] {
  const imagesPath = path.join(postsDirectory, slug, 'images');
  
  if (!fs.existsSync(imagesPath)) {
    return [];
  }

  return fs.readdirSync(imagesPath)
    .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
    .map(file => `/content/posts/${slug}/images/${file}`);
}

/**
 * Get list of downloadable files for a post
 */
export function getPostFiles(slug: string): Array<{ name: string; path: string; ext: string }> {
  const filesPath = path.join(postsDirectory, slug, 'files');
  
  if (!fs.existsSync(filesPath)) {
    return [];
  }

  return fs.readdirSync(filesPath).map(file => ({
    name: file,
    path: `/content/posts/${slug}/files/${file}`,
    ext: path.extname(file).slice(1).toLowerCase()
  }));
}