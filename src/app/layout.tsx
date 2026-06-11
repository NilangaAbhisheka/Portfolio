import type { Metadata, Viewport } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nilanga.dev'),
  title: {
    default: 'Nilanga Muthukumarana — Software Engineer',
    template: '%s | Nilanga Muthukumarana',
  },
  description:
    'Full-Stack Developer and AI/ML Enthusiast building scalable systems and intelligent applications. Computer Science Undergraduate.',
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'React Developer',
    'FastAPI Developer',
    'Machine Learning Engineer',
    'Sri Lanka',
    'Computer Science',
    'AI Engineer',
    'Python Developer',
    'Backend Developer',
  ],
  authors: [{ name: 'Nilanga Abhisheka Muthukumarana' }],
  creator: 'Nilanga Abhisheka Muthukumarana',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Nilanga Muthukumarana — Software Engineer',
    description:
      'Full-Stack Developer and AI/ML Enthusiast building scalable systems and intelligent applications.',
    siteName: 'Nilanga Muthukumarana',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nilanga Muthukumarana — Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nilanga Muthukumarana — Software Engineer',
    description: 'Full-Stack Developer and AI/ML Enthusiast.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0a0a0a] text-white">{children}</body>
    </html>
  );
}
