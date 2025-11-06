"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  showBackButton?: boolean;
}

export default function Header({ showBackButton = false }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Automatically show back button on blog post pages
  const shouldShowBack = showBackButton || pathname?.startsWith("/blog/") && pathname !== "/blog";

  const handleBack = () => {
    router.back();
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-surface/80 border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Back button or Logo */}
          <div className="flex items-center gap-4">
            {shouldShowBack && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-3 py-2 text-foreground-secondary hover:text-primary hover:bg-surface-hover rounded-lg transition-all duration-300"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Back</span>
              </button>
            )}
            {!shouldShowBack && (
              <Link 
                href="/" 
                className="text-xl font-bold warm-gradient-text hover:scale-105 transition-transform duration-300"
              >
                Portfolio
              </Link>
            )}
          </div>

          {/* Right side - Navigation */}
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive("/") && pathname === "/"
                  ? "bg-primary text-white shadow-lg"
                  : "text-foreground-secondary hover:bg-surface-hover hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive("/blog")
                  ? "bg-primary text-white shadow-lg"
                  : "text-foreground-secondary hover:bg-surface-hover hover:text-primary"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive("/about")
                  ? "bg-primary text-white shadow-lg"
                  : "text-foreground-secondary hover:bg-surface-hover hover:text-primary"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive("/contact")
                  ? "bg-primary text-white shadow-lg"
                  : "text-foreground-secondary hover:bg-surface-hover hover:text-primary"
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
