"use client";

import { motion } from "motion/react";
import { Mail, Github, Linkedin, MessageCircle, Send, Heart } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ContactPage() {
  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "your.email@example.com",
      href: "mailto:your.email@example.com",
      description: "Send me an email anytime"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/yourusername",
      href: "https://github.com/yourusername",
      description: "Check out my projects and code"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/yourprofile",
      href: "https://linkedin.com/in/yourprofile",
      description: "Let's connect professionally"
    },
  ];

  const interests = [
    "Communication systems and signal processing research",
    "Electromagnetic systems and RF engineering",
    "Mathematical modeling and computational physics",
    "Technical writing and educational content creation",
    "Open source collaboration and software development",
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-cream-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <motion.div
          className="absolute top-10 md:top-20 -right-20 md:right-10 w-48 md:w-64 h-48 md:h-64 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="p-4 md:p-5 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-2xl backdrop-blur-sm">
                <Send className="w-12 md:w-14 h-12 md:h-14 text-terracotta" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6">
              <span className="text-terracotta">
                Get in Touch
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-stone-700 leading-relaxed max-w-3xl mx-auto">
              Have a question, project idea, or just want to chat about ECE topics?
              I'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Links */}
      <section className="py-16 md:py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-4">
              <MessageCircle className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-semibold text-terracotta">Connect</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800 mb-3 md:mb-4">
              Ways to Reach Me
            </h2>
            <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto">
              Choose your preferred platform to get in touch
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {contactLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="group relative p-5 md:p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-stone-200 hover:border-terracotta/50 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-terracotta/0 to-amber-100/0 group-hover:from-terracotta/5 group-hover:to-amber-100/10 rounded-2xl transition-all duration-300" />
                  
                  <div className="relative text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-xl group-hover:from-terracotta/30 group-hover:to-amber-200/30 transition-all duration-300">
                        <Icon className="w-6 h-6 text-terracotta" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-stone-800 mb-2">{link.label}</h3>
                    <p className="text-sm text-stone-600 mb-2">{link.description}</p>
                    <p className="text-xs text-stone-500 truncate">{link.value}</p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Topics of Interest */}
      <section className="py-16 md:py-20 px-6 bg-linear-to-b from-transparent to-amber-50/50">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm border-2 border-stone-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-linear-to-br from-terracotta/20 to-amber-200/20 rounded-xl shrink-0">
                <Heart className="w-6 h-6 text-terracotta" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-stone-800 mb-2">
                  Topics I'm Interested In
                </h2>
                <p className="text-stone-600 text-sm md:text-base">
                  I'm particularly excited to discuss:
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              {interests.map((interest, index) => (
                <motion.li
                  key={interest}
                  variants={itemVariants}
                  className="flex items-start gap-3 text-stone-700 text-sm md:text-base"
                >
                  <span className="w-1.5 h-1.5 bg-terracotta rounded-full mt-2 shrink-0" />
                  <span>{interest}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* Note */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-terracotta/5 border-l-4 border-terracotta rounded-r-xl">
            <span className="text-2xl shrink-0">💡</span>
            <p className="text-stone-700 text-sm md:text-base leading-relaxed">
              <strong>Note:</strong> Please update the contact information above with your actual details before deploying this site.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
