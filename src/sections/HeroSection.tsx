'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, Download, Zap, Circle } from 'lucide-react';
import { personal } from '@/data/personal';

function CountUp({
  target,
  suffix = '',
  startOnMount = false,
}: {
  target: string;
  suffix?: string;
  startOnMount?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState('0');
  const shouldAnimate = startOnMount || isInView;

  useEffect(() => {
    if (!shouldAnimate) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    if (isNaN(num)) {
      setDisplayed(target);
      return;
    }
    const duration = 1200;
    const steps = 40;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        setDisplayed(target);
        clearInterval(timer);
      } else {
        setDisplayed(Math.floor(current) + (target.includes('+') ? '+' : ''));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [shouldAnimate, target]);

  return (
    <span ref={ref}>
      {displayed}
      {suffix}
    </span>
  );
}

const dashboardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.35 },
  },
};

const panelVariants = {
  hidden: { opacity: 0, y: 10, x: -6 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
};

const statRowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
};

export default function HeroSection() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const stats = [
    { label: 'Projects Built', value: personal.stats.projectsBuilt },
    { label: 'Technologies', value: personal.stats.technologies },
    { label: 'Languages', value: personal.stats.languages },
    { label: 'Years Coding', value: personal.stats.yearsCoding },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden mc-grid-bg"
    >
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#3b82f6]/5 blur-[80px] pointer-events-none max-sm:hidden" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-mono text-[#06b6d4] bg-[#06b6d4]/10 border border-[#06b6d4]/20 px-3 py-1.5 rounded-full">
                <Zap className="w-3 h-3" />
                Computer Science Undergraduate
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                Nilanga Abhisheka
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]">
                  Muthukumarana
                </span>
              </h1>
            </div>

            <div>
              <p className="text-lg text-[#a1a1aa] leading-relaxed max-w-md">
                Building scalable software,
                <br />
                intelligent systems,
                <br />
                and modern digital experiences.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium rounded-lg transition-colors duration-200 text-sm"
              >
                View Projects
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#262626] hover:border-[#3b82f6]/50 text-[#a1a1aa] hover:text-white font-medium rounded-lg transition-all duration-200 text-sm hover:bg-white/5"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
          >
            <motion.div
              className="bg-[#111111] border border-[#262626] rounded-xl overflow-hidden font-mono text-sm shadow-2xl"
              variants={dashboardContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={panelVariants}
                className="flex items-center justify-between px-4 py-3 border-b border-[#262626] bg-[#0d0d0d]"
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#06b6d4]" />
                  <span className="text-xs text-[#a1a1aa] uppercase tracking-widest">
                    System Status
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-[#06b6d4]"
                    animate={{ opacity: [1, 0.35, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span className="text-xs text-[#06b6d4] font-semibold">ONLINE</span>
                </div>
              </motion.div>

              <motion.div
                variants={panelVariants}
                className="px-4 py-4 space-y-3 border-b border-[#262626]"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    variants={statRowVariants}
                    custom={i}
                    className="flex items-center justify-between"
                  >
                    <span className="text-[#a1a1aa] text-xs">{stat.label}</span>
                    <span className="text-white font-semibold tabular-nums">
                      <CountUp target={stat.value} startOnMount />
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={panelVariants} className="px-4 py-4 border-b border-[#262626]">
                <p className="text-[10px] text-[#a1a1aa] uppercase tracking-widest mb-3">
                  Current Focus
                </p>
                <div className="space-y-2">
                  {personal.currentFocus.map((item, i) => (
                    <motion.div
                      key={item}
                      variants={statRowVariants}
                      custom={i}
                      className="flex items-center gap-2"
                    >
                      <span className="text-[#3b82f6]">▶</span>
                      <span className="text-[#e4e4e7] text-xs">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={panelVariants} className="px-4 py-4">
                <p className="text-[10px] text-[#a1a1aa] uppercase tracking-widest mb-3">
                  Status
                </p>
                <div className="flex items-center gap-2">
                  <Circle className="w-2 h-2 fill-[#06b6d4] text-[#06b6d4]" />
                  <span className="text-[#e4e4e7] text-xs">
                    {personal.availability}
                    <span className="cursor-blink text-[#06b6d4] ml-0.5">▌</span>
                  </span>
                </div>
                {time && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.4 }}
                    className="text-[10px] text-[#a1a1aa] mt-3"
                  >
                    Local time — {time}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#a1a1aa]"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
