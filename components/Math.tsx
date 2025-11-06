'use client';

import { useEffect, useRef } from 'react';

interface MathProps {
  children: string;
  display?: boolean;
}

/**
 * Client-side KaTeX rendering for math inside React components
 * 
 * Use this when you need math in interactive/client components
 * For MDX content, use inline/display math ($...$) instead
 * 
 * @example
 * ```tsx
 * <Math>{'E = mc^2'}</Math>
 * <Math display>{'\\int_0^\\infty f(x)dx'}</Math>
 * ```
 */
export default function Math({ children, display = false }: MathProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      import('katex').then((katex) => {
        katex.default.render(children, containerRef.current!, {
          displayMode: display,
          throwOnError: false,
          strict: false,
        });
      });
    }
  }, [children, display]);

  return display ? (
    <div ref={containerRef as any} className="my-4 py-2" />
  ) : (
    <span
      style={{ display: "inline-block" }}
      ref={containerRef}
      className="inline-block"
    />
  );
}
