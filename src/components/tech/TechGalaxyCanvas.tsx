'use client';

import { useEffect, useRef } from 'react';
import ForceGraph2D, { type ForceGraphMethods } from 'react-force-graph-2d';
import {
  CATEGORY_COLORS,
  drawCategoryAnchor,
  drawHubNode,
  drawTechPill,
  getTechPillBounds,
  isTechNode,
  type ForceGraphNode,
} from '@/lib/galaxyUtils';
import type { GalaxyTechNode, TechLink } from '@/types';
import type { GalaxyPerformanceConfig } from '@/hooks/useGalaxyPerformance';

interface TechGalaxyCanvasProps {
  graphData: { nodes: ForceGraphNode[]; links: TechLink[] };
  dimensions: { width: number; height: number };
  perf: GalaxyPerformanceConfig;
  hoverNode: GalaxyTechNode | null;
  getNodeOpacity: (node: ForceGraphNode) => number;
  getLinkOpacity: (source: string, target: string, kind?: string) => number;
  onNodeClick: (node: ForceGraphNode | null) => void;
  onNodeHover: (node: ForceGraphNode | null) => void;
  onBackgroundClick: () => void;
  onPositionsUpdate: (positions: Record<string, { x: number; y: number }>) => void;
  onGraphReady: () => void;
  graphRef: React.MutableRefObject<ForceGraphMethods | undefined>;
}

