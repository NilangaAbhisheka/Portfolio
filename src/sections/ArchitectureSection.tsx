'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';

const architectureProjects = projects.filter(
  (p) => p.featured && p.architecture,
);

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#262626] to-transparent" />

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
          {architectureProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#111111] border border-[#262626] rounded-xl overflow-hidden"
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#262626] bg-[#0d0d0d]">
                <div>
                  <h3 className="text-sm font-semibold text-white">{project.title}</h3>
                  <p className="text-xs text-[#a1a1aa] mt-0.5 font-mono">{project.year}</p>
                </div>
                <div className="flex gap-1.5">
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

              {/* Diagram + tagline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* ASCII diagram */}
                <div className="p-5 border-r border-[#262626] md:border-r">
                  <p className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest mb-3">
                    System Diagram
                  </p>
                  <pre className="font-mono text-xs leading-relaxed text-[#a1a1aa] whitespace-pre">
                    {project.architecture}
                  </pre>
                </div>

                {/* Description + highlights */}
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

                  {/* Tech chips */}
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
          ))}
        </div>
      </div>
    </section>
  );
}
