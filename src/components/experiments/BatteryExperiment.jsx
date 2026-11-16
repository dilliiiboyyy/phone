import React, { useState } from 'react';
import { BatteryCharging, BatteryLow, Zap, RotateCcw, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

const ACTIVITIES = [
  { id: 'gaming', name: '3D Action Gaming', icon: '🎮', drain: 25, reason: 'Heavy GPU graphics rendering + max CPU clock speed + fast display refresh.' },
  { id: 'camera', name: '4K Camera & Flash', icon: '📸', drain: 18, reason: 'Image signal processor + active camera sensor array + bright OLED viewfinder.' },
  { id: 'gps', name: 'Turn-by-Turn GPS Navigation', icon: '📍', drain: 15, reason: 'Active satellite antenna tracking + live 5G cellular maps download + continuous screen on.' },
  { id: 'social', name: 'Social Media Scrolling', icon: '📱', drain: 10, reason: 'Continuous Wi-Fi/5G data streaming + video decoding.' },
  { id: 'music', name: 'Music Streaming (Screen Off)', icon: '🎵', drain: 5, reason: 'Very low power! Audio decoding takes minimal energy when the screen is turned off.' }
];

export default function BatteryExperiment({ onComplete, onNext }) {
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [hasDrained, setHasDrained] = useState(false);

  const handleRunActivity = (activity) => {
    sound.playTap();
    setSelectedActivity(activity);
    setHasDrained(true);
    setBatteryLevel((prev) => Math.max(5, prev - activity.drain));
  };

  const handleRecharge = () => {
    sound.playSuccess();
    setBatteryLevel(100);
    setSelectedActivity(null);
  };

  const handleFinish = () => {
    sound.playSuccess();
    onComplete('battery');
    onNext();
  };

  // Color coding for battery level
  const batteryColor = 
    batteryLevel > 50 ? 'bg-[#4E8585]' :
    batteryLevel > 20 ? 'bg-[#E67E42]' : 'bg-red-500';

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-xl mb-6">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#E67E42] mb-1 block">
          Mini-Challenge 07 / 08
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#18324A] mb-2">
          Where Does Your Battery Go?
        </h2>
        <p className="text-base text-[#20303C]/80">
          <strong>Instruction:</strong> Tap an activity below to see how different phone components consume stored chemical energy.
        </p>
      </div>

      {/* Main Battery Stage */}
      <div className="w-full max-w-2xl bg-white border border-[#DDE2E5] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center">
        {/* Battery Health Banner */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-[#18324A] mb-4 pb-3 border-b border-[#DDE2E5]">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#E67E42]" />
            <span>LITHIUM-ION CELL: <strong>4,500 mAh (3.85V)</strong></span>
          </div>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            SIMULATED FOR DEMONSTRATION
          </span>
        </div>

        {/* Large Battery Gauge Visual */}
        <div className="w-full max-w-md bg-[#F7F3EA] rounded-2xl p-6 border border-[#DDE2E5] flex flex-col items-center my-2">
          <div className="flex items-center gap-4 w-full">
            {/* Battery Exterior Shell */}
            <div className="flex-1 h-14 bg-white border-4 border-[#18324A] rounded-xl p-1 relative flex items-center shadow-inner">
              <div
                className={`h-full rounded-lg transition-all duration-700 ${batteryColor}`}
                style={{ width: `${batteryLevel}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-bold text-base text-[#18324A] drop-shadow-xs tabular-nums">
                {batteryLevel}% Remaining
              </span>
            </div>

            {/* Battery Positive Terminal Tip */}
            <div className="w-2.5 h-6 bg-[#18324A] rounded-r-md"></div>

            {/* Instant Recharge Button */}
            <button
              type="button"
              onClick={handleRecharge}
              title="Fast Charge to 100%"
              className="p-3 bg-[#18324A] hover:bg-[#20303C] text-white rounded-xl shadow-xs transition-transform active:scale-90 flex items-center gap-1.5 text-xs font-bold shrink-0"
            >
              <RotateCcw className="w-4 h-4 text-[#E67E42]" />
              <span className="hidden sm:inline">Charge</span>
            </button>
          </div>

          {/* Activity Energy Drain Feedback */}
          {selectedActivity && (
            <div className="mt-4 p-3 bg-white rounded-xl border border-[#DDE2E5] text-left w-full">
              <div className="flex items-center justify-between text-xs font-bold text-[#18324A] mb-1">
                <span>{selectedActivity.icon} {selectedActivity.name}</span>
                <span className="text-red-600 font-mono">-{selectedActivity.drain}% Battery</span>
              </div>
              <p className="text-xs text-[#20303C]/80 leading-relaxed">
                {selectedActivity.reason}
              </p>
            </div>
          )}
        </div>

        {/* Activity Buttons Grid */}
        <div className="w-full mt-6">
          <span className="text-xs font-bold text-[#18324A] uppercase tracking-wider block mb-2 text-center">
            Select an Activity to Test:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {ACTIVITIES.map((act) => (
              <button
                key={act.id}
                type="button"
                onClick={() => handleRunActivity(act)}
                className={`p-3 rounded-xl border text-left transition-all active:scale-95 flex flex-col justify-between ${
                  selectedActivity?.id === act.id
                    ? 'bg-[#18324A] text-white border-[#18324A] shadow-sm'
                    : 'bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] border-[#DDE2E5]'
                }`}
              >
                <div className="text-xl mb-1">{act.icon}</div>
                <div className="text-xs font-bold">{act.name}</div>
                <div className={`text-[10px] font-mono mt-1 ${selectedActivity?.id === act.id ? 'text-[#E67E42]' : 'text-[#4E8585]'}`}>
                  Est. -{act.drain}%
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Answer & Science Explanation */}
      {hasDrained && (
        <div className="w-full max-w-2xl mt-6 bg-[#18324A] text-white rounded-2xl p-6 shadow-md transition-all">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#E67E42] shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-base font-bold text-[#F7F3EA] mb-1">
                THE ANSWER: POWER DISTRIBUTION
              </h3>
              <p className="text-sm sm:text-base text-[#DDE2E5] leading-relaxed">
                Your phone's battery is shared between three main power hogs: the <strong>bright display</strong> (lighting millions of pixels), the <strong>processor</strong> (calculating graphics & games), and <strong>radio transmitters</strong> (Wi-Fi, 5G, and GPS chips constantly pinging antennas).
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-sm sm:text-base rounded-xl transition-transform active:scale-95 shadow"
            >
              <span>Next Experiment: Wireless Connection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
