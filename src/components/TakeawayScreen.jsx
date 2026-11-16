import React from 'react';
import { Smartphone, Cpu, Radio, Battery, Layers, RotateCcw, Compass, ArrowRight, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

export default function TakeawayScreen({ onExploreAgain, onSelectExperiment, onOpenCredits }) {
  const handleReset = () => {
    sound.playTap();
    onExploreAgain();
  };

  return (
    <div className="w-full flex flex-col items-center max-w-3xl my-6">
      {/* Title */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#E67E42] mb-1 block">
          Exhibition Conclusion
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18324A] mb-3">
          Looking at Your Phone Differently?
        </h2>
        <p className="text-base sm:text-lg text-[#20303C]/80 max-w-xl mx-auto">
          Behind every touch, swipe, photo, and phone call, dozens of physical systems collaborate in harmony.
        </p>
      </div>

      {/* The Unified Architecture Flow Card */}
      <div className="w-full bg-white border border-[#DDE2E5] rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col items-center">
        {/* Top: The Simple Exterior Phone */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-28 bg-[#18324A] rounded-2xl border-4 border-[#DDE2E5] shadow-lg flex flex-col items-center justify-between p-1.5 relative">
            <div className="w-6 h-1 bg-black/40 rounded-full"></div>
            <span className="text-xl">📱</span>
            <div className="w-6 h-0.5 bg-white/40 rounded-full"></div>
          </div>
          <span className="text-xs font-bold text-[#18324A] mt-2">
            The Phone You Hold
          </span>
          <span className="text-[11px] text-[#20303C]/60">
            Looks like one simple piece of glass
          </span>
        </div>

        {/* Down Arrow */}
        <div className="h-8 w-0.5 bg-[#E67E42] my-1 relative">
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#E67E42] rotate-45"></div>
        </div>

        {/* Middle: The 5 Pillars working together */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-3 my-4">
          <div className="bg-[#F7F3EA] border border-[#DDE2E5] p-3 rounded-2xl flex flex-col items-center text-center">
            <Compass className="w-6 h-6 text-[#E67E42] mb-1.5" />
            <span className="text-xs font-bold text-[#18324A]">Sensors</span>
            <span className="text-[10px] text-[#20303C]/70 mt-0.5">Motion, Light, GPS, Touch</span>
          </div>

          <div className="bg-[#F7F3EA] border border-[#DDE2E5] p-3 rounded-2xl flex flex-col items-center text-center">
            <Cpu className="w-6 h-6 text-[#18324A] mb-1.5" />
            <span className="text-xs font-bold text-[#18324A]">Processor</span>
            <span className="text-[10px] text-[#20303C]/70 mt-0.5">Billions of calculations/sec</span>
          </div>

          <div className="bg-[#F7F3EA] border border-[#DDE2E5] p-3 rounded-2xl flex flex-col items-center text-center">
            <Layers className="w-6 h-6 text-[#4E8585] mb-1.5" />
            <span className="text-xs font-bold text-[#18324A]">Software</span>
            <span className="text-[10px] text-[#20303C]/70 mt-0.5">Operating system & apps</span>
          </div>

          <div className="bg-[#F7F3EA] border border-[#DDE2E5] p-3 rounded-2xl flex flex-col items-center text-center">
            <Radio className="w-6 h-6 text-[#E67E42] mb-1.5" />
            <span className="text-xs font-bold text-[#18324A]">Networks</span>
            <span className="text-[10px] text-[#20303C]/70 mt-0.5">5G, Wi-Fi, Bluetooth waves</span>
          </div>

          <div className="bg-[#F7F3EA] border border-[#DDE2E5] p-3 rounded-2xl flex flex-col items-center text-center col-span-2 sm:col-span-1">
            <Battery className="w-6 h-6 text-[#4E8585] mb-1.5" />
            <span className="text-xs font-bold text-[#18324A]">Battery</span>
            <span className="text-[10px] text-[#20303C]/70 mt-0.5">Portable chemical energy</span>
          </div>
        </div>

        {/* Down Arrow */}
        <div className="h-8 w-0.5 bg-[#4E8585] my-1 relative">
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#4E8585] rotate-45"></div>
        </div>

        {/* Bottom Conclusion */}
        <div className="text-center mt-3 mb-6 max-w-lg">
          <h3 className="text-lg sm:text-xl font-bold text-[#18324A] mb-2">
            Everything Works Together in Milliseconds
          </h3>
          <p className="text-sm text-[#20303C]/85 leading-relaxed italic bg-[#F7F3EA] p-4 rounded-xl border border-[#DDE2E5]">
            "The next time you unlock your screen, take a photo, or check the map, remember: there is an entire world of physics and engineering happening right behind that glass."
          </p>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3.5 bg-[#18324A] hover:bg-[#20303C] text-white font-bold text-sm sm:text-base rounded-xl shadow transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-[#E67E42]" />
            <span>Explore From Beginning</span>
          </button>

          <button
            type="button"
            onClick={onSelectExperiment}
            className="px-6 py-3.5 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-sm sm:text-base rounded-xl shadow transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Choose Another Mini-Experiment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Exhibition Project Byline */}
        <div className="mt-8 pt-6 border-t border-[#DDE2E5] w-full flex flex-col sm:flex-row items-center justify-between text-xs text-[#20303C]/70 gap-2">
          <span>School IT Exhibition Project · Grade 9 & Grade 10</span>
          <button
            type="button"
            onClick={onOpenCredits}
            className="font-bold text-[#18324A] hover:text-[#E67E42] underline cursor-pointer transition-colors"
          >
            Meet the Student Curators →
          </button>
        </div>
      </div>
    </div>
  );
}
