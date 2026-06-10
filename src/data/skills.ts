import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Backend',
    icon: 'Server',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'Spring Boot', 'ASP.NET Core'],
  },
  {
    name: 'Frontend',
    icon: 'Monitor',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit'],
  },
  {
    name: 'Databases',
    icon: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'ChromaDB'],
  },
  {
    name: 'AI / ML',
    icon: 'Brain',
    skills: ['TensorFlow', 'Scikit-learn', 'Prophet', 'LangChain', 'OpenAI Embeddings'],
  },
  {
    name: 'Mobile',
    icon: 'Smartphone',
    skills: ['Flutter', 'Dart', 'React Native', 'Expo', 'Firebase'],
  },
  {
    name: 'DevOps',
    icon: 'Container',
    skills: ['Docker', 'Docker Compose', 'GitHub Actions', 'Git', 'CI/CD'],
  },
];
