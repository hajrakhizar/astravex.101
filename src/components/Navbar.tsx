import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Rocket,
  Award,
  Scale
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenPayloadModal: () => void;
  onOpenQuizModal: () => void;
  cadetScore: number;
  cadetRank: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate,
  onOpenPayloadModal,
  onOpenQuizModal,
  cadetScore,
  cadetRank
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const newState = spaceAudio.toggleMute();
    setIsPlayingAudio(newState);
  };

  const navLinks = [
    { label: '3D Holograms', id: 'interactive-3d-lab' },
    { label: 'Surface Map', id: 'mission-map' },
    { label: 'Artifact Gallery', id: 'artifacts' },
    { label: 'Why Left Behind', id: 'why-left-behind' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    spaceAudio.playClick();
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-40 bg-[#060a17]/90 backdrop-blur-md border-b border-slate-800 transition-all font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div 
          onClick={() => handleNavClick('hero')}
          className="cursor-pointer group flex items-center gap-2.5 whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/25 transition-all">
            <Rocket className="w-4 h-4" />
          </div>
          <span className="font-space text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
            Beyond the Mission
          </span>
        </div>

        {/* Zone 2: Clean single-line text navigation links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Zone 3: 1 primary action & sound control */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Audio SFX Toggle */}
          <button
            onClick={toggleSound}
            title={isPlayingAudio ? 'Mute space sound' : 'Unmute space sound'}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer"
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* 50kg Challenge Button */}
          <button
            onClick={() => {
              spaceAudio.playClick();
              onOpenPayloadModal();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-500/40 hover:border-amber-400 text-xs font-mono text-amber-300 hover:text-white transition-all cursor-pointer"
            title="Launch 50kg Lunar Liftoff Challenge"
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>50kg Liftoff Sim</span>
          </button>

          {/* Cadet Quiz Button */}
          <button
            onClick={() => {
              spaceAudio.playClick();
              onOpenQuizModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-sm"
            title="Take Cadet Quiz"
          >
            <Award className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Cadet Quiz</span>
            <span className="md:hidden">Quiz</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-950/20 text-[10px]">
              {cadetScore}/5
            </span>
          </button>

          {/* astravex 101 written in small font on top right corner */}
          <div 
            className="flex items-center text-[10px] sm:text-[11px] font-mono text-cyan-400/90 tracking-wide lowercase px-2 py-1 rounded bg-cyan-950/70 border border-cyan-500/40 select-none shadow-xs shrink-0"
            title="astravex 101"
          >
            astravex 101
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              spaceAudio.playClick();
            }}
            className="lg:hidden p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#060a17] border-b border-slate-800 space-y-2 text-left">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-cyan-950/40 hover:text-cyan-300 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenPayloadModal();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg bg-amber-950/40 border border-amber-600/50 text-amber-300 text-xs font-mono text-center flex items-center justify-center gap-1.5"
            >
              <Scale className="w-3.5 h-3.5" /> 50kg Challenge
            </button>
            <button
              onClick={() => {
                onOpenQuizModal();
                setMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold text-center flex items-center justify-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" /> Cadet Quiz
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
