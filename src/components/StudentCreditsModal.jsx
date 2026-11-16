import React from 'react';
import { X, Award, Sparkles, BookOpen, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

export default function StudentCreditsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-[#DDE2E5] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F7F3EA] text-[#18324A] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F7F3EA] border border-[#DDE2E5] flex items-center justify-center text-2xl">
            🎓
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E67E42] block">
              School IT Exhibition Project
            </span>
            <h3 className="text-xl font-extrabold text-[#18324A]">
              Meet the Student Curators
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs sm:text-sm text-[#20303C]/85 leading-relaxed">
          <p>
            Welcome! This interactive technology museum exhibit was designed and coded by two secondary students (<strong>Grade 9 & Grade 10</strong>) for our annual school science and technology fair.
          </p>

          <div className="p-4 bg-[#F7F3EA] rounded-2xl border border-[#DDE2E5]">
            <h4 className="font-bold text-[#18324A] mb-1.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E67E42]" />
              <span>Our Exhibition Mission</span>
            </h4>
            <p className="text-xs text-[#20303C]/80">
              "Most people tap on their phone glass for 4 to 6 hours every day without knowing what is happening beneath it. We wanted to build something where children, parents, and teachers can test each physical sensor hands-on in under 2 minutes!"
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs py-1 border-b border-[#DDE2E5]">
              <span className="font-bold text-[#18324A]">Curator & Code Architecture</span>
              <span className="text-[#4E8585] font-semibold">Grade 10 Student</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1 border-b border-[#DDE2E5]">
              <span className="font-bold text-[#18324A]">Sensor Research & Content</span>
              <span className="text-[#4E8585] font-semibold">Grade 9 Student</span>
            </div>
            <div className="flex items-center justify-between text-xs py-1">
              <span className="font-bold text-[#18324A]">Target Audience</span>
              <span className="text-[#E67E42] font-semibold">All Ages (Kids to Grandparents)</span>
            </div>
          </div>
        </div>

        {/* Footer Close */}
        <div className="mt-6 pt-4 border-t border-[#DDE2E5] flex justify-end">
          <button
            type="button"
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="px-5 py-2.5 bg-[#18324A] hover:bg-[#20303C] text-white font-bold text-xs sm:text-sm rounded-xl transition-transform active:scale-95 cursor-pointer"
          >
            Back to Exhibit
          </button>
        </div>
      </div>
    </div>
  );
}
