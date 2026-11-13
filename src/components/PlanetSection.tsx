import React, { useState } from 'react';
import { SpaceObject, CelestialBody, ObjectStatus } from '../types';
import { 
  Rocket, 
  MapPin, 
  Rotate3d, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Compass
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface PlanetSectionProps {
  celestialBody: CelestialBody;
  objects: SpaceObject[];
  onSelectObject: (obj: SpaceObject) => void;
}

export const PlanetSection: React.FC<PlanetSectionProps> = ({
  celestialBody,
  objects,
  onSelectObject,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'rovers' | 'landers' | 'active'>('all');

  const isMoon = celestialBody === 'Moon';
  const planetObjects = objects.filter((o) => o.celestialBody === celestialBody);

  const filteredObjects = planetObjects.filter((obj) => {
    if (filterMode === 'rovers') return obj.category === 'rover' || obj.category === 'aerial_vehicle';
    if (filterMode === 'landers') return obj.category === 'lander_descent' || obj.category === 'discarded_equipment';
    if (filterMode === 'active') return obj.status === 'operational';
    return true;
  });

  return (
    <section 
      id={isMoon ? "explore-moon" : "explore-mars"} 
      className={`w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 relative ${
        isMoon ? 'bg-[#060a17]' : 'bg-[#0e0813]'
      }`}
    >
      {/* Planetary ambient glow */}
      <div 
        className={`absolute top-0 inset-x-0 h-96 pointer-events-none opacity-25 ${
          isMoon ? 'lunar-radial-glow' : 'mars-radial-glow'
        }`} 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with friendly language and strong narrative hook */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase mb-2 text-cyan-400">
              <Compass className="w-3.5 h-3.5" />
              <span>{isMoon ? 'Lunar Surface Stories' : 'Martian Surface Stories'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">{planetObjects.length} Artifacts</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space text-white tracking-tight">
              {isMoon ? 'Secrets Left in the Lunar Dust' : 'Relics Resting on the Red Planet'}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              {isMoon
                ? 'Because the Moon has no wind, rain, or breathable air, nothing ever decays. Every footprint and abandoned machine sits in total silence, frozen in time exactly as the astronauts left it.'
                : 'Across the freezing red sands and dried river valleys of Mars, robotic adventurers took one-way trips to explore another world. When their missions ended, they became permanent monuments on alien soil.'}
            </p>
          </div>

          {/* Quick World Vital Signs */}
          <div className="flex items-center gap-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 text-xs font-mono text-slate-300">
            <div>
              <span className="text-slate-500 block text-[11px]">Gravity</span>
              <span className="text-sm font-semibold text-white">
                {isMoon ? '1/6th of Earth' : '38% of Earth'}
              </span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <span className="text-slate-500 block text-[11px]">Weather</span>
              <span className="text-sm font-semibold text-amber-300">
                {isMoon ? 'No Air / Complete Silence' : 'Dust Devils & Thin Air'}
              </span>
            </div>
          </div>
        </div>

        {/* Clean Interactive Filter Bar */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-1.5 p-1 bg-slate-950/90 border border-slate-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => {
                setFilterMode('all');
                spaceAudio.playClick();
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Artifacts ({planetObjects.length})
            </button>
            <button
              onClick={() => {
                setFilterMode('rovers');
                spaceAudio.playClick();
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filterMode === 'rovers'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Vehicles & Rovers
            </button>
            <button
              onClick={() => {
                setFilterMode('landers');
                spaceAudio.playClick();
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filterMode === 'landers'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Landers & Gear
            </button>
            {isMoon && (
              <button
                onClick={() => {
                  setFilterMode('active');
                  spaceAudio.playClick();
                }}
                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                  filterMode === 'active'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                Still Active Today ✨
              </button>
            )}
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Showing {filteredObjects.length} stories · Tap any card to discover its secrets
          </div>
        </div>

        {/* Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredObjects.map((obj) => (
            <article
              key={obj.id}
              onClick={() => {
                onSelectObject(obj);
                spaceAudio.playTelemetryChirp();
              }}
              className="group relative rounded-xl bg-[#090e21] border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 overflow-hidden flex flex-col justify-between text-left cursor-pointer shadow-lg hover:-translate-y-1 hover:shadow-cyan-950/20"
            >
              <div>
                {/* Photo Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={obj.imageUrl}
                    alt={obj.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090e21] via-transparent to-black/40 pointer-events-none" />

                  {/* 3D Holo indicator */}
                  {obj.has3DModel && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded bg-black/75 backdrop-blur-sm text-cyan-300 border border-cyan-500/40 text-[11px] font-mono flex items-center gap-1 font-semibold">
                        <Rotate3d className="w-3.5 h-3.5 text-cyan-400" />
                        3D View
                      </span>
                    </div>
                  )}

                  {/* Unboxed Metadata in Photo */}
                  <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-xs font-mono text-slate-200">
                    <span className="flex items-center gap-1 text-cyan-300 font-semibold">
                      <Rocket className="w-3.5 h-3.5" />
                      {obj.mission}
                    </span>
                    <span className="text-slate-300 text-[11px]">
                      Arrived {obj.arrivalYear}
                    </span>
                  </div>
                </div>

                {/* Card Narrative Body */}
                <div className="p-5">
                  {/* Persona Title & Real Name */}
                  <div className="mb-2">
                    <h3 className="text-xl font-bold font-space text-white group-hover:text-cyan-300 transition-colors">
                      {obj.storyTitle}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      {obj.name}
                    </div>
                  </div>

                  {/* Curiosity Hook Box */}
                  <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 mb-3 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-snug font-medium italic">
                      "{obj.curiosityHook}"
                    </span>
                  </div>

                  {/* Digestible Narrative Summary (2 sentences) */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-3">
                    {obj.narrativeStory}
                  </p>

                  {/* Quick Mind-Blowing Secret */}
                  <div className="flex items-start gap-2 text-[11px] text-amber-300/90 bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/30">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2 leading-relaxed">
                      <strong>Wild fact:</strong> {obj.funFact}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Location & Read Story Action */}
              <div className="p-4 px-5 bg-[#060a17] border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1 text-slate-400 truncate max-w-[170px]">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{obj.coordinates.craterOrRegion}</span>
                </span>
                
                <span className="text-cyan-400 font-semibold group-hover:text-cyan-300 flex items-center gap-1 shrink-0">
                  <span>Explore Story</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
