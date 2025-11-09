"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";

interface HeaderProps {
  showBackButton?: boolean;
}

export default function Header({ showBackButton = false }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  // Handle scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled 
            ? "backdrop-blur-xl bg-white/90 border-stone-200 shadow-lg" 
            : "backdrop-blur-md bg-white/80 border-stone-200/50 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Back button or Logo */}
            <div className="flex items-center gap-4">
              {shouldShowBack && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-3 py-2 text-stone-600 hover:text-terracotta hover:bg-amber-50 rounded-lg transition-all duration-300"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">Back</span>
                </button>
              )}
              {!shouldShowBack && (
                <Link 
                  href="/" 
                  className="group flex items-center gap-2"
                >
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles className="w-6 h-6 text-terracotta" />
                  </motion.div>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-terracotta via-primary to-amber-600 group-hover:scale-105 transition-transform duration-300">
                    Mahdy
                  </span>
                </Link>
              )}
            </div>

            {/* Desktop Navigation */}
            <DesktopNav pathname={pathname} isActive={isActive} />

            {/* Mobile Menu Button - Creative Morph Animation */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-12 h-12 rounded-xl bg-gradient-to-br from-terracotta/10 to-amber-100 hover:from-terracotta/20 hover:to-amber-200 flex items-center justify-center transition-all duration-300"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5 flex flex-col justify-center items-center">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                  className="absolute w-6 h-0.5 bg-terracotta rounded-full transition-all"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                  className="absolute w-6 h-0.5 bg-primary rounded-full"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                  className="absolute w-6 h-0.5 bg-amber-600 rounded-full transition-all"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
        isActive={isActive}
      />
    </>
  );
}
