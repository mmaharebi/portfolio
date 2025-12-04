"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border dark:border-[#3D3530] bg-surface dark:bg-[#0A0908] mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-stone-100">
              Mahdy Mahareb (Mohammadmahdi Maharebi)
            </h3>
            <p className="text-sm text-foreground-secondary dark:text-stone-300 leading-relaxed">
              Electrical Communication Engineering student at the University of
              Kassel. Exploring communication systems, signal processing, and
              software design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-stone-100">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-foreground-secondary dark:text-stone-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-foreground-secondary dark:text-stone-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-foreground-secondary dark:text-stone-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-foreground-secondary dark:text-stone-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-stone-100">
              Connect
            </h3>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/mmaharebi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface-hover dark:bg-[#1A1614] border border-border dark:border-[#3D3530] flex items-center justify-center text-foreground-secondary dark:text-stone-300 hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary transition-all dark:hover:shadow-[0_0_15px_rgba(255,159,102,0.3)]"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/mmaharebi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface-hover dark:bg-[#1A1614] border border-border dark:border-[#3D3530] flex items-center justify-center text-foreground-secondary dark:text-stone-300 hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary transition-all dark:hover:shadow-[0_0_15px_rgba(255,159,102,0.3)]"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:contact@mahdymahareb.de"
                className="w-10 h-10 rounded-full bg-surface-hover dark:bg-[#1A1614] border border-border dark:border-[#3D3530] flex items-center justify-center text-foreground-secondary dark:text-stone-300 hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary transition-all dark:hover:shadow-[0_0_15px_rgba(255,159,102,0.3)]"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
            <p className="text-xs text-foreground-muted dark:text-stone-400 mt-4">
              University of Kassel, Germany
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border dark:border-[#3D3530]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground-muted dark:text-stone-400 flex items-center gap-1">
              © {currentYear} Mahdy Mahareb. Built with
              <Heart className="w-4 h-4 text-red-500 dark:text-red-400 inline-block" />
              using Next.js
            </p>
            <p className="text-xs text-foreground-muted dark:text-stone-400">
              Showcasing projects & technical writings
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
