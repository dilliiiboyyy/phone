import React, { useState } from 'react';
import { MapPin, Navigation, Radio, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

const MAP_LOCATIONS = [
  { id: 'museum', name: 'Science Museum Main Hall', x: 28, y: 35 },
  { id: 'gym', name: 'School Sports Pavilion', x: 72, y: 28 },
  { id: 'library', name: 'Tech Library & Robotics Lab', x: 40, y: 70 },
  { id: 'park', name: 'Botanical Courtyard', x: 78, y: 68 }
];

export default function GPSExperiment({ onComplete, onNext }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentLocIndex, setCurrentLocIndex] = useState(0);
  const [isPinging, setIsPinging] = useState(false);

  const currentLocation = MAP_LOCATIONS[currentLocIndex];

  const handleSelectOption = (option) => {
    sound.playTap();
    setSelectedOption(option);
    if (option === 'GPS') {
      sound.playSuccess();
      setIsPinging(true);
    } else {
      sound.playBeep();
    }
  };

  const handleMovePin = (index) => {
    sound.playPing();
    setCurrentLocIndex(index);
    setIsPinging(true);
    setTimeout(() => setIsPinging(false), 2000);
  };

  const handleFinish = () => {
    sound.playSuccess();
    onComplete('gps');
    onNext();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-xl mb-6">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#4E8585] mb-1 block">
          Mini-Challenge 02 / 08
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#18324A] mb-2">
          How Does Your Phone Know Where You Are?
        </h2>
        <p className="text-base text-[#20303C]/80">
          <strong>Question:</strong> Which technology helps your phone estimate its geographic position?
        </p>
      </div>

      {/* Choice Buttons */}
      <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {[
          { key: 'GPS', label: 'A. GPS Satellites', isCorrect: true },
          { key: 'Speaker', label: 'B. Loudspeaker', isCorrect: false },
          { key: 'Flashlight', label: 'C. Flashlight LED', isCorrect: false }
        ].map((item) => {
          const isSelected = selectedOption === item.key;
          let btnStyle = 'bg-white border-[#DDE2E5] text-[#18324A] hover:border-[#18324A]';
          if (isSelected) {
            btnStyle = item.isCorrect 
              ? 'bg-[#18324A] text-white border-[#18324A] ring-2 ring-[#4E8585]' 
              : 'bg-red-50 text-red-700 border-red-300';
          }

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => handleSelectOption(item.key)}
              className={`p-4 rounded-xl border font-bold text-sm sm:text-base flex items-center justify-between transition-all active:scale-95 shadow-xs ${btnStyle}`}
            >
              <span>{item.label}</span>
              {isSelected && item.isCorrect && <CheckCircle2 className="w-5 h-5 text-[#E67E42]" />}
              {isSelected && !item.isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
            </button>
          );
        })}
      </div>

      {/* Stylized Exhibition Interactive Map */}
      <div className="w-full max-w-2xl bg-white border border-[#DDE2E5] rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col items-center">
        {/* Satellites in Orbit Overhead */}
        <div className="w-full flex items-center justify-between px-4 py-2 bg-[#F7F3EA] rounded-xl text-xs font-mono text-[#18324A] mb-4">
          <div className="flex items-center gap-2">
            <Radio className={`w-4 h-4 text-[#4E8585] ${selectedOption === 'GPS' ? 'animate-pulse' : ''}`} />
            <span>ORBITING SATELLITES: <strong className="text-[#E67E42]">4 Connected (20,200 km)</strong></span>
          </div>
          <span className="hidden sm:inline text-[#20303C]/60">Trilateration Active</span>
        </div>

        {/* Map Stage */}
        <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-[#DDE2E5] bg-[#F7F3EA]">
          {/* Fictional Map Graphic Background */}
          <img
            src="/src/assets/images/exhibit_fictional_map_1790890097308.jpg"
            alt="Fictional exhibition campus map"
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />

          {/* Satellite Beams when active */}
          {selectedOption === 'GPS' && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1="20%"
                y1="5%"
                x2={`${currentLocation.x}%`}
                y2={`${currentLocation.y}%`}
                stroke="#E67E42"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="opacity-70 animate-pulse"
              />
              <line
                x1="50%"
                y1="5%"
                x2={`${currentLocation.x}%`}
                y2={`${currentLocation.y}%`}
                stroke="#4E8585"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="opacity-70 animate-pulse"
              />
              <line
                x1="80%"
                y1="5%"
                x2={`${currentLocation.x}%`}
                y2={`${currentLocation.y}%`}
                stroke="#E67E42"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="opacity-70 animate-pulse"
              />
            </svg>
          )}

          {/* Interactive Campus Waypoints */}
          {MAP_LOCATIONS.map((loc, idx) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => handleMovePin(idx)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer focus:outline-none"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            >
              <div className={`px-2 py-1 text-[11px] font-bold rounded-md shadow-md border mb-1 transition-all ${
                currentLocIndex === idx 
                  ? 'bg-[#18324A] text-white border-[#18324A]' 
                  : 'bg-white/95 text-[#18324A] border-[#DDE2E5] group-hover:bg-[#F7F3EA]'
              }`}>
                {loc.name}
              </div>
              <div className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow transition-transform ${
                currentLocIndex === idx ? 'bg-[#E67E42] scale-125 ring-4 ring-[#E67E42]/30' : 'bg-[#4E8585]'
              }`}></div>
            </button>
          ))}

          {/* Current Pin Ripple */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 ease-out"
            style={{ left: `${currentLocation.x}%`, top: `${currentLocation.y}%` }}
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute w-12 h-12 rounded-full bg-[#E67E42]/20 animate-ping"></div>
              <div className="absolute w-8 h-8 rounded-full bg-[#E67E42]/30"></div>
              <MapPin className="w-8 h-8 text-[#E67E42] -translate-y-2 drop-shadow-md" />
            </div>
          </div>
        </div>

        {/* Location switcher instruction */}
        <div className="mt-4 flex flex-wrap items-center justify-between w-full text-xs text-[#20303C]/80 px-2">
          <span>Tap any campus building to move your virtual phone location.</span>
          <span className="font-semibold text-[#18324A]">Active: {currentLocation.name}</span>
        </div>
      </div>

      {/* Answer & Science Explanation */}
      {selectedOption && (
        <div className="w-full max-w-2xl mt-6 bg-[#18324A] text-white rounded-2xl p-6 shadow-md transition-all">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#E67E42] shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-base font-bold text-[#F7F3EA] mb-1">
                {selectedOption === 'GPS' ? 'EXACTLY RIGHT!' : 'NOT QUITE — THE ANSWER IS GPS!'}
              </h3>
              <p className="text-sm sm:text-base text-[#DDE2E5] leading-relaxed">
                GPS uses signals from at least <strong>4 satellites</strong> orbiting Earth. By comparing the exact split-second arrival times of each satellite's radio waves, your phone calculates its latitude, longitude, and elevation.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-sm sm:text-base rounded-xl transition-transform active:scale-95 shadow"
            >
              <span>Next Experiment: Camera</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
