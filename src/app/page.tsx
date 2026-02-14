"use client";

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SlideTabsNavbar } from "@/components/layout/slide-tabs-navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { FacultyCarousel } from "@/components/sections/faculty-carousel";
import { AwardsTicker } from "@/components/sections/awards-ticker";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { EventsPreview } from "@/components/sections/events-preview";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { InteractiveGrid } from "@/components/ui/interactive-grid";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#EAEAEA] relative">
      <InteractiveGrid />
      <AnimatePresence mode='wait'>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="animate-in fade-in duration-1000 relative z-10">
          <SlideTabsNavbar />
          <Hero />
          <Stats />
          <AwardsTicker />
          <FacultyCarousel />
          <ProjectsPreview />
          <EventsPreview />
          <Footer />
        </div>
      )}
    </main>
  );
}
