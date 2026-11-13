import React, { useState, useMemo } from 'react';
import { SpaceObject, CelestialBody } from '../types';
import { 
  Rocket, 
  MapPin, 
  Rotate3d, 
  ArrowRight,
  Search,
  Sparkles,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface ArtifactGalleryProps {
  objects: SpaceObject[];
  onSelectObject: (obj: SpaceObject) => void;
  onLaunch3D: (modelKey: 'lrv' | 'sojourner' | 'ingenuity' | 'lunar_module' | 'retroreflector') => void;
}

export const ArtifactGallery: React.FC<ArtifactGalleryProps> = ({ 
  objects, 
  onSelectObject,
  onLaunch3D
}) => {
  const [worldFilter, setWorldFilter] = useState<'all' | CelestialBody | 'active'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredObjects = useMemo(() => {
    return objects.filter((obj) => {
      const matchesSearch = 
        obj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj.storyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj.mission.toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj.curiosityHook.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      if (worldFilter === 'active') return obj.status === 'operational';
      if (worldFilter !== 'all') return obj.celestialBody === worldFilter;
      return true;
    });
  }, [objects, worldFilter, searchTerm]);

  return (
    <section id="artifacts" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="max-w-xl text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vital Relics on Moon & Mars</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">{objects.length} Total Relics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-space text-white tracking-tight">
            The Planetary Artifact Gallery
          </h2>
          <p className="text-slate-300 text-sm mt-1.5 leading-relaxed">
            Every machine below made a one-way trip into space. Tap any artifact to read its full story or launch its 3D model.
          </p>
        </div>

        {/* Filter Controls (Single segmented row) */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <button
              onClick={() => {
                setWorldFilter('all');
                spaceAudio.playClick();
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                worldFilter === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({objects.length})
            </button>
            <button
              onClick={() => {
                setWorldFilter('Moon');
                spaceAudio.playClick();
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                worldFilter === 'Moon'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Moon 🌙
            </button>
            <button
              onClick={() => {
                setWorldFilter('Mars');
                spaceAudio.playClick();
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                worldFilter === 'Mars'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mars 🔴
            </button>
            <button
              onClick={() => {
                setWorldFilter('active');
                spaceAudio.playClick();
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                worldFilter === 'active'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              Active Today ✨
            </button>
          </div>

          {/* Quick search input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-36 sm:w-48"
            />
          </div>
        </div>
      </div>

      {/* Grid of Concise, High-Impact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredObjects.map((obj) => (
          <article
            key={obj.id}
            onClick={() => {
              onSelectObject(obj);
              spaceAudio.playTelemetryChirp();
            }}
            className="group rounded-xl bg-[#090e21] border border-slate-800 hover:border-cyan-500/50 transition-all duration-200 overflow-hidden flex flex-col justify-between text-left cursor-pointer shadow-md hover:-translate-y-1 hover:shadow-cyan-950/30"
          >
            <div>
              {/* Photo Banner with Minimal Info */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                <img
                  src={obj.imageUrl}
                  alt={obj.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090e21] via-transparent to-black/30 pointer-events-none" />

                {/* World & Year Metadata */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 text-[11px] font-mono">
                  <span className={`px-2 py-0.5 rounded font-semibold backdrop-blur-md ${
                    obj.celestialBody === 'Moon' 
                      ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60' 
                      : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                  }`}>
                    {obj.celestialBody}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/70 text-slate-300 font-mono">
                    {obj.arrivalYear}
                  </span>
                </div>

                {/* 3D Model Quick Trigger Button */}
                {obj.has3DModel && obj.modelKey && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (obj.modelKey) onLaunch3D(obj.modelKey);
                    }}
                    className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 text-[11px] font-bold flex items-center gap-1 transition-colors shadow-sm cursor-pointer"
                    title="Launch 3D View"
                  >
                    <Rotate3d className="w-3 h-3" />
                    <span>3D</span>
                  </button>
                )}

                {/* Bottom Mission */}
                <div className="absolute bottom-2 left-2.5 text-xs font-mono text-cyan-300 flex items-center gap-1">
                  <Rocket className="w-3 h-3" />
                  <span>{obj.mission}</span>
                </div>
              </div>

              {/* Vital Narrative Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold font-space text-white group-hover:text-cyan-300 transition-colors">
                  {obj.storyTitle}
                </h3>
                <div className="text-xs text-slate-400 font-mono mt-0.5 mb-2">
                  {obj.name}
                </div>

                {/* Curiosity Question */}
                <div className="text-xs text-cyan-200/90 italic mb-2.5 flex items-start gap-1.5 leading-snug">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>"{obj.curiosityHook}"</span>
                </div>

                {/* 1 Vital Fun Fact */}
                <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/30 text-[11px] text-amber-300/90 flex items-start gap-1.5 leading-relaxed">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2"><strong>Vital detail:</strong> {obj.funFact}</span>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="p-3 px-4 bg-[#060a17] border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="truncate max-w-[170px] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="truncate">{obj.coordinates.craterOrRegion}</span>
              </span>
              <span className="text-cyan-400 group-hover:text-cyan-300 font-semibold flex items-center gap-1 shrink-0">
                <span>Story</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredObjects.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-sm font-mono">
          No artifacts found matching &quot;{searchTerm}&quot;.
        </div>
      )}
    </section>
  );
};
