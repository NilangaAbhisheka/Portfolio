'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const ProjectsSection = dynamic(() => import('@/sections/ProjectsSection'), {
  loading: () => (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-4 animate-pulse">
        <div className="h-8 w-48 rounded bg-[#262626] mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-xl bg-[#111111] border border-[#262626]" />
          ))}
        </div>
      </div>
    </section>
  ),
});

export default function LazyProjectsSection() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px', threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinelRef}>
      {shouldLoad ? <ProjectsSection /> : (
        <section id="projects" className="py-24 min-h-[50vh]" aria-hidden />
      )}
    </div>
  );
}
