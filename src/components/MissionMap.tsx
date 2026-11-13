import React, { useState } from 'react';
import { CelestialBody, LandingSite, SpaceObject } from '../types';
import { LUNAR_LANDING_SITES, MARS_LANDING_SITES } from '../data/landingSites';
import { SPACE_OBJECTS } from '../data/spaceObjects';
import { 
  Globe, 
  MapPin, 
  Compass, 
  Rotate3d, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface MissionMapProps {
  onSelectObject: (obj: SpaceObject) => void;
}

export const MissionMap: React.FC<MissionMapProps> = ({ onSelectObject }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<CelestialBody>('Moon');
  const [selectedSite, setSelectedSite] = useState<LandingSite | null>(LUNAR_LANDING_SITES[0]);

  const sites = selectedPlanet === 'Moon' ? LUNAR_LANDING_SITES : MARS_LANDING_SITES;

  const projectCoordinates = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 88 + 6;
    const y = ((90 - lat) / 180) * 78 + 11;
    return { left: `${x}%`, top: `${y}%` };
  };

  const handlePlanetChange = (planet: CelestialBody) => {
    setSelectedPlanet(planet);
    const newSites = planet === 'Moon' ? LUNAR_LANDING_SITES : MARS_LANDING_SITES;
    setSelectedSite(newSites[0]);
    spaceAudio.playClick();
  };

  const handleSiteClick = (site: LandingSite) => {
    setSelectedSite(site);
    spaceAudio.playTelemetryChirp();
  };

  const matchedObject = selectedSite
    ? SPACE_OBJECTS.find((o) => 
        o.celestialBody === selectedPlanet && 
        (o.mission.includes(selectedSite.mission) || selectedSite.name.toLowerCase().includes(o.name.toLowerCase().slice(0, 8)))
      ) || SPACE_OBJECTS.find((o) => o.celestialBody === selectedPlanet)
    : null;
  return (
    <section id="mission-map" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans border-t border-slate-800/80">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
          <Globe className="w-3.5 h-3.5" />
          <span>Surface Coordinate Tracker</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">Interactive Planetary Radar</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space text-white tracking-tight">
          Where Did We Leave Them?
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          Explore the exact landing coordinates of human hardware resting across lunar plains and Martian impact craters. Tap any pin to see what is resting there.
        </p>
      </div>

      {/* Planet Toggle Controls */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium">
          <button
            onClick={() => handlePlanetChange('Moon')}
            className={`px-5 py-2 rounded-md transition-all flex items-center gap-2 cursor-pointer ${
              selectedPlanet === 'Moon'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🌙</span>
            <span>The Moon ({LUNAR_LANDING_SITES.length} Landing Sites)</span>
          </button>
          <button
            onClick={() => handlePlanetChange('Mars')}
            className={`px-5 py-2 rounded-md transition-all flex items-center gap-2 cursor-pointer ${
              selectedPlanet === 'Mars'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🔴</span>
            <span>Mars ({MARS_LANDING_SITES.length} Outposts)</span>
          </button>
        </div>
      </div>

      {/* Main Map Interactive Canvas & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Map Display (2 Cols) */}
        <div className="lg:col-span-2 relative rounded-xl bg-[#060914] border border-cyan-500/30 overflow-hidden shadow-2xl p-6 min-h-[460px] flex flex-col justify-between">
          
          {/* Surface texture background stylized representation */}
          <div 
            className={`absolute inset-0 transition-opacity duration-700 pointer-events-none opacity-30 ${
              selectedPlanet === 'Moon' ? 'lunar-radial-glow' : 'mars-radial-glow'
            }`}
          />

          {/* Coordinate Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[25%] left-0 right-0 border-b border-slate-800/60" />
            <div className="absolute top-[50%] left-0 right-0 border-b border-slate-700/60 flex justify-between px-3 text-[10px] font-mono text-slate-600">
              <span>EQUATOR 0°</span>
              <span>EQUATOR 0°</span>
            </div>
            <div className="absolute top-[75%] left-0 right-0 border-b border-slate-800/60" />

            <div className="absolute left-[25%] top-0 bottom-0 border-r border-slate-800/60" />
            <div className="absolute left-[50%] top-0 bottom-0 border-r border-slate-700/60 flex flex-col justify-between py-2 text-[10px] font-mono text-slate-600 items-center">
              <span>PRIME MERIDIAN 0°</span>
              <span>PRIME MERIDIAN 0°</span>
            </div>
            <div className="absolute left-[75%] top-0 bottom-0 border-r border-slate-800/60" />
          </div>

          {/* Top Map HUD readout */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
              <Compass className="w-4 h-4" />
              <span>{selectedPlanet} Cylindrical Surface Projection</span>
            </div>
            <div className="text-slate-400">
              Tap any pin to view site details
            </div>
          </div>

          {/* Planet Surface Craters / Basin Visual Markings */}
          <div className="relative w-full h-[340px] my-4 select-none">
            {selectedPlanet === 'Moon' ? (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[35%] left-[54%] w-32 h-24 rounded-full bg-slate-800/30 blur-md border border-slate-700/20" />
                <span className="absolute top-[40%] left-[56%] text-[10px] font-mono text-slate-500">Sea of Tranquility</span>
                <div className="absolute top-[25%] left-[45%] w-36 h-28 rounded-full bg-slate-800/30 blur-md border border-slate-700/20" />
                <span className="absolute top-[22%] left-[44%] text-[10px] font-mono text-slate-500">Mare Imbrium</span>
                <div className="absolute top-[45%] left-[20%] w-48 h-36 rounded-full bg-slate-800/30 blur-md border border-slate-700/20" />
                <span className="absolute top-[52%] left-[25%] text-[10px] font-mono text-slate-500">Ocean of Storms</span>
              </div>
            ) : (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[36%] left-[65%] w-36 h-28 rounded-full bg-amber-950/30 blur-md border border-amber-800/20" />
                <span className="absolute top-[38%] left-[67%] text-[10px] font-mono text-amber-500/70">Jezero Crater</span>
                <div className="absolute top-[52%] left-[82%] w-32 h-24 rounded-full bg-amber-950/30 blur-md border border-amber-800/20" />
                <span className="absolute top-[55%] left-[83%] text-[10px] font-mono text-amber-500/70">Gale Crater</span>
                <div className="absolute top-[50%] left-[44%] w-40 h-28 rounded-full bg-amber-950/30 blur-md border border-amber-800/20" />
                <span className="absolute top-[52%] left-[46%] text-[10px] font-mono text-amber-500/70">Meridiani Planum</span>
              </div>
            )}

            {/* Render Landing Site Markers */}
            {sites.map((site) => {
              const pos = projectCoordinates(site.lat, site.lng);
              const isSelected = selectedSite?.id === site.id;

              return (
                <div
                  key={site.id}
                  style={{ left: pos.left, top: pos.top }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                  onClick={() => handleSiteClick(site)}
                >
                  <div className={`relative flex items-center justify-center transition-all ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  }`}>
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full border border-cyan-400 animate-ping opacity-75" />
                    )}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg border transition-colors ${
                      isSelected
                        ? 'bg-cyan-500 border-white text-slate-950 shadow-cyan-500/50'
                        : site.status === 'operational'
                        ? 'bg-emerald-600 border-emerald-300 text-white'
                        : 'bg-slate-900 border-slate-700 text-slate-300'
                    }`}>
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-[#060a17] border border-cyan-500/40 text-white text-[11px] whitespace-nowrap shadow-xl pointer-events-none transition-all font-mono ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    <span className="font-bold text-cyan-300">{site.name}</span>
                    <span className="text-slate-400 ml-1">({site.year})</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Coordinates Bar */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-slate-400 border-t border-slate-800 pt-3">
            <span>Selected Site: {selectedSite ? selectedSite.name : 'Tap any pin'}</span>
            <span>{selectedSite ? `${selectedSite.latFormatted}, ${selectedSite.lngFormatted}` : ''}</span>
          </div>
        </div>

        {/* Site Details Inspector Card (1 Col) */}
        <div className="p-6 rounded-xl bg-[#090e21] border border-slate-800 shadow-xl flex flex-col justify-between text-left">
          {selectedSite ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>{selectedSite.mission}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{selectedSite.year}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className={selectedSite.status === 'operational' ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                  {selectedSite.status === 'operational' ? 'Still Active ✨' : 'Historic Site'}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold font-space text-white">
                  {matchedObject ? matchedObject.storyTitle : selectedSite.name}
                </h3>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  {selectedSite.name}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="block font-mono font-bold text-cyan-300 mb-1">
                  What Happened Here:
                </span>
                {matchedObject ? matchedObject.narrativeStory : selectedSite.description}
              </div>

              <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                <span className="block font-mono font-bold text-amber-400 mb-1">
                  Left Behind in the Dust:
                </span>
                <span className="text-white font-medium">{selectedSite.primaryObject}</span>
              </div>

              {matchedObject && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onSelectObject(matchedObject);
                      spaceAudio.playTelemetryChirp();
                    }}
                    className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read the Full Story</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 text-sm font-mono">
              Tap any pin on the map to discover what was left there.
            </div>
          )}

          <div className="text-xs font-mono text-slate-500 border-t border-slate-800 pt-3 mt-4">
            Coordinates verified through NASA Lunar & Mars Orbiter Archives
          </div>
        </div>

      </div>
    </section>
  );
};
