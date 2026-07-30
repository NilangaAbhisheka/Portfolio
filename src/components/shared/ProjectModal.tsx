'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowLeft } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import type { Project } from '@/types';

const categoryColors: Record<string, string> = {
  'AI/ML': 'bg-[#8b5cf6]/15 text-[#a78bfa] border-[#8b5cf6]/30',
  'Full Stack': 'bg-[#14b8a6]/15 text-[#2dd4bf] border-[#14b8a6]/30',
  Backend: 'bg-[#3b82f6]/15 text-[#60a5fa] border-[#3b82f6]/30',
  Frontend: 'bg-[#06b6d4]/15 text-[#22d3ee] border-[#06b6d4]/30',
  Mobile: 'bg-[#10b981]/15 text-[#34d399] border-[#10b981]/30',
  Enterprise: 'bg-[#f59e0b]/15 text-[#fbbf24] border-[#f59e0b]/30',
  SaaS: 'bg-[#f43f5e]/15 text-[#fb7185] border-[#f43f5e]/30',
  Academic: 'bg-[#a1a1aa]/15 text-[#d4d4d8] border-[#a1a1aa]/30',
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock background scroll and handle Escape key
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full sm:max-w-3xl bg-[#111111] border border-[#262626] rounded-t-2xl sm:rounded-2xl overflow-y-auto overscroll-contain max-h-[92dvh] sm:max-h-[88vh] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 border-b border-[#262626] bg-[#111111]/95 backdrop-blur-sm">
                <button
                  onClick={onClose}
                  className="flex items-center gap-1.5 text-[#a1a1aa] hover:text-white transition-colors text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Projects
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 text-[#a1a1aa] hover:text-white hover:bg-white/10 rounded-lg transition-all"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Cover image */}
              <div className="relative w-full h-48 sm:h-64 bg-[#0d0d0d]">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
              </div>

              {/* Content */}
              <div className="px-5 sm:px-8 pb-10 space-y-7 -mt-6 relative">
                {/* Title row */}
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {project.category.map((cat) => (
                      <span
                        key={cat}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${categoryColors[cat] ?? 'bg-white/5 text-[#a1a1aa] border-white/10'}`}
                      >
                        {cat}
                      </span>
                    ))}
                    <span className="font-mono text-[10px] text-[#a1a1aa] ml-auto">
                      {project.year}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{project.title}</h2>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-white border border-[#262626] hover:border-[#a1a1aa]/50 px-3 py-1.5 rounded-lg transition-all"
                      >
                        <FaGithub className="w-3.5 h-3.5" /> GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#a1a1aa] hover:text-white border border-[#262626] hover:border-[#a1a1aa]/50 px-3 py-1.5 rounded-lg transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Overview */}
                <section>
                  <h3 className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest mb-3">
                    Overview
                  </h3>
                  <p className="text-sm text-[#a1a1aa] leading-relaxed whitespace-pre-line">
                    {project.longDescription || project.description}
                  </p>
                </section>

                {/* Architecture */}
                {project.architecture && (
                  <section>
                    <h3 className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest mb-3">
                      Architecture
                    </h3>
                    <pre className="text-xs text-[#a1a1aa] bg-[#0d0d0d] border border-[#262626] rounded-lg p-4 overflow-x-auto font-mono leading-relaxed">
                      {project.architecture}
                    </pre>
                  </section>
                )}

                {/* Key Features */}
                {project.highlights.length > 0 && (
                  <section>
                    <h3 className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {project.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                          <span className="text-[#3b82f6] mt-0.5 shrink-0">●</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Challenges */}
                {project.challenges && project.challenges.length > 0 && (
                  <section>
                    <h3 className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest mb-3">
                      Challenges
                    </h3>
                    <ul className="space-y-2">
                      {project.challenges.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                          <span className="text-[#f59e0b] mt-0.5 shrink-0">▲</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Lessons Learned */}
                {project.lessonsLearned && project.lessonsLearned.length > 0 && (
                  <section>
                    <h3 className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest mb-3">
                      Lessons Learned
                    </h3>
                    <ul className="space-y-2">
                      {project.lessonsLearned.map((l) => (
                        <li key={l} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                          <span className="text-[#06b6d4] mt-0.5 shrink-0">◆</span>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Tech Stack */}
                <section>
                  <h3 className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs text-[#a1a1aa] bg-[#0d0d0d] border border-[#262626] px-2.5 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
