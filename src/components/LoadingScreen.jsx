import React, { useState, useEffect } from 'react';

const SENSOR_ICONS = [
  { icon: '🌀', name: 'Motion' },
  { icon: '📍', name: 'GPS' },
  { icon: '📸', name: 'Camera' },
  { icon: '🎙️', name: 'Mic' },
  { icon: '☀️', name: 'Light' },
  { icon: '👆', name: 'Touch' }
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Smooth simulated loading progression (~1.2 seconds total)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerating progress curve
        const increment = prev < 50 ? 5 : prev < 85 ? 8 : 12;
        return Math.min(100, prev + increment);
      });
    }, 45);

    // Hard failsafe timeout: never remain stuck past 2 seconds
    const failsafe = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsFadingOut(true);
      setTimeout(onComplete, 250);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
    };
  }, [onComplete]);

  // When progress reaches 100, trigger smooth fade-out and complete
  useEffect(() => {
    if (progress === 100 && !isFadingOut) {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        onComplete();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [progress, isFadingOut, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#F7F3EA] flex flex-col items-center justify-center p-4 transition-opacity duration-300 select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
    >
      {/* Exhibit Kicker */}
      <span className="text-[11px] font-bold uppercase tracking-widest text-[#4E8585] mb-2 bg-white px-3.5 py-1 rounded-full border border-[#DDE2E5] shadow-2xs">
        School IT Exhibition · Grade 9 & 10
      </span>

      {/* Main Exhibition Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18324A] text-center tracking-tight mb-2">
        YOUR PHONE KNOWS MORE THAN YOU THINK
      </h1>

      {/* Subtitle */}
      <p className="text-sm font-medium text-[#20303C]/75 text-center mb-8">
        Getting everything ready…
      </p>

      {/* Minimal Smartphone Outline with Surrounding Sensor Dots */}
      <div className="relative w-40 h-56 flex items-center justify-center mb-8">
        {/* Minimal Physical Phone Silhouette */}
        <div className="w-28 h-48 rounded-[24px] border-3 border-[#18324A] bg-white shadow-md p-2 flex flex-col justify-between items-center relative overflow-hidden">
          {/* Top Speaker notch */}
          <div className="w-10 h-1.5 bg-[#DDE2E5] rounded-full"></div>

          {/* Center Sensor Pulse Radar */}
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-[#E67E42]/40 animate-ping absolute"></div>
            <div className="w-8 h-8 rounded-full bg-[#F7F3EA] border border-[#DDE2E5] flex items-center justify-center text-base">
              📱
            </div>
          </div>

          {/* Bottom Home bar */}
          <div className="w-8 h-1 bg-[#DDE2E5] rounded-full"></div>

          {/* Progress screen wash fill */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#E67E42]/10 transition-all duration-100 pointer-events-none"
            style={{ height: `${progress}%` }}
          />
        </div>

        {/* Orbiting Sensor Badges popping in as progress advances */}
        {SENSOR_ICONS.map((sensor, idx) => {
          const angle = (idx / SENSOR_ICONS.length) * (2 * Math.PI) - Math.PI / 2;
          const radius = 72; // Distance from center
          const x = Math.round(Math.cos(angle) * radius);
          const y = Math.round(Math.sin(angle) * radius);

          const threshold = (idx + 1) * 15;
          const isActivated = progress >= threshold;

          return (
            <div
              key={sensor.name}
              className={`absolute w-8 h-8 rounded-full bg-white border border-[#DDE2E5] flex items-center justify-center text-xs shadow-xs transition-all duration-300 ${
                isActivated
                  ? 'scale-100 opacity-100 border-[#E67E42]'
                  : 'scale-75 opacity-25'
              }`}
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
              title={sensor.name}
            >
              <span>{sensor.icon}</span>
            </div>
          );
        })}
      </div>

      {/* Smooth Loading Progress Bar */}
      <div className="w-64 max-w-xs flex flex-col items-center gap-2">
        <div className="w-full h-2 bg-[#DDE2E5] rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-[#E67E42] rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full flex justify-between items-center text-[11px] font-mono text-[#20303C]/70">
          <span>Calibrating Sensors</span>
          <span className="font-bold text-[#18324A] tabular-nums">{progress}%</span>
        </div>
      </div>

      {/* Tap anywhere or click to skip immediately */}
      <button
        type="button"
        onClick={() => {
          setIsFadingOut(true);
          setTimeout(onComplete, 100);
        }}
        className="mt-6 text-[11px] font-semibold text-[#4E8585] hover:text-[#18324A] hover:underline cursor-pointer"
      >
        Skip intro →
      </button>
    </div>
  );
}
