import Navbar from '@/components/shared/Navbar';
import HeroSection from '@/sections/HeroSection';
import SnapshotSection from '@/sections/SnapshotSection';
import ProjectsSection from '@/sections/ProjectsSection';
import ArchitectureSection from '@/sections/ArchitectureSection';
import TimelineSection from '@/sections/TimelineSection';
import ContactSection from '@/sections/ContactSection';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <HeroSection />
      <SnapshotSection />
      <ProjectsSection />
      <ArchitectureSection />
      <TimelineSection />
      <ContactSection />
    </main>
  );
}
