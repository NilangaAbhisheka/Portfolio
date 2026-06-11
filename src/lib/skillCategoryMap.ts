import type { SkillCategory } from '@/types';
import type { TechCategory } from '@/types';

const SKILL_TO_TECH_CATEGORY: Record<string, TechCategory> = {
  Backend: 'Backend',
  Frontend: 'Frontend',
  Databases: 'Database',
  'AI / ML': 'AI',
  Mobile: 'Mobile',
  DevOps: 'DevOps',
};

export function skillCategoryToTechCategory(name: string): TechCategory | null {
  return SKILL_TO_TECH_CATEGORY[name] ?? null;
}

export function techCategoryToSkillName(category: TechCategory): string {
  const entry = Object.entries(SKILL_TO_TECH_CATEGORY).find(([, tech]) => tech === category);
  return entry?.[0] ?? category;
}

export function isSkillCardActive(
  skill: SkillCategory,
  activeCategory: TechCategory | 'All',
): boolean {
  if (activeCategory === 'All') return false;
  return skillCategoryToTechCategory(skill.name) === activeCategory;
}
