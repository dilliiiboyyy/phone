import React, { useState } from 'react';
import { Send, Wifi, Bluetooth, Radio, CheckCircle2, ArrowRight, Smartphone, MessageSquare } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function ConnectionExperiment({ onComplete, onNext }) {
  const [selectedTech, setSelectedTech] = useState('wifi'); // 'wifi', 'bluetooth', 'cellular'
  const [isSending, setIsSending] = useState(false);
  const [hasDelivered, setHasDelivered] = useState(false);
  const [packetProgress, setPacketProgress] = useState(0); // 0 to 100%

  const handleSendMessage = () => {
    if (isSending) return;
    sound.playPing();
    setIsSending(true);
    setHasDelivered(false);
    setPacketProgress(0);

    const interval = setInterval(() => {
      setPacketProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setIsSending(false);
          setHasDelivered(true);
          sound.playSuccess();
          return 100;
        }
        return prev + 5;
      });
    }, 40);
  };

  const handleFinish = () => {
    sound.playSuccess();
    onComplete('connection');
    onNext();
  };

  const techDetails = {
    wifi: {
      name: 'Wi-Fi (WLAN)',
      range: '30 - 50 meters',
      bestFor: 'Home, school classrooms, and video streaming',
      freq: '2.4 GHz & 5 GHz radio waves'
    },
    bluetooth: {
      name: 'Bluetooth',
      range: '10 meters (Personal area)',
      bestFor: 'Wireless headphones, smartwatches, and stylus pens',
      freq: '2.4 GHz low-energy hopping'
    },
    cellular: {
      name: 'Mobile Network (4G / 5G)',
      range: 'Up to 15 miles per tower',
      bestFor: 'Calling, texting, and internet on the road or outdoors',
      freq: 'Sub-6 GHz & Millimeter Wave'
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-xl mb-6">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#4E8585] mb-1 block">
          Mini-Challenge 08 / 08
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#18324A] mb-2">
          How Does Your Phone Talk to Other Devices?
        </h2>
        <p className="text-base text-[#20303C]/80">
          <strong>Instruction:</strong> Choose a wireless technology, then press <strong>Send Message</strong> to watch digital radio packets travel!
        </p>
      </div>

      {/* Network Mode Switcher */}
      <div className="w-full max-w-xl grid grid-cols-3 gap-2.5 mb-6">
        {[
          { id: 'wifi', name: 'Wi-Fi', icon: Wifi },
          { id: 'bluetooth', name: 'Bluetooth', icon: Bluetooth },
          { id: 'cellular', name: '5G Cellular', icon: Radio }
        ].map((item) => {
          const Icon = item.icon;
          const isSelected = selectedTech === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                sound.playTap();
                setSelectedTech(item.id);
                setHasDelivered(false);
              }}
              className={`p-3 rounded-xl border font-bold text-xs sm:text-sm flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                isSelected
                  ? 'bg-[#18324A] text-white border-[#18324A] shadow-sm'
                  : 'bg-white hover:bg-[#F7F3EA] text-[#18324A] border-[#DDE2E5]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isSelected ? 'text-[#E67E42]' : 'text-[#4E8585]'}`} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Visual Connection Stage */}
      <div className="w-full max-w-2xl bg-white border border-[#DDE2E5] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center">
        {/* Network Specs Bar */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-[#18324A] mb-4 pb-3 border-b border-[#DDE2E5]">
          <div>
            <span>TECH: <strong className="text-[#E67E42]">{techDetails[selectedTech].name}</strong></span>
          </div>
          <div>
            <span>RANGE: <strong className="text-[#18324A]">{techDetails[selectedTech].range}</strong></span>
          </div>
          <div className="hidden sm:block">
            <span>SPEED: <strong className="text-[#4E8585]">Speed of Light (300,000 km/s)</strong></span>
          </div>
        </div>

        {/* Visual Device-to-Device Transmission Highway */}
        <div className="w-full h-52 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] relative flex items-center justify-between px-6 sm:px-12 my-2 overflow-hidden">
          {/* Sender Phone (Device A) */}
          <div className="flex flex-col items-center z-10">
            <div className="w-12 h-20 bg-[#18324A] rounded-xl border-2 border-white shadow-md flex items-center justify-center relative">
              <MessageSquare className="w-5 h-5 text-[#E67E42]" />
              {isSending && (
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#E67E42] animate-ping"></div>
              )}
            </div>
            <span className="text-[11px] font-bold text-[#18324A] mt-2">Your Phone</span>
          </div>

          {/* Intermediate Hub (Router or Tower) */}
          <div className="flex flex-col items-center z-10">
            <div className="w-14 h-14 bg-white rounded-2xl border-2 border-[#4E8585] shadow-md flex items-center justify-center">
              {selectedTech === 'wifi' && <Wifi className="w-7 h-7 text-[#4E8585]" />}
              {selectedTech === 'bluetooth' && <Bluetooth className="w-7 h-7 text-[#18324A]" />}
              {selectedTech === 'cellular' && <Radio className="w-7 h-7 text-[#E67E42]" />}
            </div>
            <span className="text-[11px] font-bold text-[#18324A] mt-2">
              {selectedTech === 'wifi' ? 'Wi-Fi Router' : selectedTech === 'bluetooth' ? 'Direct Radio Link' : '5G Cell Tower'}
            </span>
          </div>

          {/* Receiver Phone (Device B) */}
          <div className="flex flex-col items-center z-10">
            <div className="w-12 h-20 bg-[#18324A] rounded-xl border-2 border-white shadow-md flex items-center justify-center relative">
              <Smartphone className="w-5 h-5 text-white" />
              {hasDelivered && (
                <div className="absolute -top-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow animate-bounce">
                  "Hello!"
                </div>
              )}
            </div>
            <span className="text-[11px] font-bold text-[#18324A] mt-2">Friend's Phone</span>
          </div>

          {/* Packet Travel Line */}
          <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-1 bg-[#DDE2E5] rounded-full z-0">
            {/* Animated Packet */}
            {isSending && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#E67E42] shadow-lg flex items-center justify-center text-white text-[10px] font-bold transition-all"
                style={{ left: `${packetProgress}%` }}
              >
                ✉️
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 w-full flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#20303C]/80">
            <strong>Optimal For:</strong> {techDetails[selectedTech].bestFor}
          </div>

          <button
            type="button"
            disabled={isSending}
            onClick={handleSendMessage}
            className="w-full sm:w-auto px-6 py-3 bg-[#E67E42] hover:bg-[#d66f34] disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSending ? 'Transmitting Waves...' : 'Send Message'}</span>
          </button>
        </div>
      </div>

      {/* Answer & Science Explanation */}
      {hasDelivered && (
        <div className="w-full max-w-2xl mt-6 bg-[#18324A] text-white rounded-2xl p-6 shadow-md transition-all">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#E67E42] shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-base font-bold text-[#F7F3EA] mb-1">
                MESSAGE DELIVERED AT THE SPEED OF LIGHT!
              </h3>
              <p className="text-sm sm:text-base text-[#DDE2E5] leading-relaxed">
                Smartphones contain miniature copper and ceramic antennas hidden along the outer metal frame. They pulse electrons millions of times every second, generating invisible electromagnetic radio waves that deliver your data worldwide!
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-sm sm:text-base rounded-xl transition-transform active:scale-95 shadow"
            >
              <span>Quick Final Quiz: Guess the Sensor!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
