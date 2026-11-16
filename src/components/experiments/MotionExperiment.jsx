import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Compass, ArrowRight, CheckCircle2, Smartphone } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function MotionExperiment({ onComplete, onNext }) {
  const [pitch, setPitch] = useState(0); // X axis (-45 to 45)
  const [roll, setRoll] = useState(0);   // Y axis (-45 to 45)
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isRealSensorActive, setIsRealSensorActive] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Handle device orientation on mobile devices
  useEffect(() => {
    const handleOrientation = (event) => {
      if (event.beta !== null && event.gamma !== null) {
        setIsRealSensorActive(true);
        // Clamp angles for pleasant visual tilt
        const clampedPitch = Math.max(-45, Math.min(45, event.beta - 45));
        const clampedRoll = Math.max(-45, Math.min(45, event.gamma));
        setPitch(Math.round(clampedPitch));
        setRoll(Math.round(clampedRoll));
        setHasInteracted(true);
        setShowAnswer(true);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  // Mouse / Touch drag simulation for desktop
  const handlePointerDown = (e) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    sound.playTap();
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;

    setRoll((prev) => Math.max(-45, Math.min(45, prev + deltaX * 0.4)));
    setPitch((prev) => Math.max(-45, Math.min(45, prev - deltaY * 0.4)));

    lastMousePos.current = { x: e.clientX, y: e.clientY };
    if (!hasInteracted) {
      setHasInteracted(true);
      setShowAnswer(true);
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const triggerPresetTilt = (presetRoll, presetPitch) => {
    sound.playTap();
    setRoll(presetRoll);
    setPitch(presetPitch);
    setHasInteracted(true);
    setShowAnswer(true);
  };

  const handleFinish = () => {
    sound.playSuccess();
    onComplete('motion');
    onNext();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Visual Instruction Header */}
      <div className="text-center max-w-xl mb-6">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#E67E42] mb-1 block">
          Mini-Challenge 01 / 08
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#18324A] mb-2">
          How Does Your Phone Know It Moved?
        </h2>
        <p className="text-base text-[#20303C]/80">
          <strong>Instruction:</strong> Tilt your physical device, or drag the phone below with your finger or mouse.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div 
        className="w-full max-w-2xl bg-white border border-[#DDE2E5] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center select-none cursor-grab active:cursor-grabbing relative overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Sensor Live Indicators */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-[#18324A]/70 mb-4 pb-3 border-b border-[#DDE2E5]">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#E67E42] animate-spin-slow" />
            <span>ACCELEROMETER: <strong className="text-[#18324A] tabular-nums">{Math.round(roll)}° Roll</strong></span>
          </div>
          <div>
            <span>GYROSCOPE: <strong className="text-[#18324A] tabular-nums">{Math.round(pitch)}° Pitch</strong></span>
          </div>
          <div className="hidden sm:block">
            <span className="text-[11px] text-[#4E8585] font-semibold">
              {isRealSensorActive ? '● LIVE SENSOR' : '● TOUCH SIMULATION'}
            </span>
          </div>
        </div>

        {/* 3D Tilting Phone Stage */}
        <div className="h-64 sm:h-72 w-full flex items-center justify-center perspective-[800px] my-2">
          <div
            className="w-36 h-60 sm:w-40 sm:h-64 bg-[#18324A] rounded-[28px] p-2.5 shadow-xl border-2 border-[#DDE2E5] transition-transform duration-75 flex flex-col justify-between relative"
            style={{
              transform: `rotateX(${pitch}deg) rotateY(${roll}deg) rotateZ(${roll * 0.3}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Phone Speaker & Camera Notch */}
            <div className="w-full flex justify-center items-center py-0.5">
              <div className="w-12 h-2.5 bg-black/40 rounded-full flex items-center justify-end px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4E8585]/80"></div>
              </div>
            </div>

            {/* Screen Content reacting to gravity */}
            <div className="flex-1 bg-[#F7F3EA] rounded-[18px] p-3 flex flex-col items-center justify-center text-center overflow-hidden relative">
              {/* Virtual Bubble Level inside phone */}
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#18324A]/30 flex items-center justify-center relative bg-white/70">
                <div 
                  className="w-7 h-7 rounded-full bg-[#E67E42] shadow-md flex items-center justify-center transition-transform duration-100"
                  style={{
                    transform: `translate(${roll * 0.7}px, ${-pitch * 0.7}px)`
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
              </div>

              <span className="text-[11px] font-bold text-[#18324A] mt-3">
                {Math.abs(roll) > 25 ? 'SCREEN ROTATED' : 'PORTRAIT MODE'}
              </span>
              <span className="text-[10px] text-[#20303C]/60">
                Gravity: {(1.0 + Math.abs(pitch + roll) / 100).toFixed(2)}G
              </span>
            </div>

            {/* Home indicator bar */}
            <div className="w-full flex justify-center py-1">
              <div className="w-12 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Quick Tilt Shortcuts for Desktop mouse visitors */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-[#20303C]/70 mr-1">Quick tilt test:</span>
          <button
            type="button"
            onClick={() => triggerPresetTilt(-30, 10)}
            className="px-3 py-1.5 text-xs font-semibold bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] rounded-lg transition-colors"
          >
            Tilt Left (-30°)
          </button>
          <button
            type="button"
            onClick={() => triggerPresetTilt(0, 0)}
            className="px-3 py-1.5 text-xs font-semibold bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] rounded-lg transition-colors"
          >
            Center (0°)
          </button>
          <button
            type="button"
            onClick={() => triggerPresetTilt(30, -10)}
            className="px-3 py-1.5 text-xs font-semibold bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] rounded-lg transition-colors"
          >
            Tilt Right (+30°)
          </button>
        </div>
      </div>

      {/* Answer & Science Explanation Card */}
      {showAnswer && (
        <div className="w-full max-w-2xl mt-6 bg-[#18324A] text-white rounded-2xl p-6 shadow-md transition-all">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#E67E42] shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-base font-bold text-[#F7F3EA] mb-1">
                THE ANSWER
              </h3>
              <p className="text-sm sm:text-base text-[#DDE2E5] leading-relaxed">
                Your phone uses microscopic motion sensors — an <strong>accelerometer</strong> and a <strong>gyroscope</strong>. They contain tiny silicon springs that bend when you move, instantly calculating gravitational pull and orientation!
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-sm sm:text-base rounded-xl transition-transform active:scale-95 shadow"
            >
              <span>Next Experiment: GPS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
