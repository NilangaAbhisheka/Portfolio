'use client';

import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import SkillCard from '@/components/shared/SkillCard';
import { isSkillCardActive } from '@/lib/skillCategoryMap';
import type { TechCategory } from '@/types';

interface SkillCardGridProps {
  activeCategory: TechCategory | 'All';
  onCategorySelect: (category: TechCategory | 'All') => void;
}

export default function SkillCardGrid({
  activeCategory,
  onCategorySelect,
}: SkillCardGridProps) {
  const handleSelect = (techCategory: TechCategory) => {
    onCategorySelect(activeCategory === techCategory ? 'All' : techCategory);
  };

  return (
    <div className="mt-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45 }}
        className="mb-6"
      >
        <p className="text-[10px] font-mono text-[#3b82f6] uppercase tracking-widest">
          At a Glance
        </p>
        <h3 className="mt-2 text-lg font-semibold text-white">Quick Reference</h3>
        <p className="mt-2 max-w-xl text-sm text-[#a1a1aa]">
          Scannable skill domains — click a card to highlight matching technologies in the
          galaxy above.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <SkillCard
              category={category}
              isActive={isSkillCardActive(category, activeCategory)}
              onSelect={handleSelect}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
