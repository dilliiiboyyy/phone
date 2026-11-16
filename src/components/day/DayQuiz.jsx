import React, { useState } from 'react';
import { DAY_QUIZ_QUESTIONS } from '../../data/timelineEvents';
import { CheckCircle2, XCircle, Trophy, Sparkles, ArrowRight, RotateCcw, Home } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function DayQuiz({ 
  onResetExperience, 
  onChooseAnother 
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = DAY_QUIZ_QUESTIONS[currentIdx];
  const currentSelection = selectedAnswers[currentQ?.id];

  const handleSelect = (option) => {
    if (currentSelection !== undefined) return;
    sound.playTap();
    if (option.correct) sound.playSuccess();
    else sound.playBeep();

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selected: option.text,
        isCorrect: option.correct
      }
    }));
  };

  const handleNext = () => {
    sound.playTap();
    if (currentIdx < DAY_QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      sound.playSuccess();
      setIsFinished(true);
    }
  };

  const score = Object.values(selectedAnswers).filter((a) => a.isCorrect).length;

  const getBadge = (sc) => {
    if (sc === 3) return { title: 'PHONE EXPERT', icon: '🔍', color: 'text-[#E67E42]' };
    if (sc >= 2) return { title: 'GREAT EXPLORER', icon: '📱', color: 'text-[#4E8585]' };
    return { title: 'CURIOUS SCIENTIST', icon: '🔬', color: 'text-[#18324A]' };
  };

  const badge = getBadge(score);

  if (isFinished) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white border border-[#DDE2E5] rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col items-center text-center my-4 animate-in fade-in duration-300">
        <div className="w-20 h-20 rounded-full bg-[#F7F3EA] border-2 border-[#DDE2E5] flex items-center justify-center text-4xl mb-3 shadow-xs">
          {badge.icon}
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#E67E42] mb-1">
          Day Challenge Results
        </span>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#18324A] mb-1 tabular-nums">
          {score} / 3
        </h2>

        <h3 className={`text-xl sm:text-2xl font-bold ${badge.color} mb-6 flex items-center gap-2 justify-center`}>
          <span>{badge.title}</span>
          <span>{badge.icon}</span>
        </h3>

        {/* Polished Takeaway Banner */}
        <div className="p-6 bg-[#F7F3EA] rounded-2xl border border-[#DDE2E5] text-center w-full mb-8">
          <h4 className="text-lg sm:text-xl font-extrabold text-[#18324A] mb-2 tracking-tight">
            "YOUR PHONE IS MUCH MORE THAN A SCREEN."
          </h4>
          <p className="text-xs sm:text-sm text-[#20303C]/85 leading-relaxed max-w-md mx-auto italic">
            "You use your phone every day. Now you know a little more about what happens behind the screen."
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button
            type="button"
            onClick={onResetExperience}
            className="px-6 py-3.5 bg-[#18324A] hover:bg-[#20303C] text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-[#E67E42]" />
            <span>START AGAIN</span>
          </button>

          <button
            type="button"
            onClick={onChooseAnother}
            className="px-6 py-3.5 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>CHOOSE ANOTHER EXPERIENCE</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center animate-in fade-in duration-200">
      {/* Quiz Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#E67E42] mb-1 block">
          Quick Exhibition Checkup
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18324A] tracking-tight">
          A Day in the Life Challenge
        </h2>
        <p className="text-sm text-[#20303C]/80 mt-1">
          3 quick questions · Can you guess which technology was at work?
        </p>
      </div>

      {/* Question Card */}
      <div className="w-full bg-white border border-[#DDE2E5] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col">
        {/* Step indicator */}
        <div className="flex items-center justify-between text-xs font-mono text-[#18324A]/70 mb-4 pb-3 border-b border-[#DDE2E5]">
          <span>QUESTION {currentIdx + 1} OF {DAY_QUIZ_QUESTIONS.length}</span>
          <span className="font-bold text-[#4E8585]">Score: {score}</span>
        </div>

        {/* Real Scenario Box */}
        <div className="p-4 bg-[#F7F3EA] rounded-2xl border border-[#DDE2E5] mb-5">
          <span className="text-[11px] font-bold text-[#4E8585] uppercase tracking-wider block mb-1">
            Everyday Action:
          </span>
          <p className="text-base sm:text-lg font-bold text-[#18324A]">
            "{currentQ.scenario}"
          </p>
        </div>

        <p className="text-sm font-semibold text-[#20303C] mb-4">
          {currentQ.question}
        </p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((opt, idx) => {
            const hasChosen = currentSelection !== undefined;
            const isThisChosen = currentSelection?.selected === opt.text;
            let style = 'bg-[#F7F3EA] hover:bg-[#DDE2E5] border-[#DDE2E5] text-[#18324A]';

            if (hasChosen) {
              if (opt.correct) {
                style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
              } else if (isThisChosen) {
                style = 'bg-red-50 border-red-400 text-red-800';
              } else {
                style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={hasChosen}
                onClick={() => handleSelect(opt)}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all text-sm sm:text-base cursor-pointer ${style}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{opt.icon}</span>
                  <span>{opt.text}</span>
                </div>
                {hasChosen && opt.correct && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {hasChosen && isThisChosen && !opt.correct && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Instant explanation */}
        {currentSelection && (
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#20303C]/80 mb-5">
            <strong>How it works:</strong> {currentQ.explanation}
          </div>
        )}

        {/* Next Question / Finish */}
        {currentSelection && (
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-sm sm:text-base rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>{currentIdx < DAY_QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
