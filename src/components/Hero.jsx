import React from 'react';
import { ArrowRight, Compass, Sparkles, Layers, ShieldCheck, Clock, Search } from 'lucide-react';
import CategoryCard from './CategoryCard';

export default function Hero({ 
  onStartExplore, 
  onStartDay 
}) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-12 flex flex-col items-center">
      {/* Top Exhibit Kicker & Main Title */}
      <div className="text-center max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 mb-3 text-xs font-semibold text-[#4E8585] bg-[#F7F3EA] px-3.5 py-1 rounded-full border border-[#DDE2E5]">
          <span>School IT Exhibition</span>
          <span>·</span>
          <span>Grade 9 & 10 Project</span>
          <span>·</span>
          <span>Interactive Science Lab</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#18324A] leading-[1.1] tracking-tight mb-4 text-balance">
          YOUR PHONE KNOWS MORE THAN YOU THINK
        </h1>

        <p className="text-base sm:text-xl text-[#20303C]/85 leading-relaxed max-w-2xl mx-auto">
          Every time you move, unlock, photograph, call or navigate with your phone, many different technologies are working together.
        </p>
      </div>

      {/* Two Prominent Category Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">
        {/* Category 1: Explore Your Phone */}
        <CategoryCard
          icon="🔍"
          badge="Interactive Lab"
          title="EXPLORE YOUR PHONE"
          subtitle="Discover the hidden technology inside your phone"
          description="Meet the sensors, hardware and systems inside your smartphone through 8 hands-on experiments."
          buttonText="EXPLORE"
          accentColor="#E67E42"
          onClick={onStartExplore}
          featurePills={[
            '🌀 Motion & Gyro',
            '📍 GPS Satellites',
            '📸 Camera Pixels',
            '🎙️ Microphone',
            '☀️ Light Sensor',
            '👆 Touchscreen'
          ]}
        />

        {/* Category 2: A Day in the Life */}
        <CategoryCard
          icon="⏰"
          badge="Story Timeline"
          title="A DAY IN THE LIFE"
          subtitle="Follow your phone from morning to night"
          description="Follow your phone through one ordinary day—from waking up at 7:00 AM to bedtime—and discover what happens behind the screen."
          buttonText="START THE DAY"
          accentColor="#18324A"
          onClick={onStartDay}
          featurePills={[
            '⏰ 7 AM Alarm',
            '📍 8 AM Map Navigation',
            '📸 10 AM Camera',
            '🎧 1 PM Bluetooth Audio',
            '🎮 5 PM Gaming & Heat',
            '🔐 10 PM Biometrics'
          ]}
        />
      </div>

      {/* Exhibition Showcase Anchor: Physical Cutaway Object */}
      <div className="w-full bg-white border border-[#DDE2E5] rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex-1 text-center lg:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E67E42] block mb-1">
            Behind the Glass
          </span>
          <h3 className="text-2xl font-bold text-[#18324A] mb-2">
            A Modern Technology Museum Installation
          </h3>
          <p className="text-xs sm:text-sm text-[#20303C]/80 leading-relaxed max-w-lg mb-4">
            Designed for quick, 90–120 second interactive sessions. Touch, tilt, test, and discover how physics and computing combine inside everyday handheld devices.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-[#18324A]">
            <div className="flex items-center gap-1.5">
              <span>⏱️</span>
              <span>~2 Minutes per session</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>🔬</span>
              <span>Hands-on experiments</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>👶</span>
              <span>All ages welcome</span>
            </div>
          </div>
        </div>

        {/* Miniature Phone Preview */}
        <div className="w-48 sm:w-56 h-32 rounded-2xl overflow-hidden border border-[#DDE2E5] shadow-inner shrink-0 relative group">
          <img
            src="/src/assets/images/exhibit_hero_phone_1790890085840.jpg"
            alt="Internal smartphone cutaway illustration"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-2 left-2 bg-[#18324A]/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
            Physical Lab Hardware
          </div>
        </div>
      </div>
    </div>
  );
}
