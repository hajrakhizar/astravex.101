import React, { useState } from 'react';
import { X, Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, ShieldCheck } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/middleSchoolData';
import { spaceAudio } from '../utils/audio';

interface CadetQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuizCompleted?: (score: number, rank: string) => void;
}

export const CadetQuizModal: React.FC<CadetQuizModalProps> = ({ isOpen, onClose, onQuizCompleted }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [studentCallsign, setStudentCallsign] = useState('Cadet Explorer');

  if (!isOpen) return null;

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    spaceAudio.playClick();
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setIsAnswerSubmitted(true);

    if (selectedAnswer === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      spaceAudio.playSuccessFanfare();
    } else {
      spaceAudio.playWarningBuzzer();
    }
  };

  const handleNextQuestion = () => {
    spaceAudio.playClick();
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      const finalScore = score + (selectedAnswer === currentQ.correctIndex ? 1 : 0);
      let rank = 'Flight Cadet';
      if (finalScore >= 5) rank = 'NASA Flight Director';
      else if (finalScore >= 3) rank = 'Lead Payload Specialist';
      if (onQuizCompleted) onQuizCompleted(finalScore, rank);
    }
  };

  const handleRestart = () => {
    spaceAudio.playClick();
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  const getRankTitle = (finalScore: number) => {
    if (finalScore === 5) return 'Chief Flight Director';
    if (finalScore >= 4) return 'Senior Payload Specialist';
    if (finalScore >= 3) return 'Space Archaeology Specialist';
    return 'Flight Cadet';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#090e1f] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-900/60 bg-[#060a17]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-space font-bold text-white tracking-wide">
                NASA SPACE ARCHAEOLOGY CADET EXAM
              </h3>
              <p className="text-xs text-slate-400 font-code">
                Question {currentIdx + 1} of {QUIZ_QUESTIONS.length} • Score: {score}
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

        {!isFinished ? (
          <div className="p-6">
            {/* Question Text */}
            <h4 className="text-lg font-space font-bold text-white mb-5 leading-snug">
              {currentQ.question}
            </h4>

            {/* Multiple Choice Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let optClass = 'bg-slate-900/80 border-slate-700 hover:border-cyan-500/60 text-slate-200';
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'bg-red-950/80 border-red-500 text-red-200';
                  } else {
                    optClass = 'bg-slate-900/40 border-slate-800 text-slate-500';
                  }
                } else if (isSelected) {
                  optClass = 'bg-cyan-950/60 border-cyan-400 text-cyan-200 font-semibold';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 cursor-pointer ${optClass}`}
                  >
                    <span className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0 text-xs font-code mt-0.5 border-current">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Box */}
            {isAnswerSubmitted && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 mb-6 animate-fade-in text-xs space-y-2">
                <div className="font-space font-bold text-sm text-cyan-300">
                  {selectedAnswer === currentQ.correctIndex ? '🎯 Bullseye!' : '❌ Telemetry Mismatch!'}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>
                <div className="pt-2 border-t border-slate-800 text-amber-300 font-code">
                  💡 Did you know? {currentQ.didYouKnow}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-code">
                {isAnswerSubmitted ? 'Review explanation above' : 'Select best option to confirm'}
              </span>

              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedAnswer === null}
                  onClick={handleSubmitAnswer}
                  className="px-6 py-2.5 rounded-xl font-space font-bold text-sm bg-cyan-500 hover:bg-cyan-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Submit Telemetry
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl font-space font-bold text-sm bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Next Question' : 'View Mission Rating'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finished Results / License Badge */
          <div className="p-6 text-center space-y-6">
            <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-cyan-400 mb-2">
              <ShieldCheck className="w-12 h-12" />
            </div>

            <div>
              <span className="text-xs font-code text-cyan-400 uppercase tracking-widest">
                Certification Granted // Mission Ops
              </span>
              <h4 className="text-2xl font-space font-bold text-white mt-1">
                {getRankTitle(score)}
              </h4>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                You scored <span className="text-cyan-300 font-bold font-code">{score} out of {QUIZ_QUESTIONS.length}</span> on real space archaeology and Apollo physics questions!
              </p>
            </div>

            {/* Custom Digital License Card */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#0d142d] border-2 border-cyan-400/50 shadow-xl text-left relative overflow-hidden font-code">
              <div className="absolute top-2 right-3 text-[10px] text-cyan-400/60 uppercase">
                NASA ARCHEOLOGY // ID-2026-X
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-xl">
                  🚀
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">CALLSIGN</div>
                  <input
                    type="text"
                    value={studentCallsign}
                    onChange={(e) => setStudentCallsign(e.target.value)}
                    className="text-sm font-bold text-white bg-transparent border-b border-cyan-500/50 focus:border-cyan-400 focus:outline-none"
                    placeholder="Enter your name..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[10px]">OPERATIONAL RANK:</span>
                  <span className="text-cyan-300 font-semibold">{score >= 4 ? 'Flight Director' : 'Specialist'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">ACCURACY RATING:</span>
                  <span className="text-emerald-400 font-semibold">{Math.round((score / QUIZ_QUESTIONS.length) * 100)}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">AUTHORIZED WORLDS:</span>
                  <span className="text-slate-200">Moon & Mars</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">CLEARANCE:</span>
                  <span className="text-amber-400 font-semibold">Outer Space Treaty Valid</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-space font-semibold text-slate-300 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                Retake Exam
              </button>
              <button
                onClick={() => {
                  spaceAudio.playClick();
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-space font-bold transition-colors cursor-pointer"
              >
                Done / Return to Archive
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
