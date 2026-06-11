'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ForceGraphMethods } from 'react-force-graph-2d';
import dynamic from 'next/dynamic';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { techGraph } from '@/data/techGraph';
import TechGalaxyPanel from '@/components/tech/TechGalaxyPanel';
import SkillCardGrid from '@/components/shared/SkillCardGrid';
import { useGalaxyPerformance } from '@/hooks/useGalaxyPerformance';
import {
  buildGalaxyGraph,
  enrichNode,
  FILTER_CATEGORIES,
  getNeighborIds,
  isTechNode,
  levelToExperience,
  type ForceGraphNode,
} from '@/lib/galaxyUtils';
import type { GalaxyTechNode, TechCategory, TechnologyNode } from '@/types';

const TechGalaxyCanvas = dynamic(() => import('@/components/tech/TechGalaxyCanvas'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
      <p className="text-xs font-mono text-[#a1a1aa] animate-pulse">Loading galaxy…</p>
    </div>
  ),
});

function Starfield({ count }: { count: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 7) % 100}%`,
        top: `${(i * 23 + 11) % 100}%`,
        size: i % 5 === 0 ? 2 : 1,
        delay: `${(i % 10) * 0.4}s`,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stars.map((star) => (
        <span
          key={star.id}
          className="galaxy-star absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function TechGalaxy() {
  const sectionRef = useRef<HTMLElement>(null);
  const graphRef = useRef<ForceGraphMethods | undefined>(undefined);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const perf = useGalaxyPerformance(isInView);
  const positionsRef = useRef<Record<string, { x: number; y: number }>>({});

  const [hoverNode, setHoverNode] = useState<GalaxyTechNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<TechnologyNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<TechCategory | 'All'>('All');
  const [graphReady, setGraphReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const enrichedNodes = useMemo(() => techGraph.nodes.map(enrichNode), []);
  const graphData = useMemo(() => buildGalaxyGraph(enrichedNodes), [enrichedNodes]);
  const techNodes = useMemo(
    () => graphData.nodes.filter(isTechNode),
    [graphData.nodes],
  );

  const neighborMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const node of techNodes) {
      map.set(node.id, getNeighborIds(node.id, graphData.links));
    }
    return map;
  }, [techNodes, graphData.links]);

  const searchMatchId = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    return techNodes.find((n) => n.id.toLowerCase().includes(q))?.id ?? null;
  }, [searchQuery, techNodes]);

  const getNodeOpacity = useCallback(
    (node: ForceGraphNode): number => {
      if (node.nodeKind === 'hub') return 1;

      if (node.nodeKind === 'category') {
        if (activeCategory === 'All' && !searchMatchId && !hoverNode && !selectedNode) {
          return 0.85;
        }
        if (activeCategory !== 'All' && node.group === activeCategory) return 1;
        if (hoverNode && node.group === hoverNode.group) return 1;
        if (selectedNode && node.group === selectedNode.group) return 1;
        if (searchMatchId) {
          const match = techNodes.find((n) => n.id === searchMatchId);
          if (match && match.group === node.group) return 1;
        }
        return 0.2;
      }

      const nodeId = node.id;
      const tech = node as GalaxyTechNode;

      if (hoverNode) {
        const neighbors = neighborMap.get(hoverNode.id) ?? new Set();
        if (nodeId === hoverNode.id || neighbors.has(nodeId)) return 1;
        return 0.15;
      }

      if (selectedNode) {
        const neighbors = neighborMap.get(selectedNode.id) ?? new Set();
        if (nodeId === selectedNode.id || neighbors.has(nodeId)) return 1;
        return 0.18;
      }

      if (searchMatchId) {
        const neighbors = neighborMap.get(searchMatchId) ?? new Set();
        if (nodeId === searchMatchId || neighbors.has(nodeId)) return 1;
        return 0.12;
      }

      if (activeCategory !== 'All') {
        return tech.group === activeCategory ? 1 : 0.15;
      }

      return 1;
    },
    [activeCategory, hoverNode, selectedNode, searchMatchId, neighborMap, techNodes],
  );

  const getLinkOpacity = useCallback(
    (source: string, target: string, kind?: string): number => {
      if (kind === 'hub-category') return 0.12;
      if (kind === 'hub-core') return 0.35;

      const focusId = hoverNode?.id ?? selectedNode?.id ?? searchMatchId;
      if (!focusId) {
        return kind === 'category-tech' ? 0.2 : 0.1;
      }
      const neighbors = neighborMap.get(focusId) ?? new Set();
      const isConnected =
        (source === focusId && neighbors.has(target)) ||
        (target === focusId && neighbors.has(source));
      return isConnected ? 0.65 : 0.04;
    },
    [hoverNode, selectedNode, searchMatchId, neighborMap],
  );

  useEffect(() => {
    const container = document.getElementById('galaxy-canvas');
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDimensions({ width: Math.floor(width), height: Math.floor(height) });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!graphReady || !graphRef.current) return;
    graphRef.current.zoom(0.92, 800);
    graphRef.current.centerAt(0, 0, 800);
  }, [graphReady]);

  useEffect(() => {
    if (!searchMatchId || !graphRef.current) return;
    const pos = positionsRef.current[searchMatchId];
    if (pos) {
      graphRef.current.centerAt(pos.x, pos.y, 800);
      graphRef.current.zoom(1.6, 800);
    }
  }, [searchMatchId]);

  const handleNodeClick = useCallback((node: ForceGraphNode | null) => {
    if (!node || !isTechNode(node)) return;
    setSelectedNode(node);
  }, []);

  const handleNodeHover = useCallback((node: ForceGraphNode | null) => {
    if (node && isTechNode(node)) {
      setHoverNode(node);
    } else {
      setHoverNode(null);
    }
  }, []);

  const panelNeighbors = useMemo(() => {
    if (!selectedNode) return [];
    return [...(neighborMap.get(selectedNode.id) ?? [])];
  }, [selectedNode, neighborMap]);

  const showGraph = perf.mountGraph && dimensions.width > 0;

  return (
    <section ref={sectionRef} id="skills" className="relative py-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#262626] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest mb-3">
            02 / Engineering Snapshot
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Skills Galaxy</h2>
          <p className="mt-3 text-[#a1a1aa] max-w-xl">
            Technologies grouped by domain, orbiting a central core stack — drag, search, and
            click any node to explore.
          </p>
        </motion.div>

        <div className="relative mb-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search technologies… e.g. React, FastAPI"
            className="w-full rounded-lg border border-[#262626] bg-[#111111] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-[#a1a1aa]/60 focus:border-[#3b82f6]/50 focus:outline-none"
          />
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`min-h-11 rounded-full border px-3 py-2 text-xs font-mono transition-all ${
                activeCategory === cat
                  ? 'border-[#3b82f6]/50 bg-[#3b82f6]/10 text-[#3b82f6]'
                  : 'border-[#262626] text-[#a1a1aa] hover:border-[#3b82f6]/30 hover:text-white'
              }`}
            >
              {cat === 'AI' ? 'AI / ML' : cat}
            </button>
          ))}
        </div>

        <div
          id="galaxy-canvas"
          className="relative h-[420px] sm:h-[560px] lg:h-[680px] rounded-xl border border-[#262626] bg-[#0a0a0a] overflow-hidden"
        >
          {perf.reducedMotion ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="text-sm font-mono text-[#3b82f6]">CORE STACK</p>
              <p className="text-sm text-[#a1a1aa]">
                React · TypeScript · Node.js · FastAPI · PostgreSQL · Docker
              </p>
              <p className="text-xs text-[#a1a1aa]">
                Interactive galaxy disabled for reduced motion — use Quick Reference below.
              </p>
            </div>
          ) : (
            <>
              <Starfield count={perf.starCount} />
              {showGraph && (
                <TechGalaxyCanvas
                  graphRef={graphRef}
                  graphData={graphData}
                  dimensions={dimensions}
                  perf={perf}
                  hoverNode={hoverNode}
                  getNodeOpacity={getNodeOpacity}
                  getLinkOpacity={getLinkOpacity}
                  onNodeClick={handleNodeClick}
                  onNodeHover={handleNodeHover}
                  onBackgroundClick={() => {
                    setHoverNode(null);
                    setSelectedNode(null);
                  }}
                  onPositionsUpdate={(positions) => {
                    positionsRef.current = positions;
                  }}
                  onGraphReady={() => setGraphReady(true)}
                />
              )}
            </>
          )}

          <AnimatePresence>
            {hoverNode && !selectedNode && showGraph && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs z-10 rounded-lg border border-[#262626] bg-[#111111]/95 p-3 backdrop-blur-sm pointer-events-none"
              >
                <p className="font-semibold text-white">{hoverNode.id}</p>
                <p className="text-xs text-[#a1a1aa] mt-0.5">{hoverNode.group}</p>
                <p className="text-xs text-[#06b6d4] mt-1">
                  {levelToExperience(hoverNode.level)} · {hoverNode.level}%
                </p>
                <p className="text-xs text-[#a1a1aa] mt-1">
                  {hoverNode.projects.length}+ projects · Click for details
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-3 text-center text-[10px] font-mono text-[#a1a1aa]">
          Category clusters orbit the core · Drag nodes · Search to focus · Click for details
        </p>

        <SkillCardGrid
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
        />
      </div>

      <AnimatePresence>
        {selectedNode && (
          <TechGalaxyPanel
            node={selectedNode}
            neighbors={panelNeighbors}
            onClose={() => setSelectedNode(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
