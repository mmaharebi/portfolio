"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus("loading");

    // Simulate API call - replace with actual implementation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For demo purposes, always succeed
    // In production, replace with actual form submission logic
    setStatus("success");

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setStatus("idle");
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = (fieldName: keyof FormData) => {
    const baseClasses =
      "w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none";
    const isFocused = focusedField === fieldName;
    const hasError = errors[fieldName];

    if (hasError) {
      return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200`;
    }

    if (isFocused) {
      return `${baseClasses} border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-md`;
    }

    return `${baseClasses} border-stone-200 hover:border-stone-300 focus:border-primary focus:ring-2 focus:ring-primary/20`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Decorative background elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-stone-200 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span className="text-sm font-semibold text-terracotta">Send a Message</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2">
            Let's Start a Conversation
          </h3>
          <p className="text-stone-600">
            Fill out the form below and I'll get back to you soon
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-stone-700 mb-2"
            >
              Name
            </label>
            <motion.div
              animate={{
                scale: focusedField === "name" ? 1.01 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className={inputClasses("name")}
                placeholder="John Doe"
                disabled={status === "loading" || status === "success"}
              />
            </motion.div>
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-stone-700 mb-2"
            >
              Email Address
            </label>
            <motion.div
              animate={{
                scale: focusedField === "email" ? 1.01 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={inputClasses("email")}
                placeholder="your.email@example.com"
                disabled={status === "loading" || status === "success"}
              />
            </motion.div>
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-semibold text-stone-700 mb-2"
            >
              Subject
            </label>
            <motion.div
              animate={{
                scale: focusedField === "subject" ? 1.01 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                className={inputClasses("subject")}
                placeholder="Project Collaboration"
                disabled={status === "loading" || status === "success"}
              />
            </motion.div>
            <AnimatePresence>
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.subject}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-stone-700 mb-2"
            >
              Message
            </label>
            <motion.div
              animate={{
                scale: focusedField === "message" ? 1.01 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                rows={6}
                className={inputClasses("message")}
                placeholder="Tell me about your project or question..."
                disabled={status === "loading" || status === "success"}
              />
            </motion.div>
            <AnimatePresence>
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={status === "loading" || status === "success"}
            whileHover={status === "idle" ? { scale: 1.02 } : {}}
            whileTap={status === "idle" ? { scale: 0.98 } : {}}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
              status === "success"
                ? "bg-green-500 hover:bg-green-600"
                : status === "loading"
                ? "bg-primary/70 cursor-not-allowed"
                : "bg-linear-to-r from-primary to-amber-600 hover:shadow-lg hover:shadow-primary/30"
            }`}
          >
            <AnimatePresence mode="wait">
              {status === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </motion.div>
              )}
              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Message Sent!</span>
                </motion.div>
              )}
              {status === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>Try Again</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </form>

        {/* Success Message */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl"
            >
              <p className="text-green-700 text-sm text-center font-medium">
                ✨ Thank you for reaching out! I'll get back to you as soon as possible.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
