import React from 'react';
import { sound } from '../../utils/audio';

export default function TimelineRail({ 
  events, 
  currentIndex, 
  onSelectEvent, 
  isBedtime = false 
}) {
  return (
    <div className="w-full max-w-4xl mx-auto px-2 py-3 overflow-x-auto select-none">
      <div className="flex items-center justify-between min-w-[540px] relative px-4">
        {/* Connecting Background Line */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-[#DDE2E5] rounded-full z-0" />

        {/* Progress highlight line */}
        <div 
          className="absolute left-8 top-1/2 -translate-y-1/2 h-1 bg-[#E67E42] rounded-full z-0 transition-all duration-300"
          style={{ 
            width: isBedtime 
              ? 'calc(100% - 4rem)' 
              : `${(currentIndex / events.length) * 100}%` 
          }}
        />

        {events.map((ev, index) => {
          const isPassed = index < currentIndex || isBedtime;
          const isCurrent = index === currentIndex && !isBedtime;

          return (
            <button
              key={ev.id}
              type="button"
              onClick={() => {
                sound.playTap();
                onSelectEvent(index);
              }}
              className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-xs ${
                  isCurrent
                    ? 'bg-[#E67E42] text-white scale-110 ring-4 ring-[#E67E42]/20'
                    : isPassed
                    ? 'bg-[#18324A] text-white'
                    : 'bg-white text-[#20303C] border-2 border-[#DDE2E5] group-hover:border-[#18324A]'
                }`}
              >
                <span>{ev.icon}</span>
              </div>
              <span 
                className={`text-[11px] font-bold mt-1.5 transition-colors whitespace-nowrap ${
                  isCurrent 
                    ? 'text-[#E67E42]' 
                    : isPassed 
                    ? 'text-[#18324A]' 
                    : 'text-[#20303C]/60'
                }`}
              >
                {ev.time}
              </span>
            </button>
          );
        })}

        {/* Bedtime node */}
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onSelectEvent(events.length);
          }}
          className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
        >
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-xs ${
              isBedtime
                ? 'bg-[#18324A] text-amber-300 scale-110 ring-4 ring-[#18324A]/20'
                : 'bg-white text-[#20303C] border-2 border-[#DDE2E5] group-hover:border-[#18324A]'
            }`}
          >
            <span>🌙</span>
          </div>
          <span 
            className={`text-[11px] font-bold mt-1.5 transition-colors whitespace-nowrap ${
              isBedtime ? 'text-[#18324A]' : 'text-[#20303C]/60'
            }`}
          >
            Bedtime
          </span>
        </button>
      </div>
    </div>
  );
}
