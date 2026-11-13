import React, { useState } from 'react';
import { SPACE_OBJECTS } from './data/spaceObjects';
import { SpaceObject, ModelKey } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Interactive3DLab } from './components/Interactive3DLab';
import { MissionMap } from './components/MissionMap';
import { ArtifactGallery } from './components/ArtifactGallery';
import { PreservationEthics } from './components/PreservationEthics';
import { Footer } from './components/Footer';
import { ObjectModal } from './components/ObjectModal';
import { PayloadChallengeModal } from './components/PayloadChallengeModal';
import { CadetQuizModal } from './components/CadetQuizModal';

export default function App() {
  const [selectedObject, setSelectedObject] = useState<SpaceObject | null>(null);
  const [modelKeyOverride, setModelKeyOverride] = useState<ModelKey | null>(null);
  const [isPayloadModalOpen, setIsPayloadModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [cadetScore, setCadetScore] = useState(3);
  const [cadetRank, setCadetRank] = useState('Payload Specialist');

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLaunchFeatured3D = (modelKey: ModelKey) => {
    setModelKeyOverride(modelKey);
    const element = document.getElementById('interactive-3d-lab');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuizCompleted = (score: number, rank: string) => {
    setCadetScore(score);
    setCadetRank(rank);
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 relative">
      {/* Top Fixed Navigation Bar */}
      <Navbar
        onNavigate={scrollToSection}
        onOpenPayloadModal={() => setIsPayloadModalOpen(true)}
        onOpenQuizModal={() => setIsQuizModalOpen(true)}
        cadetScore={cadetScore}
        cadetRank={cadetRank}
      />

      <main className="flex-1 w-full">
        {/* 1. Punchy Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('artifacts')}
          onLaunchFeatured3D={handleLaunchFeatured3D}
          onOpenPayloadModal={() => setIsPayloadModalOpen(true)}
          onOpenQuizModal={() => setIsQuizModalOpen(true)}
        />

        {/* 2. Featured Interactive 3D Holographic Hardware Lab */}
        <Interactive3DLab
          onOpenObjectDossier={(obj) => setSelectedObject(obj)}
          activeModelKeyOverride={modelKeyOverride}
        />

        {/* 3. Interactive Planetary Surface Coordinate Map */}
        <MissionMap
          onSelectObject={(obj) => setSelectedObject(obj)}
        />

        {/* 4. Streamlined Planetary Artifact Gallery */}
        <ArtifactGallery
          objects={SPACE_OBJECTS}
          onSelectObject={(obj) => setSelectedObject(obj)}
          onLaunch3D={handleLaunchFeatured3D}
        />

        {/* 4. Vital Explanations: Why We Left Things Behind */}
        <PreservationEthics />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Story & 3D Dossier Modal */}
      {selectedObject && (
        <ObjectModal
          object={selectedObject}
          onClose={() => setSelectedObject(null)}
        />
      )}

      {/* 50kg Lunar Liftoff Physics Challenge Modal */}
      <PayloadChallengeModal
        isOpen={isPayloadModalOpen}
        onClose={() => setIsPayloadModalOpen(false)}
      />

      {/* NASA Space Archaeology Cadet Exam Modal */}
      <CadetQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onQuizCompleted={handleQuizCompleted}
      />
    </div>
  );
}
