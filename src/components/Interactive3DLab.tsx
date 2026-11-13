import React, { useState } from 'react';
import { ModelKey, SpaceObject } from '../types';
import { SPACE_OBJECTS } from '../data/spaceObjects';
import { ThreeViewer } from './Viewer3D/ThreeViewer';
import { 
  Rotate3d, 
  BookOpen, 
  ChevronRight,
  Gauge,
  Zap,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface Interactive3DLabProps {
  onOpenObjectDossier: (obj: SpaceObject) => void;
  activeModelKeyOverride?: ModelKey | null;
}

export const Interactive3DLab: React.FC<Interactive3DLabProps> = ({ 
  onOpenObjectDossier,
  activeModelKeyOverride
}) => {
  const [activeKey, setActiveKey] = useState<ModelKey>(activeModelKeyOverride || 'lrv');

  React.useEffect(() => {
    if (activeModelKeyOverride) {
      setActiveKey(activeModelKeyOverride);
    }
  }, [activeModelKeyOverride]);

  const modelsCatalog: Array<{
    key: ModelKey;
    storyTitle: string;
    officialName: string;
    icon: string;
    mission: string;
    world: 'Moon' | 'Mars';
    topSpeed: string;
    earthMass: string;
    targetWorldWeight: string;
    powerSystem: string;
    curiosityQuestion: string;
    narrativeSummary: string;
    associatedObjectId: string;
  }> = [
    {
      key: 'lrv',
      storyTitle: 'The Cosmic Dune Buggy',
      officialName: 'Apollo Lunar Roving Vehicle (LRV)',
      icon: '🚙',
      mission: 'Apollo 15, 16, 17',
      world: 'Moon',
      topSpeed: '18 km/h (11.2 mph)',
      earthMass: '210 kg (462 lbs)',
      targetWorldWeight: '35 kg (77 lbs) on the Moon!',
      powerSystem: 'Electric batteries with separate motors for each wheel',
      curiosityQuestion: 'Why did its tires have no rubber at all?',
      narrativeSummary: 'The first car driven on another world. Folded like an origami chair inside the lander, it allowed astronauts to zoom across lunar craters and park at the edge of a canyon to film their own liftoff.',
      associatedObjectId: 'lrv-apollo-15',
    },
    {
      key: 'sojourner',
      storyTitle: 'The Brave Little Microwave',
      officialName: 'Sojourner Mars Rover',
      icon: '🤖',
      mission: 'Mars Pathfinder (1997)',
      world: 'Mars',
      topSpeed: '1 cm per second (Super slow & careful)',
      earthMass: '11.5 kg (25 lbs)',
      targetWorldWeight: '4.3 kg (9.5 lbs) on Mars',
      powerSystem: 'Small solar roof panel generating 16 Watts',
      curiosityQuestion: 'How did a microwave-sized robot climb giant rocks?',
      narrativeSummary: 'Humanity\'s first wheels on Mars! It crept across the red sands at a snail\'s pace, sniffing rocks named "Barnacle Bill" and "Yogi", proving mobile exploration was possible.',
      associatedObjectId: 'sojourner-rover',
    },
    {
      key: 'ingenuity',
      storyTitle: 'The Wright Brothers\' Drone',
      officialName: 'Ingenuity Mars Helicopter',
      icon: '🚁',
      mission: 'Mars 2020 / Perseverance',
      world: 'Mars',
      topSpeed: '36 km/h (22 mph)',
      earthMass: '1.8 kg (4.0 lbs)',
      targetWorldWeight: '0.68 kg (1.5 lbs) on Mars',
      powerSystem: 'Solar panel charging phone-sized lithium batteries',
      curiosityQuestion: 'How can you fly in air less than 1% as thick as Earth?',
      narrativeSummary: 'The first flying aircraft on another planet. It spun its carbon blades five times faster than an Earth helicopter to grab the razor-thin air, completing 72 breathtaking flights.',
      associatedObjectId: 'ingenuity-helicopter',
    },
    {
      key: 'lunar_module',
      storyTitle: 'The World\'s Loneliest Launchpad',
      officialName: 'Apollo Lunar Module Descent Stage',
      icon: '🛸',
      mission: 'Apollo 11, 12, 14, 15, 16, 17',
      world: 'Moon',
      topSpeed: 'Stationary Launch Base',
      earthMass: '2,034 kg (empty dry mass)',
      targetWorldWeight: '339 kg on the Moon',
      powerSystem: 'Silver-Zinc batteries wrapped in gold thermal foil',
      curiosityQuestion: 'Why is the bottom half standing all alone in the dust?',
      narrativeSummary: 'The golden platform where humanity first touched another world. It served as the launchpad when the astronauts blasted home, keeping the historic peace plaque bolted to its leg.',
      associatedObjectId: 'apollo-11-descent-stage',
    },
    {
      key: 'retroreflector',
      storyTitle: 'The Forever Mirror',
      officialName: 'Apollo Lunar Laser Retroreflector',
      icon: '🪞',
      mission: 'Apollo 11, 14, 15',
      world: 'Moon',
      topSpeed: 'Stationary Laser Target',
      earthMass: '30 kg (66 lbs)',
      targetWorldWeight: '5 kg on the Moon',
      powerSystem: '100% Passive (Needs zero batteries or electricity!)',
      curiosityQuestion: 'How does it reflect laser beams from Texas after 55 years?',
      narrativeSummary: 'A suitcase-sized tray holding 100 quartz crystal prisms. Because it needs no power, scientists on Earth still bounce green laser pulses off it every month to measure the Moon\'s orbit.',
      associatedObjectId: 'lrrr-apollo-11',
    },
  ];

  const currentModel = modelsCatalog.find((m) => m.key === activeKey) || modelsCatalog[0];
  const linkedObject = SPACE_OBJECTS.find((o) => o.id === currentModel.associatedObjectId) || SPACE_OBJECTS[0];

  return (
    <section id="interactive-3d-lab" className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
          <Rotate3d className="w-3.5 h-3.5" />
          <span>Interactive 3D Hardware Lab</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">Drag to Rotate & Zoom</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space text-white tracking-tight">
          Up Close with Extraterrestrial Machines
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          Spin, zoom, and inspect real 3D models of legendary machines resting on the Moon and Mars. Tap the pulsing points to discover what makes them work.
        </p>
      </div>

      {/* Selector Tabs (Clean segmented button bar) */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-6 font-medium text-xs">
        {modelsCatalog.map((m) => (
          <button
            key={m.key}
            onClick={() => {
              setActiveKey(m.key);
              spaceAudio.playClick();
            }}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
              activeKey === m.key
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <span>{m.icon}</span>
            <span>{m.storyTitle}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              m.world === 'Moon' ? 'bg-slate-800 text-slate-300' : 'bg-red-950 text-red-300'
            }`}>
              {m.world}
            </span>
          </button>
        ))}
      </div>

      {/* Main 3D Stage & Story Card */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        
        {/* Left 3 Cols: 3D Canvas */}
        <div className="lg:col-span-3 rounded-xl bg-[#070b19] border border-cyan-500/30 overflow-hidden relative shadow-2xl min-h-[460px] flex flex-col justify-between">
          <ThreeViewer
            modelKey={activeKey}
            objectName={currentModel.storyTitle}
            missionName={currentModel.mission}
            hotspots={linkedObject?.hotspots || []}
            className="w-full h-[480px]"
          />
        </div>

        {/* Right 1 Col: Story Card */}
        <div className="rounded-xl bg-[#090e21] border border-slate-800 p-5 flex flex-col justify-between text-left shadow-xl space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
              <span className="font-semibold uppercase">{currentModel.world} Artifact</span>
              <span className="text-slate-400">{currentModel.mission}</span>
            </div>

            <h3 className="text-xl font-bold font-space text-white leading-tight">
              {currentModel.storyTitle}
            </h3>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              {currentModel.officialName}
            </div>

            {/* Curiosity Hook */}
            <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 my-3 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span className="leading-snug font-medium">"{currentModel.curiosityQuestion}"</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentModel.narrativeSummary}
            </p>

            {/* Digestible Quick Facts */}
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" /> Top Speed:
                </span>
                <span className="text-white font-semibold">{currentModel.topSpeed}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" /> Weight There:
                </span>
                <span className="text-emerald-300 font-bold">{currentModel.targetWorldWeight}</span>
              </div>

              <div className="pt-1">
                <span className="text-slate-400 block text-[10px] uppercase">Power Source:</span>
                <span className="text-[11px] text-slate-200 block">
                  {currentModel.powerSystem}
                </span>
              </div>
            </div>
          </div>

          {/* Action button to open full story */}
          <button
            onClick={() => {
              spaceAudio.playTelemetryChirp();
              onOpenObjectDossier(linkedObject);
            }}
            className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read Complete Story</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
