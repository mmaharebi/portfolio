"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import { Mail, Github, Linkedin, MapPin, Clock, Sparkles, Send } from "lucide-react";
import { useState, useEffect } from "react";
import ContactForm from "@/components/ContactForm";
import ContactBackground from "@/components/backgrounds/ContactBackground";

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
      // Warm terracotta (inspired by Gmail red, adapted to warm palette)
      bgColor: "bg-[#D97757]",
      glowColor: "from-[#D97757]/40 to-[#F4A261]/20",
      iconColor: "text-white",
      dotColor: "bg-[#F4A261]",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@mmaharebi",
      href: "https://github.com/mmaharebi",
      description: "Check out my repositories",
      // Warm brown (inspired by GitHub dark, warmed up)
      bgColor: "bg-[#8B7355]",
      glowColor: "from-[#8B7355]/40 to-[#C8B5A0]/20",
      iconColor: "text-white",
      dotColor: "bg-[#C8B5A0]",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/mmaharebi",
      href: "https://linkedin.com/in/mmaharebi",
      description: "Let's connect professionally",
      // Warm amber-brown (inspired by LinkedIn blue, shifted to warm palette)
      bgColor: "bg-[#A86843]",
      glowColor: "from-[#A86843]/40 to-[#E8B17A]/20",
      iconColor: "text-white",
      dotColor: "bg-[#E8B17A]",
    },
  ];

  return (
    <>
      <ContactBackground />
      <div className="min-h-screen relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 px-6 z-10">
          <div className="max-w-6xl mx-auto">
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
              <span className="bg-clip-text text-transparent bg-linear-[135deg] from-terracotta from-10% via-primary via-50% to-amber-600 to-90%">
                Get In Touch
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4 sm:px-0">
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
                  className="group relative flex flex-col items-center justify-center text-center"
                >
                  <div className="relative p-6 md:p-8 flex flex-col items-center justify-center text-center">
                    {/* Artistic Icon */}
                    <motion.div
                      className="mb-6 relative"
                      animate={{
                        rotate: isHovered ? [0, -5, 5, 0] : 0,
                        y: isHovered ? -8 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Subtle warm glow matching site colors */}
                      <motion.div
                        className={`absolute inset-0 -m-6 rounded-full ${link.glowColor} blur-2xl`}
                        animate={isHovered ? {
                          scale: [1, 1.4, 1],
                          opacity: [0.3, 0.5, 0.3],
                        } : {
                          opacity: 0
                        }}
                        transition={{
                          duration: 2,
                          repeat: isHovered ? Infinity : 0,
                          ease: "easeInOut",
                        }}
                      />
                      
                      {/* Gradient circle with icon */}
                      <motion.div
                        className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full ${link.bgColor} shadow-lg flex items-center justify-center`}
                        animate={isHovered ? {
                          scale: 1.1,
                        } : {
                          scale: 1
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <Icon className={`w-9 h-9 md:w-11 md:h-11 ${link.iconColor}`} />
                      </motion.div>

                      {/* Orbiting dots */}
                      {isHovered && (
                        <>
                          {[0, 120, 240].map((angle, i) => (
                            <motion.div
                              key={i}
                              className={`absolute w-2 h-2 rounded-full ${link.dotColor}`}
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: [0, 1, 0],
                                rotate: [angle, angle + 360],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                              style={{
                                top: '50%',
                                left: '50%',
                                transformOrigin: '0 0',
                                transform: `rotate(${angle}deg) translateX(50px)`,
                              }}
                            />
                          ))}
                        </>
                      )}
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl md:text-2xl font-bold text-stone-800 mb-2">{link.label}</h3>
                    <p className="text-sm md:text-base text-stone-600 mb-3">{link.description}</p>
                    <p className="text-xs md:text-sm font-mono text-stone-500 break-all">{link.value}</p>

                    {/* Hover indicator */}
                    <motion.div
                      className="absolute bottom-4 opacity-0 group-hover:opacity-100"
                      initial={{ y: 10 }}
                      animate={{ y: isHovered ? 0 : 10 }}
                    >
                      <div className={`px-3 py-1 rounded-full ${link.bgColor} text-white text-xs font-semibold`}>
                        Click to connect
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
    </>
  );
}
