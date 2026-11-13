import React, { useState, useMemo } from 'react';
import { SpaceObject, CelestialBody, ObjectStatus, ObjectCategory } from '../types';
import { 
  Search, 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  MapPin, 
  Rotate3d, 
  ChevronRight,
  Database,
  HelpCircle
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface ObjectArchiveProps {
  objects: SpaceObject[];
  onSelectObject: (obj: SpaceObject) => void;
}

export const ObjectArchive: React.FC<ObjectArchiveProps> = ({ objects, onSelectObject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bodyFilter, setBodyFilter] = useState<'all' | CelestialBody>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | ObjectStatus>('all');
  const [sortBy, setSortBy] = useState<'year_asc' | 'year_desc' | 'name' | 'mass'>('year_desc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const processedObjects = useMemo(() => {
    return objects
      .filter((obj) => {
        const matchesSearch =
          obj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          obj.storyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          obj.mission.toLowerCase().includes(searchTerm.toLowerCase()) ||
          obj.currentLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          obj.curiosityHook.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBody = bodyFilter === 'all' || obj.celestialBody === bodyFilter;
        const matchesStatus = statusFilter === 'all' || obj.status === statusFilter;

        return matchesSearch && matchesBody && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'year_asc') return a.arrivalYear - b.arrivalYear;
        if (sortBy === 'year_desc') return b.arrivalYear - a.arrivalYear;
        if (sortBy === 'name') return a.storyTitle.localeCompare(b.storyTitle);
        if (sortBy === 'mass') {
          const massA = typeof a.massKg === 'number' ? a.massKg : parseFloat(String(a.massKg)) || 0;
          const massB = typeof b.massKg === 'number' ? b.massKg : parseFloat(String(b.massKg)) || 0;
          return massB - massA;
        }
        return 0;
      });
  }, [objects, searchTerm, bodyFilter, statusFilter, sortBy]);

  return (
    <section id="archive" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
          <Database className="w-3.5 h-3.5" />
          <span>The Complete Catalog</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">{objects.length} Cataloged Relics</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space text-white tracking-tight">
          Explore the Full Artifact Archive
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mt-2">
          Search every human artifact resting on the Moon and Mars. Filter by world or status, or search for items like rover names, cameras, or laser mirrors.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#090e21] border border-slate-800 shadow-xl space-y-4 mb-8">
        {/* Search Input & View Toggles */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, story, mission (Apollo, Perseverance), or question..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer font-mono"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 w-full sm:w-auto font-mono">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-transparent focus:outline-none cursor-pointer text-white"
              >
                <option value="year_desc" className="bg-[#090e21]">Newest First</option>
                <option value="year_asc" className="bg-[#090e21]">Oldest First</option>
                <option value="name" className="bg-[#090e21]">Story Title (A-Z)</option>
                <option value="mass" className="bg-[#090e21]">Heaviest First</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-lg bg-slate-950 border border-slate-800">
              <button
                onClick={() => {
                  setViewMode('grid');
                  spaceAudio.playClick();
                }}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setViewMode('table');
                  spaceAudio.playClick();
                }}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="Table view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Buttons Row (Clean segmented controls) */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-800 text-xs">
          {/* Celestial Body */}
          <div className="flex items-center gap-1.5 mr-3">
            <span className="text-slate-500 font-mono">World:</span>
            {(['all', 'Moon', 'Mars'] as const).map((b) => (
              <button
                key={b}
                onClick={() => {
                  setBodyFilter(b);
                  spaceAudio.playClick();
                }}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer border ${
                  bodyFilter === b
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                    : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                {b === 'all' ? 'All Worlds' : b === 'Moon' ? 'Moon 🌙' : 'Mars 🔴'}
              </button>
            ))}
          </div>

          {/* Operational Status */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-mono">Status:</span>
            {(['all', 'operational', 'inactive'] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatusFilter(s);
                  spaceAudio.playClick();
                }}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer border ${
                  statusFilter === s
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                    : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                {s === 'all' ? 'All' : s === 'operational' ? 'Still Active ✨' : 'Historic Site'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count Readout */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 px-1">
        <span>Showing {processedObjects.length} of {objects.length} verified extraterrestrial artifacts</span>
        {(searchTerm || bodyFilter !== 'all' || statusFilter !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setBodyFilter('all');
              setStatusFilter('all');
              spaceAudio.playClick();
            }}
            className="text-cyan-400 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {processedObjects.map((obj) => (
            <div
              key={obj.id}
              onClick={() => {
                onSelectObject(obj);
                spaceAudio.playTelemetryChirp();
              }}
              className="p-5 rounded-xl bg-[#090e21] border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between text-left cursor-pointer group shadow-lg hover:-translate-y-1 hover:shadow-cyan-950/20"
            >
              <div>
                {/* Unboxed Metadata (Zero-Pill discipline) */}
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                  <span className={obj.celestialBody === 'Moon' ? 'text-cyan-400 font-semibold' : 'text-amber-400 font-semibold'}>
                    {obj.celestialBody}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{obj.mission}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{obj.arrivalYear}</span>
                </div>

                <h4 className="text-lg font-bold font-space text-white group-hover:text-cyan-300 transition-colors">
                  {obj.storyTitle}
                </h4>
                <div className="text-xs text-slate-400 font-mono mt-0.5 mb-2.5">
                  {obj.name}
                </div>

                {/* Curiosity Question */}
                <div className="text-xs text-cyan-200/90 italic mb-3 flex items-start gap-1.5 leading-snug">
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>"{obj.curiosityHook}"</span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {obj.narrativeStory}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1 text-slate-300 truncate max-w-[150px]">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{obj.coordinates.craterOrRegion}</span>
                </span>

                {obj.has3DModel ? (
                  <span className="text-cyan-300 flex items-center gap-1 font-semibold">
                    <Rotate3d className="w-3.5 h-3.5" />
                    3D Model
                  </span>
                ) : (
                  <span className="text-slate-400 flex items-center gap-1 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all">
                    Read Story <ChevronRight className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="rounded-xl border border-slate-800 bg-[#060914] overflow-x-auto shadow-xl">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Artifact Story</th>
                <th className="py-3 px-4">World</th>
                <th className="py-3 px-4">Mission</th>
                <th className="py-3 px-4">Arrival</th>
                <th className="py-3 px-4">Curiosity Hook</th>
                <th className="py-3 px-4">Mass</th>
                <th className="py-3 px-4 text-right">Story</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {processedObjects.map((obj) => (
                <tr
                  key={obj.id}
                  onClick={() => {
                    onSelectObject(obj);
                    spaceAudio.playTelemetryChirp();
                  }}
                  className="hover:bg-cyan-950/20 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-space font-bold text-white group-hover:text-cyan-300">
                    <div>{obj.storyTitle}</div>
                    <div className="text-[11px] text-slate-400 font-mono font-normal">{obj.name}</div>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className={obj.celestialBody === 'Moon' ? 'text-cyan-300 font-semibold' : 'text-amber-300 font-semibold'}>
                      {obj.celestialBody}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{obj.mission}</td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{obj.arrivalYear}</td>
                  <td className="py-3 px-4 text-slate-300 text-xs italic max-w-xs truncate font-mono">
                    "{obj.curiosityHook}"
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{obj.massKg} kg</td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-3 py-1 rounded-md bg-cyan-500/15 text-cyan-300 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors text-xs font-mono font-bold">
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {processedObjects.length === 0 && (
        <div className="text-center py-20 text-slate-400 text-sm font-mono">
          No artifacts found matching &quot;{searchTerm}&quot;. Try adjusting your search query or filters.
        </div>
      )}
    </section>
  );
};
