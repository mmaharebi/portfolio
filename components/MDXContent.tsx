import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';

interface MDXContentProps {
  source: string;
  components?: MDXRemoteProps['components'];
}

/**
 * Core MDX renderer with KaTeX and GFM support
 * Server Component - use in server contexts only
 * 
 * @param source - Raw MDX string content
 * @param components - Custom React components to use in MDX
 * 
 * @example
 * ```tsx
 * <MDXContent 
 *   source={mdxContent} 
 *   components={{ CustomButton, InfoCard }} 
 * />
 * ```
 */
export default async function MDXContent({ source, components }: MDXContentProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkGfm,      // Tables, strikethrough, etc.
              remarkMath,     // Parse math syntax
            ],
            rehypePlugins: [
              rehypeKatex,    // Render math with KaTeX
            ],
          },
        }}
      />
    </div>
  );
}
