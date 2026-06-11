'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

function GalaxySkeleton() {
  return (
    <section id="skills" className="relative py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-pulse">
          <div className="h-3 w-40 rounded bg-[#262626]" />
          <div className="mt-4 h-8 w-64 rounded bg-[#262626]" />
          <div className="mt-3 h-4 w-96 max-w-full rounded bg-[#262626]" />
        </div>
        <div className="h-[420px] sm:h-[560px] lg:h-[680px] rounded-xl border border-[#262626] bg-[#111111] animate-pulse" />
      </div>
    </section>
  );
}

const TechGalaxy = dynamic(() => import('@/components/tech/TechGalaxy'), {
  ssr: false,
  loading: GalaxySkeleton,
});

export default function SnapshotSection() {
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
      { rootMargin: '400px 0px', threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinelRef}>
      {shouldLoad ? <TechGalaxy /> : <GalaxySkeleton />}
    </div>
  );
}
