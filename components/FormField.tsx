"use client";

import { motion, AnimatePresence } from "motion/react";
import { AlertCircle } from "lucide-react";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "textarea";
  value: string;
  error?: string;
  placeholder: string;
  disabled?: boolean;
  rows?: number;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function FormField({
  id,
  name,
  label,
  type = "text",
  value,
  error,
  placeholder,
  disabled = false,
  rows,
  isFocused,
  onFocus,
  onBlur,
  onChange,
}: FormFieldProps) {
  const getInputClasses = () => {
    const baseClasses =
      "w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 focus:outline-none";

    if (error) {
      return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200`;
    }

    if (isFocused) {
      return `${baseClasses} border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-md`;
    }

    return `${baseClasses} border-stone-200 hover:border-stone-300 focus:border-primary focus:ring-2 focus:ring-primary/20`;
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-stone-700 mb-2"
      >
        {label}
      </label>
      <motion.div
        animate={{
          scale: isFocused ? 1.01 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {type === "textarea" ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            rows={rows}
            className={getInputClasses()}
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : (
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={getInputClasses()}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-xs mt-1 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
