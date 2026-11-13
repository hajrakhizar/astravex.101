import React, { useState } from 'react';
import { spaceAudio } from '../utils/audio';
import { Sparkles, Heart } from 'lucide-react';

interface CuteAlienProps {
  className?: string;
}

const ALIEN_QUOTES = [
  "Beep boop! Space archaeology rules! 🛸",
  "Did you know Neil's boots are still on the Moon? 🌙",
  "I visit the Mars rovers every weekend! 🤖",
  "72 flights for a little drone? Incredible! 🚁",
  "Earthlings make the coolest machines! ✨",
  "Take me to your Moon buggies! 🚙",
  "I guard the 50-year-old laser mirrors! 🪞"
];

export const CuteAlien: React.FC<CuteAlienProps> = ({ className = '' }) => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [isWaving, setIsWaving] = useState(false);

  const handleClickAlien = () => {
    spaceAudio.playTelemetryChirp();
    setQuoteIdx((prev) => (prev + 1) % ALIEN_QUOTES.length);
    setShowBubble(true);
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1200);
  };

  return (
    <div 
      className={`relative select-none z-20 cursor-pointer group ${className}`}
      onClick={handleClickAlien}
      onMouseEnter={() => setShowBubble(true)}
      onMouseLeave={() => setShowBubble(false)}
      title="Click me! I'm Zubi, your friendly space archaeology buddy!"
    >
      {/* Interactive Speech Bubble */}
      <div 
        className={`absolute -top-14 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-xl bg-slate-900/95 border border-cyan-400/60 text-cyan-200 text-xs font-mono whitespace-nowrap shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-none flex items-center gap-1.5 z-30 ${
          showBubble 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-2 scale-90 pointer-events-none'
        }`}
      >
        <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
        <span className="font-semibold">{ALIEN_QUOTES[quoteIdx]}</span>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-cyan-400/60 rotate-45" />
      </div>

      {/* Cute Alien SVG Mascot */}
      <div className="w-24 h-28 sm:w-28 sm:h-32 animate-float-alien relative flex items-center justify-center filter drop-shadow-[0_10px_20px_rgba(0,240,255,0.25)]">
        
        {/* Soft Cosmic Ambient Aura */}
        <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl scale-125 animate-pulse-glow pointer-events-none" />

        <svg 
          viewBox="0 0 120 140" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform group-hover:scale-105 duration-200"
        >
          {/* Defs for gradients & glows */}
          <defs>
            {/* Alien Skin Gradient */}
            <radialGradient id="alienSkin" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="60%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </radialGradient>

            {/* Helmet Glass Gradient */}
            <linearGradient id="helmetGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
              <stop offset="40%" stopColor="rgba(56, 189, 248, 0.15)" />
              <stop offset="100%" stopColor="rgba(14, 165, 233, 0.35)" />
            </linearGradient>

            {/* Suit Gradient */}
            <linearGradient id="suitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            {/* Antenna Orb Glow */}
            <radialGradient id="orbGlow" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#06b6d4" />
            </radialGradient>
          </defs>

          {/* Antenna Left */}
          <path d="M 46 42 Q 34 22 36 12" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
          <circle cx="36" cy="12" r="5" fill="url(#orbGlow)">
            <animate attributeName="r" values="4.5;5.5;4.5" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Antenna Right */}
          <path d="M 74 42 Q 86 22 84 12" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
          <circle cx="84" cy="12" r="5" fill="url(#orbGlow)">
            <animate attributeName="r" values="5.5;4.5;5.5" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Space Suit Body */}
          <path 
            d="M 38 88 C 38 82, 82 82, 82 88 L 86 116 C 86 124, 34 124, 34 116 Z" 
            fill="url(#suitGradient)" 
            stroke="#94a3b8" 
            strokeWidth="1.5"
          />

          {/* Suit Collar Ring */}
          <ellipse cx="60" cy="88" rx="24" ry="7" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />

          {/* Golden Mission Badge on Chest */}
          <circle cx="60" cy="104" r="5" fill="#f59e0b" stroke="#fde68a" strokeWidth="1" />
          <path d="M 58 104 L 62 104 M 60 102 L 60 106" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />

          {/* Left Foot */}
          <ellipse cx="46" cy="124" rx="8" ry="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
          {/* Right Foot */}
          <ellipse cx="74" cy="124" rx="8" ry="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />

          {/* Left Arm Resting Cutie */}
          <path d="M 36 94 Q 24 104 28 112" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="28" cy="112" r="4.5" fill="#0284c7" />

          {/* Right Waving Arm */}
          <g className={isWaving ? 'animate-wave-hand' : 'group-hover:animate-wave-hand'}>
            <path d="M 84 94 Q 96 90 102 78" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="102" cy="78" r="5" fill="#0284c7" />
            {/* Little waving fingers */}
            <circle cx="103" cy="74" r="2" fill="#38bdf8" />
            <circle cx="106" cy="77" r="2" fill="#38bdf8" />
          </g>

          {/* Alien Head (Soft Round Shape) */}
          <ellipse cx="60" cy="60" rx="30" ry="26" fill="url(#alienSkin)" />

          {/* Cute Rosy Blushing Cheeks */}
          <ellipse cx="40" cy="68" rx="5" ry="2.5" fill="#f43f5e" opacity="0.45" />
          <ellipse cx="80" cy="68" rx="5" ry="2.5" fill="#f43f5e" opacity="0.45" />

          {/* Big Adorable Anime Space Eyes */}
          {/* Left Eye */}
          <ellipse cx="47" cy="58" rx="7" ry="9" fill="#090d16" />
          <circle cx="45" cy="55" r="3" fill="#ffffff" />
          <circle cx="49" cy="62" r="1.5" fill="#ffffff" />

          {/* Right Eye */}
          <ellipse cx="73" cy="58" rx="7" ry="9" fill="#090d16" />
          <circle cx="71" cy="55" r="3" fill="#ffffff" />
          <circle cx="75" cy="62" r="1.5" fill="#ffffff" />

          {/* Sweet Cute Smile */}
          <path d="M 55 69 Q 60 74 65 69" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Glass Space Bubble Helmet */}
          <circle cx="60" cy="60" r="38" fill="url(#helmetGlass)" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.5" />

          {/* Glass Visor Highlight Arc */}
          <path 
            d="M 36 40 A 34 34 0 0 1 84 40" 
            stroke="rgba(255, 255, 255, 0.7)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            fill="none" 
          />
          <path 
            d="M 42 34 A 34 34 0 0 1 60 28" 
            stroke="rgba(255, 255, 255, 0.9)" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            fill="none" 
          />
        </svg>

        {/* Floating Heart on Hover */}
        <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-bounce" />
        </div>
      </div>
    </div>
  );
};
