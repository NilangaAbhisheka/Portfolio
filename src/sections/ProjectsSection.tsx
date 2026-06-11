'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { projects } from '@/data/projects';
import type { Project, ProjectCategory } from '@/types';
import ProjectCard from '@/components/shared/ProjectCard';
import ProjectModal from '@/components/shared/ProjectModal';

const categories: Array<ProjectCategory | 'All'> = [
  'All',
  'AI/ML',
  'Backend',
  'Frontend',
  'Mobile',
  'Enterprise',
  'Academic',
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'All'>('All');
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return projects.filter((p) => {
      const matchesCategory =
        activeFilter === 'All' || p.category.includes(activeFilter as ProjectCategory);
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, search]);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest mb-3">
            03 / Featured Projects
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">What I&apos;ve Built</h2>
          <p className="mt-3 text-[#a1a1aa] max-w-lg">
            Enterprise systems, AI applications, and full-stack platforms — each solving a real problem.
          </p>
        </motion.div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111111] border border-[#262626] focus:border-[#3b82f6]/50 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-[#a1a1aa] outline-none transition-colors font-sans"
            />
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-[#2563eb] text-white'
                    : 'bg-[#111111] text-[#a1a1aa] border border-[#262626] hover:border-[#3b82f6]/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-xs font-mono text-[#a1a1aa] mb-6">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          {activeFilter !== 'All' && ` in ${activeFilter}`}
        </p>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard
                  project={project}
                  onSelect={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#a1a1aa] font-mono text-sm">
            No projects match &quot;{search}&quot;
          </div>
        )}
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
