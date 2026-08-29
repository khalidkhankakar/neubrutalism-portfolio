'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useApp, THEME_LIST } from '@/context/AppContext';

const MAXPTS = 150;
const EPOCHS = 40;
const STEPS = 26;
const TOTAL = EPOCHS * STEPS;

const logPool = [
  'checkpoint saved → s3://runs/ckpt.pt',
  'eval: AUROC 0.947 (+0.002)',
  'lr decayed → 1.2e-4',
  'gpu mem 87.3% — no leaks detected',
  'data loader: 0 stalled batches',
  'early-stopping patience: 7 (untouched)',
  'grad norm clipped — all calm',
  'fp16 mixed-precision stabilized',
  'distributed shard sync verified: 8/8 nodes',
];

export function TrainingMonitor() {
  const { theme } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [runId, setRunId] = useState(4721);
  const [epochStr, setEpochStr] = useState('01/40');
  const [lossStr, setLossStr] = useState('—');
  const [valLossStr, setValLossStr] = useState('—');
  const [lrStr, setLrStr] = useState('3.0e-4');
  const [gpuStr, setGpuStr] = useState('87.4%');
  const [etaStr, setEtaStr] = useState('01:54');
  const [currentLog, setCurrentLog] = useState('initializing run #4721 — allocating GPUs…');
  const [logAnim, setLogAnim] = useState(false);

  // Internal mutable telemetry state to drive animation loop without re-render thrash
  const stateRef = useRef({
    t: 0,
    id: 4721,
    data: [] as number[],
    val: [] as number[],
    paused: false,
    lastLog: -1,
  });

  // Chart rendering function
  const drawChart = React.useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    if (!cx) return;

    const w = cv.clientWidth;
    const h = cv.clientHeight;
    if (!w || !h) return;

    const currentTheme = THEME_LIST.find((t) => t.id === theme);
    const accColor = currentTheme ? currentTheme.hex : '#ffb224';

    cx.clearRect(0, 0, w, h);
    cx.fillStyle = '#0d0d0d';
    cx.fillRect(0, 0, w, h);

    // Grid lines
    cx.strokeStyle = 'rgba(255,255,255,0.05)';
    cx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      const y = (h / 4) * i;
      cx.beginPath();
      cx.moveTo(0, y + 0.5);
      cx.lineTo(w, y + 0.5);
      cx.stroke();
    }
    for (let i = 1; i < 6; i++) {
      const x = (w / 6) * i;
      cx.beginPath();
      cx.moveTo(x + 0.5, 0);
      cx.lineTo(x + 0.5, h);
      cx.stroke();
    }

    cx.strokeStyle = '#222222';
    cx.beginPath();
    cx.moveTo(0, h - 0.5);
    cx.lineTo(w, h - 0.5);
    cx.stroke();

    // Chart label
    cx.fillStyle = '#666666';
    cx.font = '9px "JetBrains Mono", monospace';
    cx.fillText('LOSS (CROSS-ENTROPY)', 8, 14);

    const d = stateRef.current.data;
    const v = stateRef.current.val;
    if (d.length < 2) return;

    const ymax = Math.max(...d, ...v) * 1.15 || 1;
    const X = (i: number) => (i / (MAXPTS - 1)) * w;
    const Y = (val: number) => h - (val / ymax) * (h - 12) - 4;

    // Plot Val Loss
    cx.beginPath();
    v.forEach((p, i) => (i ? cx.lineTo(X(i), Y(p)) : cx.moveTo(X(i), Y(p))));
    cx.strokeStyle = 'rgba(62, 207, 110, 0.45)';
    cx.lineWidth = 1.2;
    cx.stroke();

    // Plot Train Loss
    cx.beginPath();
    d.forEach((p, i) => (i ? cx.lineTo(X(i), Y(p)) : cx.moveTo(X(i), Y(p))));
    cx.strokeStyle = accColor;
    cx.lineWidth = 1.8;
    cx.lineJoin = 'round';
    cx.stroke();

    // Latest dot indicator
    const lx = X(d.length - 1);
    const ly = Y(d[d.length - 1]);
    cx.fillStyle = accColor;
    cx.fillRect(lx - 2, ly - 2, 4, 4);
    cx.font = '10px "JetBrains Mono", monospace';
    const textVal = d[d.length - 1].toFixed(3);
    cx.fillText(textVal, lx < w - 54 ? lx + 8 : lx - 48, ly - 7);
  }, [theme]);

  // Resize canvas according to device pixel ratio
  const handleResize = React.useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    const w = cv.clientWidth;
    const h = cv.clientHeight;
    if (!w || !h) return;

    cv.width = w * dpr;
    cv.height = h * dpr;
    const cx = cv.getContext('2d');
    if (cx) {
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    drawChart();
  }, [drawChart]);

  useEffect(() => {
    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [handleResize]);

  // Main telemetry tick timer
  useEffect(() => {
    const interval = setInterval(() => {
      const state = stateRef.current;
      if (state.paused) return;

      state.t++;
      const t = state.t;
      const loss = 0.9 * Math.exp(-t / 60) + 0.12 + (Math.random() - 0.5) * 0.05;
      const val = loss + 0.03 + Math.random() * 0.03;

      state.data.push(loss);
      state.val.push(val);

      if (state.data.length > MAXPTS) {
        state.data.shift();
        state.val.shift();
      }

      const epoch = Math.min(EPOCHS, Math.floor((t - 1) / STEPS) + 1);

      if (t % STEPS === 0 && t < TOTAL) {
        let i: number;
        do {
          i = Math.floor(Math.random() * logPool.length);
        } while (i === state.lastLog);
        state.lastLog = i;
        setCurrentLog(logPool[i]);
        setLogAnim(true);
        setTimeout(() => setLogAnim(false), 350);
      }

      setEpochStr(`${String(epoch).padStart(2, '0')}/${EPOCHS}`);
      setLossStr(loss.toFixed(4));
      setValLossStr(val.toFixed(4));
      setLrStr((3e-4 * Math.pow(0.5, Math.floor(epoch / 10))).toExponential(1));
      setGpuStr((86 + Math.sin(t / 13) * 4 + Math.random()).toFixed(1) + '%');

      const remain = Math.max(0, (TOTAL - t) * 0.11);
      const m = Math.floor(remain / 60);
      const s = Math.floor(remain % 60);
      setEtaStr(`${m}:${String(s).padStart(2, '0')}`);

      drawChart();

      if (t >= TOTAL) {
        state.paused = true;
        setCurrentLog(`run #${state.id} complete — promoting to shadow traffic…`);
        setLogAnim(true);
        setTimeout(() => {
          state.id++;
          state.t = 0;
          state.data = [];
          state.val = [];
          setRunId(state.id);
          setCurrentLog(`scheduler queued run #${state.id} — warm-starting from last checkpoint`);
          state.paused = false;
        }, 4200);
      }
    }, 110);

    return () => clearInterval(interval);
  }, [drawChart]);

  return (
    <div
      id="liveTrainingMonitor"
      className="bg-[#0a0a0a] flex flex-col min-w-0 border border-[#1d1d1d] shadow-xl"
    >
      {/* Titlebar */}
      <div className="flex items-center gap-3 px-3.5 py-2 border-b border-[#1d1d1d] bg-[#0e0e0e] font-mono text-[11px] text-[#666666]">
        <span className="text-[var(--acc)] border border-[var(--acc)] px-1.5 py-0.2 text-[9px] tracking-[0.14em] font-bold">
          TRAIN
        </span>
        <span className="tracking-[0.06em] text-[#ececec]">TRAINING — RUN #{runId}</span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] tracking-[0.16em] text-[var(--green)]">
          <i className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Chart Canvas Area */}
      <div ref={containerRef} className="relative flex-1 min-h-[196px] border-b border-[#1d1d1d] bg-[#0d0d0d]">
        <canvas ref={canvasRef} className="block w-full h-full" />
        {/* CRT Scanline */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.015)_0_1px,transparent_1px_3px)]"
        />
      </div>

      {/* Readout Telemetry Tiles */}
      <div className="grid grid-cols-3 gap-[1px] bg-[#1d1d1d]">
        <div className="bg-[#0a0a0a] p-2.5 sm:px-3.5 sm:py-2.5">
          <b className="block font-mono text-[9px] tracking-[0.14em] text-[#666666] mb-0.5">EPOCH</b>
          <span className="font-mono text-[13px] sm:text-[13.5px] font-medium text-[#ececec] tabular-nums">
            {epochStr}
          </span>
        </div>
        <div className="bg-[#0a0a0a] p-2.5 sm:px-3.5 sm:py-2.5">
          <b className="block font-mono text-[9px] tracking-[0.14em] text-[#666666] mb-0.5">LOSS</b>
          <span className="font-mono text-[13px] sm:text-[13.5px] font-medium text-[var(--acc)] tabular-nums">
            {lossStr}
          </span>
        </div>
        <div className="bg-[#0a0a0a] p-2.5 sm:px-3.5 sm:py-2.5">
          <b className="block font-mono text-[9px] tracking-[0.14em] text-[#666666] mb-0.5">VAL LOSS</b>
          <span className="font-mono text-[13px] sm:text-[13.5px] font-medium text-[#ececec] tabular-nums">
            {valLossStr}
          </span>
        </div>
        <div className="bg-[#0a0a0a] p-2.5 sm:px-3.5 sm:py-2.5">
          <b className="block font-mono text-[9px] tracking-[0.14em] text-[#666666] mb-0.5">LEARNING RATE</b>
          <span className="font-mono text-[13px] sm:text-[13.5px] font-medium text-[#ececec] tabular-nums">
            {lrStr}
          </span>
        </div>
        <div className="bg-[#0a0a0a] p-2.5 sm:px-3.5 sm:py-2.5">
          <b className="block font-mono text-[9px] tracking-[0.14em] text-[#666666] mb-0.5">GPU MEM</b>
          <span className="font-mono text-[13px] sm:text-[13.5px] font-medium text-[#ececec] tabular-nums">
            {gpuStr}
          </span>
        </div>
        <div className="bg-[#0a0a0a] p-2.5 sm:px-3.5 sm:py-2.5">
          <b className="block font-mono text-[9px] tracking-[0.14em] text-[#666666] mb-0.5">ETA</b>
          <span className="font-mono text-[13px] sm:text-[13.5px] font-medium text-[#ececec] tabular-nums">
            {etaStr}
          </span>
        </div>
      </div>

      {/* Realtime Training Log String */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 border-t border-[#1d1d1d] font-mono text-[11px] text-[#666666] overflow-hidden whitespace-nowrap bg-[#0e0e0e]">
        <span className="text-[var(--acc)] shrink-0">▸</span>
        <span
          id="monLogTxt"
          className={`truncate transition-opacity duration-300 ${
            logAnim ? 'opacity-40 translate-x-1' : 'opacity-100'
          }`}
        >
          {currentLog}
        </span>
      </div>
    </div>
  );
}
