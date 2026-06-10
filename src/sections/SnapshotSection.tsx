'use client';

import { motion } from 'framer-motion';
import {
  Server,
  Monitor,
  Database,
  Brain,
  Smartphone,
  Container,
} from 'lucide-react';
import { skillCategories } from '@/data/skills';

const iconMap: Record<string, React.ElementType> = {
  Server,
  Monitor,
  Database,
  Brain,
  Smartphone,
  Container,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

export default function SnapshotSection() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest mb-3">
            02 / Engineering Snapshot
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            What I Work With
          </h2>
          <p className="mt-3 text-[#a1a1aa] max-w-lg">
            Technologies across the full stack — from mobile to cloud, algorithms to APIs.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skillCategories.map((cat) => {
            const Icon = iconMap[cat.icon ?? 'Server'] ?? Server;
            return (
              <motion.div
                key={cat.name}
                variants={cardVariants}
                className="group bg-[#111111] border border-[#262626] hover:border-[#3b82f6]/40 rounded-xl p-5 transition-all duration-300 hover:bg-[#111111]/80"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center group-hover:bg-[#3b82f6]/20 transition-colors">
                    <Icon className="w-4 h-4 text-[#3b82f6]" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{cat.name}</h3>
                </div>
                <p className="font-mono text-xs text-[#a1a1aa] leading-relaxed">
                  {cat.skills.join(' · ')}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
