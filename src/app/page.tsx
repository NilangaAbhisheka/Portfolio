import Navbar from '@/components/shared/Navbar';
import HeroSection from '@/sections/HeroSection';
import SnapshotSection from '@/sections/SnapshotSection';
import LazyProjectsSection from '@/sections/LazyProjectsSection';
import ArchitectureSection from '@/sections/ArchitectureSection';
import TimelineSection from '@/sections/TimelineSection';
import ContactSection from '@/sections/ContactSection';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden mc-grid-bg">
      <Navbar />
      <HeroSection />
      <SnapshotSection />
      <LazyProjectsSection />
      <ArchitectureSection />
      <TimelineSection />
      <ContactSection />
    </main>
  );
}
