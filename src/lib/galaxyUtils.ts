import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
import { CORE_STACK, techGraph } from '@/data/techGraph';
import type {
  GalaxyCategoryNode,
  GalaxyGraphNode,
  GalaxyHubNode,
  GalaxyTechNode,
  TechCategory,
  TechnologyNode,
  TechLink,
} from '@/types';

export const CORE_HUB_ID = 'CORE STACK';

export const CATEGORY_COLORS: Record<TechCategory, string> = {
  Frontend: '#3b82f6',
  Backend: '#22c55e',
  Database: '#a855f7',
  AI: '#f97316',
  DevOps: '#f43f5e',
  Cloud: '#06b6d4',
  Mobile: '#ec4899',
  Tools: '#eab308',
};

/** Fixed angle (radians) for each category cluster around the hub */
export const CATEGORY_ANGLES: Record<TechCategory, number> = {
  Frontend: -Math.PI / 2,
  Backend: -Math.PI / 6,
  Database: Math.PI / 6,
  AI: Math.PI / 2,
  Mobile: (5 * Math.PI) / 6,
  DevOps: (-5 * Math.PI) / 6,
  Cloud: (2 * Math.PI) / 3,
  Tools: (-2 * Math.PI) / 3,
};

export const FILTER_CATEGORIES: Array<TechCategory | 'All'> = [
  'All',
  'Frontend',
  'Backend',
  'AI',
  'Database',
  'DevOps',
  'Cloud',
  'Mobile',
];

const CATEGORY_ANCHOR_RADIUS = 168;

export function categoryAnchorId(group: TechCategory): string {
  return `__cat_${group}`;
}

export function getNodeRadius(level: number, isCore = false): number {
  const base = level >= 90 ? 14 : level >= 75 ? 11 : level >= 60 ? 8 : 5;
  return isCore ? base + 2 : base;
}

export function levelToExperience(level: number): string {
  if (level >= 90) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 60) return 'Intermediate';
  return 'Familiar';
}

export function getGlowIntensity(level: number): number {
  return Math.min(1, level / 100);
}

export function getRingProgress(level: number): number {
  if (level >= 90) return 1;
  if (level >= 75) return 0.75;
  if (level >= 60) return 0.5;
  return 0.25;
}

function normalizeTechName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function techNamesMatch(a: string, b: string): boolean {
  const na = normalizeTechName(a);
  const nb = normalizeTechName(b);
  return na === nb || na.includes(nb) || nb.includes(na);
}

export function getProjectsForTech(techId: string, nodeProjects: string[]): string[] {
  const fromProjects = projects
    .filter((p) => p.technologies.some((t) => techNamesMatch(t, techId)))
    .map((p) => p.title);

  const fromSkills = skillCategories.flatMap((cat) =>
    cat.skills.some((s) => techNamesMatch(s, techId)) ? cat.projects : [],
  );

  return [...new Set([...nodeProjects, ...fromProjects, ...fromSkills])];
}

export function getNeighborIds(
  nodeId: string,
  links: Array<{ source: string | { id: string }; target: string | { id: string } }>,
): Set<string> {
  const neighbors = new Set<string>();
  for (const link of links) {
    const source = typeof link.source === 'object' ? link.source.id : link.source;
    const target = typeof link.target === 'object' ? link.target.id : link.target;
    if (source === nodeId) neighbors.add(target as string);
    if (target === nodeId) neighbors.add(source as string);
  }
  return neighbors;
}

export function enrichNode(node: TechnologyNode): TechnologyNode {
  return {
    ...node,
    projects: getProjectsForTech(node.id, node.projects),
  };
}

export function isTechNode(node: GalaxyGraphNode): node is GalaxyTechNode {
  return node.nodeKind === 'tech';
}

function polar(angle: number, radius: number) {
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}