export default function TechGalaxyCanvas({
  graphData,
  dimensions,
  perf,
  hoverNode,
  getNodeOpacity,
  getLinkOpacity,
  onNodeClick,
  onNodeHover,
  onBackgroundClick,
  onPositionsUpdate,
  onGraphReady,
  graphRef,
}: TechGalaxyCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const settledRef = useRef(false);

  useEffect(() => {
    const fg = graphRef.current;
    if (!fg || dimensions.width === 0) return;

    fg.d3Force('charge')?.strength((node: object) => {
      const n = node as ForceGraphNode;
      if (n.nodeKind === 'hub') return perf.isMobile ? -1200 : -1600;
      if (n.nodeKind === 'category') return perf.isMobile ? -400 : -550;
      return perf.isMobile ? -280 : -400;
    });

    fg.d3Force('link')
      ?.distance((link: object) => {
        const kind = (link as { kind?: string }).kind;
        if (kind === 'hub-category') return perf.isMobile ? 140 : 168;
        if (kind === 'category-tech') return perf.isMobile ? 40 : 48;
        if (kind === 'hub-core') return perf.isMobile ? 78 : 92;
        return perf.isMobile ? 60 : 72;
      })
      .strength((link: object) => {
        const kind = (link as { kind?: string }).kind;
        if (kind === 'hub-category') return 0.55;
        if (kind === 'category-tech') return 0.95;
        if (kind === 'hub-core') return 0.5;
        return 0.2;
      });
  }, [dimensions, graphData, graphRef, perf.isMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const fg = graphRef.current;
        if (!fg) return;
        if (entry.isIntersecting) {
          if (!settledRef.current) fg.resumeAnimation();
        } else {
          fg.pauseAnimation();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(canvas);
    return () => observer.disconnect();
  }, [graphRef]);

  const handleEngineStop = () => {
    settledRef.current = true;
    graphRef.current?.pauseAnimation();
    onGraphReady();
  };

  const handleEngineTick = () => {
    if (settledRef.current) return;

    const positions: Record<string, { x: number; y: number }> = {};
    for (const node of graphData.nodes) {
      if (node.x != null && node.y != null) {
        positions[node.id] = { x: node.x, y: node.y };
      }
      if (isTechNode(node) && node.x != null && node.y != null) {
        const dx = node.clusterX - node.x;
        const dy = node.clusterY - node.y;
        const pull = perf.isMobile ? 0.01 : 0.014;
        node.vx = (node.vx ?? 0) + dx * pull;
        node.vy = (node.vy ?? 0) + dy * pull;
      }
    }
    onPositionsUpdate(positions);
  };

  const wakeSimulation = () => {
    if (settledRef.current) {
      settledRef.current = false;
      graphRef.current?.resumeAnimation();
    }
  };

  return (
    <div ref={canvasRef} className="absolute inset-0">
      <ForceGraph2D
        ref={graphRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        backgroundColor="rgba(0,0,0,0)"
        nodeRelSize={1}
        warmupTicks={perf.reducedMotion ? 0 : perf.isMobile ? 20 : 40}
        cooldownTicks={perf.cooldownTicks}
        d3AlphaDecay={perf.isMobile ? 0.04 : 0.022}
        d3VelocityDecay={0.4}
        enableNodeDrag={!perf.reducedMotion}
        linkWidth={(link) => {
          const kind = (link as { kind?: string }).kind;
          if (kind === 'hub-core') return 2;
          if (kind === 'hub-category') return 1;
          return 1.2;
        }}
        linkColor={(link) => {
          const s = typeof link.source === 'object' ? link.source.id : link.source;
          const t = typeof link.target === 'object' ? link.target.id : link.target;
          const kind = (link as { kind?: string }).kind;
          const opacity = getLinkOpacity(s as string, t as string, kind);
          if (kind === 'hub-core') return `rgba(6, 182, 212, ${opacity})`;
          if (kind === 'hub-category') return `rgba(59, 130, 246, ${opacity})`;
          return `rgba(148, 163, 184, ${opacity})`;
        }}
        linkDirectionalParticles={(link) =>
          (link as { kind?: string }).kind === 'hub-core' ? perf.linkParticles : 0
        }
        linkDirectionalParticleWidth={1.5}
        linkDirectionalParticleSpeed={() => 0.004}
        onEngineStop={handleEngineStop}
        onEngineTick={handleEngineTick}
        onNodeClick={(node) => {
          wakeSimulation();
          onNodeClick(node as ForceGraphNode);
        }}
        onNodeHover={(node) => {
          onNodeHover(node as ForceGraphNode | null);
        }}
        onBackgroundClick={onBackgroundClick}
        onNodeDrag={(node) => {
          wakeSimulation();
          const n = node as ForceGraphNode;
          if (n.nodeKind === 'hub') {
            n.fx = 0;
            n.fy = 0;
          }
        }}
        onNodeDragEnd={(node) => {
          const n = node as ForceGraphNode;
          if (n.nodeKind === 'hub') {
            n.fx = 0;
            n.fy = 0;
          } else if (isTechNode(n)) {
            n.fx = undefined;
            n.fy = undefined;
          }
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const n = node as ForceGraphNode;
          const opacity = getNodeOpacity(n);

          if (n.nodeKind === 'hub' && n.x != null && n.y != null) {
            const pulse = perf.reducedMotion
              ? 1
              : 0.5 + 0.5 * Math.sin(Date.now() / 700);
            drawHubNode(ctx, n.x, n.y, globalScale, pulse);
            return;
          }

          if (n.nodeKind === 'category') {
            drawCategoryAnchor(ctx, n, globalScale, opacity);
            return;
          }

          if (isTechNode(n) && n.x != null && n.y != null) {
            const isHovered = hoverNode?.id === n.id;
            drawTechPill(
              ctx,
              n.x,
              n.y,
              n.id,
              CATEGORY_COLORS[n.group],
              globalScale,
              opacity,
              isHovered,
              !!n.isCore,
            );
          }
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          const n = node as ForceGraphNode;
          if (n.nodeKind === 'hub' && n.x != null && n.y != null) {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 40, 0, 2 * Math.PI);
            ctx.fill();
            return;
          }
          if (n.nodeKind === 'category') return;
          if (isTechNode(n) && n.x != null && n.y != null) {
            const isHovered = hoverNode?.id === n.id;
            const { w, h } = getTechPillBounds(n.id, 1, isHovered);
            ctx.fillStyle = color;
            ctx.fillRect(n.x - w / 2, n.y - h / 2, w, h);
          }
        }}
      />
    </div>
  );
}
