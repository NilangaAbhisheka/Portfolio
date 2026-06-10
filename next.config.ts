import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow JSON imports from public/data via the typed loaders
  // (Next.js supports JSON imports natively via TypeScript resolveJsonModule)

  // Optimise images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
