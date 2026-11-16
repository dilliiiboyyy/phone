import React, { useState } from 'react';
import { Camera, ZoomIn, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function CameraExperiment({ onComplete, onNext }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [pixelationLevel, setPixelationLevel] = useState(1); // 1 = Clear image, 20 = Raw Pixels
  const [hasFlashed, setHasFlashed] = useState(false);

  const handleSelectChoice = (choice) => {
    sound.playTap();
    setSelectedAnswer(choice);
    if (choice === 'image') {
      sound.playSuccess();
      // Trigger camera flash
      setHasFlashed(true);
      setTimeout(() => setHasFlashed(false), 300);
      // Animate from blocky pixels to smooth photo
      setPixelationLevel(1);
    } else {
      sound.playBeep();
    }
  };

  const handleSnapPhoto = () => {
    sound.playPing();
    setHasFlashed(true);
    setTimeout(() => setHasFlashed(false), 250);
  };

  const handleFinish = () => {
    sound.playSuccess();
    onComplete('camera');
    onNext();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-xl mb-6">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#18324A] mb-1 block">
          Mini-Challenge 03 / 08
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#18324A] mb-2">
          How Does a Camera See?
        </h2>
        <p className="text-base text-[#20303C]/80">
          <strong>Question:</strong> What happens when millions of tiny light sensor pixels work together?
        </p>
      </div>

      {/* Choice Buttons */}
      <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {[
          { id: 'image', label: 'They create an image', isCorrect: true },
          { id: 'sound', label: 'They create sound', isCorrect: false },
          { id: 'gps', label: 'They create GPS signals', isCorrect: false }
        ].map((item) => {
          const isSelected = selectedAnswer === item.id;
          let btnStyle = 'bg-white border-[#DDE2E5] text-[#18324A] hover:border-[#18324A]';
          if (isSelected) {
            btnStyle = item.isCorrect
              ? 'bg-[#18324A] text-white border-[#18324A] ring-2 ring-[#E67E42]'
              : 'bg-red-50 text-red-700 border-red-300';
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectChoice(item.id)}
              className={`p-4 rounded-xl border font-bold text-sm sm:text-base flex items-center justify-between transition-all active:scale-95 shadow-xs ${btnStyle}`}
            >
              <span>{item.label}</span>
              {isSelected && item.isCorrect && <CheckCircle2 className="w-5 h-5 text-[#E67E42]" />}
            </button>
          );
        })}
      </div>

      {/* Interactive Pixel Microscope Canvas */}
      <div className="w-full max-w-2xl bg-white border border-[#DDE2E5] rounded-2xl p-5 sm:p-7 shadow-sm flex flex-col items-center relative overflow-hidden">
        {/* Flash Overlay */}
        <div 
          className={`absolute inset-0 bg-white z-20 pointer-events-none transition-opacity duration-200 ${
            hasFlashed ? 'opacity-90' : 'opacity-0'
          }`}
        />

        {/* View mode bar */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-[#18324A]/80 mb-4 pb-3 border-b border-[#DDE2E5]">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#E67E42]" />
            <span>SENSOR: <strong>12,000,000 Micro-Photodiodes</strong></span>
          </div>
          <button
            type="button"
            onClick={handleSnapPhoto}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] rounded-lg font-bold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E67E42]" />
            <span>Flash Shutter</span>
          </button>
        </div>

        {/* Visual Viewport */}
        <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-[#DDE2E5] flex items-center justify-center bg-[#18324A]">
          {/* Stylized Pixel Grid Simulation */}
          {pixelationLevel > 10 ? (
            /* Microscopic Photodiode Sensor Grid View */
            <div className="w-full h-full p-2 grid grid-cols-8 sm:grid-cols-12 gap-1.5 bg-[#18324A]">
              {Array.from({ length: 48 }).map((_, i) => {
                const colors = ['#E67E42', '#4E8585', '#DDE2E5', '#18324A', '#F7F3EA'];
                const color = colors[(i * 7) % colors.length];
                return (
                  <div
                    key={i}
                    className="rounded-sm flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
                    style={{ backgroundColor: color }}
                  >
                    <span className="text-[8px] font-mono font-bold opacity-60 text-white">
                      {i % 3 === 0 ? 'R' : i % 3 === 1 ? 'G' : 'B'}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Clear Combined Image View */
            <div className="w-full h-full relative group">
              <img
                src="/src/assets/images/exhibit_hero_phone_1790890085840.jpg"
                alt="Formed photograph from camera sensor"
                className="w-full h-full object-cover transition-all duration-500"
                style={{
                  filter: `blur(${pixelationLevel > 2 ? pixelationLevel / 2 : 0}px)`
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-[#18324A]/80 backdrop-blur-xs text-white text-[11px] font-mono px-3 py-1 rounded-md">
                Combined Image: 4032 × 3024 Pixels
              </div>
            </div>
          )}
        </div>

        {/* Zoom Magnifier Slider: Pixels vs Clear Picture */}
        <div className="w-full mt-5 px-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[#18324A] mb-1.5">
            <span className="flex items-center gap-1 text-[#E67E42]">
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Zoom into Microscopic Pixels (Sensor view)</span>
            </span>
            <span className="text-[#4E8585]">Full Clear Picture (Your Screen)</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            value={pixelationLevel}
            onChange={(e) => setPixelationLevel(Number(e.target.value))}
            className="w-full accent-[#E67E42] cursor-pointer h-2 bg-[#DDE2E5] rounded-lg"
          />
          <div className="flex justify-between text-[11px] text-[#20303C]/60 mt-1">
            <span>← Single Pixels</span>
            <span>Millions Combined →</span>
          </div>
        </div>
      </div>

      {/* Answer & Science Explanation */}
      {selectedAnswer && (
        <div className="w-full max-w-2xl mt-6 bg-[#18324A] text-white rounded-2xl p-6 shadow-md transition-all">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#E67E42] shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-base font-bold text-[#F7F3EA] mb-1">
                {selectedAnswer === 'image' ? 'CORRECT!' : 'THE ANSWER: THEY CREATE AN IMAGE!'}
              </h3>
              <p className="text-sm sm:text-base text-[#DDE2E5] leading-relaxed">
                A camera sensor captures tiny packets of light (photons) on millions of microscopic red, green, and blue photodiodes. When your phone's processor combines them, they blend seamlessly into a crisp photograph!
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-sm sm:text-base rounded-xl transition-transform active:scale-95 shadow"
            >
              <span>Next Experiment: Microphone</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
