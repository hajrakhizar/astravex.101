import React from 'react';

export const SpinningPlanets: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      
      {/* 1. DECORATIVE SPINNING MOON (Top-Left) */}
      <div 
        className="absolute left-2 sm:left-8 md:left-14 top-24 sm:top-28 md:top-32 animate-float-planet opacity-85 hover:opacity-100 transition-opacity"
        aria-hidden="true"
      >
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36">
          {/* Subtle Outer Lunar Glow */}
          <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl scale-125" />

          {/* Orbit Trail Ring */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-cyan-500/15 border-dashed animate-spin-slow" />

          {/* Spinning Moon Body */}
          <div className="w-full h-full rounded-full relative overflow-hidden shadow-[inset_-16px_-16px_28px_rgba(0,0,0,0.85),0_0_25px_rgba(56,189,248,0.25)] border border-slate-600/40 bg-gradient-to-tr from-slate-900 via-slate-700 to-slate-200">
            {/* Spinning Crater Texture Layer */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full animate-spin-slow opacity-60 mix-blend-overlay"
            >
              <circle cx="28" cy="30" r="9" fill="#0f172a" opacity="0.4" />
              <circle cx="68" cy="25" r="14" fill="#0f172a" opacity="0.35" />
              <circle cx="45" cy="62" r="12" fill="#0f172a" opacity="0.45" />
              <circle cx="75" cy="70" r="8" fill="#0f172a" opacity="0.3" />
              <circle cx="20" cy="72" r="6" fill="#0f172a" opacity="0.4" />
              <circle cx="50" cy="38" r="5" fill="#0f172a" opacity="0.35" />
              {/* Subtle crater rims */}
              <circle cx="28" cy="30" r="9" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
              <circle cx="45" cy="62" r="12" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
            </svg>

            {/* Sunlight Crescent Flare on Left Limb */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/35 via-transparent to-black/80 pointer-events-none" />
          </div>

          {/* Planet Label Badge */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-slate-950/70 border border-slate-700/50 text-[10px] font-mono text-cyan-300/80 tracking-wider">
            🌙 THE MOON · 1/6 G
          </div>
        </div>
      </div>

      {/* 2. DECORATIVE SPINNING MARS WITH ORBITING PHOBOS (Top-Right) */}
      <div 
        className="absolute right-3 sm:right-10 md:right-16 top-28 sm:top-36 md:top-40 animate-float-planet-alt opacity-90 hover:opacity-100 transition-opacity"
        aria-hidden="true"
      >
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40">
          {/* Warm Mars Atmospheric Glow */}
          <div className="absolute inset-0 rounded-full bg-rose-500/15 blur-xl scale-125" />

          {/* Elliptical Moonlet Orbit Track */}
          <div className="absolute -inset-5 sm:-inset-7 rounded-full border border-amber-500/20 border-dashed animate-spin-reverse-slow">
            {/* Phobos Mini-Moonlet */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-200 shadow-[0_0_8px_#f59e0b] border border-amber-400" />
          </div>

          {/* Spinning Mars Body */}
          <div className="w-full h-full rounded-full relative overflow-hidden shadow-[inset_-18px_-18px_32px_rgba(0,0,0,0.88),0_0_28px_rgba(244,63,94,0.3)] border border-rose-700/50 bg-gradient-to-tr from-slate-950 via-rose-900 to-amber-500">
            {/* North Polar Ice Cap */}
            <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-white/80 to-transparent rounded-t-full opacity-70 blur-[1px]" />

            {/* Rotating Martian Canyon / Surface Pattern */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full animate-spin-reverse-slow opacity-70 mix-blend-overlay"
            >
              {/* Valles Marineris canyon feature */}
              <path d="M 15 48 Q 45 42 85 54" stroke="#450a0a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M 22 55 Q 52 48 78 60" stroke="#450a0a" strokeWidth="3" strokeLinecap="round" fill="none" />
              <circle cx="32" cy="35" r="7" fill="#450a0a" opacity="0.6" />
              <circle cx="70" cy="32" r="10" fill="#450a0a" opacity="0.5" />
              <circle cx="58" cy="72" r="12" fill="#450a0a" opacity="0.65" />
            </svg>

            {/* Warm sunlight edge */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-amber-300/40 pointer-events-none" />
          </div>

          {/* Planet Label Badge */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-slate-950/70 border border-slate-700/50 text-[10px] font-mono text-amber-300/80 tracking-wider">
            🔴 MARS · 0.38 G
          </div>
        </div>
      </div>

      {/* 3. DECORATIVE SPINNING RINGED GAS GIANT (Lower-Left / Background Depth) */}
      <div 
        className="hidden md:block absolute -left-12 lg:left-6 bottom-16 lg:bottom-24 animate-float-planet opacity-40 hover:opacity-60 transition-opacity"
        aria-hidden="true"
      >
        <div className="relative w-36 h-36 lg:w-44 lg:h-44 flex items-center justify-center">
          {/* Ring Glow */}
          <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-2xl" />

          {/* Spinning Concentric Planetary Rings (Tilted 3D plane) */}
          <div 
            className="absolute w-56 h-18 lg:w-64 lg:h-20 rounded-full border-[6px] border-indigo-400/30 border-t-indigo-200/50 border-b-cyan-500/20 shadow-[0_0_15px_rgba(99,102,241,0.25)] animate-spin-slow pointer-events-none"
            style={{ transform: 'rotate(-24deg) scaleY(0.38)' }}
          >
            {/* Inner Ring Division */}
            <div className="absolute inset-1.5 rounded-full border border-sky-300/25 border-dashed" />
          </div>

          {/* Gas Giant Sphere */}
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full relative overflow-hidden shadow-[inset_-12px_-12px_22px_rgba(0,0,0,0.9),0_0_20px_rgba(99,102,241,0.2)] border border-indigo-500/40 bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-950 z-10">
            {/* Atmospheric cloud bands */}
            <div className="absolute inset-0 flex flex-col justify-between py-1.5 opacity-50 animate-spin-slow">
              <div className="h-1.5 bg-indigo-300/30 w-full" />
              <div className="h-2.5 bg-purple-300/25 w-full" />
              <div className="h-1 bg-cyan-300/20 w-full" />
              <div className="h-2 bg-indigo-400/30 w-full" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
