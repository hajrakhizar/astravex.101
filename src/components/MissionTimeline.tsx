import React, { useState } from 'react';
import { MISSION_TIMELINE } from '../data/missionsTimeline';
import { SPACE_OBJECTS } from '../data/spaceObjects';
import { SpaceObject, CelestialBody } from '../types';
import { 
  Clock, 
  MapPin, 
  User, 
  ChevronRight, 
  Rotate3d, 
  BookOpen
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface MissionTimelineProps {
  onSelectObject: (obj: SpaceObject) => void;
}

export const MissionTimeline: React.FC<MissionTimelineProps> = ({ onSelectObject }) => {
  const [filter, setFilter] = useState<'All' | CelestialBody>('All');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(MISSION_TIMELINE[0].id);

  const filteredMilestones = MISSION_TIMELINE.filter((m) => {
    if (filter === 'All') return true;
    return m.celestialBody === filter;
  });

  const selectedMilestone = MISSION_TIMELINE.find((m) => m.id === selectedMilestoneId) || MISSION_TIMELINE[0];

  const matchingObject = SPACE_OBJECTS.find((o) => 
    o.mission.toLowerCase().includes(selectedMilestone.mission.toLowerCase().slice(0, 7)) ||
    selectedMilestone.brief.toLowerCase().includes(o.name.toLowerCase().slice(0, 8))
  ) || SPACE_OBJECTS[0];

  return (
    <div className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
          <Clock className="w-3.5 h-3.5" />
          <span>Exploration Timeline</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">1969 to Present</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space text-white tracking-tight">
          How Human Footprints Spread Into Space
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          From Neil Armstrong stepping onto the Sea of Tranquility to tiny helicopters exploring Martian canyons, see the landmark moments that left permanent human marks on alien worlds.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium">
          {(['All', 'Moon', 'Mars'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setFilter(tab);
                spaceAudio.playClick();
              }}
              className={`px-4 py-2 rounded-md transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'All' ? 'All Expeditions' : tab === 'Moon' ? 'Moon 🌙' : 'Mars 🔴'}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Milestones List (5 Cols) */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[580px] overflow-y-auto pr-2">
          {filteredMilestones.map((m) => {
            const isSelected = selectedMilestone.id === m.id;
            return (
              <div
                key={m.id}
                onClick={() => {
                  setSelectedMilestoneId(m.id);
                  spaceAudio.playClick();
                }}
                className={`p-3.5 rounded-xl border transition-all text-left cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-950/40'
                    : 'bg-[#090e21] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-lg flex flex-col items-center justify-center shrink-0 border font-mono ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 border-white font-bold'
                      : 'bg-slate-950 text-slate-300 border-slate-800'
                  }`}>
                    <span className="text-[10px] uppercase">{m.date.split(' ')[0]}</span>
                    <span className="text-xs font-bold">{m.year}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
                      <span>{m.mission}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-400">{m.celestialBody}</span>
                    </div>
                    <h4 className="text-sm font-bold font-space text-white line-clamp-1">
                      {m.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {m.brief}
                    </p>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                  isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'
                }`} />
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Milestone Feature Card (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-[#090e21] border border-cyan-500/30 shadow-xl text-left space-y-4">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={selectedMilestone.imageUrl}
              alt={selectedMilestone.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090e21] via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-3 left-3 flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm text-cyan-300 border border-cyan-500/30 font-semibold">
                {selectedMilestone.mission}
              </span>
              <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm text-slate-300 border border-slate-700">
                {selectedMilestone.date}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {selectedMilestone.coordinates}
              </span>
              {selectedMilestone.crewOrPrincipal && (
                <span className="flex items-center gap-1.5 text-slate-200">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  {selectedMilestone.crewOrPrincipal}
                </span>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-space text-white">
              {selectedMilestone.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {selectedMilestone.historicalAchievement}
            </p>
          </div>

          {/* Key Artifacts Left Behind Box */}
          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
            <span className="font-mono font-bold uppercase text-amber-400 block tracking-wide text-[11px]">
              Left Behind in the Dust:
            </span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {selectedMilestone.keyArtifactsLeft.map((art, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200 font-mono text-[11px]"
                >
                  {art}
                </span>
              ))}
            </div>
          </div>

          {/* Dossier Link Action */}
          {matchingObject && (
            <div className="pt-1">
              <button
                onClick={() => {
                  onSelectObject(matchingObject);
                  spaceAudio.playTelemetryChirp();
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Story: {matchingObject.storyTitle}</span>
                {matchingObject.has3DModel && <Rotate3d className="w-4 h-4 text-slate-900 ml-1" />}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
