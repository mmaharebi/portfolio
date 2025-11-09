# Mahdy Mahareb - Portfolio

Personal portfolio and blog of Mahdy Mahareb (Mohammadmahdi Maharebi), M.Sc. student in Electrical Communication Engineering at University of Kassel.

**Live Site:** [mahdymahareb.de](https://mahdymahareb.de)

## 🎯 About

This portfolio showcases my work in:
- Communication Systems
- RF/Microwave Engineering
- Applied Electromagnetics
- Signal Processing
- Computational Modeling

## ✨ Features

- **Modern Design** - Artistic, interactive UI with smooth animations
- **MDX Blog** - Technical articles with KaTeX math support
- **Project Showcase** - Interactive portfolio of research and course projects
- **Responsive** - Works beautifully on all devices
- **SEO Optimized** - Metadata, sitemap, and robots.txt
- **Performance** - Built with Next.js 16 for optimal speed
- **TypeScript** - Full type safety

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Motion (Framer Motion), Tailwind CSS v4
- **Content:** MDX with KaTeX for mathematics
- **Deployment:** Vercel
- **Language:** TypeScript

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

