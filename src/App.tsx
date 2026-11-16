import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PhoneHub from './components/PhoneHub';
import ExperimentContainer from './components/ExperimentContainer';
import FinalChallenge from './components/FinalChallenge';
import TakeawayScreen from './components/TakeawayScreen';
import DayInTheLife from './components/day/DayInTheLife';
import AboutCurators from './components/AboutCurators';
import StudentCreditsModal from './components/StudentCreditsModal';
import LoadingScreen from './components/LoadingScreen';
import { sound } from './utils/audio';
import { RotateCcw, Clock, Sparkles } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<string>('home'); // 'home' | 'hub' | 'experiment' | 'quiz' | 'takeaway' | 'day'
  const [activeExperimentId, setActiveExperimentId] = useState<string>('motion');
  const [completedExperiments, setCompletedExperiments] = useState<string[]>([]);
  const [creditsModalOpen, setCreditsModalOpen] = useState<boolean>(false);
  const [resetToast, setResetToast] = useState<boolean>(false);
  const [timerKey, setTimerKey] = useState<number>(Date.now());

  // Exhibition Instant Reset Function
  const handleReset = useCallback(() => {
    sound.playTap();
    setCurrentView('home');
    setActiveExperimentId('motion');
    setCompletedExperiments([]);
    setCreditsModalOpen(false);
    setTimerKey(Date.now()); // Reset countdown timer

    // Show brief feedback toast
    setResetToast(true);
    setTimeout(() => {
      setResetToast(false);
    }, 2200);
  }, []);

  // Keyboard shortcut: Pressing 'r' or 'R' resets the exhibit instantly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleReset]);

  // Mark an experiment as completed
  const handleMarkCompleted = (expId: string) => {
    setCompletedExperiments((prev) => {
      if (!prev.includes(expId)) {
        return [...prev, expId];
      }
      return prev;
    });
  };

  // Launch a specific experiment in "Explore Your Phone"
  const handleSelectExperiment = (expId: string) => {
    setActiveExperimentId(expId);
    setCurrentView('experiment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to next experiment or quiz
  const handleNextExperiment = (nextTarget: string) => {
    if (nextTarget === 'quiz') {
      setCurrentView('quiz');
    } else {
      setActiveExperimentId(nextTarget);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto-transition when 2-minute exhibition timer reaches zero
  const handleTimeExpired = useCallback(() => {
    if (currentView === 'curators' || currentView === 'home' || currentView === 'takeaway') return;
    sound.playPing();
    if (currentView === 'experiment' || currentView === 'hub') {
      setCurrentView('takeaway');
    }
  }, [currentView]);

  // The timer is active ONLY on interactive challenge & question pages (never when loading, or on Curators, Home, or Takeaway)
  const isTimerActive = !isLoading && (currentView === 'experiment' || currentView === 'quiz' || currentView === 'day' || currentView === 'hub');

  return (
    <div className="min-h-screen bg-[#F7F3EA] text-[#20303C] flex flex-col font-sans relative selection:bg-[#E67E42]/20 selection:text-[#18324A]">
      {/* Initial Exhibition Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Reset Confirmation Toast */}
      {resetToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#18324A] text-white px-5 py-3 rounded-2xl shadow-xl border border-[#DDE2E5]/20 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <RotateCcw className="w-4 h-4 text-[#E67E42] animate-spin-slow" />
          <span className="text-xs font-bold">Exhibit Reset for Next Visitor</span>
        </div>
      )}

      {/* Top Bar Header */}
      <Navbar
        key={timerKey}
        currentView={currentView}
        onNavigate={(view: string) => {
          sound.playTap();
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onReset={handleReset}
        onOpenCredits={() => setCreditsModalOpen(true)}
        isTimerActive={isTimerActive}
        timerSeconds={120}
        onTimeExpired={handleTimeExpired}
      />

      {/* Main Exhibition Stage */}
      <main className="flex-1 flex flex-col items-center justify-center w-full py-4 sm:py-6">
        {/* VIEW: Main Homepage with the two major categories */}
        {currentView === 'home' && (
          <Hero
            onStartExplore={() => {
              setCurrentView('hub');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartDay={() => {
              setCurrentView('day');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* CATEGORY 1: Explore Your Phone - Central Hub */}
        {currentView === 'hub' && (
          <PhoneHub
            completedList={completedExperiments}
            onSelectExperiment={handleSelectExperiment}
            onStartQuiz={() => {
              setCurrentView('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* CATEGORY 1: Active Mini-Experiment (Motion, GPS, Camera, Mic, Light, Touch, Battery, Wireless) */}
        {currentView === 'experiment' && (
          <ExperimentContainer
            experimentId={activeExperimentId}
            completedList={completedExperiments}
            onComplete={handleMarkCompleted}
            onBackToHub={() => {
              setCurrentView('hub');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNextExperiment={handleNextExperiment}
          />
        )}

        {/* CATEGORY 1: 5-Question Sensor Quiz */}
        {currentView === 'quiz' && (
          <FinalChallenge
            onCompleteQuiz={() => {
              setCurrentView('takeaway');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRestartQuiz={() => {
              setCurrentView('quiz');
            }}
          />
        )}

        {/* CATEGORY 1: Takeaway Screen */}
        {currentView === 'takeaway' && (
          <TakeawayScreen
            onExploreAgain={handleReset}
            onSelectExperiment={() => {
              setCurrentView('hub');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCredits={() => {
              setCurrentView('curators');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* CATEGORY 2: A Day in the Life of Your Phone */}
        {currentView === 'day' && (
          <DayInTheLife
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onResetExperience={handleReset}
          />
        )}

        {/* STANDALONE PAGE: About the Curators */}
        {currentView === 'curators' && (
          <AboutCurators
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartExplore={() => {
              setCurrentView('hub');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartDay={() => {
              setCurrentView('day');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Student Credits Modal */}
      <StudentCreditsModal
        isOpen={creditsModalOpen}
        onClose={() => setCreditsModalOpen(false)}
      />

      {/* Clean Exhibition Footer */}
      <footer className="w-full border-t border-[#DDE2E5] bg-[#F7F3EA] py-6 px-4 select-none">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-[#20303C]/70 gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#18324A]">Your Phone Knows More Than You Think</span>
            <span>·</span>
            <span>School IT Exhibition</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                sound.playTap();
                setCurrentView('curators');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#4E8585] hover:text-[#18324A] font-semibold hover:underline cursor-pointer"
            >
              Curated by Dilshaan & Mirsab (Grade 9 & 10)
            </button>
            <span className="text-[#20303C]/40">|</span>
            <button
              type="button"
              onClick={handleReset}
              className="text-[#E67E42] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Reset Exhibit (R)</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
