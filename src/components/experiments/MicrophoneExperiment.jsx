import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, CheckCircle2, ArrowRight, Activity } from 'lucide-react';
import { sound } from '../../utils/audio';

export default function MicrophoneExperiment({ onComplete, onNext }) {
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState(null);
  const [simulatedSound, setSimulatedSound] = useState(null); // 'voice', 'clap', 'whistle'
  const [showExplanation, setShowExplanation] = useState(false);

  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animFrameRef = useRef(null);

  // Setup real microphone capture
  const startRealMic = async () => {
    sound.playTap();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;

      setIsListening(true);
      setMicError(null);
      setSimulatedSound(null);
      setShowExplanation(true);
      sound.playSuccess();
    } catch (err) {
      setMicError('Microphone not available or permission denied. Try the sound simulator buttons below!');
      setIsListening(false);
    }
  };

  const stopRealMic = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsListening(false);
  };

  // Sound Simulation triggers
  const triggerSimulation = (type) => {
    sound.playTap();
    stopRealMic();
    setSimulatedSound(type);
    setShowExplanation(true);

    if (type === 'whistle') sound.playPing();
    if (type === 'voice') sound.playSuccess();
    if (type === 'clap') sound.playBeep();
  };

  // Canvas visualizer rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw background center baseline
      ctx.strokeStyle = '#DDE2E5';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      if (isListening && analyserRef.current) {
        // Real microphone data
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteTimeDomainData(dataArray);

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#E67E42';
        ctx.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.lineTo(width, centerY);
        ctx.stroke();
      } else if (simulatedSound) {
        // Simulated harmonic sound waves
        phase += 0.15;
        const amp = simulatedSound === 'clap' ? 45 : simulatedSound === 'whistle' ? 35 : 25;
        const freq = simulatedSound === 'whistle' ? 0.08 : simulatedSound === 'clap' ? 0.12 : 0.04;

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#4E8585';
        ctx.beginPath();

        for (let x = 0; x < width; x += 3) {
          const y = centerY + Math.sin(x * freq + phase) * amp * Math.cos(x * 0.01);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      } else {
        // Idle gentle breathing line
        phase += 0.03;
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#18324A';
        ctx.beginPath();
        for (let x = 0; x < width; x += 4) {
          const y = centerY + Math.sin(x * 0.02 + phase) * 4;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isListening, simulatedSound]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopRealMic();
    };
  }, []);

  const handleFinish = () => {
    stopRealMic();
    sound.playSuccess();
    onComplete('microphone');
    onNext();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-xl mb-6">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#E67E42] mb-1 block">
          Mini-Challenge 04 / 08
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#18324A] mb-2">
          How Does Your Phone Hear You?
        </h2>
        <p className="text-base text-[#20303C]/80">
          <strong>Instruction:</strong> Test the microphone or tap a simulation button to see sound vibrations convert into electrical waves!
        </p>
      </div>

      {/* Main Waveform Stage */}
      <div className="w-full max-w-2xl bg-white border border-[#DDE2E5] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center">
        {/* Visualizer Status Bar */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-[#18324A] mb-3 pb-3 border-b border-[#DDE2E5]">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#E67E42] animate-pulse" />
            <span>
              STATUS:{' '}
              <strong className="text-[#18324A]">
                {isListening ? 'LIVE AUDIO CAPTURE' : simulatedSound ? `SIMULATING ${simulatedSound.toUpperCase()}` : 'WAITING FOR SOUND'}
              </strong>
            </span>
          </div>
          <span className="text-[#4E8585] font-semibold">MEMS Diaphragm Active</span>
        </div>

        {/* Oscilloscope Waveform Display */}
        <div className="w-full h-44 sm:h-52 bg-[#F7F3EA] rounded-xl border border-[#DDE2E5] flex items-center justify-center relative overflow-hidden p-2">
          <canvas
            ref={canvasRef}
            width={600}
            height={200}
            className="w-full h-full object-contain"
          />

          {/* Overlay Tag */}
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-white/90 rounded text-[10px] font-mono text-[#18324A] shadow-xs">
            Waveform Output (Voltage / Frequency)
          </div>
        </div>

        {/* Real Mic & Sound Simulator Controls */}
        <div className="w-full mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Real Mic Toggle */}
          <button
            type="button"
            onClick={isListening ? stopRealMic : startRealMic}
            className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-[#18324A] hover:bg-[#20303C] text-white'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#E67E42]" />}
            <span>{isListening ? 'Stop Real Mic' : 'Use Real Microphone'}</span>
          </button>

          {/* Quick Simulation Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <button
              type="button"
              onClick={() => triggerSimulation('voice')}
              className={`px-3 py-2 text-xs font-bold rounded-lg border transition-colors ${
                simulatedSound === 'voice'
                  ? 'bg-[#E67E42] text-white border-[#E67E42]'
                  : 'bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] border-[#DDE2E5]'
              }`}
            >
              🗣️ Speaking
            </button>
            <button
              type="button"
              onClick={() => triggerSimulation('clap')}
              className={`px-3 py-2 text-xs font-bold rounded-lg border transition-colors ${
                simulatedSound === 'clap'
                  ? 'bg-[#E67E42] text-white border-[#E67E42]'
                  : 'bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] border-[#DDE2E5]'
              }`}
            >
              👏 Clapping
            </button>
            <button
              type="button"
              onClick={() => triggerSimulation('whistle')}
              className={`px-3 py-2 text-xs font-bold rounded-lg border transition-colors ${
                simulatedSound === 'whistle'
                  ? 'bg-[#E67E42] text-white border-[#E67E42]'
                  : 'bg-[#F7F3EA] hover:bg-[#DDE2E5] text-[#18324A] border-[#DDE2E5]'
              }`}
            >
              🎶 Whistle
            </button>
          </div>
        </div>

        {/* Helpful note if permission denied */}
        {micError && (
          <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2.5 mt-3 w-full text-center">
            {micError}
          </p>
        )}
      </div>

      {/* Answer & Science Explanation */}
      {showExplanation && (
        <div className="w-full max-w-2xl mt-6 bg-[#18324A] text-white rounded-2xl p-6 shadow-md transition-all">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#E67E42] shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-base font-bold text-[#F7F3EA] mb-1">
                THE ANSWER: SOUND VIBRATIONS BECOME VOLTAGE
              </h3>
              <p className="text-sm sm:text-base text-[#DDE2E5] leading-relaxed">
                Inside your phone is a microscopic silicon diaphragm called a <strong>MEMS microphone</strong>. Sound waves in the air physically push this flexible membrane back and forth, turning vibrations into electrical pulses that your phone records as digital sound!
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={handleFinish}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E67E42] hover:bg-[#d66f34] text-white font-bold text-sm sm:text-base rounded-xl transition-transform active:scale-95 shadow"
            >
              <span>Next Experiment: Light Sensor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