export function buildGalaxyGraph(enrichedNodes: TechnologyNode[]): {
  nodes: GalaxyGraphNode[];
  links: TechLink[];
} {
  const categoriesWithNodes = [...new Set(enrichedNodes.map((n) => n.group))];

  const hub: GalaxyHubNode = {
    id: CORE_HUB_ID,
    nodeKind: 'hub',
    label: CORE_HUB_ID,
    fx: 0,
    fy: 0,
    x: 0,
    y: 0,
  };

  const categoryAnchors: GalaxyCategoryNode[] = categoriesWithNodes.map((group) => {
    const { x, y } = polar(CATEGORY_ANGLES[group], CATEGORY_ANCHOR_RADIUS);
    return {
      id: categoryAnchorId(group),
      nodeKind: 'category',
      group,
      label: group === 'AI' ? 'AI / ML' : group,
      fx: x,
      fy: y,
      x,
      y,
    };
  });

  const byCategory = new Map<TechCategory, TechnologyNode[]>();
  for (const node of enrichedNodes) {
    const list = byCategory.get(node.group) ?? [];
    list.push(node);
    byCategory.set(node.group, list);
  }

  const techNodes: GalaxyTechNode[] = [];

  for (const [group, nodes] of byCategory) {
    const anchorAngle = CATEGORY_ANGLES[group];
    const anchor = polar(anchorAngle, CATEGORY_ANCHOR_RADIUS);
    const count = nodes.length;

    nodes.forEach((node, index) => {
      const isCoreMember = CORE_STACK.includes(node.id as (typeof CORE_STACK)[number]);
      const angleStep = (2 * Math.PI) / Math.max(count, 1);
      const localAngle = index * angleStep + anchorAngle * 0.05;

      let clusterX: number;
      let clusterY: number;

      if (isCoreMember) {
        const inset = 0.38;
        const spread =
          count === 1 ? 0 : -0.35 + (index / (count - 1)) * 0.7;
        clusterX = anchor.x * inset + Math.cos(anchorAngle + spread) * 32;
        clusterY = anchor.y * inset + Math.sin(anchorAngle + spread) * 32;
      } else {
        const orbit = 56;
        clusterX = anchor.x + Math.cos(localAngle) * orbit;
        clusterY = anchor.y + Math.sin(localAngle) * orbit;
      }

      techNodes.push({
        ...node,
        nodeKind: 'tech',
        isCore: isCoreMember,
        clusterX,
        clusterY,
        x: clusterX,
        y: clusterY,
      });
    });
  }

  const links: TechLink[] = [];

  for (const anchor of categoryAnchors) {
    links.push({
      source: CORE_HUB_ID,
      target: anchor.id,
      strength: 0.35,
      kind: 'hub-category',
    });
  }

  for (const tech of techNodes) {
    links.push({
      source: categoryAnchorId(tech.group),
      target: tech.id,
      strength: 0.85,
      kind: 'category-tech',
    });

    if (tech.isCore) {
      links.push({
        source: CORE_HUB_ID,
        target: tech.id,
        strength: 0.55,
        kind: 'hub-core',
      });
    }
  }

  for (const link of techGraph.links) {
    links.push({ ...link, kind: 'peer' });
  }

  return {
    nodes: [hub, ...categoryAnchors, ...techNodes],
    links,
  };
}

export type ForceGraphNode = GalaxyGraphNode & {
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
  vx?: number;
  vy?: number;
};

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function drawHubNode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  globalScale: number,
  pulse: number,
) {
  const r = 36 / globalScale;
  const glowR = r + 14 / globalScale + pulse * 6 / globalScale;

  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, glowR, 0, 2 * Math.PI);
  ctx.fillStyle = `rgba(6, 182, 212, ${0.12 + pulse * 0.08})`;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, r + 4 / globalScale, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
  ctx.lineWidth = 2 / globalScale;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
  grad.addColorStop(0, '#1e3a5f');
  grad.addColorStop(1, '#0a1628');
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 2.5 / globalScale;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = `700 ${11 / globalScale}px Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('CORE', x, y - 3 / globalScale);
  ctx.fillText('STACK', x, y + 9 / globalScale);
  ctx.textAlign = 'left';
  ctx.restore();
}

export function drawCategoryAnchor(
  ctx: CanvasRenderingContext2D,
  node: GalaxyCategoryNode & { x?: number; y?: number },
  globalScale: number,
  opacity: number,
) {
  if (node.x == null || node.y == null) return;
  const color = CATEGORY_COLORS[node.group];
  const r = 42 / globalScale;

  ctx.save();
  ctx.globalAlpha = opacity * 0.35;
  ctx.beginPath();
  ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();

  ctx.globalAlpha = opacity * 0.9;
  ctx.font = `700 ${9 / globalScale}px Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillStyle = color;
  ctx.fillText(node.label.toUpperCase(), node.x, node.y - r - 6 / globalScale);
  ctx.textAlign = 'left';
  ctx.restore();
}

export function drawTechPill(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  label: string,
  color: string,
  globalScale: number,
  opacity: number,
  isHovered: boolean,
  isCore: boolean,
) {
  const fontSize = Math.max(11, (isHovered ? 13 : 12) / globalScale);
  ctx.font = `600 ${fontSize}px Inter, sans-serif`;
  const textWidth = ctx.measureText(label).width;
  const padX = 10 / globalScale;
  const padY = 6 / globalScale;
  const w = textWidth + padX * 2;
  const h = fontSize + padY * 2;
  const rx = x - w / 2;
  const ry = y - h / 2;
  const radius = 6 / globalScale;

  ctx.save();
  ctx.globalAlpha = opacity;

  if (isHovered || isCore) {
    ctx.shadowColor = color;
    ctx.shadowBlur = (isHovered ? 16 : 10) / globalScale;
  }

  roundRect(ctx, rx, ry, w, h, radius);
  ctx.fillStyle = isCore ? '#151515' : '#111111';
  ctx.fill();
  ctx.strokeStyle = isCore ? '#06b6d4' : color;
  ctx.lineWidth = (isCore ? 2 : 1.5) / globalScale;
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = isHovered ? '#ffffff' : '#f4f4f5';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x, y);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.restore();
}

export function getTechPillBounds(
  label: string,
  globalScale: number,
  isHovered: boolean,
) {
  const fontSize = Math.max(11, (isHovered ? 13 : 12) / globalScale);
  const padX = 10 / globalScale;
  const padY = 6 / globalScale;
  const w = label.length * fontSize * 0.55 + padX * 2;
  const h = fontSize + padY * 2;
  return { w, h };
}
