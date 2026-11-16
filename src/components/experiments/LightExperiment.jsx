import React, { useState } from 'react';
import { Sun, Moon, CheckCircle2, ArrowRight, Eye } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function LightExperiment({ onComplete, onNext }) {
  // 0 = Pitch dark room (2 lux), 100 = Direct sunlight (100,000 lux)
  const [ambientLight, setAmbientLight] = useState(80);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Dynamic calculated lux & phone brightness
  const lux = Math.round(Math.pow(ambientLight / 100, 3) * 99990 + 10);
  // In dark rooms, phone dims to ~15% to avoid blinding; in direct sunlight, it boosts to 100%
  const screenBrightness = Math.round(15 + (ambientLight * 0.85));

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setAmbientLight(val);
    if (!hasInteracted) {
      setHasInteracted(true);
      sound.playTap();
    }
  };

  const handlePreset = (val) => {
    sound.playTap();
    setAmbientLight(val);
    setHasInteracted(true);
  };

  const handleFinish = () => {
    sound.playSuccess();
    onComplete('light');
    onNext();
  };

  // Surrounding ambient backdrop color calculation
  const ambientBgBrightness = ambientLight / 100;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-xl mb-6">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#4E8585] mb-1 block">
          Mini-Challenge 05 / 08
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#18324A] mb-2">
          How Does Your Screen Know It Is Dark?
        </h2>
        <p className="text-base text-[#20303C]/80">
          <strong>Instruction:</strong> Drag the room lighting slider below to see how the phone's light sensor responds.
        </p>
      </div>

      {/* Main Interactive Light Stage */}
      <div 
        className="w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center transition-colors duration-300 border border-[#DDE2E5]"
        style={{
          backgroundColor: ambientLight > 50 
            ? `rgb(${Math.round(247 + (ambientBgBrightness * 8))}, ${Math.round(243 + (ambientBgBrightness * 8))}, ${Math.round(234 + (ambientBgBrightness * 8))})`
            : `rgb(${Math.round(24 + (ambientLight * 1.5))}, ${Math.round(50 + (ambientLight * 1.5))}, ${Math.round(74 + (ambientLight * 1.5))})`
        }}
      >
        {/* Ambient Sensor Readout Bar */}
        <div className={`w-full flex items-center justify-between text-xs font-mono mb-4 pb-3 border-b transition-colors ${
          ambientLight > 50 ? 'text-[#18324A] border-[#DDE2E5]' : 'text-white/80 border-white/20'
        }`}>
          <div className="flex items-center gap-2">
            {ambientLight > 50 ? <Sun className="w-4 h-4 text-[#E67E42]" /> : <Moon className="w-4 h-4 text-amber-300" />}
            <span>ROOM LIGHT: <strong className="tabular-nums">{lux.toLocaleString()} Lux</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-[#4E8585]" />
            <span>AUTO-BRIGHTNESS: <strong className="tabular-nums">{screenBrightness}%</strong></span>
          </div>
        </div>

        {/* Visual Phone with Auto-Dimming Screen */}
        <div className="h-60 sm:h-64 w-full flex items-center justify-center my-2">
          <div className="w-36 h-56 sm:w-40 sm:h-60 bg-[#18324A] rounded-[26px] p-2.5 shadow-2xl border-2 border-[#DDE2E5] flex flex-col justify-between relative transition-transform">
            {/* Top sensor notch with ambient photodiode dot */}
            <div className="w-full flex justify-center items-center py-0.5">
              <div className="w-14 h-2.5 bg-black/60 rounded-full flex items-center justify-between px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E67E42] animate-pulse" title="Ambient Light Sensor"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-700/80"></div>
              </div>
            </div>

            {/* Simulated Phone Display Screen */}
            <div 
              className="flex-1 rounded-[16px] p-3 flex flex-col items-center justify-between text-center overflow-hidden transition-all duration-300 border border-black/10"
              style={{
                backgroundColor: `rgb(${Math.round(screenBrightness * 2.5)}, ${Math.round(screenBrightness * 2.4)}, ${Math.round(screenBrightness * 2.2)})`,
                filter: `brightness(${0.3 + (screenBrightness / 100) * 0.9})`,
                color: screenBrightness > 40 ? '#18324A' : '#F7F3EA'
              }}
            >
              <div className="text-[10px] font-mono tracking-widest font-bold">12:45 PM</div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#E67E42] text-white flex items-center justify-center font-bold text-sm shadow mb-1">
                  ☀️
                </div>
                <div className="text-xs font-bold">
                  {ambientLight < 20 ? 'Night Comfort Mode' : ambientLight > 80 ? 'Outdoor Boost Mode' : 'Balanced Indoor Mode'}
                </div>
                <div className="text-[10px] opacity-75">
                  Backlight: {screenBrightness}%
                </div>
              </div>

              <div className="w-16 h-1 bg-black/20 rounded-full"></div>
            </div>

            {/* Bottom bar */}
            <div className="w-full flex justify-center py-1">
              <div className="w-10 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Ambient Slider Control */}
        <div className="w-full mt-6 bg-white/90 backdrop-blur-xs rounded-xl p-4 border border-[#DDE2E5] shadow-xs">
          <div className="flex justify-between items-center text-xs font-bold text-[#18324A] mb-2">
            <span className="flex items-center gap-1.5 text-indigo-900">
              <Moon className="w-4 h-4 text-indigo-600" />
              <span>Dark Room / Bedtime (0 Lux)</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#E67E42]">
              <Sun className="w-4 h-4 text-[#E67E42]" />
              <span>Bright Sunlight (100,000 Lux)</span>
            </span>
          </div>

          <input
            type="range"
            min="2"
            max="100"
            value={ambientLight}
            onChange={handleSliderChange}
            className="w-full accent-[#E67E42] cursor-pointer h-3 bg-[#DDE2E5] rounded-lg"
          />

          {/* Quick presets */}
          <div className="flex justify-center gap-2 mt-3 pt-2 border-t border-[#DDE2E5]">
            <button
              type="button"
              onClick={() => handlePreset(5)}
              className="px-2.5 py-1 text-xs font-semibold bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] rounded-md transition-colors"
            >
              🌙 Movie Theater
            </button>
            <button
              type="button"
              onClick={() => handlePreset(50)}
              className="px-2.5 py-1 text-xs font-semibold bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] rounded-md transition-colors"
            >
              💡 Classroom Lamp
            </button>
            <button
              type="button"
              onClick={() => handlePreset(95)}
              className="px-2.5 py-1 text-xs font-semibold bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] rounded-md transition-colors"
            >
              ☀️ Sunny Playground
            </button>
          </div>
        </div>
      </div>

      {/* Answer & Science Explanation */}
      {hasInteracted && (
        <div className="w-full max-w-2xl mt-6 bg-[#18324A] text-white rounded-2xl p-6 shadow-md transition-all">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#E67E42] shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-base font-bold text-[#F7F3EA] mb-1">
                THE ANSWER: AMBIENT LIGHT SENSOR
              </h3>
              <p className="text-sm sm:text-base text-[#DDE2E5] leading-relaxed">
                A tiny light sensor sitting right next to the top speaker continuously measures surrounding brightness. When it senses you walked into sunlight, it drives maximum LED power so you can read the screen!
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-sm sm:text-base rounded-xl transition-transform active:scale-95 shadow"
            >
              <span>Next Experiment: Touchscreen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
