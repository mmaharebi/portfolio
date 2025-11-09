"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { CATEGORY_COLORS, type ProjectCategory } from "@/lib/constants/projects";

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  tags: string[];
  year: string;
  category: ProjectCategory;
  githubUrl?: string;
  demoUrl?: string;
  highlight?: boolean; // For featured projects
}

interface ProjectShowcaseProps {
  projects: Project[];
}

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
            const colors = CATEGORY_COLORS[category as ProjectCategory];
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
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                  isHovered={hoveredIndex === index}
                  isFeatured={true}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                />
              ))}
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
              const adjustedIndex = featuredProjects.length + index;
              return (
                <ProjectCard
                  key={adjustedIndex}
                  project={project}
                  index={index}
                  isHovered={hoveredIndex === adjustedIndex}
                  isFeatured={false}
                  onHoverStart={() => setHoveredIndex(adjustedIndex)}
                  onHoverEnd={() => setHoveredIndex(null)}
                />
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
