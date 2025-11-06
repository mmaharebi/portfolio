"use client";

import { motion } from "motion/react";
import { ExternalLink, Github, Sparkles, Zap, Radio, Cpu } from "lucide-react";
import { useState } from "react";

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  tags: string[];
  year: string;
  category: "RF/Microwave" | "Signal Processing" | "Software" | "Research";
  githubUrl?: string;
  demoUrl?: string;
  highlight?: boolean; // For featured projects
}

interface ProjectShowcaseProps {
  projects: Project[];
}

const categoryColors = {
  "RF/Microwave": {
    bg: "from-primary/10 to-amber-100/20",
    border: "border-primary/30",
    text: "text-primary",
    icon: Radio,
    glow: "group-hover:shadow-primary/20",
  },
  "Signal Processing": {
    bg: "from-secondary/10 to-blue-100/20",
    border: "border-secondary/30",
    text: "text-secondary",
    icon: Zap,
    glow: "group-hover:shadow-secondary/20",
  },
  Software: {
    bg: "from-accent/10 to-purple-100/20",
    border: "border-accent/30",
    text: "text-accent",
    icon: Cpu,
    glow: "group-hover:shadow-accent/20",
  },
  Research: {
    bg: "from-terracotta/10 to-amber-100/20",
    border: "border-terracotta/30",
    text: "text-terracotta",
    icon: Sparkles,
    glow: "group-hover:shadow-terracotta/20",
  },
};

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(projects.map((p) => p.category)));

  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  const featuredProjects = projects.filter((p) => p.highlight);
  const regularProjects = filteredProjects.filter((p) => !p.highlight);

  return (
    <div className="relative">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
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
        <motion.div
          className="absolute bottom-40 left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Geometric shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-primary/10 rounded-xl"
          animate={{
            rotate: [0, 90, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-secondary/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full border-2 border-primary/20 shadow-lg mb-6">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-bold text-primary">Portfolio</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-stone-800 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Research projects, course work, and technical explorations in electromagnetics and signal processing
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              selectedCategory === null
                ? "bg-primary text-white shadow-lg"
                : "bg-white/80 text-stone-600 border-2 border-stone-200 hover:border-primary"
            }`}
          >
            All Projects
          </motion.button>
          {categories.map((category) => {
            const colors = categoryColors[category as keyof typeof categoryColors];
            const Icon = colors.icon;
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setSelectedCategory(category === selectedCategory ? null : category)
                }
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  selectedCategory === category
                    ? `bg-linear-to-r ${colors.bg} ${colors.text} border-2 ${colors.border} shadow-lg`
                    : "bg-white/80 text-stone-600 border-2 border-stone-200 hover:border-primary"
                }`}
              >
                <Icon className="w-4 h-4" />
                {category}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Featured Projects Grid */}
        {featuredProjects.length > 0 && !selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-stone-800">Highlighted Projects</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredProjects.map((project, index) => {
                const colors = categoryColors[project.category];
                const Icon = colors.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    whileHover={{ y: -8 }}
                    className={`group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-2 ${colors.border} shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden`}
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
                        <div className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-semibold">
                          {project.year}
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-xl md:text-2xl font-bold text-stone-800 mb-3">
                        {project.title}
                      </h4>

                      {/* Description */}
                      <p className="text-stone-600 text-sm md:text-base mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-stone-100 text-stone-700 text-xs font-medium rounded-full"
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
                            className={`px-2.5 py-1 ${colors.text} text-xs font-semibold rounded-full border ${colors.border} bg-white/50`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      {(project.githubUrl || project.demoUrl) && (
                        <div className="flex gap-3 pt-4 border-t border-stone-200">
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
                              <span>Live Demo</span>
                            </motion.a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Animated particles on hover */}
                    {hoveredIndex === index && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 rounded-full ${colors.text.replace('text', 'bg')}`}
                            initial={{ opacity: 0, x: 0, y: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              x: (i - 1) * 40,
                              y: -60,
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
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Regular Projects Grid */}
        {regularProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {regularProjects.map((project, index) => {
              const colors = categoryColors[project.category];
              const Icon = colors.icon;
              const adjustedIndex = featuredProjects.length + index;

              return (
                <motion.div
                  key={adjustedIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(adjustedIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 ${colors.border} shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
                >
                  {/* Hover gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-linear-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    {/* Category & Year */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 bg-white/80 ${colors.text} rounded-full text-xs font-bold`}>
                        <Icon className="w-3 h-3" />
                        {project.category}
                      </div>
                      <span className="text-xs font-semibold text-stone-500">{project.year}</span>
                    </div>

                    {/* Sparkle animation on hover */}
                    <motion.div
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                      animate={{
                        rotate: hoveredIndex === adjustedIndex ? [0, 360] : 0,
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Sparkles className={`w-4 h-4 ${colors.text}`} />
                    </motion.div>

                    {/* Title */}
                    <h4 className="text-lg font-bold text-stone-800 mb-2 line-clamp-2">
                      {project.title}
                    </h4>

                    {/* Description */}
                    <p className="text-stone-600 text-sm mb-3 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-stone-100 text-stone-600 text-xs font-medium rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 bg-stone-100 text-stone-600 text-xs font-medium rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className={`px-2 py-0.5 ${colors.text} text-xs font-semibold`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    {(project.githubUrl || project.demoUrl) && (
                      <div className="flex gap-3 pt-3 border-t border-stone-200">
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-600 hover:text-primary transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="w-4 h-4" />
                          </motion.a>
                        )}
                        {project.demoUrl && (
                          <motion.a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-600 hover:text-primary transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-stone-600 text-lg">No projects found in this category</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
              className="mt-6 px-6 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg"
            >
              View All Projects
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
