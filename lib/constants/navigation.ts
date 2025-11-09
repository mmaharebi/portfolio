import { Home, BookOpen, User, Mail, type LucideIcon } from "lucide-react";

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
