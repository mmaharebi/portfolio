"use client";

import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type SubmitStatus = "idle" | "loading" | "success" | "error";

interface FormStatusProps {
  status: SubmitStatus;
  disabled: boolean;
  errorMessage?: string;
}

export default function FormStatus({ status, disabled, errorMessage }: FormStatusProps) {
  return (
    <>
      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={disabled}
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
              ✨ Thank you for reaching out! I&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl"
          >
            <p className="text-red-700 text-sm text-center font-medium">
              {errorMessage || "Something went wrong. Please check your input and try again."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
