'use client';

import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/types';

const categoryColors: Record<string, string> = {
  'AI/ML': 'bg-[#8b5cf6]/15 text-[#a78bfa] border-[#8b5cf6]/30',
  Backend: 'bg-[#3b82f6]/15 text-[#60a5fa] border-[#3b82f6]/30',
  Frontend: 'bg-[#06b6d4]/15 text-[#22d3ee] border-[#06b6d4]/30',
  Mobile: 'bg-[#10b981]/15 text-[#34d399] border-[#10b981]/30',
  Enterprise: 'bg-[#f59e0b]/15 text-[#fbbf24] border-[#f59e0b]/30',
  Academic: 'bg-[#a1a1aa]/15 text-[#d4d4d8] border-[#a1a1aa]/30',
};

interface ProjectCardProps {
  project: Project;
  onSelect: () => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <article
      onClick={onSelect}
      className="group bg-[#111111] border border-[#262626] hover:border-[#3b82f6]/40 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] flex flex-col"
    >
      {/* Cover image */}
      <div className="relative aspect-video overflow-hidden bg-[#0d0d0d]">
        <Image
          src={project.coverImage}
          alt={`${project.title} screenshot`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            // Graceful fallback — hide broken image
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Year badge */}
        <span className="absolute top-3 right-3 font-mono text-[10px] text-[#a1a1aa] bg-[#0a0a0a]/80 border border-[#262626] px-2 py-0.5 rounded">
          {project.year}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Title + categories */}
        <div>
          <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#3b82f6] transition-colors">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.category.map((cat) => (
              <span
                key={cat}
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${categoryColors[cat] ?? 'bg-white/5 text-[#a1a1aa] border-white/10'}`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[#a1a1aa] leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <p className="font-mono text-[10px] text-[#a1a1aa]/70">
          {project.technologies.slice(0, 4).join(' · ')}
          {project.technologies.length > 4 && ` · +${project.technologies.length - 4}`}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onSelect}
            className="flex-1 text-xs font-medium text-[#3b82f6] bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 border border-[#3b82f6]/20 hover:border-[#3b82f6]/50 py-2 rounded-lg transition-all duration-200"
          >
            View Details
          </button>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#a1a1aa] hover:text-white border border-[#262626] hover:border-[#a1a1aa]/50 rounded-lg transition-all duration-200"
              aria-label={`GitHub — ${project.title}`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#a1a1aa] hover:text-white border border-[#262626] hover:border-[#a1a1aa]/50 rounded-lg transition-all duration-200"
              aria-label={`Live demo — ${project.title}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
