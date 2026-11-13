import React, { useState } from 'react';
import { SpaceObject, Hotspot } from '../types';
import { ThreeViewer } from './Viewer3D/ThreeViewer';
import { 
  X, 
  MapPin, 
  Calendar, 
  Rocket, 
  Scale, 
  ExternalLink, 
  Rotate3d, 
  Image as ImageIcon,
  Share2,
  Check,
  Lightbulb,
  BookOpen,
  HelpCircle,
  Sparkles,
  Compass,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface ObjectModalProps {
  object: SpaceObject | null;
  onClose: () => void;
}

export const ObjectModal: React.FC<ObjectModalProps> = ({ object, onClose }) => {
  const [activeTab, setActiveTab] = useState<'story' | '3d' | 'photo' | 'specs'>('story');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  
  // Interactive mini curiosity check state
  const [quizAnswered, setQuizAnswered] = useState<boolean | null>(null);

  if (!object) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    spaceAudio.playClick();
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const earthMassNum = typeof object.massKg === 'number' ? object.massKg : parseFloat(String(object.massKg)) || 0;
  const gravityMultiplier = object.celestialBody === 'Moon' ? 0.166 : 0.38;
  const weightThereKg = Math.round(earthMassNum * gravityMultiplier);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto font-sans">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#090e21] border border-cyan-500/40 shadow-2xl text-left z-10 flex flex-col my-auto">
        
        {/* Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-[#060a17]/95 border-b border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className="text-cyan-400 font-bold uppercase">{object.celestialBody} Surface Artifact</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">{object.mission} ({object.arrivalYear})</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Share link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Narrative Hero Header */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <span>{object.name}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-space text-white">
            {object.storyTitle}
          </h2>

          <p className="text-sm text-slate-300 mt-1 font-medium">
            {object.storyTagline}
          </p>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 border-b border-slate-800 font-medium text-xs sm:text-sm">
            <button
              onClick={() => {
                setActiveTab('story');
                spaceAudio.playClick();
              }}
              className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'story'
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>The Story</span>
            </button>

            {object.has3DModel && object.modelKey && (
              <button
                onClick={() => {
                  setActiveTab('3d');
                  spaceAudio.playClick();
                }}
                className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === '3d'
                    ? 'border-cyan-400 text-cyan-300 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Rotate3d className="w-4 h-4 text-cyan-400" />
                <span>Explore in 3D</span>
              </button>
            )}

            <button
              onClick={() => {
                setActiveTab('photo');
                spaceAudio.playClick();
              }}
              className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'photo'
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-cyan-400" />
              <span>NASA Photos</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('specs');
                spaceAudio.playClick();
              }}
              className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-cyan-400 text-cyan-300 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Technical Specs</span>
            </button>
          </div>
        </div>

        {/* Modal Tab Content */}
        <div className="p-6 pt-4 flex-1">
          {/* TAB 1: THE STORY (Default, Friendly, Narrative-Rich) */}
          {activeTab === 'story' && (
            <div className="space-y-6">
              {/* Curiosity Hook Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/60 to-indigo-950/40 border border-cyan-600/30 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold block mb-0.5">
                    The Big Question
                  </span>
                  <p className="text-sm sm:text-base font-medium text-white">
                    "{object.curiosityHook}"
                  </p>
                </div>
              </div>

              {/* 3 Story Cards: The Tale, Why It Stayed, What It's Doing Now */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. The Tale */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wide block mb-1">
                      1. The Adventure
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {object.narrativeStory}
                    </p>
                  </div>
                </div>

                {/* 2. Why It Stayed */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wide block mb-1">
                      2. Why We Left It Behind
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {object.whyLeftBehindSimple}
                    </p>
                  </div>
                </div>

                {/* 3. What It's Doing Now */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wide block mb-1">
                      3. Right Now on {object.celestialBody}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {object.whatNow}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mind-Blowing Secret Callout */}
              <div className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/30 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                    Mind-Blowing Secret
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {object.funFact}
                  </p>
                </div>
              </div>

              {/* Quick Interactive Curiosity Check */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 font-bold uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>Curiosity Check: Quick Mystery Question</span>
                </div>
                <p className="text-xs sm:text-sm text-white mb-3">
                  Did {object.celestialBody} gravity make this {earthMassNum} kg machine feel heavier or lighter when it touched down?
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setQuizAnswered(false);
                      spaceAudio.playClick();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
                      quizAnswered === false
                        ? 'bg-red-950 text-red-300 border-red-500'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
                    }`}
                  >
                    Much Heavier (Space gravity pushes down)
                  </button>

                  <button
                    onClick={() => {
                      setQuizAnswered(true);
                      spaceAudio.playTelemetryChirp();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
                      quizAnswered === true
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500 font-bold'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
                    }`}
                  >
                    Much Lighter (~{weightThereKg} kg because {object.celestialBody} has weaker gravity!)
                  </button>
                </div>

                {quizAnswered === true && (
                  <div className="mt-3 text-xs text-emerald-400 flex items-center gap-2 font-mono">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Bingo! On {object.celestialBody}, it weighed only about {weightThereKg} kg—easy for astronauts or wheels to handle!</span>
                  </div>
                )}
                {quizAnswered === false && (
                  <div className="mt-3 text-xs text-amber-400 flex items-center gap-2 font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Not quite! Smaller worlds have less mass, so gravity pulls with less force. It felt way lighter!</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE 3D CAD */}
          {activeTab === '3d' && object.has3DModel && object.modelKey && (
            <div className="h-[480px] w-full rounded-xl overflow-hidden border border-slate-800 bg-[#070b19]">
              <ThreeViewer
                modelKey={object.modelKey}
                objectName={object.name}
                missionName={object.mission}
                hotspots={object.hotspots}
                onSelectHotspot={(hs) => setSelectedHotspot(hs)}
                selectedHotspotId={selectedHotspot?.id}
                className="w-full h-full"
              />
            </div>
          )}

          {/* TAB 3: NASA PHOTOGRAPHY */}
          {activeTab === 'photo' && (
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-black aspect-video max-h-[440px] flex items-center justify-center">
                <img
                  src={object.imageUrl}
                  alt={object.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-left">
                  <p className="text-xs text-slate-200 font-mono bg-black/70 px-3 py-2 rounded-lg backdrop-blur-sm border border-slate-800">
                    {object.imageCaption}
                  </p>
                </div>
              </div>
              <div className="text-xs text-slate-400 flex items-center justify-between font-mono">
                <span>Location: {object.currentLocation}</span>
                <span>Coordinates: {object.coordinates.latFormatted}, {object.coordinates.lngFormatted}</span>
              </div>
            </div>
          )}

          {/* TAB 4: TECHNICAL SPECS & ARCHIVES */}
          {activeTab === 'specs' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block mb-0.5">Earth Mass vs There</span>
                  <span className="text-white font-bold">{object.massKg} kg on Earth</span>
                  <span className="text-emerald-400 block mt-0.5">~{weightThereKg} kg on {object.celestialBody}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block mb-0.5">Coordinates</span>
                  <span className="text-white font-bold">{object.coordinates.latFormatted}</span>
                  <span className="text-slate-400 block mt-0.5">{object.coordinates.lngFormatted}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block mb-0.5">Time on Surface</span>
                  <span className="text-white font-bold">{object.arrivalYear} – Present</span>
                  <span className="text-slate-400 block mt-0.5">{typeof object.missionDurationDays === 'number' ? `${object.missionDurationDays} days active` : object.missionDurationDays}</span>
                </div>
              </div>

              {/* Subsystems List */}
              {object.structuralHighlights && object.structuralHighlights.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wide block mb-3">
                    Key Engineering Subsystems
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {object.structuralHighlights.map((feat, i) => (
                      <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <div className="text-xs font-semibold text-white mb-0.5">{feat.feature}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{feat.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Official NASA Sources */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <span className="text-slate-400">NASA & Smithsonian technical records:</span>
                <div className="flex flex-wrap gap-2">
                  {object.sources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 transition-colors"
                    >
                      <span>{src.org}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#060a17] border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>NASA Planetary Artifact Registry</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors cursor-pointer"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
};
