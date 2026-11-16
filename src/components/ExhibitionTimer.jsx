import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';

export default function ExhibitionTimer({ 
  initialSeconds = 120, 
  onTimeExpired, 
  isActive = true,
  onResetTimer
}) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isActive || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeExpired) onTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, secondsLeft, onTimeExpired]);

  const minutes = Math.floor(secondsLeft / 60);
  const remainingSeconds = secondsLeft % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  const isLowTime = secondsLeft < 30;

  return (
    <div 
      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors select-none ${
        isLowTime 
          ? 'bg-amber-100 text-amber-800 border border-amber-300' 
          : 'bg-[#F7F3EA] text-[#18324A] border border-[#DDE2E5]'
      }`}
      title="Exhibition Target Session Time (2 minutes)"
    >
      <Clock className={`w-3.5 h-3.5 ${isLowTime ? 'text-amber-700 animate-pulse' : 'text-[#E67E42]'}`} />
      <span>TIME LEFT: <strong className="tabular-nums">{formatted}</strong></span>
    </div>
  );
}
