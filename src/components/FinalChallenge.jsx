import React, { useState } from 'react';
import { CheckCircle2, XCircle, Trophy, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/experiments';
import { sound } from '../utils/audio';

export default function FinalChallenge({ onCompleteQuiz, onRestartQuiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQ?.id];

  const handleSelectOption = (option) => {
    if (selectedAnswer !== undefined) return; // Prevent changing after selection
    sound.playTap();
    const isCorrect = option.correct;
    if (isCorrect) sound.playSuccess();
    else sound.playBeep();

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selected: option.text,
        isCorrect
      }
    }));
  };

  const handleNextQuestion = () => {
    sound.playTap();
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      sound.playSuccess();
      setQuizFinished(true);
    }
  };

  const calculateScore = () => {
    return Object.values(selectedAnswers).filter((a) => a.isCorrect).length;
  };

  const score = calculateScore();

  const getRank = (sc) => {
    if (sc === 5) return { title: 'MASTER PHONE DETECTIVE', emoji: '🏆', color: 'text-[#E67E42]' };
    if (sc >= 3) return { title: 'PHONE EXPLORER', emoji: '🔍', color: 'text-[#4E8585]' };
    return { title: 'CURIOUS SCIENTIST', emoji: '🔬', color: 'text-[#18324A]' };
  };

  const rank = getRank(score);

  if (quizFinished) {
    return (
      <div className="w-full max-w-2xl bg-white border border-[#DDE2E5] rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col items-center text-center my-6">
        <div className="w-20 h-20 rounded-full bg-[#F7F3EA] border-2 border-[#DDE2E5] flex items-center justify-center text-4xl mb-4 shadow-xs">
          {rank.emoji}
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#E67E42] mb-1">
          Challenge Completed
        </span>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#18324A] mb-1 tabular-nums">
          {score} / {QUIZ_QUESTIONS.length}
        </h2>

        <h3 className={`text-xl sm:text-2xl font-bold ${rank.color} mb-4 flex items-center gap-2 justify-center`}>
          <span>{rank.title}</span>
          <span>{rank.emoji}</span>
        </h3>

        <div className="p-4 bg-[#F7F3EA] rounded-2xl border border-[#DDE2E5] text-[#20303C]/90 text-sm sm:text-base leading-relaxed max-w-lg mb-8">
          "You discovered that your phone is really an orchestra of sensors, processors, cameras, radios, and software working together every single second."
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button
            type="button"
            onClick={() => {
              setSelectedAnswers({});
              setCurrentQuestionIndex(0);
              setQuizFinished(false);
              sound.playTap();
            }}
            className="px-6 py-3.5 rounded-xl border border-[#DDE2E5] hover:bg-[#F7F3EA] text-[#18324A] font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-[#E67E42]" />
            <span>Try Quiz Again</span>
          </button>

          <button
            type="button"
            onClick={onCompleteQuiz}
            className="px-8 py-3.5 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <span>See Final Takeaway</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-xl mb-6">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#E67E42] mb-1 block">
          Quick Final Challenge
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#18324A] mb-2">
          Can You Guess the Sensor?
        </h2>
        <p className="text-base text-[#20303C]/80">
          Test your smartphone detective skills in 5 quick everyday scenarios!
        </p>
      </div>

      {/* Question Card */}
      <div className="w-full max-w-2xl bg-white border border-[#DDE2E5] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col">
        {/* Progress header */}
        <div className="flex items-center justify-between text-xs font-mono text-[#18324A]/70 mb-4 pb-3 border-b border-[#DDE2E5]">
          <span>QUESTION {currentQuestionIndex + 1} OF {QUIZ_QUESTIONS.length}</span>
          <span className="font-bold text-[#4E8585]">Score: {score}</span>
        </div>

        {/* Scenario description */}
        <div className="p-4 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] mb-5">
          <span className="text-[11px] font-bold text-[#4E8585] uppercase tracking-wider block mb-1">
            Real Scenario:
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
            const hasChosen = selectedAnswer !== undefined;
            const isThisChosen = selectedAnswer?.selected === opt.text;
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
                onClick={() => handleSelectOption(opt)}
                className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all text-sm sm:text-base ${style}`}
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

        {/* Clue/Explanation when chosen */}
        {selectedAnswer && (
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#20303C]/80 mb-5">
            <strong>Hint / Fact:</strong> {currentQ.hint}
          </div>
        )}

        {/* Continue Button */}
        {selectedAnswer && (
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-sm sm:text-base rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-2"
            >
              <span>{currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
