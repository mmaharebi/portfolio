"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { NAV_ITEMS } from "@/lib/constants/navigation";

interface DesktopNavProps {
  pathname: string | null;
  isActive: (path: string) => boolean;
}

export default function DesktopNav({ pathname, isActive }: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center gap-2 relative">
      {NAV_ITEMS.map((item) => {
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
                className="absolute inset-0 bg-linear-to-br from-terracotta via-primary/90 to-amber-600 rounded-xl shadow-lg"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
