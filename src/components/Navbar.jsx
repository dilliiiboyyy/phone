import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Clock } from 'lucide-react';
import { sound } from '../utils/audio';
import ExhibitionTimer from './ExhibitionTimer';

export default function Navbar({ 
  currentView, 
  onNavigate, 
  onReset, 
  onOpenCredits,
  isTimerActive = false,
  timerSeconds = 120,
  onTimeExpired
}) {
  const [audioEnabled, setAudioEnabled] = useState(true);

  const toggleAudio = () => {
    const nextState = !audioEnabled;
    sound.enabled = nextState;
    setAudioEnabled(nextState);
    if (nextState) sound.playTap();
  };

  return (
    <header className="w-full bg-[#F7F3EA] border-b border-[#DDE2E5] sticky top-0 z-30 select-none">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-base sm:text-xl font-extrabold text-[#18324A] tracking-tight hover:opacity-85 transition-opacity text-left cursor-pointer shrink-0"
        >
          <span className="text-xl">📱</span>
          <span className="whitespace-nowrap">Your Phone Knows</span>
        </button>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs sm:text-sm font-semibold text-[#20303C]/80">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`transition-colors whitespace-nowrap hover:text-[#18324A] cursor-pointer ${
              currentView === 'home' ? 'text-[#E67E42] font-bold underline underline-offset-4' : ''
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate('hub')}
            className={`transition-colors whitespace-nowrap hover:text-[#18324A] cursor-pointer ${
              currentView === 'hub' || currentView === 'experiment' || currentView === 'quiz' || currentView === 'takeaway' 
                ? 'text-[#E67E42] font-bold underline underline-offset-4' 
                : ''
            }`}
          >
            Explore Your Phone
          </button>
          <button
            type="button"
            onClick={() => onNavigate('day')}
            className={`transition-colors whitespace-nowrap hover:text-[#18324A] cursor-pointer ${
              currentView === 'day' ? 'text-[#E67E42] font-bold underline underline-offset-4' : ''
            }`}
          >
            A Day in the Life
          </button>
          <button
            type="button"
            onClick={() => onNavigate('curators')}
            className={`transition-colors whitespace-nowrap hover:text-[#18324A] cursor-pointer ${
              currentView === 'curators' ? 'text-[#E67E42] font-bold underline underline-offset-4' : ''
            }`}
          >
            ABOUT THE CURATORS
          </button>
        </nav>

        {/* Zone 3: Actions + Exhibition Timer */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Shared 2-Minute Exhibition Timer (rendered ONLY on interactive challenge/experiment pages, NEVER on Curators, Home, or Takeaway) */}
          {isTimerActive && currentView !== 'curators' && currentView !== 'home' && currentView !== 'takeaway' && (
            <div className="hidden sm:block">
              <ExhibitionTimer
                initialSeconds={timerSeconds}
                onTimeExpired={onTimeExpired}
                isActive={true}
              />
            </div>
          )}

          {/* Sound Synthesizer Toggle */}
          <button
            type="button"
            onClick={toggleAudio}
            title={audioEnabled ? 'Mute Sounds' : 'Enable Sounds'}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg border border-[#DDE2E5] bg-white text-[#18324A] hover:bg-[#F7F3EA] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {audioEnabled ? (
              <Volume2 className="w-4 h-4 text-[#4E8585]" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
            <span className="hidden md:inline">{audioEnabled ? 'Sound' : 'Muted'}</span>
          </button>

          {/* Exhibition Instant Reset Button */}
          <button
            type="button"
            onClick={onReset}
            title="Reset exhibit for next visitor (Keyboard shortcut: R)"
            className="px-3 py-1.5 rounded-lg bg-[#18324A] hover:bg-[#20303C] text-white text-xs font-bold flex items-center gap-1.5 transition-transform active:scale-95 shadow-xs whitespace-nowrap cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#E67E42]" />
            <span>Reset (R)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
