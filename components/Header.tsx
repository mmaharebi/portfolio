"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Home, BookOpen, User, Mail, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

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

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/about", label: "About", icon: User },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

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
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-terracotta via-primary to-amber-600 group-hover:scale-105 transition-transform duration-300">
                    Mahdy
                  </span>
                </Link>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2 relative">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href) && (item.href === "/" ? pathname === "/" : true);
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-4 py-2 rounded-xl font-medium transition-colors duration-300 flex items-center gap-2 z-10 ${
                        active
                          ? "text-white"
                          : "text-stone-600 hover:text-terracotta"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </motion.div>
                    {active && (
                      <motion.div
                        layoutId="activeBackground"
                        className="absolute inset-0 bg-linear-to-r from-terracotta to-primary rounded-xl shadow-lg"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button - Creative Morph Animation */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-12 h-12 rounded-xl bg-linear-to-br from-terracotta/10 to-amber-100 hover:from-terracotta/20 hover:to-amber-200 flex items-center justify-center transition-all duration-300"
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

      {/* Mobile Menu - Full Screen Creative Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop with blur */}
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(20px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-linear-to-br from-amber-50/95 via-orange-50/95 to-terracotta/20"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Decorative animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-20 right-10 w-64 h-64 bg-linear-to-br from-terracotta/30 to-primary/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -90, 0],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute bottom-20 left-10 w-80 h-80 bg-linear-to-tr from-amber-400/20 to-orange-300/30 rounded-full blur-3xl"
              />
            </div>

            {/* Menu Content */}
            <div className="relative h-full flex flex-col items-center justify-center px-6">
              <nav className="space-y-4 w-full max-w-sm">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.href) && (item.href === "/" ? pathname === "/" : true);

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -50, rotateY: -90 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      exit={{ opacity: 0, x: 50, rotateY: 90 }}
                      transition={{ 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                    >
                      <Link
                        href={item.href}
                        className="group block"
                      >
                        <motion.div
                          whileHover={{ scale: 1.05, x: 10 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative p-6 rounded-2xl backdrop-blur-xl border-2 transition-all duration-300 ${
                            active
                              ? "bg-white/90 border-terracotta shadow-2xl shadow-terracotta/20"
                              : "bg-white/60 border-white/50 hover:bg-white/80 hover:border-terracotta/50 shadow-lg"
                          }`}
                        >
                          {/* Glow effect on active */}
                          {active && (
                            <motion.div
                              className="absolute -inset-1 bg-linear-to-r from-terracotta via-primary to-amber-600 rounded-2xl blur opacity-30"
                              animate={{
                                opacity: [0.3, 0.5, 0.3],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                            />
                          )}

                          <div className="relative flex items-center gap-4">
                            {/* Icon with gradient background */}
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                              className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                                active
                                  ? "bg-linear-to-br from-terracotta to-primary"
                                  : "bg-linear-to-br from-amber-100 to-orange-100 group-hover:from-terracotta/20 group-hover:to-primary/20"
                              }`}
                            >
                              <Icon className={`w-7 h-7 ${active ? "text-white" : "text-terracotta"}`} />
                            </motion.div>

                            {/* Text */}
                            <div className="flex-1">
                              <h3 className={`text-2xl font-bold ${
                                active 
                                  ? "bg-clip-text text-transparent bg-linear-to-r from-terracotta via-primary to-amber-600" 
                                  : "text-stone-800"
                              }`}>
                                {item.label}
                              </h3>
                            </div>

                            {/* Arrow indicator */}
                            <motion.div
                              animate={active ? { x: [0, 5, 0] } : {}}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                active 
                                  ? "bg-terracotta/20 text-terracotta" 
                                  : "bg-stone-100 text-stone-400 group-hover:bg-terracotta/10 group-hover:text-terracotta"
                              }`}>
                                →
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
                className="mt-12 text-center"
              >
                <p className="text-stone-600 font-medium">Let's create something amazing</p>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mt-2"
                >
                  ✨
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
