"use client";

import { motion } from "motion/react";
import { useState, useRef } from "react";
import { Sparkles } from "lucide-react";
import FormField from "./FormField";
import FormStatus from "./FormStatus";

// Cloudflare Worker endpoint for contact form submissions
const CONTACT_API_URL =
  "https://portfolio-contact-worker.mmaharebi-cloudflare.workers.dev/contact";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string; // Honeypot field for bot detection
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
    company: "", // Honeypot - must remain empty
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
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
    setErrors({});
    setErrorMessage("");

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Handle different response scenarios
      if (response.ok && data.ok) {
        // Success - message sent
        setStatus("success");
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
            company: "",
          });
          setStatus("idle");
        }, 3000);
      } else {
        // Handle various error types
        if (response.status === 400 && data.errors) {
          // Validation errors from server - map to form fields
          setErrors(data.errors);
          setErrorMessage("Please check the highlighted fields.");
        } else if (response.status === 429) {
          // Rate limit exceeded
          setErrorMessage("Too many requests. Please wait a few minutes before trying again.");
        } else if (response.status === 403) {
          // Origin error
          setErrorMessage("Request forbidden. Please refresh the page and try again.");
        } else {
          // Generic error message
          setErrorMessage(data.message || "Something went wrong. Please try again later.");
        }
        
        setStatus("error");
        
        // Auto-clear error status after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      // Network error or other unexpected issue
      console.error("Contact form submission error:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
      
      // Auto-clear error status after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
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

  const isDisabled = status === "loading" || status === "success";

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
      <div
        className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative bg-white/80 dark:bg-[#1A1614]/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-stone-200 dark:border-[#3D3530] shadow-xl dark:shadow-[0_8px_40px_rgba(255,159,102,0.2)]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 dark:bg-[#1A1614]/90 rounded-full mb-4 border-2 border-terracotta/20 dark:border-primary/40 dark:shadow-[0_0_20px_rgba(255,159,102,0.15)]">
            <Sparkles className="w-4 h-4 text-terracotta dark:text-primary dark:drop-shadow-[0_0_8px_rgba(255,159,102,0.6)]" />
            <span className="text-sm font-semibold text-terracotta dark:text-primary">
              Send a Message
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-stone-800 dark:text-white mb-2 dark:drop-shadow-[0_0_20px_rgba(255,159,102,0.25)]">
            Let&apos;s Start a Conversation
          </h3>
          <p className="text-stone-600 dark:text-stone-300 font-medium">
            Fill out the form below and I&apos;ll get back to you soon
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <FormField
            id="name"
            name="name"
            label="Name"
            type="text"
            value={formData.name}
            error={errors.name}
            placeholder="John Doe"
            disabled={isDisabled}
            isFocused={focusedField === "name"}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            onChange={handleChange}
          />

          <FormField
            id="email"
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            error={errors.email}
            placeholder="your.email@example.com"
            disabled={isDisabled}
            isFocused={focusedField === "email"}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            onChange={handleChange}
          />

          <FormField
            id="subject"
            name="subject"
            label="Subject"
            type="text"
            value={formData.subject}
            error={errors.subject}
            placeholder="Project Collaboration"
            disabled={isDisabled}
            isFocused={focusedField === "subject"}
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField(null)}
            onChange={handleChange}
          />

          <FormField
            id="message"
            name="message"
            label="Message"
            type="textarea"
            value={formData.message}
            error={errors.message}
            placeholder="Tell me about your project or question..."
            disabled={isDisabled}
            rows={6}
            isFocused={focusedField === "message"}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            onChange={handleChange}
          />

          {/* Honeypot field - hidden from users, catches bots */}
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            aria-hidden="true"
            tabIndex={-1}
            autoComplete="off"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              opacity: 0,
            }}
          />

          <FormStatus status={status} disabled={isDisabled} errorMessage={errorMessage} />
        </form>
      </div>
    </motion.div>
  );
}
