"use client";

import { motion } from "motion/react";
import { Github, ExternalLink, Sparkles } from "lucide-react";
import type { Project } from "./ProjectShowcase";
import { CATEGORY_COLORS } from "@/lib/constants/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  isFeatured?: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function ProjectCard({
  project,
  index,
  isHovered,
  isFeatured = false,
  onHoverStart,
  onHoverEnd,
}: ProjectCardProps) {
  const colors = CATEGORY_COLORS[project.category];
  const Icon = colors.icon;

  if (isFeatured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        whileHover={{ y: -8 }}
        className={`group relative bg-white/90 dark:bg-[#1A1614]/95 backdrop-blur-sm rounded-3xl p-8 border-2 ${colors.border} dark:border-primary/40 shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_60px_rgba(255,159,102,0.15)] hover:shadow-2xl dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.4),0_0_80px_rgba(255,159,102,0.25)] transition-all duration-300 overflow-hidden`}
      >
        {/* Decorative corner */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-bl ${colors.bg} rounded-bl-full opacity-50`} />

        {/* Hover glow effect */}
        <motion.div
          className={`absolute -inset-1 bg-linear-to-r ${colors.bg} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          style={{ zIndex: -1 }}
        />

        <div className="relative z-10">
          {/* Category Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r ${colors.bg} ${colors.text} rounded-full mb-4 text-xs font-bold border ${colors.border}`}>
            <Icon className="w-3.5 h-3.5" />
            {project.category}
          </div>

          {/* Year Badge */}
          <div className="absolute top-6 right-6">
            <div className="px-3 py-1 bg-stone-100 dark:bg-[#252220] text-stone-600 dark:text-secondary rounded-full text-xs font-semibold dark:border dark:border-primary/20">
              {project.year}
            </div>
          </div>

          {/* Title */}
          <h4 className="text-xl md:text-2xl font-bold text-stone-800 dark:text-white mb-3 dark:drop-shadow-[0_0_15px_rgba(255,159,102,0.2)]">
            {project.title}
          </h4>

          {/* Description */}
          <p className="text-stone-600 dark:text-stone-300 text-sm md:text-base mb-4 leading-relaxed font-medium">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-stone-100 dark:bg-[#252220] text-stone-700 dark:text-stone-300 text-xs font-semibold rounded-full dark:border dark:border-stone-600/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className={`px-2.5 py-1 ${colors.text} dark:text-primary text-xs font-semibold rounded-full border ${colors.border} dark:border-primary/30 bg-white/50 dark:bg-primary/10 dark:shadow-[0_0_8px_rgba(255,159,102,0.15)]`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          {(project.githubUrl || project.demoUrl) && (
            <div className="flex gap-3 pt-4 border-t border-stone-200 dark:border-primary/20 dark:shadow-[0_-1px_0_rgba(255,159,102,0.1)]">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 ${colors.text} hover:underline text-sm font-semibold`}
                  whileHover={{ x: 5 }}
                >
                  <Github className="w-4 h-4" />
                  <span>View Code</span>
                </motion.a>
              )}
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 ${colors.text} hover:underline text-sm font-semibold`}
                  whileHover={{ x: 5 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Demo</span>
                </motion.a>
              )}
            </div>
          )}

          {/* Animated particles on hover */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-1 h-1 ${colors.text} rounded-full opacity-60`}
                  initial={{
                    x: "50%",
                    y: "50%",
                    scale: 0,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  // Regular project card
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`group relative bg-white/80 dark:bg-[#1A1614]/90 backdrop-blur-sm rounded-2xl p-6 border-2 ${colors.border} dark:border-primary/30 shadow-lg dark:shadow-[0_4px_24px_rgba(0,0,0,0.2),0_0_40px_rgba(255,159,102,0.1)] hover:shadow-2xl dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_60px_rgba(255,159,102,0.2)] transition-all duration-300 overflow-hidden`}
    >
      {/* Hover gradient overlay */}
      <motion.div
        className={`absolute inset-0 bg-linear-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div className="relative z-10">
        {/* Category & Year */}
        <div className="flex items-center justify-between mb-3">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 bg-white/80 dark:bg-[#252220] ${colors.text} dark:text-primary rounded-full text-xs font-bold dark:border dark:border-primary/30`}>
            <Icon className="w-3 h-3" />
            {project.category}
          </div>
          <span className="text-xs font-semibold text-stone-500 dark:text-secondary">{project.year}</span>
        </div>

        {/* Sparkle animation on hover */}
        <motion.div
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
          animate={{
            rotate: isHovered ? [0, 360] : 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Sparkles className={`w-4 h-4 ${colors.text}`} />
        </motion.div>

        {/* Title */}
        <h4 className="text-lg font-bold text-stone-800 dark:text-white mb-2 line-clamp-2 dark:drop-shadow-[0_0_12px_rgba(255,159,102,0.15)]">
          {project.title}
        </h4>

        {/* Description */}
        <p className="text-stone-600 dark:text-stone-300 text-sm mb-3 leading-relaxed line-clamp-3 font-medium">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-stone-100 dark:bg-[#252220] text-stone-600 dark:text-stone-300 text-xs font-semibold rounded dark:border dark:border-stone-600/30"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-0.5 bg-stone-100 dark:bg-[#252220] text-stone-600 dark:text-stone-300 text-xs font-semibold rounded dark:border dark:border-stone-600/30">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className={`px-2 py-0.5 ${colors.text} dark:text-primary text-xs font-semibold dark:drop-shadow-[0_0_6px_rgba(255,159,102,0.3)]`}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(project.githubUrl || project.demoUrl) && (
          <div className="flex gap-3 pt-3 border-t border-stone-200 dark:border-primary/20">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 ${colors.text} hover:underline text-xs font-semibold`}
                whileHover={{ x: 3 }}
              >
                <Github className="w-3.5 h-3.5" />
                Code
              </motion.a>
            )}
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 ${colors.text} hover:underline text-xs font-semibold`}
                whileHover={{ x: 3 }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Demo
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
