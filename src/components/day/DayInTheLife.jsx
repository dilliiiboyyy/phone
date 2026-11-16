import React, { useState } from 'react';
import { TIMELINE_EVENTS } from '../../data/timelineEvents';
import TimelineRail from './TimelineRail';
import DayEventCard from './DayEventCard';
import BedtimeSummary from './BedtimeSummary';
import DayQuiz from './DayQuiz';
import { ArrowLeft, Home, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function DayInTheLife({ 
  onBackToHome, 
  onResetExperience 
}) {
  const [eventIndex, setEventIndex] = useState(0); // 0..5: events, 6: bedtime summary, 7: quiz

  const isBedtime = eventIndex === TIMELINE_EVENTS.length;
  const isQuiz = eventIndex > TIMELINE_EVENTS.length;

  const handleNextEvent = () => {
    setEventIndex((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevEvent = () => {
    setEventIndex((prev) => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTimelineIndex = (index) => {
    setEventIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartChallenge = () => {
    sound.playSuccess();
    setEventIndex(TIMELINE_EVENTS.length + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setEventIndex(0);
    if (onResetExperience) onResetExperience();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 flex flex-col items-center">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between py-2 mb-3 border-b border-[#DDE2E5]">
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onBackToHome();
          }}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#18324A] hover:text-[#E67E42] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Choose Experience</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-[#20303C]/70">
          <span className="font-bold text-[#18324A]">A Day in the Life</span>
          <span>·</span>
          <span>{isQuiz ? 'Final Quiz' : isBedtime ? 'Bedtime 🌙' : `${eventIndex + 1} of ${TIMELINE_EVENTS.length}`}</span>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-bold text-[#4E8585] hover:text-[#18324A] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart Day</span>
        </button>
      </div>

      {/* Interactive Timeline Rail (visible during events and bedtime) */}
      {!isQuiz && (
        <div className="w-full mb-6">
          <TimelineRail
            events={TIMELINE_EVENTS}
            currentIndex={eventIndex}
            onSelectEvent={handleSelectTimelineIndex}
            isBedtime={isBedtime}
          />
        </div>
      )}

      {/* Main Content: Current Event, Bedtime Summary, or Final 3-Question Quiz */}
      <div className="w-full flex justify-center">
        {eventIndex < TIMELINE_EVENTS.length && (
          <DayEventCard
            key={TIMELINE_EVENTS[eventIndex].id}
            event={TIMELINE_EVENTS[eventIndex]}
            onNext={handleNextEvent}
            onPrev={handlePrevEvent}
            isFirst={eventIndex === 0}
          />
        )}

        {isBedtime && (
          <BedtimeSummary
            onStartChallenge={handleStartChallenge}
            onChooseAnother={onBackToHome}
          />
        )}

        {isQuiz && (
          <DayQuiz
            onResetExperience={handleReset}
            onChooseAnother={onBackToHome}
          />
        )}
      </div>
    </div>
  );
}
