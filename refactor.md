# Portfolio Project Refactoring Plan

## Executive Summary

This document outlines a comprehensive refactoring strategy to improve code readability, maintainability, and extensibility of your Next.js portfolio project while preserving all existing functionality.

---

## 🎯 Refactoring Goals

1. **Improve Code Readability**: Cleaner component structure and consistent patterns
2. **Enhance Maintainability**: Reduce duplication and improve code organization
3. **Better Extensibility**: Make it easier to add new features
4. **Preserve Functionality**: No breaking changes to user-facing features
5. **Type Safety**: Strengthen TypeScript usage throughout

---

## 📋 Table of Contents

1. [Project Structure Reorganization](#1-project-structure-reorganization)
2. [Utility Functions & Helpers](#2-utility-functions--helpers)
3. [Component Refactoring](#3-component-refactoring)
4. [Style Management](#4-style-management)
5. [Constants & Configuration](#5-constants--configuration)
6. [Type Definitions](#6-type-definitions)
7. [Performance Optimizations](#7-performance-optimizations)
8. [Implementation Roadmap](#8-implementation-roadmap)

---

## 1. Project Structure Reorganization

### Current Structure Issues
- Components are flat in one directory
- No clear separation between UI primitives and page-specific components
- Background components in subdirectory but other component types aren't categorized
- Utilities mixed with component logic

### Proposed Structure

```
portfolio/
├── app/                          # Next.js app directory (keep as is)
├── components/
│   ├── ui/                       # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Section.tsx
│   │   └── Container.tsx
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── Portal.tsx
│   ├── backgrounds/              # Background components (existing)
│   │   └── ...
│   ├── home/                     # Home page specific components
│   │   ├── ArtisticHero.tsx
│   │   ├── HomeContent.tsx
│   │   └── InteractiveExpertise.tsx
│   ├── blog/                     # Blog specific components
│   │   ├── BlogContent.tsx
│   │   ├── BlogShowcase.tsx
│   │   └── BlogPostContent.tsx
│   ├── about/                    # About page specific components
│   │   ├── InteractiveJourney.tsx
│   │   ├── InteractiveSkills.tsx
│   │   └── ProjectShowcase.tsx
│   ├── contact/                  # Contact page specific components
│   │   └── ContactForm.tsx
│   ├── timeline/                 # Timeline related components
│   │   ├── BriefTimeline.tsx
│   │   ├── SerpentineTimeline.tsx
│   │   └── CurvedTimeline.tsx
│   └── shared/                   # Shared feature components
│       ├── AnimatedWrapper.tsx
│       ├── Math.tsx
│       └── MDXContent.tsx
├── lib/
│   ├── utils/
│   │   ├── cn.ts                 # clsx + twMerge utility
│   │   ├── animations.ts         # Reusable animation configs
│   │   └── formatting.ts         # Date, string formatting
│   ├── api/
│   │   └── blog.ts               # Blog post utilities (from utils.ts)
│   ├── constants/
│   │   ├── navigation.ts         # Navigation items
│   │   ├── colors.ts             # Color maps
│   │   ├── expertise.ts          # Expertise data
│   │   ├── timeline.ts           # Timeline data
│   │   └── projects.ts           # Projects data
│   ├── hooks/
│   │   ├── useMousePosition.ts   # Custom hook for mouse tracking
│   │   ├── useScrollPosition.ts  # Custom hook for scroll tracking
│   │   └── useMounted.ts         # Custom hook for mounted state
│   └── types/
│       ├── blog.ts               # Blog types
│       ├── timeline.ts           # Timeline types
│       └── index.ts              # Barrel export
├── content/                      # Content directory (keep as is)
└── public/                       # Public assets (keep as is)
```

### Action Items
- [ ] Create new directory structure
- [ ] Move components to appropriate directories
- [ ] Update all import paths
- [ ] Create barrel exports (index.ts) for each directory

---

## 2. Utility Functions & Helpers

### 2.1 Install and Setup `clsx` + `tailwind-merge`

**Why**: Cleaner className management, conditional styling, and no Tailwind class conflicts.

```bash
pnpm add clsx tailwind-merge
```

Create `lib/utils/cn.ts`:
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Example Usage (Before)**:
```tsx
<div 
  className={`relative px-4 py-2 rounded-xl font-medium transition-colors duration-300 ${
    active ? "text-white" : "text-stone-600 hover:text-terracotta"
  }`}
>
```

**Example Usage (After)**:
```tsx
<div 
  className={cn(
    "relative px-4 py-2 rounded-xl font-medium transition-colors duration-300",
    active ? "text-white" : "text-stone-600 hover:text-terracotta"
  )}
>
```

### 2.2 Animation Utilities

Create `lib/utils/animations.ts`:
```typescript
import { type Variants } from "motion/react";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const pulseAnimation = {
  scale: [1, 1.2, 1],
  opacity: [0.5, 0.8, 0.5],
  transition: {
    duration: 2,
    repeat: Infinity,
  },
};
```

### Action Items
- [ ] Install `clsx` and `tailwind-merge`
- [ ] Create `lib/utils/cn.ts`
- [ ] Create `lib/utils/animations.ts`
- [ ] Create `lib/utils/formatting.ts` for date/string utilities

---

## 3. Component Refactoring

### 3.1 Extract Reusable UI Components

Many components have repeated patterns. Extract these into primitives:

#### Create `components/ui/Card.tsx`
```typescript
import { cn } from "@/lib/utils/cn";
import { motion, type HTMLMotionProps } from "motion/react";
import { type ReactNode } from "react";

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  variant?: "default" | "gradient" | "bordered";
  hover?: boolean;
  glow?: boolean;
}

export function Card({ 
  children, 
  className, 
  variant = "default", 
  hover = false,
  glow = false,
  ...props 
}: CardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-3xl p-6 transition-all duration-300",
        variant === "default" && "bg-white/80 backdrop-blur-sm border-2 border-stone-200 shadow-lg",
        variant === "gradient" && "bg-linear-to-br from-primary/10 via-amber-100/20 to-secondary/10",
        variant === "bordered" && "border-2 border-stone-200",
        hover && "hover:shadow-xl hover:-translate-y-2",
        glow && "shadow-2xl",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
```

#### Create `components/ui/Badge.tsx`
```typescript
import { cn } from "@/lib/utils/cn";
import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "terracotta";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Badge({ 
  children, 
  variant = "primary", 
  size = "md",
  className 
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-semibold",
        size === "sm" && "px-3 py-1 text-xs",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-5 py-2.5 text-base",
        variant === "primary" && "bg-primary/10 text-primary border border-primary/20",
        variant === "secondary" && "bg-secondary/10 text-secondary border border-secondary/20",
        variant === "accent" && "bg-accent/10 text-accent border border-accent/20",
        variant === "terracotta" && "bg-terracotta/10 text-terracotta",
        className
      )}
    >
      {children}
    </span>
  );
}
```

#### Create `components/ui/Section.tsx`
```typescript
import { cn } from "@/lib/utils/cn";
import { motion } from "motion/react";
import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "gradient";
}

export function Section({ children, className, id, background = "default" }: SectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "relative py-16 md:py-20 px-4 sm:px-6 overflow-hidden",
        background === "gradient" && "bg-linear-to-b from-stone-50 to-white",
        className
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeader({ 
  badge, 
  title, 
  description,
  className 
}: {
  badge?: ReactNode;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("text-center mb-12 md:mb-16", className)}
    >
      {badge && <div className="mb-6">{badge}</div>}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
```

### 3.2 Component-Specific Refactoring

#### Header.tsx Issues & Solutions

**Current Issues**:
- Large component (327 lines)
- Multiple responsibilities (mobile menu, navigation, scroll handling)
- Navigation items hardcoded in component

**Refactoring Steps**:

1. Extract navigation config to `lib/constants/navigation.ts`:
```typescript
import { Home, BookOpen, User, Mail } from "lucide-react";

export const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
] as const;
```

2. Extract mobile menu to separate component `components/layout/MobileMenu.tsx`
3. Extract desktop navigation to `components/layout/DesktopNav.tsx`
4. Use custom hook `useScrolled` for scroll detection

#### ArtisticHero.tsx Issues & Solutions

**Current Issues**:
- Very large component (467 lines)
- Mouse position and window size logic embedded
- Many hardcoded animation values
- SSR hydration workaround with mounted state

**Refactoring Steps**:

1. Create custom hooks:
```typescript
// lib/hooks/useMousePosition.ts
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
  
  return position;
}

// lib/hooks/useMounted.ts
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
```

2. Extract background shapes to `components/home/HeroBackground.tsx`
3. Extract hero content to `components/home/HeroContent.tsx`
4. Main component becomes orchestrator

#### HomeContent.tsx Issues & Solutions

**Current Issues**:
- 222 lines with multiple sections
- Timeline data hardcoded in component
- Mixed concerns (data, layout, presentation)

**Refactoring Steps**:

1. Move timeline data to `lib/constants/timeline.ts`:
```typescript
export const BRIEF_TIMELINE_DATA: BriefTimelineItem[] = [
  {
    year: "2017",
    title: "Physics Olympiad (Silver Medal)",
    icon: "award",
    color: "primary",
    hint: "Silver Medal at Iran's National Physics Olympiad...",
  },
  // ... rest of data
];
```

2. Extract CTA section to `components/home/CTASection.tsx`
3. Break into smaller sub-components

#### InteractiveExpertise.tsx Issues & Solutions

**Current Issues**:
- 290 lines
- Expertise data hardcoded
- Color map duplicated across components

**Refactoring Steps**:

1. Move expertise data to `lib/constants/expertise.ts`
2. Move color map to `lib/constants/colors.ts`:
```typescript
export const COLOR_VARIANTS = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary",
    text: "text-primary",
    glow: "shadow-primary/30",
    gradient: "from-primary to-amber-600",
  },
  // ... other colors
} as const;

export type ColorVariant = keyof typeof COLOR_VARIANTS;
```

3. Extract expertise card to separate component

#### ContactForm.tsx Issues & Solutions

**Current Issues**:
- 399 lines
- Form validation logic mixed with rendering
- No form library (reinventing the wheel)

**Refactoring Steps**:

1. Consider using `react-hook-form` + `zod` for validation (optional, adds deps)
2. Extract form field component
3. Extract validation logic to separate file
4. Extract status messages to separate component

### 3.3 Shared Patterns Extraction

Many components share these patterns:

**Pattern: Color Variant Props**
```typescript
// Extract to lib/types/common.ts
export type ColorVariant = "primary" | "secondary" | "accent" | "terracotta";

export interface ColoredComponent {
  color?: ColorVariant;
}
```

**Pattern: Hover State Management**
```typescript
// Many components use this pattern - create a hook
// lib/hooks/useHoverState.ts
export function useHoverState<T>(items: T[]) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return {
    hoveredIndex,
    setHovered: setHoveredIndex,
    isHovered: (index: number) => hoveredIndex === index,
  };
}
```

### Action Items
- [ ] Create all UI primitive components
- [ ] Extract color maps to constants
- [ ] Create custom hooks for common patterns
- [ ] Refactor large components (>200 lines) into smaller pieces
- [ ] Extract data from components to constants

---

## 4. Style Management

### 4.1 Current Issues with Tailwind Classes

**Problems**:
- Very long className strings (hard to read)
- `bg-linear-to-r` instead of `bg-gradient-to-r` (incorrect syntax used 20+ times)
- Repeated color combinations
- No consistent pattern for responsive design

### 4.2 Fix Gradient Classes

**Find and Replace** (across all files):
- `bg-linear-to-r` → `bg-gradient-to-r`
- `bg-linear-to-br` → `bg-gradient-to-br`
- `bg-linear-to-b` → `bg-gradient-to-b`
- `bg-linear-to-tr` → `bg-gradient-to-tr`
- `bg-linear-to-tl` → `bg-gradient-to-tl`
- `bg-linear-to-bl` → `bg-gradient-to-bl`

### 4.3 Create Tailwind Component Classes

Add to `globals.css`:
```css
@layer components {
  /* Gradient backgrounds */
  .gradient-primary {
    @apply bg-gradient-to-r from-primary to-amber-600;
  }
  
  .gradient-warm {
    @apply bg-gradient-to-br from-primary/10 via-amber-100/20 to-secondary/10;
  }
  
  /* Button variants */
  .btn-primary {
    @apply px-8 py-4 bg-gradient-to-r from-primary to-amber-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-shadow;
  }
  
  .btn-secondary {
    @apply px-6 py-3 bg-white/80 backdrop-blur-sm border-2 border-stone-200 text-stone-700 rounded-2xl font-semibold shadow-lg hover:border-primary transition-colors;
  }
  
  /* Card variants */
  .card-glass {
    @apply bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-stone-200 shadow-lg;
  }
  
  .card-gradient {
    @apply bg-gradient-to-br from-primary/10 via-amber-100/20 to-secondary/10 rounded-3xl;
  }
  
  /* Section decorations */
  .section-decoration-top-left {
    @apply absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl;
  }
  
  .section-decoration-bottom-right {
    @apply absolute bottom-0 right-1/3 w-56 md:w-80 h-56 md:h-80 bg-secondary/5 rounded-full blur-3xl;
  }
}
```

### 4.4 Use `cn()` Utility Everywhere

**Before**:
```tsx
className={`relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border-2 ${
  isExpanded ? 'border-primary shadow-2xl' : 'border-stone-200'
}`}
```

**After**:
```tsx
className={cn(
  "relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 border-2 transition-all",
  isExpanded ? "border-primary shadow-2xl" : "border-stone-200"
)}
```

### Action Items
- [ ] Fix all gradient class names (bg-linear-* → bg-gradient-*)
- [ ] Add component classes to `globals.css`
- [ ] Replace all template literal classNames with `cn()`
- [ ] Create variant-based styling system

---

## 5. Constants & Configuration

### 5.1 Extract Data to Constants

Create the following constant files:

#### `lib/constants/navigation.ts`
```typescript
import { Home, BookOpen, User, Mail } from "lucide-react";
import { type LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/about", label: "About", icon: User },
  { href: "/contact", label: "Contact", icon: Mail },
];
```

#### `lib/constants/colors.ts`
```typescript
export const COLOR_PALETTES = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary",
    text: "text-primary",
    icon: "text-primary",
    fill: "bg-primary",
    glow: "shadow-primary/30",
    gradient: "from-primary to-amber-600",
  },
  secondary: {
    bg: "bg-secondary/10",
    border: "border-secondary",
    text: "text-secondary",
    icon: "text-secondary",
    fill: "bg-secondary",
    glow: "shadow-secondary/30",
    gradient: "from-secondary to-amber-400",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent",
    text: "text-accent",
    icon: "text-accent",
    fill: "bg-accent",
    glow: "shadow-accent/30",
    gradient: "from-accent to-amber-700",
  },
  terracotta: {
    bg: "bg-terracotta/10",
    border: "border-terracotta",
    text: "text-terracotta",
    icon: "text-terracotta",
    fill: "bg-terracotta",
    glow: "shadow-terracotta/30",
    gradient: "from-terracotta to-primary",
  },
} as const;

export type ColorPalette = keyof typeof COLOR_PALETTES;

// Helper function
export function getColorClasses(color: ColorPalette) {
  return COLOR_PALETTES[color];
}
```

#### `lib/constants/expertise.ts`
```typescript
import { Radio, Zap, Calculator, Layers } from "lucide-react";
import { type ColorPalette } from "./colors";

export interface ExpertiseArea {
  icon: typeof Radio;
  title: string;
  shortDesc: string;
  fullDesc: string;
  color: ColorPalette;
  skills: string[];
}

export const EXPERTISE_DATA: ExpertiseArea[] = [
  // Move data from InteractiveExpertise.tsx here
];
```

#### `lib/constants/timeline.ts`
```typescript
import { type ColorPalette } from "./colors";

export interface BriefTimelineItem {
  year: string;
  title: string;
  icon?: "award" | "education" | "work" | "milestone";
  color?: ColorPalette;
  hint?: string;
}

export interface DetailedTimelineItem {
  year: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  icon: "award" | "education" | "work" | "milestone";
  color: ColorPalette;
}

export const BRIEF_TIMELINE: BriefTimelineItem[] = [
  // Move from HomeContent.tsx
];

export const DETAILED_TIMELINE: DetailedTimelineItem[] = [
  // Move from about/page.tsx
];
```

#### `lib/constants/projects.ts`
```typescript
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  tags: string[];
  year: string;
  category: string;
  githubUrl?: string;
  highlight?: boolean;
}

export const PROJECTS_DATA: Project[] = [
  // Move from about/page.tsx
];
```

### 5.2 Environment Variables

Create `.env.local`:
```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://mahdymahareb.de
NEXT_PUBLIC_SITE_NAME=Mahdy Mahareb Portfolio
NEXT_PUBLIC_AUTHOR_NAME=Mahdy Mahareb
NEXT_PUBLIC_AUTHOR_EMAIL=contact@mahdymahareb.de

# Social Links
NEXT_PUBLIC_GITHUB_URL=https://github.com/mmaharebi
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/mmaharebi
```

Create `lib/constants/site.ts`:
```typescript
export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Mahdy Mahareb",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mahdymahareb.de",
  author: {
    name: process.env.NEXT_PUBLIC_AUTHOR_NAME || "Mahdy Mahareb",
    email: process.env.NEXT_PUBLIC_AUTHOR_EMAIL || "contact@mahdymahareb.de",
  },
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/mmaharebi",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/mmaharebi",
  },
} as const;
```

### Action Items
- [ ] Create all constant files
- [ ] Move data from components to constants
- [ ] Create site configuration
- [ ] Update components to import from constants

---

## 6. Type Definitions

### 6.1 Consolidate Types

Create centralized type definitions:

#### `lib/types/index.ts` (barrel export)
```typescript
export * from './blog';
export * from './timeline';
export * from './common';
export * from './components';
```

#### `lib/types/common.ts`
```typescript
import { type LucideIcon } from "lucide-react";

export type ColorVariant = "primary" | "secondary" | "accent" | "terracotta";

export interface WithColor {
  color?: ColorVariant;
}

export interface WithIcon {
  icon: LucideIcon;
}

export interface WithHover {
  isHovered?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}
```

#### `lib/types/blog.ts`
```typescript
// Move from lib/utils.ts
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author?: string;
  description?: string;
  tags?: string[];
  content: string;
}

export interface BlogPostMetadata extends Omit<BlogPost, 'content'> {}
```

#### `lib/types/timeline.ts`
```typescript
export type TimelineIcon = "award" | "education" | "work" | "milestone";

export interface BaseTimelineItem {
  year: string;
  title: string;
  icon: TimelineIcon;
  color: ColorVariant;
}

export interface BriefTimelineItem extends BaseTimelineItem {
  hint?: string;
}

export interface DetailedTimelineItem extends BaseTimelineItem {
  subtitle: string;
  location: string;
  description: string;
}
```

### Action Items
- [ ] Create type definition files
- [ ] Move types from components/pages to lib/types
- [ ] Create barrel exports
- [ ] Update imports across project

---

## 7. Performance Optimizations

### 7.1 Code Splitting & Dynamic Imports

For large components that aren't immediately needed:

```typescript
// app/page.tsx - Lazy load heavy components
import dynamic from 'next/dynamic';

const ArtisticHero = dynamic(() => import('@/components/home/ArtisticHero'));
const InteractiveExpertise = dynamic(() => import('@/components/home/InteractiveExpertise'));
```

### 7.2 Memoization

Add memoization where appropriate:

```typescript
import { memo, useMemo } from 'react';

// For expensive list renders
export const BlogShowcase = memo(function BlogShowcase({ posts }: Props) {
  // component logic
});

// For expensive calculations
const filteredPosts = useMemo(() => {
  return posts.filter(/* ... */);
}, [posts, searchQuery]);
```

### 7.3 Image Optimization

If you add images later, use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={600}
  height={400}
  loading="lazy"
/>
```

### Action Items
- [ ] Identify heavy components for lazy loading
- [ ] Add memoization to list components
- [ ] Optimize animations (use `will-change` CSS)
- [ ] Add `loading="lazy"` to images

---

## 8. Implementation Roadmap (RECOMMENDED APPROACH)

> **Strategy**: Extract First, Refactor Later
> 
> This approach minimizes risk by breaking down large components into smaller pieces through simple copy-paste extractions, then gradually improving the extracted components. Each step is reversible and testable.

### Phase 1: Quick Setup & Critical Fixes (Day 1)
**Priority: CRITICAL - 2 hours**
**Risk: Very Low**

1. **Install utilities**
   ```bash
   pnpm add clsx tailwind-merge
   ```

2. **Create `lib/utils/cn.ts`**
   ```typescript
   import { clsx, type ClassValue } from "clsx";
   import { twMerge } from "tailwind-merge";
   
   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
   }
   ```

3. **Fix gradient classes** (Find & Replace across all `.tsx` files)
   - `bg-linear-to-r` → `bg-gradient-to-r`
   - `bg-linear-to-br` → `bg-gradient-to-br`
   - `bg-linear-to-b` → `bg-gradient-to-b`
   - `bg-linear-to-tr` → `bg-gradient-to-tr`
   - `bg-linear-to-tl` → `bg-gradient-to-tl`
   - `bg-linear-to-bl` → `bg-gradient-to-bl`

4. **Test**
   - [ ] `pnpm build`
   - [ ] Test all pages visually
   - [ ] Commit: "fix: correct gradient Tailwind classes"

---

### Phase 2: Extract Components from Header (Day 2)
**Priority: HIGH - 3 hours**
**Risk: Low - Single component, heavily used**
**Current: 327 lines → Target: ~100 lines**

#### Step 2.1: Extract Mobile Menu (1 hour)

Create `components/MobileMenu.tsx` (copy-paste from Header.tsx lines 205-327):
```typescript
// Just copy the mobile menu JSX and required state
// Keep ALL styling exactly the same
// Test immediately after
```

Update `Header.tsx`:
```typescript
import MobileMenu from './MobileMenu';

// Replace mobile menu JSX with:
<MobileMenu 
  isOpen={isMobileMenuOpen}
  onClose={() => setIsMobileMenuOpen(false)}
  pathname={pathname}
/>
```

**Test**: Open/close mobile menu, navigate, check animations
**Commit**: "refactor: extract MobileMenu from Header"

#### Step 2.2: Extract Desktop Navigation (1 hour)

Create `components/DesktopNav.tsx` (copy-paste navigation logic):
```typescript
// Copy lines 115-157 from Header.tsx
// Keep exact same styling
```

**Test**: Desktop navigation, active states, hover effects
**Commit**: "refactor: extract DesktopNav from Header"

#### Step 2.3: Extract Navigation Data (30 min)

Create `lib/constants/navigation.ts`:
```typescript
export const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  // ... copy from Header.tsx
];
```

**Test**: Navigation still works
**Commit**: "refactor: extract navigation constants"

**Result**: Header.tsx now ~100 lines, 3 new files, no functionality changes

---

### Phase 3: Extract Components from ArtisticHero (Day 3-4)
**Priority: HIGH - 4 hours**
**Risk: Low - Self-contained component**
**Current: 467 lines → Target: ~150 lines**

#### Step 3.1: Extract Custom Hooks (1 hour)

Create `lib/hooks/useMounted.ts`:
```typescript
// Copy mounted logic from ArtisticHero
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
```

Create `lib/hooks/useMousePosition.ts`:
```typescript
// Copy mouse position logic
```

Update `ArtisticHero.tsx` to use hooks
**Test**: Mouse parallax still works
**Commit**: "refactor: extract useMounted and useMousePosition hooks"

#### Step 3.2: Extract Background Shapes (2 hours)

Create `components/HeroBackground.tsx` (copy lines 75-200):
```typescript
// Copy all the floating shapes, orbs, particles
// Keep exact same animations and styling
export function HeroBackground({ mousePosition, parallaxX, parallaxY, scrollY }) {
  // ... paste background JSX
}
```

Update `ArtisticHero.tsx`:
```typescript
import { HeroBackground } from './HeroBackground';

return (
  <section>
    <HeroBackground 
      mousePosition={mousePosition}
      parallaxX={parallaxX}
      parallaxY={parallaxY}
      scrollY={scrollY}
    />
    {/* Content */}
  </section>
);
```

**Test**: All animations, parallax effects
**Commit**: "refactor: extract HeroBackground component"

#### Step 3.3: Extract Hero Content (1 hour)

Create `components/HeroContent.tsx` (copy the main content section)

**Test**: Content displays, CTAs work
**Commit**: "refactor: extract HeroContent component"

**Result**: ArtisticHero.tsx now ~150 lines, cleaner structure

---

### Phase 4: Extract Components from HomeContent (Day 5)
**Priority: HIGH - 3 hours**
**Risk: Low**
**Current: 222 lines → Target: ~80 lines**

#### Step 4.1: Extract Timeline Data (30 min)

Create `lib/constants/timeline.ts`:
```typescript
export const BRIEF_TIMELINE_DATA = [
  // Copy lines 17-63 from HomeContent.tsx
];
```

**Test**: Timeline still displays
**Commit**: "refactor: extract timeline data to constants"

#### Step 4.2: Extract CTA Section (1 hour)

Create `components/FinalCTA.tsx` (copy lines 144-220):
```typescript
// Copy the entire final CTA section
export function FinalCTA() {
  // ... paste JSX
}
```

**Test**: CTA displays, links work
**Commit**: "refactor: extract FinalCTA component"

#### Step 4.3: Extract Timeline Section (1.5 hours)

Create `components/TimelineSection.tsx` (copy lines 72-143):

**Test**: Timeline section works
**Commit**: "refactor: extract TimelineSection component"

**Result**: HomeContent.tsx now ~80 lines, just orchestrates sections

---

### Phase 5: Extract Components from InteractiveExpertise (Day 6)
**Priority: MEDIUM - 3 hours**
**Risk: Low**
**Current: 290 lines → Target: ~100 lines**

#### Step 5.1: Extract Data & Color Map (30 min)

Create `lib/constants/expertise.ts`:
```typescript
export const EXPERTISE_DATA = [ /* copy from component */ ];
```

Create `lib/constants/colors.ts`:
```typescript
export const COLOR_PALETTES = { /* copy color map */ };
```

**Test**: Component still works
**Commit**: "refactor: extract expertise data and color palettes"

#### Step 5.2: Extract Expertise Card (2 hours)

Create `components/ExpertiseCard.tsx`:
```typescript
// Extract the card rendering logic
// This is the content inside the map function
export function ExpertiseCard({ area, index, ... }) {
  // ... paste card JSX
}
```

Update `InteractiveExpertise.tsx`:
```typescript
{expertiseData.map((area, index) => (
  <ExpertiseCard 
    key={index}
    area={area}
    index={index}
    isExpanded={expandedIndex === index}
    isHovered={hoveredIndex === index}
    onExpand={() => setExpandedIndex(index)}
    onHover={() => setHoveredIndex(index)}
  />
))}
```

**Test**: All cards work, expand/collapse, hover states
**Commit**: "refactor: extract ExpertiseCard component"

**Result**: InteractiveExpertise.tsx now ~100 lines

---

### Phase 6: Extract Components from ContactForm (Day 7)
**Priority: MEDIUM - 3 hours**
**Risk: Low**
**Current: 399 lines → Target: ~150 lines**

#### Step 6.1: Extract Form Field Component (1.5 hours)

Create `components/FormField.tsx`:
```typescript
// Extract the repeated input/textarea pattern
export function FormField({ 
  name, 
  label, 
  type = "text",
  error,
  value,
  onChange,
  onFocus,
  onBlur,
  ...props 
}) {
  return (
    <div>
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea {...props} />
      ) : (
        <input type={type} {...props} />
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

**Test**: Form inputs work, validation works
**Commit**: "refactor: extract FormField component"

#### Step 6.2: Extract Status Messages (1 hour)

Create `components/FormStatus.tsx`:
```typescript
// Extract success/error/loading states
export function FormStatus({ status }) {
  // ... paste status display logic
}
```

**Test**: Form submission states
**Commit**: "refactor: extract FormStatus component"

**Result**: ContactForm.tsx now ~150 lines

---

### Phase 7: Extract from Other Large Components (Day 8-9)
**Priority: MEDIUM - 6 hours**
**Risk: Low**

Apply same pattern to:
- [ ] `InteractiveSkills.tsx` (360 lines) → Extract SkillCard
- [ ] `InteractiveJourney.tsx` → Extract JourneyItem
- [ ] `ProjectShowcase.tsx` → Extract ProjectCard
- [ ] `BlogShowcase.tsx` → Extract BlogCard
- [ ] `BlogContent.tsx` → Extract SearchBar, FilterTags

**Each follows same process**:
1. Identify repeated pattern
2. Copy-paste to new component
3. Test immediately
4. Commit

---

### Phase 8: Apply `cn()` to Extracted Components (Day 10-11)
**Priority: MEDIUM - 4 hours**
**Risk: Very Low - Just refactoring classNames**

Now that components are smaller, refactor their classNames:

**For each extracted component**:
1. Import `cn` from `@/lib/utils/cn`
2. Replace template literal classNames with `cn()`
3. Test that styling is identical
4. Commit

**Example** (in ExpertiseCard.tsx):
```typescript
// Before
className={`relative cursor-pointer rounded-2xl p-6 border-2 ${
  isExpanded ? 'border-primary shadow-2xl' : 'border-stone-200'
}`}

// After
className={cn(
  "relative cursor-pointer rounded-2xl p-6 border-2 transition-all",
  isExpanded ? "border-primary shadow-2xl" : "border-stone-200"
)}
```

---

### Phase 9: Optional - Folder Reorganization (Day 12)
**Priority: LOW - 2 hours**
**Risk: Medium - Only do if you want better organization**

Only after all extractions are done and tested:

1. Create new folder structure
2. Move components to logical folders
3. Update imports
4. Test everything

**Note**: This is optional. A flat structure with well-named files is fine!

---

### Phase 10: Create Reusable UI Primitives (Day 13-14)
**Priority: LOW - 4 hours**
**Risk: Low - These are new components**

Now that you understand the patterns, create:
- `components/ui/Card.tsx` - Extracted from repeated patterns
- `components/ui/Badge.tsx` - For tags, labels
- `components/ui/Section.tsx` - For page sections
- `components/ui/Button.tsx` - For CTAs

Gradually adopt these in components as you make changes.

---

## Summary: Extract-First Approach

### Timeline: 14 days → ~35 hours total

| Phase | Time | Risk | Value |
|-------|------|------|-------|
| 1. Setup & Fix Gradients | 2h | Very Low | High |
| 2. Extract from Header | 3h | Low | High |
| 3. Extract from ArtisticHero | 4h | Low | High |
| 4. Extract from HomeContent | 3h | Low | High |
| 5. Extract from InteractiveExpertise | 3h | Low | Medium |
| 6. Extract from ContactForm | 3h | Low | Medium |
| 7. Extract from Others | 6h | Low | Medium |
| 8. Apply cn() | 4h | Very Low | Medium |
| 9. Reorganize (Optional) | 2h | Medium | Low |
| 10. UI Primitives (Optional) | 4h | Low | Medium |

### Key Principles

✅ **One component at a time**
✅ **Test after each extraction**
✅ **Commit after each step**
✅ **Copy-paste first, refactor later**
✅ **Keep functionality identical**
✅ **Can stop at any point**

### Why This Works

1. **Incremental**: Each step is small and testable
2. **Reversible**: Easy to git revert if needed
3. **Low Risk**: Mostly copy-paste, minimal logic changes
4. **Immediate Value**: Smaller components are easier to understand
5. **Flexible**: Can stop after Phase 7 and still have major improvements

---

## 9. Testing Strategy

### Before Each Phase
- [ ] Create a git branch for the phase
- [ ] Commit current working state

### During Implementation
- [ ] Test after each major change
- [ ] Run `pnpm build` regularly
- [ ] Check TypeScript errors: `pnpm tsc --noEmit`

### After Each Phase
- [ ] Full manual testing of all pages
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test all interactive features
- [ ] Merge branch if successful

### Testing Checklist for Each Page

**Home Page** (`/`)
- [ ] Hero section displays correctly
- [ ] Animations work smoothly
- [ ] Expertise section cards are interactive
- [ ] Timeline displays and tooltips work
- [ ] Blog showcase shows recent posts
- [ ] CTA buttons work
- [ ] Responsive on mobile

**Blog Page** (`/blog`)
- [ ] Posts list displays
- [ ] Search functionality works
- [ ] Tag filtering works
- [ ] Post cards link correctly

**Blog Post** (`/blog/[slug]`)
- [ ] Post content renders
- [ ] Math equations render (KaTeX)
- [ ] Code blocks display correctly
- [ ] Images load
- [ ] Back button works

**About Page** (`/about`)
- [ ] Journey timeline displays
- [ ] Skills section works
- [ ] Projects showcase displays
- [ ] All animations work

**Contact Page** (`/contact`)
- [ ] Contact form displays
- [ ] Form validation works
- [ ] Contact links work
- [ ] Form submission (mock) works

**Navigation**
- [ ] Header navigation works
- [ ] Mobile menu opens/closes
- [ ] Active page highlighting works
- [ ] Scroll-to-top button works
- [ ] Footer links work

---

## 10. Common Patterns to Follow

### 10.1 Component Structure Template

```typescript
"use client"; // Only if needed

import { cn } from "@/lib/utils/cn";
import { motion } from "motion/react";
import { type ComponentProps } from "./types";
import { COMPONENT_DATA } from "@/lib/constants/component";

interface ComponentNameProps {
  // Props definition
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // Hooks
  const [state, setState] = useState();
  
  // Derived values
  const derivedValue = useMemo(() => {
    // computation
  }, [dependencies]);
  
  // Event handlers
  const handleClick = () => {
    // logic
  };
  
  // Render
  return (
    <div className={cn("base-classes", conditionalClasses)}>
      {/* JSX */}
    </div>
  );
}
```

### 10.2 File Naming Conventions

- **Components**: PascalCase (e.g., `BlogShowcase.tsx`)
- **Utilities**: camelCase (e.g., `cn.ts`, `animations.ts`)
- **Constants**: SCREAMING_SNAKE_CASE for values, camelCase for files (e.g., `navigation.ts` exports `NAV_ITEMS`)
- **Types**: PascalCase for interfaces/types (e.g., `BlogPost`)
- **Hooks**: camelCase starting with `use` (e.g., `useMousePosition.ts`)

### 10.3 Import Order

```typescript
// 1. React/Next imports
import { useState } from "react";
import Link from "next/link";

// 2. Third-party libraries
import { motion } from "motion/react";
import { Mail, Github } from "lucide-react";

// 3. Internal utilities
import { cn } from "@/lib/utils/cn";

// 4. Internal types
import { type BlogPost } from "@/lib/types";

// 5. Internal constants
import { NAV_ITEMS } from "@/lib/constants/navigation";

// 6. Internal components
import { Card } from "@/components/ui/Card";
```

### 10.4 Props Interface Naming

```typescript
// For component: MyComponent
interface MyComponentProps {
  // props
}

// For multiple related types
interface MyComponentProps {
  items: MyComponentItem[];
}

interface MyComponentItem {
  // item structure
}
```

---

## 11. Code Quality Guidelines

### 11.1 TypeScript

- [ ] No `any` types (use `unknown` if needed)
- [ ] Explicit return types for functions
- [ ] Use `const` assertions for readonly data
- [ ] Proper type imports (`import { type X }`)

### 11.2 React

- [ ] Use functional components only
- [ ] Proper dependency arrays in hooks
- [ ] Memoization for expensive operations
- [ ] Avoid inline object/array creation in JSX

### 11.3 Styling

- [ ] Use `cn()` for all className combinations
- [ ] Mobile-first responsive design
- [ ] Consistent spacing (4, 8, 12, 16, 20, 24 px)
- [ ] Use Tailwind theme colors

### 11.4 Performance

- [ ] Lazy load heavy components
- [ ] Optimize images
- [ ] Avoid unnecessary re-renders
- [ ] Use proper key props in lists

---

## 12. Benefits Summary

After completing this refactor, you will have:

✅ **Better Readability**
- Shorter, focused components
- Clear separation of concerns
- Consistent patterns throughout

✅ **Easier Maintenance**
- Centralized data in constants
- Reusable UI components
- Type-safe codebase

✅ **Faster Development**
- UI primitives for quick component building
- Custom hooks for common functionality
- Clear project structure

✅ **Better Performance**
- Optimized bundle size
- Lazy loading for heavy components
- Memoized expensive operations

✅ **Scalability**
- Easy to add new pages
- Simple to extend existing features
- Clear patterns for new developers

---

## 13. Breaking Changes to Avoid

During refactoring, DO NOT:

❌ Change public URLs or routes
❌ Modify blog post structure or slugs
❌ Change component APIs without updating all usages
❌ Remove functionality without replacement
❌ Change CSS classes that might be referenced elsewhere
❌ Modify environment-specific configuration

Always test after each change!

---

## 14. Quick Wins (Do These First!)

If you want immediate improvements with minimal risk:

1. **Install and use `cn()` utility** (30 minutes)
   - Immediate readability improvement
   - No functionality changes

2. **Fix gradient class names** (1 hour)
   - Find/replace operation
   - Fixes potential bugs

3. **Extract color maps to constants** (2 hours)
   - DRY up repeated code
   - Easy to maintain colors

4. **Create type definitions** (3 hours)
   - Better TypeScript support
   - Catches errors early

5. **Move data to constants** (4 hours)
   - Easier content updates
   - Cleaner components

Total time for quick wins: ~10 hours
Impact: Significant improvement in maintainability

---

## 15. Final Notes

This refactoring plan is comprehensive but flexible. You can:

- **Pick and choose** which phases to implement
- **Adjust the timeline** based on your availability
- **Skip sections** that don't apply to your needs
- **Iterate gradually** rather than doing everything at once

**Remember**: The goal is to improve the codebase, not to rewrite everything. Start small, test often, and commit frequently.

Good luck with your refactoring! 🚀

---

## Appendix: File Changes Summary

### Files to Create (47 new files)

**Utilities**
- `lib/utils/cn.ts`
- `lib/utils/animations.ts`
- `lib/utils/formatting.ts`

**Types**
- `lib/types/index.ts`
- `lib/types/common.ts`
- `lib/types/blog.ts`
- `lib/types/timeline.ts`
- `lib/types/components.ts`

**Constants**
- `lib/constants/navigation.ts`
- `lib/constants/colors.ts`
- `lib/constants/expertise.ts`
- `lib/constants/timeline.ts`
- `lib/constants/projects.ts`
- `lib/constants/site.ts`

**Hooks**
- `lib/hooks/useMousePosition.ts`
- `lib/hooks/useMounted.ts`
- `lib/hooks/useScrolled.ts`
- `lib/hooks/useHoverState.ts`

**UI Components**
- `components/ui/Card.tsx`
- `components/ui/Badge.tsx`
- `components/ui/Button.tsx`
- `components/ui/Section.tsx`
- `components/ui/Container.tsx`
- `components/ui/index.ts`

**Layout Components**
- `components/layout/MobileMenu.tsx`
- `components/layout/DesktopNav.tsx`
- `components/layout/index.ts`

**Home Components**
- `components/home/HeroBackground.tsx`
- `components/home/HeroContent.tsx`
- `components/home/CTASection.tsx`
- `components/home/index.ts`

**Blog Components**
- `components/blog/index.ts`

**About Components**
- `components/about/index.ts`

**Contact Components**
- `components/contact/index.ts`

**Timeline Components**
- `components/timeline/index.ts`

**Shared Components**
- `components/shared/index.ts`

**Environment**
- `.env.local`
- `.env.example`

### Files to Modify (20+ files)

- All component files (for import updates)
- `app/globals.css` (add component classes)
- `package.json` (add clsx, tailwind-merge)
- All page files (update imports)
- `lib/utils.ts` (rename to `lib/api/blog.ts`)

### Files to Move

- All components to their new directories (see structure)

---

**Document Version**: 1.0
**Last Updated**: November 9, 2025
**Author**: Refactoring Plan for Mahdy Mahareb Portfolio
