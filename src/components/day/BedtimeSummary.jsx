import React, { useState } from 'react';
import { Moon, Sparkles, ArrowRight, RotateCcw, CheckCircle2, ChevronDown } from 'lucide-react';
import { sound } from '../../utils/audio';

const DAY_TECH_LIST = [
  { icon: '📍', title: 'Location Technology', desc: 'GPS satellites orbiting 20,000 km overhead' },
  { icon: '📸', title: 'Camera Optics & Sensor', desc: 'Millions of photodiodes catching light photons' },
  { icon: '🎙️', title: 'Audio & Acoustics', desc: 'Microscopic MEMS diaphragms and amplifiers' },
  { icon: '🌀', title: 'Motion Sensors', desc: 'Silicon springs measuring gravity and rotation' },
  { icon: '🔋', title: 'Battery Systems', desc: 'Lithium-ion electrochemical power delivery' },
  { icon: '🧠', title: 'Processor & Software', desc: 'Billions of calculations handled every single second' },
  { icon: '📡', title: 'Wireless Radios', desc: 'Wi-Fi, Bluetooth, and 5G electromagnetic waves' },
  { icon: '🔐', title: 'Security & Biometrics', desc: 'Hardware-encrypted fingerprint & facial scans' }
];

export default function BedtimeSummary({ onStartChallenge, onChooseAnother }) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    sound.playSuccess();
    setRevealed(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center animate-in fade-in duration-300">
      {/* Night Header */}
      <div className="w-20 h-20 rounded-full bg-[#18324A] text-amber-300 flex items-center justify-center text-4xl mb-3 shadow-lg border-2 border-[#DDE2E5]">
        🌙
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-[#E67E42] mb-1">
        11:00 PM · End of Day
      </span>

      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] tracking-tight mb-2">
        Good Night
      </h2>

      <p className="text-base text-[#20303C]/80 max-w-lg mx-auto mb-6">
        As you set your phone on the bedside table, it enters an ultra-low power sleep state. But think back over the day...
      </p>

      {/* Main Summary Container */}
      <div className="w-full bg-white border border-[#DDE2E5] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#4E8585] mb-4">
          During One Ordinary Day, Your Phone Used:
        </h3>

        {/* 8 Technologies Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-left">
          {DAY_TECH_LIST.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] flex items-center gap-3"
            >
              <div className="text-xl shrink-0">{item.icon}</div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#18324A]">{item.title}</div>
                <div className="text-[11px] text-[#20303C]/70 truncate">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Dramatic Question & Answer Reveal */}
        <div className="w-full p-5 bg-[#18324A] text-white rounded-2xl flex flex-col items-center text-center relative overflow-hidden mb-6">
          <span className="text-xs font-bold text-[#DDE2E5] uppercase tracking-wider mb-1">
            Exhibition Question
          </span>
          <h4 className="text-lg sm:text-xl font-bold mb-3">
            How many technologies did you notice?
          </h4>

          {!revealed ? (
            <button
              type="button"
              onClick={handleReveal}
              className="px-6 py-2.5 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-xs sm:text-sm rounded-xl transition-transform active:scale-95 shadow cursor-pointer"
            >
              TAP TO REVEAL
            </button>
          ) : (
            <div className="animate-in zoom-in-95 duration-300">
              <div className="text-xl sm:text-2xl font-extrabold text-[#E67E42] mb-1">
                "More than you probably expected."
              </div>
              <p className="text-xs text-[#DDE2E5]/90 max-w-md mx-auto">
                A smartphone isn't just a screen—it's a pocket-sized physics and engineering laboratory working quietly in the background all day long.
              </p>
            </div>
          )}
        </div>

        {/* Action Button to Quick 3-Question Challenge */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <button
            type="button"
            onClick={onStartChallenge}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Take Quick 3-Question Challenge</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onChooseAnother}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] font-bold text-xs sm:text-sm rounded-xl border border-[#DDE2E5] transition-colors cursor-pointer"
          >
            Choose Another Experience
          </button>
        </div>
      </div>
    </div>
  );
}
