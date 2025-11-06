import './prose.css';
import 'katex/dist/katex.min.css'; // ⭐ CRITICAL: KaTeX CSS
import AnimatedWrapper from '@/components/AnimatedWrapper';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatedWrapper>
      {children}
    </AnimatedWrapper>
  );
}
