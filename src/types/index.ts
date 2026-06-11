export type ProjectCategory =
  | 'AI/ML'
  | 'Backend'
  | 'Frontend'
  | 'Mobile'
  | 'Enterprise'
  | 'Academic';

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: ProjectCategory[];
  featured: boolean;
  technologies: string[];
  highlights: string[];
  architecture?: string;
  challenges?: string[];
  lessonsLearned?: string[];
  githubUrl?: string;
  liveUrl?: string;
  coverImage: string;
  year: number;
}

export interface SkillCategory {
  name: string;
  skills: string[];
  icon?: string;
  level: string;
  projects: string[];
}

export interface Stat {
  label: string;
  value: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
  resume: string;
}

export interface PersonalDetails {
  name: string;
  title: string;
  tagline: string;
  availability: string;
  availabilityStatus: 'open' | 'passive' | 'closed';
  currentFocus: string[];
  stats: {
    projectsBuilt: string;
    technologies: string;
    languages: string;
    yearsCoding: string;
  };
  links: SocialLinks;
  bio: string;
}

export interface AdminCredentials {
  passphrase: string;
}

export type TechCategory =
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'AI'
  | 'DevOps'
  | 'Cloud'
  | 'Mobile'
  | 'Tools';

export interface TechnologyNode {
  id: string;
  group: TechCategory;
  level: number;
  years: number;
  description: string;
  projects: string[];
  achievements?: string[];
  isCore?: boolean;
}

export type GalaxyNodeKind = 'hub' | 'category' | 'tech';

export interface GalaxyHubNode {
  id: string;
  nodeKind: 'hub';
  label: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

export interface GalaxyCategoryNode {
  id: string;
  nodeKind: 'category';
  group: TechCategory;
  label: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

export interface GalaxyTechNode extends TechnologyNode {
  nodeKind: 'tech';
  clusterX: number;
  clusterY: number;
  x?: number;
  y?: number;
}

export type GalaxyGraphNode = GalaxyHubNode | GalaxyCategoryNode | GalaxyTechNode;

export interface TechLink {
  source: string;
  target: string;
  strength?: number;
  kind?: 'hub-category' | 'category-tech' | 'hub-core' | 'peer';
}

export interface TechGraphData {
  nodes: TechnologyNode[];
  links: TechLink[];
}
