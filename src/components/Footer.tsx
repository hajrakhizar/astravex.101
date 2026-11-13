import React from 'react';
import { 
  Rocket, 
  ExternalLink, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Database,
  Award
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#04060d] border-t border-slate-900 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 text-left font-space">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: About the Project */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                <Rocket className="w-5 h-5" />
              </div>
              <span className="font-space font-extrabold text-white text-lg tracking-wider">
                BEYOND THE MISSION
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md font-sans">
              An interactive space archaeology field laboratory and physics simulator designed for middle schoolers, students, and curious explorers. Built for the <strong>NASA Space Apps Challenge</strong> to catalog, explain, and preserve the iconic human artifacts resting on the Moon and Mars.
            </p>
            <div className="text-xs font-code text-cyan-400 flex items-center gap-1.5">
              <span>NASA Planetary Data System Verified</span>
              <span>•</span>
              <span className="text-amber-400">Grades 6–8 STEM Curriculum Ready</span>
            </div>
          </div>

          {/* Col 2: Official NASA Primary Sources */}
          <div className="space-y-3 font-code">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Official NASA Data Sources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://science.nasa.gov/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>NASA Science Directorate</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://pds.nasa.gov/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Planetary Data System (PDS)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://nasa3d.arc.nasa.gov/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>NASA 3D Resources</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://history.nasa.gov/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>NASA History Division</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Technology & Frameworks */}
          <div className="space-y-3 font-sans">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-space">
              Interactive Systems
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Three.js WebGL Holographic Engines</span>
              </li>
              <li className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>50kg Lunar Liftoff Physics Simulator</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Interactive Cadet Archaeology Exam</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Procedural Web Audio API Soundboard</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-code text-slate-500">
          <div>
            Beyond the Mission — The Things We Left Behind • NASA Space Apps Challenge Showcase
          </div>
          <div className="flex items-center gap-4">
            <span>All telemetry & imagery courtesy NASA / JPL-Caltech</span>
            <span>Public Domain Heritage</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
