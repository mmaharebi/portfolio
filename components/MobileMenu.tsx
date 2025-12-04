"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { NAV_ITEMS } from "@/lib/constants/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string | null;
  isActive: (path: string) => boolean;
}

export default function MobileMenu({ isOpen, onClose, pathname, isActive }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
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
            className="absolute inset-0 bg-linear-to-br from-amber-50/95 dark:from-[#0A0908]/98 via-orange-50/95 dark:via-[#0E0C0B]/98 to-terracotta/20 dark:to-primary/15"
            onClick={onClose}
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
              className="absolute top-20 right-10 w-64 h-64 bg-linear-to-br from-terracotta/30 dark:from-primary/40 to-primary/20 dark:to-accent/25 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -90, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              className="absolute bottom-20 left-10 w-80 h-80 bg-linear-to-tr from-amber-400/20 dark:from-secondary/35 to-orange-300/30 dark:to-primary/30 rounded-full blur-3xl"
            />
          </div>

          {/* Menu Content */}
          <div className="relative h-full flex flex-col items-center justify-center px-6">
            <nav className="space-y-4 w-full max-w-sm">
              {NAV_ITEMS.map((item, index) => {
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
                            ? "bg-white/90 dark:bg-[#1A1614]/95 border-terracotta dark:border-primary shadow-2xl shadow-terracotta/20 dark:shadow-primary/30"
                            : "bg-white/60 dark:bg-[#0A0908]/70 border-white/50 dark:border-[#3D3530] hover:bg-white/80 dark:hover:bg-[#1A1614]/80 hover:border-terracotta/50 dark:hover:border-primary/50 shadow-lg"
                        }`}
                      >
                        {/* Glow effect on active */}
                        {active && (
                          <motion.div
                            className="absolute -inset-1 bg-linear-to-br from-terracotta via-primary to-amber-600 rounded-2xl blur opacity-30"
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
                                ? "bg-linear-to-br from-terracotta to-primary dark:from-primary dark:to-accent"
                                : "bg-linear-to-br from-amber-100 dark:from-[#1A1614] to-orange-100 dark:to-[#252220] group-hover:from-terracotta/20 dark:group-hover:from-primary/30 group-hover:to-primary/20 dark:group-hover:to-accent/25"
                            }`}
                          >
                            <Icon className={`w-7 h-7 ${active ? "text-white dark:text-[#0A0908]" : "text-terracotta dark:text-primary"}`} />
                          </motion.div>

                          {/* Text */}
                          <div className="flex-1">
                            <h3 className={`text-2xl font-bold ${
                              active 
                                ? "bg-clip-text text-transparent bg-linear-[135deg] from-terracotta from-10% via-primary via-50% to-amber-600 to-90% dark:from-primary dark:via-secondary dark:to-accent" 
                                : "text-stone-800 dark:text-stone-200"
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
                                ? "bg-terracotta/20 dark:bg-primary/30 text-terracotta dark:text-primary" 
                                : "bg-stone-100 dark:bg-[#1A1614] text-stone-400 dark:text-stone-500 group-hover:bg-terracotta/10 dark:group-hover:bg-primary/20 group-hover:text-terracotta dark:group-hover:text-primary"
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
              <p className="text-stone-600 dark:text-stone-400 font-medium">Let's create something amazing</p>
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
  );
}
