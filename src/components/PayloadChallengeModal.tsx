import React, { useState } from 'react';
import { X, Scale, AlertTriangle, CheckCircle2, Rocket, RotateCcw, Info, Zap } from 'lucide-react';
import { PAYLOAD_ITEMS, PayloadItem } from '../data/middleSchoolData';
import { spaceAudio } from '../utils/audio';

interface PayloadChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PayloadChallengeModal: React.FC<PayloadChallengeModalProps> = ({ isOpen, onClose }) => {
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([
    'genesis-rock',
    'deep-core-soil',
    'film-magazines'
  ]);
  const [simulationState, setSimulationState] = useState<'idle' | 'burning' | 'success' | 'failed'>('idle');

  if (!isOpen) return null;

  const MAX_CAPACITY_KG = 50.0;

  const currentWeight = selectedItemIds.reduce((sum, id) => {
    const item = PAYLOAD_ITEMS.find((it) => it.id === id);
    return sum + (item ? item.weightKg : 0);
  }, 0);

  const currentScienceScore = selectedItemIds.reduce((sum, id) => {
    const item = PAYLOAD_ITEMS.find((it) => it.id === id);
    return sum + (item ? item.scienceValue : 0);
  }, 0);

  const isOverweight = currentWeight > MAX_CAPACITY_KG;
  const weightPercentage = Math.min(100, (currentWeight / MAX_CAPACITY_KG) * 100);

  const toggleItem = (item: PayloadItem) => {
    spaceAudio.playClick();
    setSimulationState('idle');
    if (selectedItemIds.includes(item.id)) {
      setSelectedItemIds(selectedItemIds.filter((id) => id !== item.id));
    } else {
      const newWeight = currentWeight + item.weightKg;
      if (newWeight > MAX_CAPACITY_KG) {
        spaceAudio.playWarningBuzzer();
      }
      setSelectedItemIds([...selectedItemIds, item.id]);
    }
  };

  const handleLaunchBurn = () => {
    setSimulationState('burning');
    spaceAudio.playThruster();

    setTimeout(() => {
      if (currentWeight <= MAX_CAPACITY_KG && currentScienceScore >= 200) {
        setSimulationState('success');
        spaceAudio.playSuccessFanfare();
      } else if (currentWeight <= MAX_CAPACITY_KG) {
        setSimulationState('success');
        spaceAudio.playSuccessFanfare();
      } else {
        setSimulationState('failed');
        spaceAudio.playWarningBuzzer();
      }
    }, 1800);
  };

  const resetToNasaHistorical = () => {
    spaceAudio.playClick();
    setSimulationState('idle');
    const nasaKept = PAYLOAD_ITEMS.filter((it) => it.nasaHistoricalChoice === 'brought_to_earth').map((it) => it.id);
    setSelectedItemIds(nasaKept);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090e1f] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-900/60 bg-[#060a17]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-space font-bold text-white tracking-wide">
                  MISSION OPS SIMULATOR // 50 KG LUNAR LIFTOFF
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-code bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                  PHYSICS CHALLENGE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                The Apollo Lunar Ascent Engine has a strict 50.0 kg payload limit. Balance science return vs rocket fuel!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              spaceAudio.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Telemetry Gauge & Fuel Bar */}
        <div className="px-6 py-4 bg-[#0a1024] border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Weight Indicator */}
          <div className="w-full sm:w-1/2">
            <div className="flex items-center justify-between text-xs font-code mb-1">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-cyan-400" />
                ASCENT PAYLOAD MASS:
              </span>
              <span className={`font-bold text-sm ${isOverweight ? 'text-red-400 animate-pulse' : 'text-cyan-300'}`}>
                {currentWeight.toFixed(1)} / {MAX_CAPACITY_KG.toFixed(1)} kg
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-700">
              <div
                className={`h-full transition-all duration-300 ${
                  isOverweight
                    ? 'bg-red-500'
                    : weightPercentage > 85
                    ? 'bg-amber-400'
                    : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                }`}
                style={{ width: `${Math.min(100, weightPercentage)}%` }}
              />
            </div>
            {isOverweight && (
              <div className="flex items-center gap-1.5 text-xs text-red-400 mt-1 font-code">
                <AlertTriangle className="w-3.5 h-3.5" />
                OVERWEIGHT BY {(currentWeight - MAX_CAPACITY_KG).toFixed(1)} KG! The ascent engine cannot reach lunar orbit!
              </div>
            )}
          </div>

