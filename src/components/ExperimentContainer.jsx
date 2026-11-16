import React from 'react';
import { EXPERIMENTS } from '../data/experiments';
import { ArrowLeft, ArrowRight, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

import MotionExperiment from './experiments/MotionExperiment';
import GPSExperiment from './experiments/GPSExperiment';
import CameraExperiment from './experiments/CameraExperiment';
import MicrophoneExperiment from './experiments/MicrophoneExperiment';
import LightExperiment from './experiments/LightExperiment';
import TouchExperiment from './experiments/TouchExperiment';
import BatteryExperiment from './experiments/BatteryExperiment';
import ConnectionExperiment from './experiments/ConnectionExperiment';

export default function ExperimentContainer({
  experimentId,
  completedList,
  onComplete,
  onBackToHub,
  onNextExperiment
}) {
  const currentIndex = EXPERIMENTS.findIndex((e) => e.id === experimentId);
  const currentExp = EXPERIMENTS[currentIndex] || EXPERIMENTS[0];

  const handleNext = () => {
    if (currentIndex < EXPERIMENTS.length - 1) {
      const nextId = EXPERIMENTS[currentIndex + 1].id;
      onNextExperiment(nextId);
    } else {
      // Completed all, go to quiz or hub
      onNextExperiment('quiz');
    }
  };

  const renderActiveExperiment = () => {
    switch (currentExp.id) {
      case 'motion':
        return <MotionExperiment onComplete={onComplete} onNext={handleNext} />;
      case 'gps':
        return <GPSExperiment onComplete={onComplete} onNext={handleNext} />;
      case 'camera':
        return <CameraExperiment onComplete={onComplete} onNext={handleNext} />;
      case 'microphone':
        return <MicrophoneExperiment onComplete={onComplete} onNext={handleNext} />;
      case 'light':
        return <LightExperiment onComplete={onComplete} onNext={handleNext} />;
      case 'touch':
        return <TouchExperiment onComplete={onComplete} onNext={handleNext} />;
      case 'battery':
        return <BatteryExperiment onComplete={onComplete} onNext={handleNext} />;
      case 'connection':
        return <ConnectionExperiment onComplete={onComplete} onNext={handleNext} />;
      default:
        return <MotionExperiment onComplete={onComplete} onNext={handleNext} />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 flex flex-col items-center">
      {/* Top Breadcrumb & Control Bar */}
      <div className="w-full flex items-center justify-between py-3 mb-4 border-b border-[#DDE2E5]">
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onBackToHub();
          }}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#18324A] hover:text-[#E67E42] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Phone Hub</span>
        </button>

        {/* Experiment stepper indicator */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#20303C]/70">
            EXPERIMENT {currentExp.number} / {EXPERIMENTS.length}
          </span>
          {completedList.includes(currentExp.id) && (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          )}
        </div>

        {/* Next Quick Skip */}
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            handleNext();
          }}
          className="text-xs font-bold text-[#4E8585] hover:text-[#18324A] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Skip</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Dynamic Active Experiment Content */}
      <div className="w-full flex justify-center animate-in fade-in duration-150">
        {renderActiveExperiment()}
      </div>
    </div>
  );
}
