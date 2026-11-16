import React, { useState } from 'react';
import { EXPERIMENTS } from '../data/experiments';
import { CheckCircle2, ArrowRight, Sparkles, HelpCircle, Trophy } from 'lucide-react';
import { sound } from '../utils/audio';

export default function PhoneHub(props) {
  const { 
    completedList = [], 
    onSelectExperiment, 
    onStartQuiz 
  } = props;
  const [hoveredTech, setHoveredTech] = useState(null);

  const completedCount = completedList.length;

  const handleCardClick = (expId) => {
    sound.playTap();
    onSelectExperiment(expId);
  };

  return (
    <div className="w-full flex flex-col items-center max-w-6xl px-4 py-4">
      {/* Exhibit Hub Header */}
      <div className="text-center max-w-2xl mb-6">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E67E42]">
            Interactive Device Laboratory
          </span>
          <span className="text-[#DDE2E5]">·</span>
          <span className="text-xs font-semibold text-[#4E8585]">
            {completedCount} of 8 Explored
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] mb-2 tracking-tight">
          What Is Inside Your Phone?
        </h2>
        <p className="text-sm sm:text-base text-[#20303C]/80">
          Pick any technology zone around the phone to launch a 60-second hands-on challenge.
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto mt-3 h-2 bg-[#DDE2E5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#E67E42] transition-all duration-500 rounded-full"
            style={{ width: `${(completedCount / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Sandbox Layout: Technology Cards flanking the Interactive Phone */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: 4 Cards */}
        <div className="lg:col-span-4 flex flex-col gap-3.5 order-2 lg:order-1">
          {EXPERIMENTS.slice(0, 4).map((exp) => {
            const isCompleted = completedList.includes(exp.id);
            const isHighlighted = hoveredTech === exp.id;
            return (
              <div
                key={exp.id}
                onMouseEnter={() => setHoveredTech(exp.id)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`bg-white border rounded-2xl p-4 transition-all shadow-xs hover:shadow-md flex items-center justify-between gap-3 ${
                  isHighlighted ? 'border-[#E67E42] ring-2 ring-[#E67E42]/20 translate-x-1' : 'border-[#DDE2E5]'
                }`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#F7F3EA] border border-[#DDE2E5] flex items-center justify-center text-xl shrink-0 shadow-2xs">
                    {exp.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#18324A] uppercase tracking-wide">
                        {exp.shortName}
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-xs text-[#20303C]/80 font-medium truncate mt-0.5">
                      {exp.question}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCardClick(exp.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
                    isCompleted
                      ? 'bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A]'
                      : 'bg-[#E67E42] hover:bg-[#d66f34] text-white shadow-xs'
                  }`}
                >
                  {isCompleted ? 'Revisit' : 'TRY IT'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Center Column: The Large Interactive Smartphone Graphic */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 my-2 lg:my-0">
          <div className="relative w-64 sm:w-72 bg-[#18324A] rounded-[38px] p-3 shadow-2xl border-4 border-[#DDE2E5] flex flex-col justify-between items-center group">
            {/* Top Notch with Labeled Sensor Hotspots */}
            <div className="w-full flex justify-center py-1">
              <div className="w-24 h-4 bg-black/50 rounded-full flex items-center justify-around px-2 relative">
                {/* Camera dot */}
                <button
                  type="button"
                  onClick={() => handleCardClick('camera')}
                  onMouseEnter={() => setHoveredTech('camera')}
                  onMouseLeave={() => setHoveredTech(null)}
                  title="Selfie Camera Lens"
                  className="w-2.5 h-2.5 rounded-full bg-cyan-700 hover:ring-2 hover:ring-white transition-all cursor-pointer"
                />
                {/* Speaker slit */}
                <div className="w-6 h-1 bg-white/20 rounded-full"></div>
                {/* Ambient light / proximity sensor */}
                <button
                  type="button"
                  onClick={() => handleCardClick('light')}
                  onMouseEnter={() => setHoveredTech('light')}
                  onMouseLeave={() => setHoveredTech(null)}
                  title="Light & Proximity Sensor"
                  className="w-2 h-2 rounded-full bg-[#E67E42] hover:ring-2 hover:ring-white transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Simulated Live Display Screen */}
            <div className="w-full h-96 sm:h-[420px] bg-[#F7F3EA] rounded-[26px] p-4 flex flex-col justify-between overflow-hidden relative border border-black/10">
              {/* Display Status Bar */}
              <div className="flex justify-between items-center text-[11px] font-mono text-[#18324A] font-bold">
                <span>10:30 AM</span>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Inside Phone Cutaway & Sensor Map */}
              <div className="flex flex-col items-center text-center my-auto">
                <div className="w-24 h-24 rounded-2xl bg-white border border-[#DDE2E5] shadow-xs flex items-center justify-center p-2 mb-3 relative overflow-hidden">
                  <img
                    src="/src/assets/images/exhibit_hero_phone_1790890085840.jpg"
                    alt="Smartphone internal anatomy"
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle radar circle */}
                  <div className="absolute inset-0 rounded-2xl border border-[#E67E42]/40 animate-ping pointer-events-none" />
                </div>

                <h3 className="text-sm font-bold text-[#18324A]">
                  {hoveredTech 
                    ? EXPERIMENTS.find(e => e.id === hoveredTech)?.title 
                    : 'Tap Any Sensor Above'}
                </h3>
                <p className="text-[11px] text-[#20303C]/70 max-w-[180px] mt-1 leading-snug">
                  {hoveredTech 
                    ? EXPERIMENTS.find(e => e.id === hoveredTech)?.challenge 
                    : 'Dozens of microscopic sensors are listening, watching, and measuring.'}
                </p>
              </div>

              {/* Capacitive Fingerprint Touch Indicator at bottom of screen */}
              <button
                type="button"
                onClick={() => handleCardClick('touch')}
                onMouseEnter={() => setHoveredTech('touch')}
                onMouseLeave={() => setHoveredTech(null)}
                className="w-full py-2 bg-white/80 hover:bg-white rounded-xl border border-[#DDE2E5] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="text-xs">👆</span>
                <span className="text-[11px] font-bold text-[#18324A]">
                  Touchscreen Glass
                </span>
              </button>

              {/* Home bar */}
              <div className="w-full flex justify-center pt-2">
                <div className="w-16 h-1 bg-[#18324A]/30 rounded-full"></div>
              </div>
            </div>

            {/* Bottom Microphone & USB-C ports */}
            <div className="w-full flex justify-center items-center gap-3 py-1 text-white/50 text-[10px]">
              <button
                type="button"
                onClick={() => handleCardClick('microphone')}
                title="Microphone Hole"
                className="w-1.5 h-1.5 rounded-full bg-white/40 hover:bg-[#E67E42] transition-colors"
              />
              <div className="w-6 h-1.5 rounded-full bg-black/60"></div>
              <button
                type="button"
                onClick={() => handleCardClick('microphone')}
                title="Microphone Hole"
                className="w-1.5 h-1.5 rounded-full bg-white/40 hover:bg-[#E67E42] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Right Column: 4 Cards */}
        <div className="lg:col-span-4 flex flex-col gap-3.5 order-3">
          {EXPERIMENTS.slice(4, 8).map((exp) => {
            const isCompleted = completedList.includes(exp.id);
            const isHighlighted = hoveredTech === exp.id;
            return (
              <div
                key={exp.id}
                onMouseEnter={() => setHoveredTech(exp.id)}
                onMouseLeave={() => setHoveredTech(null)}
                className={`bg-white border rounded-2xl p-4 transition-all shadow-xs hover:shadow-md flex items-center justify-between gap-3 ${
                  isHighlighted ? 'border-[#E67E42] ring-2 ring-[#E67E42]/20 -translate-x-1' : 'border-[#DDE2E5]'
                }`}
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-[#F7F3EA] border border-[#DDE2E5] flex items-center justify-center text-xl shrink-0 shadow-2xs">
                    {exp.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#18324A] uppercase tracking-wide">
                        {exp.shortName}
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-xs text-[#20303C]/80 font-medium truncate mt-0.5">
                      {exp.question}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCardClick(exp.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
                    isCompleted
                      ? 'bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A]'
                      : 'bg-[#E67E42] hover:bg-[#d66f34] text-white shadow-xs'
                  }`}
                >
                  {isCompleted ? 'Revisit' : 'TRY IT'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct Bottom Link to Final Quiz */}
      <div className="w-full max-w-xl mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-[#DDE2E5] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F7F3EA] border border-[#DDE2E5] flex items-center justify-center text-xl shrink-0">
            🏆
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#18324A]">
              Ready to test what you learned?
            </h4>
            <span className="text-xs text-[#20303C]/70">
              5 quick multiple-choice questions · 60 seconds
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playSuccess();
            onStartQuiz();
          }}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#18324A] hover:bg-[#20303C] text-white font-bold text-xs sm:text-sm rounded-xl transition-transform active:scale-95 flex items-center justify-center gap-2 shrink-0"
        >
          <span>Take Final Quiz</span>
          <ArrowRight className="w-4 h-4 text-[#E67E42]" />
        </button>
      </div>
    </div>
  );
}
