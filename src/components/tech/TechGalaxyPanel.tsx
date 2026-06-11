'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import {
  CATEGORY_COLORS,
  levelToExperience,
} from '@/lib/galaxyUtils';
import type { TechnologyNode } from '@/types';

interface TechGalaxyPanelProps {
  node: TechnologyNode;
  neighbors: string[];
  onClose: () => void;
}

export default function TechGalaxyPanel({
  node,
  neighbors,
  onClose,
}: TechGalaxyPanelProps) {
  const color = CATEGORY_COLORS[node.group];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
        onClick={onClose}
      />

      <motion.aside
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-[#262626] bg-[#111111] shadow-2xl md:top-auto md:bottom-6 md:right-6 md:h-auto md:max-h-[80vh] md:rounded-xl md:border"
      >
        <div className="flex items-start justify-between border-b border-[#262626] p-5">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
              />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#a1a1aa]">
                {node.group}
              </span>
              {node.isCore && (
                <span className="rounded border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-2 py-0.5 text-[10px] font-mono text-[#3b82f6]">
                  CORE STACK
                </span>
              )}
            </div>
            <h3 className="mt-2 text-xl font-bold text-white">{node.id}</h3>
            <p className="mt-1 text-sm text-[#06b6d4]">
              {levelToExperience(node.level)} · {node.years}+ years
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-[#262626] p-2 text-[#a1a1aa] transition-colors hover:border-[#3b82f6]/40 hover:text-white"
            aria-label="Close panel"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#3b82f6] mb-2">
              Description
            </p>
            <p className="text-sm leading-relaxed text-[#a1a1aa]">{node.description}</p>
          </div>

          {node.projects.length > 0 && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#3b82f6] mb-2">
                Projects Built
              </p>
              <ul className="space-y-1.5">
                {node.projects.map((project) => (
                  <li
                    key={project}
                    className="flex items-center gap-2 text-sm text-white"
                  >
                    <span className="text-[#06b6d4]">▸</span>
                    {project}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {node.achievements && node.achievements.length > 0 && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#3b82f6] mb-2">
                Key Achievements
              </p>
              <ul className="space-y-1.5">
                {node.achievements.map((item) => (
                  <li key={item} className="text-sm text-[#a1a1aa]">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {neighbors.length > 0 && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#3b82f6] mb-2">
                Related Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {neighbors.map((id) => (
                  <span
                    key={id}
                    className="rounded border border-[#262626] bg-[#0a0a0a] px-2.5 py-1 text-xs font-mono text-[#a1a1aa]"
                  >
                    {id}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
