'use client';

import dynamic from 'next/dynamic';

const TechGalaxy = dynamic(() => import('@/components/tech/TechGalaxy'), {
  ssr: false,
  loading: () => (
    <section id="skills" className="relative py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-pulse">
          <div className="h-3 w-40 rounded bg-[#262626]" />
          <div className="mt-4 h-8 w-64 rounded bg-[#262626]" />
          <div className="mt-3 h-4 w-96 max-w-full rounded bg-[#262626]" />
        </div>
        <div className="h-[400px] sm:h-[520px] lg:h-[650px] rounded-xl border border-[#262626] bg-[#111111] animate-pulse" />
      </div>
    </section>
  ),
});

export default function SnapshotSection() {
  return <TechGalaxy />;
}
