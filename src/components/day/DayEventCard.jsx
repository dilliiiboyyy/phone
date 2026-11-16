import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, CheckCircle2, XCircle, Bell, BellOff, 
  MapPin, Camera, Sparkles, Headphones, Radio, Flame, 
  Fingerprint, ScanFace, Lock, Unlock, Zap, ChevronRight 
} from 'lucide-react';
import { sound } from '../../utils/audio';

export default function DayEventCard({ 
  event, 
  onNext, 
  onPrev, 
  isFirst = false 
}) {
  // Event-specific interactive states
  const [alarmDismissed, setAlarmDismissed] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [photoSnapped, setPhotoSnapped] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [bluetoothConnected, setBluetoothConnected] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const [phoneUnlocked, setPhoneUnlocked] = useState(false);
  const [unlockMethod, setUnlockMethod] = useState('fingerprint'); // 'fingerprint' | 'face' | 'pin'

  // Alarm action
  const handleTurnOffAlarm = () => {
    sound.playSuccess();
    setAlarmDismissed(true);
  };

  // Multiple choice selection (Navigation, Music, Gaming)
  const handleChooseOption = (option) => {
    sound.playTap();
    setSelectedAnswer(option.text);
    if (option.correct) {
      sound.playSuccess();
    } else {
      sound.playBeep();
    }
  };

  // Camera action
  const handleTakePhoto = () => {
    sound.playPing();
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
      setPhotoSnapped(true);
      sound.playSuccess();
    }, 250);
  };

  // Bluetooth headphones action
  const handleConnectBluetooth = () => {
    sound.playPing();
    setBluetoothConnected(true);
  };

  // Biometrics unlock action
  const handleUnlockPhone = () => {
    sound.playSuccess();
    setPhoneUnlocked(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Event Header Banner */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F7F3EA] border border-[#DDE2E5] rounded-full text-xs font-bold text-[#E67E42] mb-1.5">
          <span>{event.time}</span>
          <span>·</span>
          <span>A DAY IN THE LIFE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18324A] tracking-tight">
          {event.title}
        </h2>
        <p className="text-sm sm:text-base text-[#20303C]/80 mt-1 max-w-lg mx-auto">
          {event.subtitle}
        </p>
      </div>

      {/* Main Interactive Stage Box */}
      <div className="w-full bg-white border border-[#DDE2E5] rounded-3xl p-5 sm:p-8 shadow-sm flex flex-col items-center relative overflow-hidden">
        
        {/* Flash Overlay for Camera */}
        {isFlashing && (
          <div className="absolute inset-0 bg-white z-30 pointer-events-none transition-opacity duration-200" />
        )}

        {/* ============================================================== */}
        {/* EVENT 1: 7:00 AM - ALARM */}
        {/* ============================================================== */}
        {event.id === 'alarm' && (
          <div className="w-full flex flex-col items-center">
            {/* Phone Display Simulation */}
            <div className="w-60 h-64 bg-[#18324A] rounded-3xl p-4 shadow-xl border-4 border-[#DDE2E5] flex flex-col justify-between items-center text-white relative my-2">
              <div className="w-16 h-2 bg-black/40 rounded-full mb-1"></div>
              
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-2 transition-all ${
                  alarmDismissed ? 'bg-[#4E8585]/30 text-[#4E8585]' : 'bg-[#E67E42]/20 text-[#E67E42] animate-bounce'
                }`}>
                  {alarmDismissed ? <BellOff className="w-8 h-8" /> : <Bell className="w-8 h-8 text-[#E67E42]" />}
                </div>
                <div className="text-2xl font-bold font-mono tracking-wider">07:00 AM</div>
                <div className="text-xs text-[#DDE2E5] mt-0.5">
                  {alarmDismissed ? 'Alarm Stopped' : 'School Morning Alarm!'}
                </div>
              </div>

              {!alarmDismissed ? (
                <button
                  type="button"
                  onClick={handleTurnOffAlarm}
                  className="w-full py-2.5 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-xs rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  PRESS TO WAKE UP
                </button>
              ) : (
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Good Morning!</span>
                </div>
              )}
            </div>

            {/* What is happening reveal */}
            {alarmDismissed && (
              <div className="w-full mt-6 animate-in fade-in duration-300">
                <div className="p-4 bg-[#F7F3EA] rounded-2xl border border-[#DDE2E5] text-left mb-4">
                  <span className="text-xs font-bold text-[#E67E42] uppercase tracking-wider block mb-1">
                    What Just Happened Inside?
                  </span>
                  <p className="text-xs sm:text-sm text-[#20303C]/90 leading-relaxed">
                    <strong>Did you know?</strong> {event.didYouKnow}
                  </p>
                </div>

                {/* Microscopic Signal Flow */}
                <div className="w-full flex items-center justify-between text-[11px] font-mono font-bold text-[#18324A] bg-white p-3 rounded-xl border border-[#DDE2E5] overflow-x-auto gap-2">
                  {event.flow.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <span className="whitespace-nowrap px-2 py-1 bg-[#F7F3EA] rounded-md border border-[#DDE2E5]">
                        {step}
                      </span>
                      {idx < event.flow.length - 1 && <span className="text-[#E67E42]">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* EVENT 2: 8:00 AM - NAVIGATION & GPS */}
        {/* ============================================================== */}
        {event.id === 'navigation' && (
          <div className="w-full flex flex-col items-center">
            {/* Interactive Question Choice */}
            <div className="w-full mb-5 text-center">
              <p className="text-sm font-bold text-[#18324A] mb-3">
                {event.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {event.options.map((opt, idx) => {
                  const isChosen = selectedAnswer === opt.text;
                  let style = 'bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] border-[#DDE2E5]';
                  if (selectedAnswer) {
                    if (opt.correct) {
                      style = 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold';
                    } else if (isChosen) {
                      style = 'bg-red-50 text-red-800 border-red-300';
                    } else {
                      style = 'opacity-50 border-[#DDE2E5] text-[#20303C]';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleChooseOption(opt)}
                      className={`p-3 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${style}`}
                    >
                      <span>{opt.icon}</span>
                      <span>{opt.text}</span>
                      {selectedAnswer && opt.correct && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stylized Map Viewport */}
            <div className="relative w-full h-44 sm:h-52 bg-[#F7F3EA] rounded-2xl border border-[#DDE2E5] overflow-hidden flex items-center justify-center my-2">
              <img
                src="/src/assets/images/exhibit_fictional_map_1790890097308.jpg"
                alt="Fictional morning map navigation"
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />

              {/* Satellite beams & destination pin */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#E67E42]/20 animate-ping absolute"></div>
                  <MapPin className="w-8 h-8 text-[#E67E42] drop-shadow-md z-10" />
                  <span className="text-[11px] font-bold bg-[#18324A] text-white px-2 py-0.5 rounded shadow mt-1">
                    School Route (1.2 km)
                  </span>
                </div>
              </div>
            </div>

            {/* Explanation & Signal Sequence */}
            {selectedAnswer && (
              <div className="w-full mt-4 animate-in fade-in duration-300">
                <div className="p-3.5 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] text-xs sm:text-sm text-[#20303C]/90 leading-relaxed mb-3">
                  <strong>The Answer:</strong> {event.explanation}
                </div>

                <div className="w-full flex items-center justify-between text-[11px] font-mono font-bold text-[#18324A] bg-white p-3 rounded-xl border border-[#DDE2E5] overflow-x-auto gap-2">
                  {event.flow.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <span className="whitespace-nowrap px-2 py-1 bg-[#F7F3EA] rounded-md border border-[#DDE2E5]">
                        {step}
                      </span>
                      {idx < event.flow.length - 1 && <span className="text-[#4E8585]">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* EVENT 3: 10:00 AM - CAMERA */}
        {/* ============================================================== */}
        {event.id === 'camera' && (
          <div className="w-full flex flex-col items-center">
            {/* Virtual Viewfinder Stage */}
            <div className="relative w-full h-52 sm:h-60 bg-[#18324A] rounded-2xl border border-[#DDE2E5] overflow-hidden flex items-center justify-center text-white my-2">
              {photoSnapped ? (
                <div className="w-full h-full relative animate-in fade-in duration-300">
                  <img
                    src="/src/assets/images/exhibit_hero_phone_1790890085840.jpg"
                    alt="Captured photograph"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-[10px] font-mono px-2 py-0.5 rounded">
                    Photo Captured (12 MP)
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-white/70 p-4 text-center">
                  <Camera className="w-12 h-12 text-[#E67E42] mb-2 animate-pulse" />
                  <span className="text-xs font-bold text-white">Camera Viewfinder Ready</span>
                  <span className="text-[11px] text-[#DDE2E5]">CMOS image sensor receiving light photons</span>
                </div>
              )}

              {/* Viewfinder crosshairs */}
              <div className="absolute inset-4 border border-white/20 rounded-xl pointer-events-none flex items-center justify-center">
                <div className="w-8 h-8 border border-white/40 rounded-full"></div>
              </div>
            </div>

            {/* Shutter Button */}
            {!photoSnapped ? (
              <button
                type="button"
                onClick={handleTakePhoto}
                className="mt-4 px-6 py-3 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-sm rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>TAKE PHOTO</span>
              </button>
            ) : (
              <div className="w-full mt-4 animate-in fade-in duration-300">
                <div className="p-3.5 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] text-xs sm:text-sm text-[#20303C]/90 leading-relaxed mb-3">
                  <strong>What Just Happened?</strong> {event.explanation}
                </div>

                <div className="w-full flex items-center justify-between text-[11px] font-mono font-bold text-[#18324A] bg-white p-3 rounded-xl border border-[#DDE2E5] overflow-x-auto gap-2">
                  {event.flow.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <span className="whitespace-nowrap px-2 py-1 bg-[#F7F3EA] rounded-md border border-[#DDE2E5]">
                        {step}
                      </span>
                      {idx < event.flow.length - 1 && <span className="text-[#18324A]">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* EVENT 4: 1:00 PM - LUNCH & BLUETOOTH */}
        {/* ============================================================== */}
        {event.id === 'music' && (
          <div className="w-full flex flex-col items-center">
            {/* Audio Visualization Box */}
            <div className="w-full bg-[#F7F3EA] rounded-2xl border border-[#DDE2E5] p-4 flex items-center justify-between my-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#18324A] text-white flex items-center justify-center text-xl">
                  🎵
                </div>
                <div>
                  <div className="text-xs font-bold text-[#18324A]">Playing: Exhibition Track</div>
                  <div className="text-[11px] text-[#20303C]/70">Digital Audio Decoding Active</div>
                </div>
              </div>

              {/* Animated Equalizer bars */}
              <div className="flex items-end gap-1 h-6">
                <div className="w-1 bg-[#E67E42] h-4 animate-pulse"></div>
                <div className="w-1 bg-[#E67E42] h-6 animate-pulse"></div>
                <div className="w-1 bg-[#E67E42] h-3 animate-pulse"></div>
                <div className="w-1 bg-[#E67E42] h-5 animate-pulse"></div>
              </div>
            </div>

            {/* Multiple Choice Question */}
            <div className="w-full my-4 text-center">
              <p className="text-sm font-bold text-[#18324A] mb-3">
                {event.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {event.options.map((opt, idx) => {
                  const isChosen = selectedAnswer === opt.text;
                  let style = 'bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] border-[#DDE2E5]';
                  if (selectedAnswer) {
                    if (opt.correct) {
                      style = 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold';
                    } else if (isChosen) {
                      style = 'bg-red-50 text-red-800 border-red-300';
                    } else {
                      style = 'opacity-50 border-[#DDE2E5] text-[#20303C]';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleChooseOption(opt)}
                      className={`p-3 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${style}`}
                    >
                      <span>{opt.icon}</span>
                      <span>{opt.text}</span>
                      {selectedAnswer && opt.correct && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation & Wireless Beam Flow */}
            {selectedAnswer && (
              <div className="w-full mt-2 animate-in fade-in duration-300">
                <div className="p-3.5 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] text-xs sm:text-sm text-[#20303C]/90 leading-relaxed mb-3">
                  <strong>The Answer:</strong> {event.explanation}
                </div>

                <div className="w-full flex items-center justify-between text-[11px] font-mono font-bold text-[#18324A] bg-white p-3 rounded-xl border border-[#DDE2E5] overflow-x-auto gap-2">
                  {event.flow.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <span className="whitespace-nowrap px-2 py-1 bg-[#F7F3EA] rounded-md border border-[#DDE2E5]">
                        {step}
                      </span>
                      {idx < event.flow.length - 1 && <span className="text-[#E67E42]">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* EVENT 5: 5:00 PM - GAMING & HEAT */}
        {/* ============================================================== */}
        {event.id === 'gaming' && (
          <div className="w-full flex flex-col items-center">
            {/* Interactive Game Benchmark Gauge */}
            <div className="w-full bg-[#18324A] text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 my-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-2xl">
                  🎮
                </div>
                <div>
                  <div className="text-sm font-bold">3D High-Frame-Rate Action Game</div>
                  <div className="text-[11px] text-[#DDE2E5]/80">GPU + Octa-Core Processor at 100% Load</div>
                </div>
              </div>

              {/* Temperature & Battery simulated meter */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-amber-300">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>Chip Temp: 38.5°C</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Zap className="w-4 h-4" />
                  <span>Battery: 68%</span>
                </div>
              </div>
            </div>

            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded mt-1">
              SIMULATED FOR DEMONSTRATION
            </span>

            {/* Question */}
            <div className="w-full my-4 text-center">
              <p className="text-sm font-bold text-[#18324A] mb-3">
                {event.question}
              </p>
              <div className="space-y-2">
                {event.options.map((opt, idx) => {
                  const isChosen = selectedAnswer === opt.text;
                  let style = 'bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] border-[#DDE2E5]';
                  if (selectedAnswer) {
                    if (opt.correct) {
                      style = 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold';
                    } else if (isChosen) {
                      style = 'bg-red-50 text-red-800 border-red-300';
                    } else {
                      style = 'opacity-50 border-[#DDE2E5] text-[#20303C]';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleChooseOption(opt)}
                      className={`w-full p-3 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${style}`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{opt.icon}</span>
                        <span className="text-left">{opt.text}</span>
                      </div>
                      {selectedAnswer && opt.correct && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation */}
            {selectedAnswer && (
              <div className="w-full mt-2 animate-in fade-in duration-300">
                <div className="p-3.5 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] text-xs sm:text-sm text-[#20303C]/90 leading-relaxed mb-3">
                  <strong>The Answer:</strong> {event.explanation}
                </div>

                <div className="w-full flex items-center justify-between text-[11px] font-mono font-bold text-[#18324A] bg-white p-3 rounded-xl border border-[#DDE2E5] overflow-x-auto gap-2">
                  {event.flow.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <span className="whitespace-nowrap px-2 py-1 bg-[#F7F3EA] rounded-md border border-[#DDE2E5]">
                        {step}
                      </span>
                      {idx < event.flow.length - 1 && <span className="text-[#18324A]">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* EVENT 6: 10:00 PM - BIOMETRIC UNLOCK */}
        {/* ============================================================== */}
        {event.id === 'unlock' && (
          <div className="w-full flex flex-col items-center">
            {/* Lockscreen phone visual */}
            <div className="w-64 h-72 bg-[#18324A] rounded-3xl p-4 shadow-xl border-4 border-[#DDE2E5] flex flex-col justify-between items-center text-white relative my-2">
              <div className="flex items-center gap-1.5 text-xs text-white/80">
                {phoneUnlocked ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Unlocked</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-300 font-bold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </span>
                )}
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="text-3xl font-mono font-bold">10:00 PM</div>
                <span className="text-[11px] text-[#DDE2E5] mt-0.5">Ready for bed</span>

                {/* Fingerprint / Face scanner interactive hotspot */}
                <button
                  type="button"
                  onClick={handleUnlockPhone}
                  className={`mt-4 w-16 h-16 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                    phoneUnlocked 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400' 
                      : 'bg-white/10 text-[#E67E42] hover:bg-white/20 border border-white/20 animate-pulse'
                  }`}
                >
                  {unlockMethod === 'fingerprint' ? (
                    <Fingerprint className="w-9 h-9" />
                  ) : (
                    <ScanFace className="w-9 h-9" />
                  )}
                </button>
                <span className="text-[10px] text-white/70 mt-2 font-medium">
                  {phoneUnlocked ? 'Identity Verified ✅' : 'Tap to scan biometrics'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-white/60">
                <button
                  type="button"
                  onClick={() => setUnlockMethod('fingerprint')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${unlockMethod === 'fingerprint' ? 'bg-white/20 text-white font-bold' : ''}`}
                >
                  Fingerprint
                </button>
                <button
                  type="button"
                  onClick={() => setUnlockMethod('face')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${unlockMethod === 'face' ? 'bg-white/20 text-white font-bold' : ''}`}
                >
                  Face ID
                </button>
              </div>
            </div>

            {/* Explanation */}
            {phoneUnlocked && (
              <div className="w-full mt-4 animate-in fade-in duration-300">
                <div className="p-3.5 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] text-xs sm:text-sm text-[#20303C]/90 leading-relaxed mb-3">
                  <strong>How Biometrics Work:</strong> {event.explanation}
                </div>

                <div className="w-full flex items-center justify-between text-[11px] font-mono font-bold text-[#18324A] bg-white p-3 rounded-xl border border-[#DDE2E5] overflow-x-auto gap-2">
                  {event.flow.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <span className="whitespace-nowrap px-2 py-1 bg-[#F7F3EA] rounded-md border border-[#DDE2E5]">
                        {step}
                      </span>
                      {idx < event.flow.length - 1 && <span className="text-[#4E8585]">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Navigation Footer Controls */}
      <div className="w-full flex items-center justify-between mt-6 px-2">
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onPrev();
          }}
          disabled={isFirst}
          className="px-4 py-2.5 rounded-xl border border-[#DDE2E5] bg-white hover:bg-[#F7F3EA] disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-[#18324A] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Event</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playSuccess();
            onNext();
          }}
          className="px-6 py-2.5 bg-[#E67E42] hover:bg-[#d66f34] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <span>Next: {event.id === 'unlock' ? 'Bedtime Summary 🌙' : 'Continue Day'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
