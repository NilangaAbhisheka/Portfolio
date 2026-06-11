'use client';

import { useEffect, useState } from 'react';

export interface GalaxyPerformanceConfig {
  isMobile: boolean;
  reducedMotion: boolean;
  cooldownTicks: number;
  linkParticles: number;
  starCount: number;
  mountGraph: boolean;
}

export function useGalaxyPerformance(sectionInView: boolean): GalaxyPerformanceConfig {
  const [prefs, setPrefs] = useState({
    isMobile: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 640px)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      setPrefs({
        isMobile: mobileMq.matches,
        reducedMotion: motionMq.matches,
      });
    };

    sync();
    mobileMq.addEventListener('change', sync);
    motionMq.addEventListener('change', sync);
    return () => {
      mobileMq.removeEventListener('change', sync);
      motionMq.removeEventListener('change', sync);
    };
  }, []);

  const { isMobile, reducedMotion } = prefs;

  return {
    isMobile,
    reducedMotion,
    cooldownTicks: reducedMotion ? 0 : isMobile ? 50 : 100,
    linkParticles: reducedMotion || isMobile ? 0 : 1,
    starCount: isMobile ? 18 : 36,
    mountGraph: sectionInView && !reducedMotion,
  };
}
