'use client';

import { motion } from 'framer-motion';
import {  Mail, FileText } from 'lucide-react';
import { personal } from '@/data/personal';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
const links = [
  {
    label: 'GitHub',
    icon: FaGithub,
    href: (l: typeof personal.links) => l.github,
    description: 'See the code',
  },
  {
    label: 'LinkedIn',
    icon: FaLinkedin,
    href: (l: typeof personal.links) => l.linkedin,
    description: 'Connect professionally',
  },
  {
    label: 'Email',
    icon: Mail,
    href: (l: typeof personal.links) => `mailto:${l.email}`,
    description: personal.links.email,
    mono: true,
  },
  {
    label: 'Resume',
    icon: FileText,
    href: (l: typeof personal.links) => l.resume,
    description: 'Download PDF',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#262626] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest mb-3">
            06 / Contact
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-[#a1a1aa] max-w-md mx-auto">
            Open to internships, graduate roles, and interesting problems.
          </p>
        </motion.div>

        {/* Links grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-4 max-w-xl mx-auto"
        >
          {links.map(({ label, icon: Icon, href, description, mono }) => (
            <a
              key={label}
              href={href(personal.links)}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 bg-[#111111] border border-[#262626] hover:border-[#3b82f6]/50 hover:bg-[#3b82f6]/5 rounded-xl p-6 w-36 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center group-hover:bg-[#3b82f6]/20 group-hover:border-[#3b82f6]/50 transition-all duration-300">
                <Icon className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-white group-hover:text-[#3b82f6] transition-colors">
                  {label}
                </p>
                <p className={`text-[10px] text-[#a1a1aa] mt-0.5 ${mono ? 'font-mono' : ''}`}>
                  {description}
                </p>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a1a1aa] font-mono"
        >
          <span>© {new Date().getFullYear()} Nilanga Abhisheka Muthukumarana</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] animate-pulse" />
            All systems operational
          </span>
        </motion.div>
      </div>
    </section>
  );
}
