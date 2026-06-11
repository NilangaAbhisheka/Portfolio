'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { projects } from '@/data/projects';
import type { Project } from '@/types';

const architectureProjects = projects.filter(
  (p) => p.featured && p.architecture,
);

function ArchitectureCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-[#111111] border border-[#262626] rounded-xl overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#262626] bg-[#0d0d0d]">
        <div>
          <h3 className="text-sm font-semibold text-white">{project.title}</h3>
          <p className="text-xs text-[#a1a1aa] mt-0.5 font-mono">{project.year}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end">
          {project.category.map((cat) => (
            <span
              key={cat}
              className="text-[10px] font-mono text-[#a1a1aa] bg-[#262626] px-2 py-0.5 rounded"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="p-5 md:border-r border-[#262626]">
          <p className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest mb-3">
            System Diagram
          </p>
          <pre className="font-mono text-xs leading-relaxed text-[#a1a1aa] whitespace-pre overflow-x-auto">
            {project.architecture}
          </pre>
        </div>

        <div className="p-5">
          <p className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest mb-3">
            Design Rationale
          </p>
          <p className="text-sm text-[#a1a1aa] leading-relaxed mb-4">
            {project.description}
          </p>

          {project.highlights.slice(0, 3).map((h) => (
            <div key={h} className="flex items-start gap-2 mb-2">
              <span className="text-[#06b6d4] text-xs mt-0.5 shrink-0">▶</span>
              <span className="text-xs text-[#a1a1aa]">{h}</span>
            </div>
          ))}

          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] text-[#a1a1aa] bg-[#0d0d0d] border border-[#262626] px-2 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ArchitectureSection() {
  const [expanded, setExpanded] = useState(false);
  const initial = architectureProjects.slice(0, 2);
  const rest = architectureProjects.slice(2);
  const hiddenCount = rest.length;

  return (
    <section id="architecture" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#262626] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest mb-3">
            04 / Architecture Showcase
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            How Systems Are Designed
          </h2>
          <p className="mt-3 text-[#a1a1aa] max-w-lg">
            Architecture diagrams for the most complex projects — with the reasoning behind each design decision.
          </p>
        </motion.div>

        <div className="space-y-8">
          {initial.map((project, i) => (
            <ArchitectureCard key={project.slug} project={project} index={i} />
          ))}

          <AnimatePresence>
            {expanded &&
              rest.map((project, i) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <ArchitectureCard project={project} index={i + 2} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {hiddenCount > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-2 rounded-lg border border-[#262626] bg-[#111111] px-5 py-2.5 text-sm font-medium text-[#a1a1aa] transition-all hover:border-[#3b82f6]/40 hover:text-white"
            >
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show fewer diagrams
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Show {hiddenCount} more architecture{hiddenCount > 1 ? 's' : ''}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
