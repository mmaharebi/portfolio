# Portfolio Blog

A clean, modern portfolio blog built with Next.js 16, featuring MDX support and beautiful mathematical equations with KaTeX.

## ✨ Features

- **MDX Support** - Write blog posts with full React component support
- **KaTeX Math** - Beautiful mathematical notation (inline: `$E=mc^2$`, display: `$$...$$`)
- **GitHub Flavored Markdown** - Tables, strikethrough, task lists, etc.
- **SEO Optimized** - Metadata, sitemap, and robots.txt included
- **Static Generation** - Fast, pre-rendered pages
- **Dark Mode** - CSS supports dark mode
- **TypeScript** - Full type safety

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Visit [http://localhost:3000/blog](http://localhost:3000/blog) to see the blog with the example post.

## 📝 Creating Blog Posts

1. Create a new `.mdx` file in `content/posts/`:

```bash
touch content/posts/my-post.mdx
```

2. Add your content with markdown and math:

```markdown
# My Blog Post

This is a blog post with **bold** text and *italic* text.

Inline math: $E = mc^2$

Display math:
$$
\int_0^\infty f(x)dx
$$
```

3. Your post will be automatically available at `/blog/my-post`

## 📁 Project Structure

```
portfolio/
├── app/blog/          # Blog pages and styling
├── components/        # React components (MDX renderer, Math)
├── content/posts/     # Your blog posts (.mdx files)
└── lib/              # Utilities (SEO helpers)
```

## 🎨 Customization

- **Site Metadata**: Edit `app/layout.tsx`
- **Blog Styling**: Edit `app/blog/prose.css`
- **Math Examples**: See `content/posts/first-post.mdx`

## 📚 Math Syntax

### Inline Math
```markdown
The equation $E = mc^2$ is famous.
```

### Display Math
```markdown
$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$
```

**Important**: In MDX files, use **single backslash** `\` for LaTeX commands.

## 🛠️ Tech Stack

- **Next.js 16** with App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **MDX** via next-mdx-remote
- **KaTeX** for math typesetting

## 📖 Documentation

See `SETUP.md` for comprehensive setup guide and advanced configuration.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

