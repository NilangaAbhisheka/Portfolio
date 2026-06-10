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