          {/* Science Score Readout & Preset */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-left">
              <div className="text-[10px] text-slate-400 font-code uppercase">Total Science Points</div>
              <div className="text-lg font-space font-bold text-emerald-400">
                {currentScienceScore} <span className="text-xs text-slate-400 font-normal">pts</span>
              </div>
            </div>

            <button
              onClick={resetToNasaHistorical}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-colors border border-slate-700 font-code"
              title="Load the real decisions Neil Armstrong & Buzz Aldrin made"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              Load NASA Historical Setup
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="p-6 max-h-[460px] overflow-y-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-code text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> Select items to carry inside the Ascent Cabin:
            </div>
            <span className="text-[11px] text-slate-400 font-code">
              Unchecked items are dumped onto the Moon surface
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PAYLOAD_ITEMS.map((item) => {
              const isSelected = selectedItemIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-950/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // handled by div
                        className="w-4 h-4 rounded text-cyan-500 accent-cyan-500 cursor-pointer"
                      />
                      <span className="text-sm font-space font-semibold text-white">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-code shrink-0">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                        {item.weightKg} kg
                      </span>
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        item.scienceValue > 0 ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        +{item.scienceValue} pts
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80 font-code text-slate-400">
                    <span>
                      NASA Reality: {item.nasaHistoricalChoice === 'brought_to_earth' ? (
                        <span className="text-emerald-400 font-semibold">Packed to Earth</span>
                      ) : (
                        <span className="text-amber-400 font-semibold">Left on Lunar Dirt</span>
                      )}
                    </span>
                    <span className="text-cyan-400">{item.proTip}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simulation Execution Footer */}
        <div className="px-6 py-4 bg-[#060a17] border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              Real Apollo Science: Neil & Buzz left their boots, cameras, and life support backpacks on the surface to bring back 21.5 kg of pristine lunar rock.
            </span>
          </div>

          <button
            onClick={handleLaunchBurn}
            disabled={simulationState === 'burning'}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-space font-bold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              simulationState === 'burning'
                ? 'bg-amber-600 text-white animate-pulse'
                : isOverweight
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/30'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            <Rocket className="w-4 h-4" />
            {simulationState === 'burning'
              ? 'SIMULATING ASCENT BURN (T-0)...'
              : 'IGNITE ASCENT ENGINE & TEST ORBIT'}
          </button>
        </div>

        {/* Simulation Outcome Overlay */}
        {simulationState === 'success' && (
          <div className="p-5 bg-emerald-950/90 border-t border-emerald-500/60 flex items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-base font-space font-bold text-white">
                  LIFTOFF SUCCESSFUL! RENDEZVOUS ACHIEVED AT 110 KM LUNAR ORBIT 🚀
                </h4>
                <p className="text-xs text-emerald-200 mt-0.5">
                  Payload mass was {currentWeight.toFixed(1)} kg (under 50 kg max). Total Science: {currentScienceScore} points!
                  {currentScienceScore >= 250
                    ? ' Rating: FLIGHT DIRECTOR GENIUS! You maximized scientific payload exactly like Apollo mission planners.'
                    : ' You reached orbit safely, but you could pack even more high-value rock samples!'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSimulationState('idle')}
              className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-xs font-code text-white shrink-0"
            >
              Adjust Payload
            </button>
          </div>
        )}

        {simulationState === 'failed' && (
          <div className="p-5 bg-red-950/90 border-t border-red-500/60 flex items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-400 shrink-0" />
              <div>
                <h4 className="text-base font-space font-bold text-white">
                  MISSION FAILURE // MASS OVERLOAD ERROR!
                </h4>
                <p className="text-xs text-red-200 mt-0.5">
                  Total mass was {currentWeight.toFixed(1)} kg. Because you exceeded 50.0 kg by {(currentWeight - MAX_CAPACITY_KG).toFixed(1)} kg,
                  the ascent engine ran out of hypergolic propellant before reaching orbital velocity. Jettison heavy hardware onto the surface!
                </p>
              </div>
            </div>
            <button
              onClick={() => setSimulationState('idle')}
              className="px-3 py-1.5 rounded-lg bg-red-800 hover:bg-red-700 text-xs font-code text-white shrink-0"
            >
              Fix Mass
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
