import type { TechGraphData } from '@/types';

export const CORE_STACK = [
  'React',
  'TypeScript',
  'Node.js',
  'FastAPI',
  'PostgreSQL',
  'Docker',
] as const;

export const techGraph: TechGraphData = {
  nodes: [
    // Core stack
    {
      id: 'React',
      group: 'Frontend',
      level: 92,
      years: 3,
      isCore: true,
      description:
        'Primary UI library for enterprise dashboards, admin systems, and full-stack web applications.',
      projects: ['Warehouse Management System', 'EduManager', 'EventGo'],
      achievements: ['Built 5+ production React applications', 'Complex state management with Redux Toolkit'],
    },
    {
      id: 'TypeScript',
      group: 'Frontend',
      level: 90,
      years: 3,
      isCore: true,
      description:
        'Strongly typed development across React, Next.js, and Node.js backends for safer, scalable codebases.',
      projects: ['EduManager', 'Warehouse Management System'],
      achievements: ['End-to-end type safety in full-stack projects'],
    },
    {
      id: 'Node.js',
      group: 'Backend',
      level: 90,
      years: 3,
      isCore: true,
      description:
        'JavaScript runtime for REST APIs, real-time systems, and full-stack JavaScript architectures.',
      projects: ['Warehouse Management System', 'EventGo'],
      achievements: ['JWT auth systems', 'MongoDB-backed REST APIs'],
    },
    {
      id: 'FastAPI',
      group: 'Backend',
      level: 88,
      years: 2,
      isCore: true,
      description:
        'High-performance Python API framework for ML inference services, authentication APIs, and AI systems.',
      projects: ['SpendWise', 'TraceIQ'],
      achievements: ['ML inference endpoints under 200ms', 'Async PostgreSQL integration'],
    },
    {
      id: 'PostgreSQL',
      group: 'Database',
      level: 85,
      years: 2,
      isCore: true,
      description:
        'Relational database for transactional systems, financial data, and structured application state.',
      projects: ['SpendWise', 'MotorMart'],
      achievements: ['Schema design for finance and enterprise data'],
    },
    {
      id: 'Docker',
      group: 'DevOps',
      level: 82,
      years: 2,
      isCore: true,
      description:
        'Containerization for reproducible dev environments, CI/CD pipelines, and service deployment.',
      projects: ['EduManager', 'SpendWise'],
      achievements: ['Multi-service Docker Compose setups', 'CI/CD container builds'],
    },

    // Frontend
    {
      id: 'Next.js',
      group: 'Frontend',
      level: 85,
      years: 2,
      description: 'React framework for SSR, SSG, and production-grade web applications.',
      projects: ['EventGo'],
    },
    {
      id: 'Tailwind CSS',
      group: 'Frontend',
      level: 85,
      years: 2,
      description: 'Utility-first CSS for rapid, consistent UI development across projects.',
      projects: ['Warehouse Management System', 'EduManager'],
    },
    {
      id: 'Redux Toolkit',
      group: 'Frontend',
      level: 78,
      years: 2,
      description: 'Predictable state management for complex React dashboards and enterprise UIs.',
      projects: ['Warehouse Management System', 'EduManager'],
    },

    // Backend
    {
      id: 'Python',
      group: 'Backend',
      level: 88,
      years: 3,
      description: 'Primary language for AI/ML systems, FastAPI backends, and data engineering pipelines.',
      projects: ['SpendWise', 'TraceIQ', 'MovieMind', 'Student Grade Predictor'],
    },
    {
      id: 'Express.js',
      group: 'Backend',
      level: 85,
      years: 3,
      description: 'Lightweight Node.js framework for REST APIs and middleware-heavy backends.',
      projects: ['Warehouse Management System'],
    },
    {
      id: 'Spring Boot',
      group: 'Backend',
      level: 72,
      years: 2,
      description: 'Enterprise Java framework for secure, scalable educational and business systems.',
      projects: ['EduManager'],
    },
    {
      id: 'ASP.NET Core',
      group: 'Backend',
      level: 65,
      years: 1,
      description: 'Microsoft web framework for enterprise APIs and marketplace platforms.',
      projects: ['MotorMart'],
    },

    // Database
    {
      id: 'MongoDB',
      group: 'Database',
      level: 80,
      years: 2,
      description: 'Document database for flexible inventory schemas and real-time data.',
      projects: ['Warehouse Management System'],
    },
    {
      id: 'MySQL',
      group: 'Database',
      level: 75,
      years: 2,
      description: 'Relational database for traditional enterprise and educational systems.',
      projects: ['EduManager', 'MotorMart'],
    },
    {
      id: 'Redis',
      group: 'Database',
      level: 78,
      years: 2,
      description: 'In-memory cache for ML prediction results and session management.',
      projects: ['SpendWise'],
    },
    {
      id: 'ChromaDB',
      group: 'Database',
      level: 72,
      years: 1,
      description: 'Vector database for semantic search and AI recommendation systems.',
      projects: ['StoryMancer'],
    },

    // AI / ML
    {
      id: 'TensorFlow',
      group: 'AI',
      level: 78,
      years: 2,
      description: 'Deep learning framework for prediction models and anomaly detection pipelines.',
      projects: ['SpendWise'],
    },
    {
      id: 'Scikit-learn',
      group: 'AI',
      level: 72,
      years: 2,
      description: 'Classical ML library for regression, classification, and recommendation systems.',
      projects: ['MovieMind', 'Student Grade Predictor'],
    },
    {
      id: 'LangChain',
      group: 'AI',
      level: 74,
      years: 1,
      description: 'LLM orchestration for RAG pipelines and semantic recommendation engines.',
      projects: ['StoryMancer'],
    },
    {
      id: 'OpenAI Embeddings',
      group: 'AI',
      level: 76,
      years: 1,
      description: 'Vector embeddings for semantic search and story similarity matching.',
      projects: ['StoryMancer'],
    },
    {
      id: 'Prophet',
      group: 'AI',
      level: 68,
      years: 1,
      description: 'Time-series forecasting for spending predictions and financial trend analysis.',
      projects: ['SpendWise'],
    },

    // Mobile
    {
      id: 'Flutter',
      group: 'Mobile',
      level: 72,
      years: 2,
      description: 'Cross-platform mobile framework for government service and citizen-facing apps.',
      projects: ['VillageConnect'],
    },
    {
      id: 'React Native',
      group: 'Mobile',
      level: 76,
      years: 2,
      description: 'Mobile framework sharing React knowledge for finance and utility applications.',
      projects: ['SpendWise'],
    },
    {
      id: 'Firebase',
      group: 'Mobile',
      level: 70,
      years: 2,
      description: 'Backend-as-a-service for mobile auth, real-time data, and push notifications.',
      projects: ['VillageConnect'],
    },

    // DevOps & Cloud
    {
      id: 'Docker Compose',
      group: 'DevOps',
      level: 76,
      years: 2,
      description: 'Multi-container orchestration for local dev and staging environments.',
      projects: ['EduManager'],
    },
    {
      id: 'GitHub Actions',
      group: 'DevOps',
      level: 78,
      years: 2,
      description: 'CI/CD automation for build, test, and deploy pipelines.',
      projects: ['EduManager', 'TraceIQ'],
    },
    {
      id: 'Git',
      group: 'Tools',
      level: 92,
      years: 4,
      description: 'Version control for all projects — branching, PRs, and collaborative development.',
      projects: [],
    },
    {
      id: 'CI/CD',
      group: 'DevOps',
      level: 80,
      years: 2,
      description: 'Automated build and deployment pipelines for production-ready delivery.',
      projects: ['EduManager'],
    },
    {
      id: 'Kubernetes',
      group: 'Cloud',
      level: 62,
      years: 1,
      description: 'Container orchestration for scalable cloud-native deployments.',
      projects: [],
    },
    {
      id: 'AWS',
      group: 'Cloud',
      level: 65,
      years: 1,
      description: 'Cloud infrastructure for hosting, storage, and managed services.',
      projects: [],
    },
  ],

  links: [
    // Core stack connections
    { source: 'React', target: 'TypeScript', strength: 2 },
    { source: 'React', target: 'Next.js', strength: 2 },
    { source: 'React', target: 'Tailwind CSS', strength: 1.5 },
    { source: 'React', target: 'Redux Toolkit', strength: 1.5 },
    { source: 'Next.js', target: 'Node.js', strength: 1.5 },
    { source: 'Node.js', target: 'PostgreSQL', strength: 2 },
    { source: 'Node.js', target: 'Docker', strength: 2 },
    { source: 'FastAPI', target: 'PostgreSQL', strength: 2 },
    { source: 'FastAPI', target: 'Docker', strength: 2 },
    { source: 'Docker', target: 'PostgreSQL', strength: 1 },

    // Backend
    { source: 'Node.js', target: 'Express.js', strength: 2 },
    { source: 'Python', target: 'FastAPI', strength: 2 },
    { source: 'Spring Boot', target: 'MySQL', strength: 1.5 },

    // Database
    { source: 'MongoDB', target: 'Node.js', strength: 1.5 },
    { source: 'Redis', target: 'FastAPI', strength: 1.5 },
    { source: 'ChromaDB', target: 'LangChain', strength: 2 },

    // AI
    { source: 'TensorFlow', target: 'Python', strength: 2 },
    { source: 'TensorFlow', target: 'FastAPI', strength: 2 },
    { source: 'Scikit-learn', target: 'Python', strength: 2 },
    { source: 'LangChain', target: 'OpenAI Embeddings', strength: 2 },
    { source: 'Prophet', target: 'Python', strength: 1.5 },

    // DevOps & Cloud
    { source: 'Docker', target: 'Docker Compose', strength: 2 },
    { source: 'Docker', target: 'Kubernetes', strength: 1.5 },
    { source: 'Docker', target: 'AWS', strength: 1.5 },
    { source: 'Kubernetes', target: 'AWS', strength: 1.5 },
    { source: 'GitHub Actions', target: 'CI/CD', strength: 2 },
    { source: 'Docker', target: 'GitHub Actions', strength: 1.5 },
    { source: 'Git', target: 'GitHub Actions', strength: 1 },

    // Mobile
    { source: 'React Native', target: 'React', strength: 2 },
    { source: 'Firebase', target: 'Flutter', strength: 1.5 },

    // Cross-domain
    { source: 'TypeScript', target: 'Node.js', strength: 1.5 },
  ],
};
