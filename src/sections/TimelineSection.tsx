'use client';

import { motion } from 'framer-motion';

const timelineEntries = [
  {
    year: '2022',
    headline: 'Began Computer Science Degree',
    body: 'First programs, first bugs that became puzzles. Fell in love with the idea that every problem has a logical solution.',
  },
  {
    year: '2023',
    headline: 'Built First Web Applications',
    body: 'React clicked. Started understanding how systems connect — frontend, backend, database — as a single coherent machine.',
  },
  {
    year: '2024',
    headline: 'Full-Stack & Enterprise Systems',
    body: 'Built the Warehouse Management System. Learned what "production-ready" actually means: error handling, access control, data integrity.',
  },
  {
    year: '2025',
    headline: 'Domain-Driven Design & Enterprise Software',
    body: 'EduManager and TraceIQ. DDD changed how I think about system boundaries. Started treating software architecture as a discipline, not an afterthought.',
  },
  {
    year: '2026',
    headline: 'AI-Powered Systems',
    body: 'SpendWise and StoryMancer. ML stopped feeling like magic. Started understanding the engineering tradeoffs — latency, model selection, cache strategy.',
  },
];

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-24 relative">
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
            05 / Career Timeline
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            The Journey So Far
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[68px] top-0 bottom-0 w-px bg-gradient-to-b from-[#3b82f6]/60 via-[#262626] to-transparent hidden sm:block" />

          <div className="space-y-8">
            {timelineEntries.map((entry, i) => (
              <motion.div
                key={entry.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-8 group"
              >
                {/* Year */}
                <div className="flex items-start sm:items-center gap-4 sm:w-24 shrink-0">
                  <div className="relative z-10 w-3 h-3 rounded-full bg-[#3b82f6] border-2 border-[#0a0a0a] mt-1 sm:mt-0 group-hover:bg-[#06b6d4] transition-colors hidden sm:block" />
                  <span className="font-mono text-sm font-bold text-[#3b82f6]">
                    {entry.year}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 bg-[#111111] border border-[#262626] group-hover:border-[#3b82f6]/30 rounded-xl p-5 transition-all duration-300">
                  <h3 className="text-sm font-semibold text-white mb-1.5">
                    {entry.headline}
                  </h3>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">{entry.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
