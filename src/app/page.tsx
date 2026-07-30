import Navbar from '@/components/shared/Navbar';
import HeroSection from '@/sections/HeroSection';
import SnapshotSection from '@/sections/SnapshotSection';
import LazyProjectsSection from '@/sections/LazyProjectsSection';
import ArchitectureSection from '@/sections/ArchitectureSection';
import ContactSection from '@/sections/ContactSection';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0a0a]">
      <Navbar />
      <HeroSection />
      <div className="mc-grid-bg-soft">
        <SnapshotSection />
        <LazyProjectsSection />
        <ArchitectureSection />
        <ContactSection />
      </div>
    </main>
  );
}
