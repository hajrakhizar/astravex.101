import React from 'react';
import { 
  Scale, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle,
  Flame,
  Lightbulb,
  BookOpen
} from 'lucide-react';

export const PreservationEthics: React.FC = () => {
  return (
    <section id="why-left-behind" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80 font-sans">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 tracking-wider uppercase mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curious Questions</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">The Mysteries of Space Archaeology</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-space text-white tracking-tight">
          Why Did We Leave So Much Behind?
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
          The machines and artifacts on the Moon and Mars were not discarded out of laziness. Every item left in the dust was a deliberate choice driven by the laws of physics, international treaties, and the search for alien life.
        </p>
      </div>

      {/* 4 Story Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        
        {/* Story 1: The Moon Rock Trade-Off */}
        <div className="p-6 rounded-xl bg-[#090e21] border border-slate-800 hover:border-cyan-500/50 transition-all shadow-lg space-y-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-600/40 flex items-center justify-center text-cyan-400">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-space text-white">
            1. The Moon Rock Trade-Off
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Lifting off from the Moon takes immense rocket energy. To bring back 842 pounds of irreplaceable lunar rocks and soil, Apollo astronauts were ordered to open the hatch and ditch anything they didn't need: spacesuit backpacks, moon boots, food containers, and heavy camera bodies. Every pound of gear dumped on the Moon allowed another pound of alien rock to come home!
          </p>
          <div className="text-xs font-mono text-amber-300 pt-1">
            ✨ Result: Apollo 17 brought back 243 pounds of primordial moon rocks!
          </div>
        </div>

        {/* Story 2: Can a Billionaire Buy the Moon? */}
        <div className="p-6 rounded-xl bg-[#090e21] border border-slate-800 hover:border-cyan-500/50 transition-all shadow-lg space-y-3">
          <div className="w-10 h-10 rounded-lg bg-purple-950/80 border border-purple-600/40 flex items-center justify-center text-purple-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-space text-white">
            2. Can Anyone Own Apollo Landing Sites?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Could a commercial space tourist land at Tranquility Base and sell Neil Armstrong’s boots on eBay? <strong>No!</strong> Under international space treaties and the US "One Small Step Act", historic landing zones are protected human heritage. Future spacecraft must land at least 100 meters away so their rocket exhaust doesn't blow away Neil Armstrong's famous bootprints.
          </p>
          <div className="text-xs font-mono text-purple-300 pt-1">
            ✨ Result: Those bootprints will remain frozen in the dust for millions of years.
          </div>
        </div>

        {/* Story 3: The 50-Year Accidental Experiment */}
        <div className="p-6 rounded-xl bg-[#090e21] border border-slate-800 hover:border-cyan-500/50 transition-all shadow-lg space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-600/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-space text-white">
            3. The 50-Year Accidental Experiment
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            By leaving metal frames, glass mirrors, and electrical wires on the Moon for half a century, NASA unintentionally created the longest durability test in human history. By examining how cosmic radiation and wild 250-degree temperature swings affect these materials over decades, engineers now know how to design long-lasting permanent Moon bases!
          </p>
          <div className="text-xs font-mono text-emerald-300 pt-1">
            ✨ Result: Quartz laser mirrors are still 100% working after 55+ years on the lunar soil.
          </div>
        </div>

        {/* Story 4: No Sneezing on Mars */}
        <div className="p-6 rounded-xl bg-[#090e21] border border-slate-800 hover:border-cyan-500/50 transition-all shadow-lg space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-950/80 border border-amber-600/40 flex items-center justify-center text-amber-400">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-space text-white">
            4. No Sneezing on Mars (Planetary Protection)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            If we find bacteria on Mars tomorrow, how do we know it didn’t just hitchhike from an engineer who sneezed in the factory on Earth? To prevent "infecting" other worlds, every Mars rover is baked in high-temperature industrial ovens and scrubbed in ultra-clean rooms. When rovers retire, their locations are logged to ensure they never contaminate underground Martian water!
          </p>
          <div className="text-xs font-mono text-amber-300 pt-1">
            ✨ Result: When we search for Martian life, we can be confident it's the real deal.
          </div>
        </div>

      </div>
    </section>
  );
};
