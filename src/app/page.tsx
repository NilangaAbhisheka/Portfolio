import Navbar from '@/components/shared/Navbar';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a]">
      <Navbar />
      {/* Sections will be added here as they are built */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="font-mono text-[#a1a1aa] text-sm">
          <span className="text-[#06b6d4]">●</span> Mission Control — initialising...
        </div>
      </div>
    </main>
  );
}
