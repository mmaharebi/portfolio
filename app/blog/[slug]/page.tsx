import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import MDXContent from '@/components/MDXContent';
import Math from '@/components/Math';
import { Metadata } from 'next';

// Generate static params for all posts
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content', 'posts');
  
  try {
    const filenames = fs.readdirSync(postsDirectory);
    return filenames.map((filename) => ({
      slug: filename.replace(/\.mdx$/, ''),
    }));
  } catch (error) {
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  
  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  
  return {
    title,
    description: `Blog post: ${title}`,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.mdx`);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  
  // Read MDX content
  const source = fs.readFileSync(filePath, 'utf8');
  
  return (
    <article>
      <MDXContent 
        source={source}
        components={{
          Math,
          // Add more custom components here
        }}
      />
    </article>
  );
}
