'use client';

import {
  Brain,
  Container,
  Database,
  Monitor,
  Server,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { CATEGORY_COLORS } from '@/lib/galaxyUtils';
import { skillCategoryToTechCategory } from '@/lib/skillCategoryMap';
import type { SkillCategory } from '@/types';
import type { TechCategory } from '@/types';

const ICON_MAP: Record<string, LucideIcon> = {
  Server,
  Monitor,
  Database,
  Brain,
  Smartphone,
  Container,
};

interface SkillCardProps {
  category: SkillCategory;
  isActive?: boolean;
  onSelect?: (techCategory: TechCategory) => void;
}

export default function SkillCard({ category, isActive, onSelect }: SkillCardProps) {
  const Icon = ICON_MAP[category.icon ?? 'Server'] ?? Server;
  const techCategory = skillCategoryToTechCategory(category.name);
  const accent = techCategory ? CATEGORY_COLORS[techCategory] : '#3b82f6';

  return (
    <button
      type="button"
      onClick={() => techCategory && onSelect?.(techCategory)}
      className={`group w-full min-h-[44px] rounded-xl border bg-[#111111] p-5 text-left transition-all ${
        isActive
          ? 'border-[#3b82f6]/50 shadow-[0_0_24px_rgba(59,130,246,0.12)]'
          : 'border-[#262626] hover:border-[#3b82f6]/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#262626]"
          style={{
            backgroundColor: `${accent}14`,
            borderColor: `${accent}33`,
          }}
        >
          <Icon size={18} style={{ color: accent }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-white">{category.name}</h3>
            <span className="shrink-0 text-[10px] font-mono text-[#a1a1aa]">
              {category.level}
            </span>
          </div>
          <p className="mt-2 font-mono text-xs leading-relaxed text-[#a1a1aa]">
            {category.skills.join(' · ')}
          </p>
        </div>
      </div>
      {isActive && (
        <p className="mt-3 text-[10px] font-mono text-[#3b82f6]">
          Highlighted in galaxy ↑
        </p>
      )}
    </button>
  );
}
