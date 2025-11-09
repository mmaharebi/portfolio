"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { Mail, Github, Linkedin, MapPin, Clock, Sparkles, ArrowLeft, Send } from "lucide-react";
import { useState, useEffect } from "react";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

export default function ContactPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@mahdymahareb.de",
      href: "mailto:contact@mahdymahareb.de",
      description: "Drop me a line anytime",
      color: "from-primary to-amber-600",
      hoverColor: "group-hover:text-primary",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@mmaharebi",
      href: "https://github.com/mmaharebi",
      description: "Check out my repositories",
      color: "from-stone-700 to-stone-900",
      hoverColor: "group-hover:text-stone-800",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/mmaharebi",
      href: "https://linkedin.com/in/mmaharebi",
      description: "Let's connect professionally",
      color: "from-blue-600 to-blue-800",
      hoverColor: "group-hover:text-blue-700",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-orange-50 to-stone-50 relative overflow-hidden">
      {/* Decorative background - smooth gradient orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Top right warm glow */}
        <div className="absolute -top-20 -right-20 md:top-10 md:right-20 w-96 h-96 bg-linear-to-br from-terracotta/30 to-amber-200/20 rounded-full blur-3xl opacity-60" />
        
        {/* Top left soft accent */}
        <div className="absolute top-40 -left-32 md:top-60 md:left-0 w-80 h-80 bg-linear-to-tr from-amber-300/25 to-orange-200/15 rounded-full blur-3xl opacity-50" />
        
        {/* Middle right floating orb */}
        <motion.div
          className="absolute top-1/3 -right-24 md:right-10 w-72 h-72 bg-linear-to-bl from-primary/20 to-amber-400/15 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Bottom left large glow */}
        <div className="absolute bottom-20 -left-40 md:bottom-40 md:left-10 w-[500px] h-[500px] bg-linear-to-tr from-terracotta/25 to-amber-300/20 rounded-full blur-3xl opacity-50" />
        
        {/* Bottom right subtle accent */}
        <motion.div
          className="absolute bottom-10 right-0 md:bottom-20 md:right-40 w-64 h-64 bg-linear-to-tl from-secondary/20 to-orange-200/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {/* Center subtle depth layer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-linear-to-r from-amber-100/10 via-orange-100/15 to-stone-100/10 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Floating icon */}
            <motion.div
              className="flex justify-center mb-8"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <div className="relative p-5 bg-white/40 backdrop-blur-md rounded-2xl border-2 border-white/60 shadow-xl">
                  <Send className="w-14 h-14 text-terracotta" />
                </div>
              </div>
            </motion.div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-semibold text-terracotta">Let's Connect</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-terracotta via-primary to-amber-600">
                Get in Touch
              </span>
            </h1>

            <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Have a question, project idea, or just want to chat about engineering and tech?
              I'm always open to interesting conversations!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="relative px-6 pb-16 z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              Quick Connect
            </h2>
            <p className="text-stone-600">Choose your preferred platform</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactLinks.map((link, index) => {
              const Icon = link.icon;
              const isHovered = hoveredCard === index;

              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  {/* Card glow effect */}
                  <motion.div
                    className={`absolute -inset-0.5 bg-linear-to-r ${link.color} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`}
                    animate={{
                      opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isHovered ? Infinity : 0,
                    }}
                  />

                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-stone-200 group-hover:border-white shadow-lg group-hover:shadow-2xl transition-all duration-300 aspect-square flex flex-col items-center justify-center text-center">
                    {/* Icon */}
                    <motion.div
                      className="mb-4"
                      animate={{
                        rotate: isHovered ? [0, -10, 10, 0] : 0,
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${link.color} p-0.5`}>
                        <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                          <Icon className={`w-8 h-8 text-stone-700 transition-colors ${link.hoverColor}`} />
                        </div>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-stone-800 mb-2">{link.label}</h3>
                    <p className="text-sm text-stone-600 mb-3">{link.description}</p>
                    <p className="text-xs font-mono text-stone-500 break-all px-2">{link.value}</p>

                    {/* Hover arrow */}
                    <motion.div
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                      initial={{ x: -10 }}
                      animate={{ x: isHovered ? 0 : -10 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
                        <span className="text-sm">→</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative px-6 pb-16 z-10">
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </section>

      {/* Additional Info */}
      <section className="relative px-6 pb-24 z-10">
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-stone-200 shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-800 mb-1">Location</h3>
                  <p className="text-stone-600 text-sm">Kassel, Germany</p>
                  <p className="text-stone-500 text-xs mt-1">CET Timezone (UTC+1)</p>
                </div>
              </div>
            </motion.div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-stone-200 shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-xl">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-800 mb-1">Response Time</h3>
                  <p className="text-stone-600 text-sm">Usually within 24-48 hours</p>
                  <p className="text-stone-500 text-xs mt-1">Faster for urgent matters</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
