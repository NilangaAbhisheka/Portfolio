import projectsData from '../../public/data/projects.json';
import type { Project } from '@/types';

export const projects: Project[] = projectsData as Project[];

export const featuredProjects = projects.filter((p) => p.featured);
