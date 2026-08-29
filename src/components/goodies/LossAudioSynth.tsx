'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Square, Radio, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function LossAudioSynth() {
  const { showToast } = useApp();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentFreq, setCurrentFreq] = useState<number>(440);
  const [currentLossVal, setCurrentLossVal] = useState<number>(2.45);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const stopAudio = () => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.05);
      setTimeout(() => {
        try {
          oscRef.current?.stop();
          oscRef.current?.disconnect();
          gainRef.current?.disconnect();
        } catch {
          // ignore cleanup
        }
        setIsPlaying(false);
      }, 60);
    } else {
      setIsPlaying(false);
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
  };

  const playConvergence = () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      oscRef.current = osc;
      gainRef.current = gain;

      osc.start();
      setIsPlaying(true);
      showToast('Synthesizing Loss Descent Frequency…');

      const startTime = ctx.currentTime;
      const duration = 6.0; // 6 seconds convergence sweep

      const tick = () => {
        if (!audioCtxRef.current || !oscRef.current) return;
        const now = audioCtxRef.current.currentTime;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1.0);

        // Exponential decay simulation: loss from 3.2 -> 0.12
        const simulatedLoss = 0.12 + 3.08 * Math.exp(-progress * 4.5);
        // Map loss to frequency (120Hz to 680Hz)
        const targetFreq = 120 + simulatedLoss * 160;

        oscRef.current.frequency.setTargetAtTime(targetFreq, now, 0.05);
        setCurrentFreq(Math.round(targetFreq));
        setCurrentLossVal(parseFloat(simulatedLoss.toFixed(3)));

        if (progress < 1.0) {
          animFrameRef.current = requestAnimationFrame(tick);
        } else {
          // Reached optimum ground state chord
          showToast('Global minimum reached (0.120 loss)');
          setTimeout(stopAudio, 800);
        }
      };

      animFrameRef.current = requestAnimationFrame(tick);
    } catch {
      showToast('Web Audio API not supported on this browser');
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="border border-[#1d1d1d] bg-[#0e0e0e] p-6 lg:p-8 ticks">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1d1d1d]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[var(--acc)]/40 bg-[var(--acc)]/10 flex items-center justify-center text-[var(--acc)]">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-mono text-sm font-bold text-[#ececec] uppercase tracking-[0.1em] flex items-center gap-2">
              Loss Sonification & Audio Synthesizer
              <span className="text-[10px] text-[var(--acc)] bg-[var(--acc)]/10 px-1.5 py-0.5 border border-[var(--acc)]/20">
                WEB AUDIO
              </span>
            </h3>
            <p className="text-xs text-[#9c9c9c] font-mono mt-0.5">
              Experience the acoustic harmonics of gradient descent descending into the global loss minimum.
            </p>
          </div>
        </div>

        <button
          onClick={playConvergence}
          className={`flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold border transition-colors ${
            isPlaying
              ? 'border-red-500 bg-red-500/10 text-red-400'
              : 'border-[var(--acc)] bg-[var(--acc)] text-black hover:bg-white'
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>HALT SYNTHESIZER</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>LISTEN TO LOSS DESCENT</span>
            </>
          )}
        </button>
      </div>

      {/* Visual Audio Wave & Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 font-mono text-xs">
        <div className="border border-[#1d1d1d] bg-[#121212] p-4">
          <div className="text-[10px] text-[#666666] uppercase mb-1">HARMONIC FREQUENCY</div>
          <div className="text-2xl font-bold text-[var(--acc)]">{currentFreq} Hz</div>
          <div className="text-[10px] text-[#666666] mt-1">Oscillator: Pure Sine + Lowpass</div>
        </div>

        <div className="border border-[#1d1d1d] bg-[#121212] p-4">
          <div className="text-[10px] text-[#666666] uppercase mb-1">SIMULATED LOSS LEVEL</div>
          <div className="text-2xl font-bold text-white">{currentLossVal.toFixed(3)}</div>
          <div className="text-[10px] text-[#666666] mt-1">Convergence target: 0.120</div>
        </div>

        <div className="border border-[#1d1d1d] bg-[#121212] p-4 flex flex-col justify-between">
          <div className="text-[10px] text-[#666666] uppercase mb-1">AUDIO WAVE MONITOR</div>
          <div className="flex items-end gap-1 h-8">
            {[14, 28, 45, 60, 80, 55, 30, 70, 90, 40, 20, 65, 35].map((h, i) => (
              <div
                key={i}
                style={{
                  height: isPlaying ? `${Math.max(15, (h * currentFreq) / 450)}%` : '20%',
                }}
                className={`flex-1 transition-all duration-75 ${
                  isPlaying ? 'bg-[var(--acc)]' : 'bg-[#222222]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
