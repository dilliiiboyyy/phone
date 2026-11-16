import React, { useState, useRef } from 'react';
import { Fingerprint, CheckCircle2, ArrowRight, Zap, Target } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function TouchExperiment({ onComplete, onNext }) {
  const [touchPoints, setTouchPoints] = useState([]);
  const [lastCoords, setLastCoords] = useState(null);
  const [tapCount, setTapCount] = useState(0);
  const screenRef = useRef(null);

  const handlePointerDown = (e) => {
    if (!screenRef.current) return;
    const rect = screenRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    // Keep coordinates within bounds
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      sound.playTap();
      const newPoint = {
        id: Date.now() + Math.random(),
        x,
        y,
        time: Date.now()
      };

      setLastCoords({ x, y });
      setTapCount((prev) => prev + 1);
      setTouchPoints((prev) => [...prev.slice(-7), newPoint]); // Keep last 8 points
    }
  };

  const handleFinish = () => {
    sound.playSuccess();
    onComplete('touch');
    onNext();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-xl mb-6">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#18324A] mb-1 block">
          Mini-Challenge 06 / 08
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#18324A] mb-2">
          How Does Your Phone Know Where You Tapped?
        </h2>
        <p className="text-base text-[#20303C]/80">
          <strong>Instruction:</strong> Tap or click anywhere on the virtual glass touch area below!
        </p>
      </div>

      {/* Main Touch Glass Stage */}
      <div className="w-full max-w-2xl bg-white border border-[#DDE2E5] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center">
        {/* Sensor Coordinate Readout Bar */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-[#18324A] mb-4 pb-3 border-b border-[#DDE2E5]">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#E67E42]" />
            <span>
              COORDINATES:{' '}
              {lastCoords ? (
                <strong className="text-[#E67E42] tabular-nums">
                  X: {lastCoords.x}px, Y: {lastCoords.y}px
                </strong>
              ) : (
                <span className="text-slate-400">WAITING FOR TAP</span>
              )}
            </span>
          </div>
          <div>
            <span>
              TOUCHES DETECTED: <strong className="tabular-nums text-[#18324A]">{tapCount}</strong>
            </span>
          </div>
        </div>

        {/* Virtual Capacitive Glass Panel */}
        <div
          ref={screenRef}
          onPointerDown={handlePointerDown}
          className="relative w-full h-72 sm:h-80 bg-[#18324A] rounded-xl overflow-hidden cursor-crosshair select-none border-2 border-[#DDE2E5] shadow-inner flex items-center justify-center"
        >
          {/* Capacitive Diamond Grid Background pattern */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #4E8585 1px, transparent 1px),
                linear-gradient(to bottom, #4E8585 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px'
            }}
          />

          {/* Guide prompt when empty */}
          {touchPoints.length === 0 && (
            <div className="flex flex-col items-center pointer-events-none text-white/60 text-center px-4 animate-pulse">
              <Fingerprint className="w-12 h-12 text-[#E67E42] mb-2" />
              <span className="text-sm font-bold text-white">TAP THE GLASS</span>
              <span className="text-xs text-[#DDE2E5]">Capacitive electrodes ready</span>
            </div>
          )}

          {/* Touch Ripples & Electrodes */}
          {touchPoints.map((pt) => (
            <div
              key={pt.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: pt.x, top: pt.y }}
            >
              {/* Expanding Ripple Ring */}
              <div className="w-16 h-16 rounded-full border-2 border-[#E67E42] bg-[#E67E42]/20 animate-ping" />
              {/* Center Touch Dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#E67E42] rounded-full border-2 border-white shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              {/* Coordinates tag beside point */}
              <div className="absolute left-5 top-0 bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded shadow whitespace-nowrap">
                ({pt.x}, {pt.y})
              </div>
            </div>
          ))}

          {/* Crosshair guidelines on last touch */}
          {lastCoords && (
            <>
              <div 
                className="absolute top-0 bottom-0 w-[1px] bg-[#E67E42]/40 pointer-events-none"
                style={{ left: lastCoords.x }}
              />
              <div 
                className="absolute left-0 right-0 h-[1px] bg-[#E67E42]/40 pointer-events-none"
                style={{ top: lastCoords.y }}
              />
            </>
          )}
        </div>

        {/* Helper bottom caption */}
        <div className="w-full mt-3 flex justify-between text-xs text-[#20303C]/70">
          <span>Notice the crosshairs intersecting horizontal & vertical electrodes.</span>
          <span className="font-semibold text-[#4E8585]">Sampling rate: 120Hz</span>
        </div>
      </div>

      {/* Answer & Science Explanation */}
      {tapCount > 0 && (
        <div className="w-full max-w-2xl mt-6 bg-[#18324A] text-white rounded-2xl p-6 shadow-md transition-all">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#E67E42] shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-base font-bold text-[#F7F3EA] mb-1">
                THE ANSWER: CAPACITIVE ELECTRICAL FIELD
              </h3>
              <p className="text-sm sm:text-base text-[#DDE2E5] leading-relaxed">
                Your skin naturally conducts electricity. Beneath the smartphone glass is a transparent grid of microscopic wires (Indium Tin Oxide). When your finger touches the glass, it absorbs a tiny amount of electrical charge, pinpointing your exact X and Y coordinates!
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-sm sm:text-base rounded-xl transition-transform active:scale-95 shadow"
            >
              <span>Next Experiment: Battery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
