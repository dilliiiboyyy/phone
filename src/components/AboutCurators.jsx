import React from 'react';
import { ArrowLeft, Award, Code, Trophy, Cpu, Smartphone, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

export default function AboutCurators({ onBackToHome, onStartExplore, onStartDay }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-10 flex flex-col items-center animate-in fade-in duration-200">
      {/* Top Navigation Back Action */}
      <div className="w-full flex items-center justify-between pb-4 mb-6 border-b border-[#DDE2E5]">
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onBackToHome();
          }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#18324A] hover:text-[#E67E42] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Exhibition</span>
        </button>

        <span className="text-xs font-mono text-[#4E8585] font-semibold">
          School IT Exhibition · Student Curators
        </span>
      </div>

      {/* Page Header */}
      <div className="text-center max-w-2xl mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E67E42] bg-[#F7F3EA] px-3.5 py-1 rounded-full border border-[#DDE2E5] inline-block mb-3">
          Student Creators
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#18324A] tracking-tight mb-3">
          About the Curators
        </h1>
        <p className="text-sm sm:text-base text-[#20303C]/80 leading-relaxed">
          Meet the two students behind this interactive technology exhibition project.
        </p>
      </div>

      {/* Two Prominent, Visually Balanced Profile Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
        {/* ============================================================== */}
        {/* CURATOR 1: DILSHAAN */}
        {/* ============================================================== */}
        <div className="bg-white border-2 border-[#DDE2E5] hover:border-[#E67E42] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden group">
          {/* Top Decorative Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E67E42]" />

          <div>
            {/* Avatar & Header */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-[#18324A] text-white flex items-center justify-center font-extrabold text-2xl shadow-sm border border-[#DDE2E5] group-hover:scale-105 transition-transform">
                <span>D</span>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18324A] tracking-tight">
                  DILSHAAN
                </h2>
                <span className="text-xs font-bold text-[#E67E42] uppercase tracking-wider">
                  Grade 9
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#20303C]/85 leading-relaxed mb-6">
              Dilshaan is a Grade 9 student with an interest in coding and web development. He has learned coding, has earned a certificate in Python, and achieved 1st place in website making in Grade 8.
            </p>

            {/* Clear Achievement Badges / Cards */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4E8585] block mb-2.5">
                Key Achievements:
              </span>
              <div className="space-y-2.5">
                <div className="p-3 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#DDE2E5] flex items-center justify-center text-sm shadow-2xs shrink-0">
                    🎓
                  </div>
                  <span className="text-xs font-bold text-[#18324A]">
                    Grade 9
                  </span>
                </div>

                <div className="p-3 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#DDE2E5] flex items-center justify-center text-sm shadow-2xs shrink-0">
                    📜
                  </div>
                  <span className="text-xs font-bold text-[#18324A]">
                    Python Certificate
                  </span>
                </div>

                <div className="p-3 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#DDE2E5] flex items-center justify-center text-sm shadow-2xs shrink-0">
                    🥇
                  </div>
                  <span className="text-xs font-bold text-[#18324A]">
                    1st Place — Website Making, Grade 8
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CURATOR 2: MIRSAB */}
        {/* ============================================================== */}
        <div className="bg-white border-2 border-[#DDE2E5] hover:border-[#18324A] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden group">
          {/* Top Decorative Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#18324A]" />

          <div>
            {/* Avatar & Header */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-[#4E8585] text-white flex items-center justify-center font-extrabold text-2xl shadow-sm border border-[#DDE2E5] group-hover:scale-105 transition-transform">
                <span>M</span>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18324A] tracking-tight">
                  MIRSAB
                </h2>
                <span className="text-xs font-bold text-[#4E8585] uppercase tracking-wider">
                  Grade 10
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#20303C]/85 leading-relaxed mb-6">
              Mirsab is a Grade 10 student with an interest in coding and technology. He has received multiple certificates and achieved 3rd place in website making in Grade 8.
            </p>

            {/* Clear Achievement Badges / Cards */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4E8585] block mb-2.5">
                Key Achievements:
              </span>
              <div className="space-y-2.5">
                <div className="p-3 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#DDE2E5] flex items-center justify-center text-sm shadow-2xs shrink-0">
                    🎓
                  </div>
                  <span className="text-xs font-bold text-[#18324A]">
                    Grade 10
                  </span>
                </div>

                <div className="p-3 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#DDE2E5] flex items-center justify-center text-sm shadow-2xs shrink-0">
                    📜
                  </div>
                  <span className="text-xs font-bold text-[#18324A]">
                    Multiple Certificates
                  </span>
                </div>

                <div className="p-3 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#DDE2E5] flex items-center justify-center text-sm shadow-2xs shrink-0">
                    🥉
                  </div>
                  <span className="text-xs font-bold text-[#18324A]">
                    3rd Place — Website Making, Grade 8
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SHARED COLLABORATION SECTION: OUR PROJECT */}
      {/* ============================================================== */}
      <div className="w-full bg-white border border-[#DDE2E5] rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col items-center text-center">
        {/* Visual Relationship Equation */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 bg-[#F7F3EA] border border-[#DDE2E5] rounded-2xl text-xs sm:text-sm font-extrabold text-[#18324A] mb-6">
          <span className="text-[#E67E42]">DILSHAAN</span>
          <span className="text-[#20303C]/50">+</span>
          <span className="text-[#4E8585]">MIRSAB</span>
          <span className="text-[#20303C]/50">=</span>
          <span className="text-[#18324A] uppercase tracking-wide">COLLABORATIVE PROJECT</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#18324A] tracking-tight mb-4">
          OUR PROJECT
        </h3>

        <div className="max-w-2xl mx-auto space-y-3 text-sm sm:text-base text-[#20303C]/85 leading-relaxed mb-8">
          <p>
            This is a combined project created by Dilshaan and Mirsab to explore how AI and modern technology work through interactive experiences designed for everyone.
          </p>
          <p>
            Our goal is to make technology easier to understand by turning complex ideas into simple, engaging, and interactive experiences.
          </p>
        </div>

        {/* Subtle Technology Themes */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
          <div className="px-3 py-1.5 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] text-xs font-bold text-[#18324A] flex items-center gap-1.5">
            <span>💻</span>
            <span>Coding</span>
          </div>
          <div className="px-3 py-1.5 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] text-xs font-bold text-[#18324A] flex items-center gap-1.5">
            <span>📱</span>
            <span>Technology</span>
          </div>
          <div className="px-3 py-1.5 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] text-xs font-bold text-[#18324A] flex items-center gap-1.5">
            <span>⚙️</span>
            <span>Innovation</span>
          </div>
          <div className="px-3 py-1.5 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] text-xs font-bold text-[#18324A] flex items-center gap-1.5">
            <span>🧠</span>
            <span>AI</span>
          </div>
          <div className="px-3 py-1.5 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] text-xs font-bold text-[#18324A] flex items-center gap-1.5">
            <span>🌐</span>
            <span>Interactive Learning</span>
          </div>
        </div>

        {/* Action Buttons to Explore the Exhibit */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <button
            type="button"
            onClick={() => {
              sound.playSuccess();
              onStartExplore();
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Your Phone (8 Labs)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playSuccess();
              onStartDay();
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#18324A] hover:bg-[#20303C] text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>A Day in the Life (Timeline)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playTap();
              onBackToHome();
            }}
            className="w-full sm:w-auto px-5 py-3.5 bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] font-bold text-xs sm:text-sm rounded-xl border border-[#DDE2E5] transition-colors cursor-pointer"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
