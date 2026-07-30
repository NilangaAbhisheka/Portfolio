import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Backend',
    icon: 'Server',
    level: 'Advanced',
    skills: ['Node.js', 'Express.js', 'NestJS', 'FastAPI', 'Spring Boot', 'ASP.NET Core'],
    projects: ["CravesDT", "SpendWise", "TraceIQ", "Warehouse System"],
  },
  {
    name: 'Frontend',
    icon: 'Monitor',
    level: "Advanced",
    skills: ['React', 'Next.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'Zustand'],
    projects: ["CravesDT", "Warehouse System", "EduManager"],
  },
  {
    name: 'Databases',
    icon: 'Database',
    level: "Strong",
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'ChromaDB', 'Prisma'],
    projects: ["CravesDT", "SpendWise", "MotorMart"],
  },
  {
    name: 'AI / ML',
    icon: 'Brain',
    level: "Intermediate" ,
    skills: ['TensorFlow', 'Scikit-learn', 'Prophet', 'LangChain', 'OpenAI Embeddings'],
    projects: ["MovieMind", "SpendWise", "TraceIQ",]

  },
  {
    name: 'Mobile',
    icon: 'Smartphone',
    level: "Intermediate",
    skills: ['Flutter', 'Dart', 'React Native', 'Expo', 'Firebase'],
    projects: ["VillageConnect",]
  },
  {
    name: 'DevOps',
    icon: 'Container',
    level: 'Strong',
    skills: ['Docker', 'Docker Compose', 'GitHub Actions', 'Git', 'CI/CD'],
    projects: ['SpendWise (containerized API)','TraceIQ (deployment pipeline)' ,'Warehouse System (multi-service architecture)'],
  },
];
