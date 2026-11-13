import React, { useEffect, useRef, useState } from 'react';
import { 
  Rocket, 
  Rotate3d, 
  ArrowDown, 
  Scale, 
  Award, 
  ChevronRight,
  ChevronLeft,
  Sparkles,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { MIND_BLOWN_TRIVIA } from '../data/middleSchoolData';
import { SpinningPlanets } from './SpinningPlanets';
import { CuteAlien } from './CuteAlien';

interface HeroProps {
  onExploreClick: () => void;
  onLaunchFeatured3D: (modelKey: 'lrv' | 'sojourner' | 'ingenuity') => void;
  onOpenPayloadModal: () => void;
  onOpenQuizModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExploreClick, 
  onLaunchFeatured3D,
  onOpenPayloadModal,
  onOpenQuizModal
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTriviaIdx, setActiveTriviaIdx] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const starCount = 180;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.0 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.12 + 0.03,
      deltaAlpha: (Math.random() - 0.5) * 0.015,
      isCyan: Math.random() > 0.75,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.alpha += star.deltaAlpha;
        if (star.alpha <= 0.2 || star.alpha >= 0.95) {
          star.deltaAlpha = -star.deltaAlpha;
        }

        ctx.fillStyle = star.isCyan
          ? `rgba(0, 240, 255, ${star.alpha})`
          : `rgba(226, 232, 240, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const currentTrivia = MIND_BLOWN_TRIVIA[activeTriviaIdx];

  const handleNextTrivia = () => {
    spaceAudio.playClick();
    setActiveTriviaIdx((prev) => (prev + 1) % MIND_BLOWN_TRIVIA.length);
  };

  const handlePrevTrivia = () => {
    spaceAudio.playClick();
    setActiveTriviaIdx((prev) => (prev - 1 + MIND_BLOWN_TRIVIA.length) % MIND_BLOWN_TRIVIA.length);
  };

  return (
    <section id="hero" className="relative min-h-[92vh] w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden cosmic-grid font-sans">
      {/* Background canvas for starry space */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Cosmic radial glow */}
      <div className="absolute inset-0 cosmic-radial-glow pointer-events-none z-0" />

      {/* Decorative Spinning Planets in Space */}
      <SpinningPlanets />

      {/* Interactive Cute Alien Space Archaeologist Mascot ("Zubi") */}
      <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-8 md:right-12 z-20 flex flex-col items-center">
        <CuteAlien />
        <div className="text-[10px] font-mono text-cyan-300/80 bg-slate-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30 mt-1 shadow-md select-none pointer-events-none">
          Click Zubi! 👽
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-7">
        
        {/* Clean unboxed editorial kicker */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Space Archaeology</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-300">Human Stories on Other Worlds</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-space tracking-tight text-white leading-[1.08]">
            THE THINGS WE <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              LEFT BEHIND
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            Over 200,000 kilograms of human machines rest on the Moon and Mars. From electric dune buggies parked at the edge of canyons to mirror prisms hit by laser beams right now—explore the incredible stories behind each artifact.
          </p>
        </div>

        {/* Primary Action Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1 font-medium">
          <button
            onClick={() => {
              spaceAudio.playThruster();
              onLaunchFeatured3D('lrv');
            }}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Rotate3d className="w-4 h-4" />
            <span>Launch 3D Models</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              spaceAudio.playClick();
              onExploreClick();
            }}
            className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm flex items-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Rocket className="w-4 h-4 text-cyan-400" />
            <span>Browse All Relics</span>
          </button>

          <button
            onClick={() => {
              spaceAudio.playClick();
              onOpenPayloadModal();
            }}
            className="px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/50 font-semibold text-sm flex items-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Scale className="w-4 h-4 text-amber-400" />
            <span>50kg Challenge</span>
          </button>
        </div>

        {/* 3D Holo-Vehicle Quick Launchers */}
        <div className="pt-2">
          <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-center gap-1.5">
            <Rotate3d className="w-3.5 h-3.5 text-cyan-400" />
            <span>Explore 3D Holograms:</span>
          </div>
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <button
              onClick={() => {
                spaceAudio.playClick();
                onLaunchFeatured3D('lrv');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-500/50 text-xs font-medium text-slate-200 hover:text-cyan-300 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>🚙</span>
              <span>The Moon Buggy (Apollo 15)</span>
            </button>
            <button
              onClick={() => {
                spaceAudio.playClick();
                onLaunchFeatured3D('sojourner');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-amber-950/60 border border-slate-700 hover:border-amber-500/50 text-xs font-medium text-slate-200 hover:text-amber-300 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>🤖</span>
              <span>Sojourner (First on Mars)</span>
            </button>
            <button
              onClick={() => {
                spaceAudio.playClick();
                onLaunchFeatured3D('ingenuity');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/50 text-xs font-medium text-slate-200 hover:text-rose-300 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>🚁</span>
              <span>Ingenuity (72 Mars Flights)</span>
            </button>
          </div>
        </div>

        {/* Mind-Blown Trivia Carousel (Curiosity Spark) */}
        <div className="pt-2 max-w-3xl mx-auto">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#090e21]/90 border border-cyan-500/30 text-left shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span className="font-semibold uppercase">{currentTrivia.badge}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400">Secret {activeTriviaIdx + 1} of {MIND_BLOWN_TRIVIA.length}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevTrivia}
                  className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Previous secret"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextTrivia}
                  className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Next secret"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="md:col-span-3 space-y-1.5">
                <h4 className="text-base font-bold font-space text-white">
                  {currentTrivia.headline}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentTrivia.fact}
                </p>
                <div className="text-xs text-cyan-300 font-mono pt-0.5">
                  ✨ The takeaway: {currentTrivia.whyItMatters}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center shrink-0">
                <div className="text-xl sm:text-2xl font-bold font-space text-amber-400">
                  {currentTrivia.statNumber}
                </div>
                <div className="text-[11px] font-mono text-slate-400 uppercase mt-0.5">
                  {currentTrivia.statLabel}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Clean Quick Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2 text-center font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-xl font-bold font-space text-cyan-400">~200,000 kg</div>
            <div className="text-slate-400 mt-0.5">Human Hardware Left in Space</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-xl font-bold font-space text-amber-400">1/6th G</div>
            <div className="text-slate-400 mt-0.5">Moon Gravity (Jump 6x Higher)</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-xl font-bold font-space text-emerald-400">55+ Years</div>
            <div className="text-slate-400 mt-0.5">Moon Laser Mirror Still Working</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-xl font-bold font-space text-purple-400">72 Flights</div>
            <div className="text-slate-400 mt-0.5">Little Ingenuity Drone on Mars</div>
          </div>
        </div>

      </div>
    </section>
  );
};
