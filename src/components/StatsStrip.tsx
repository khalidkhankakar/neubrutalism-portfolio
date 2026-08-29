'use client';

import React, { useEffect, useRef, useState } from 'react';
import { StatItem } from '@/lib/types';

interface StatsStripProps {
  stats: StatItem[];
}

function StatTile({ stat }: { stat: StatItem }) {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const tileRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = tileRef.current;
    if (!el || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const target = stat.count;
          const dec = stat.decimals || 0;
          const suffix = stat.suffix || '';
          const duration = 1400;
          const t0 = performance.now();

          const frame = (now: number) => {
            const p = Math.min(1, (now - t0) / duration);
            // Ease out cubic
            const currentVal = target * (1 - Math.pow(1 - p, 3));
            setDisplayValue((dec ? currentVal.toFixed(dec) : Math.round(currentVal).toString()) + suffix);
            if (p < 1) {
              requestAnimationFrame(frame);
            }
          };

          requestAnimationFrame(frame);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stat]);

  return (
    <div
      ref={tileRef}
      className="group bg-[#0a0a0a] p-6 sm:p-7 transition-colors duration-250 hover:bg-[#0e0e0e] flex flex-col justify-between"
    >
      <div>
        <span className="block font-mono text-[10px] tracking-[0.16em] text-[#666666] mb-3">
          {stat.tag}
        </span>
        <span className="block font-sans font-semibold text-[clamp(2.1rem,3.4vw,3.1rem)] leading-none tracking-[-0.02em] text-[#ececec] tabular-nums group-hover:text-[var(--acc)] transition-colors duration-250">
          {displayValue}
        </span>
      </div>
      <div>
        <span className="block font-mono text-[10.5px] font-medium tracking-[0.16em] text-[#9c9c9c] mt-4">
          {stat.label}
        </span>
        <span className="block font-mono text-[10px] tracking-[0.08em] text-[#666666] mt-1">
          {stat.subtitle}
        </span>
      </div>
    </div>
  );
}

export function StatsStrip({ stats }: StatsStripProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#1d1d1d] border-t border-b border-[#1d1d1d]">
      {stats.map((stat) => (
        <StatTile key={stat.tag} stat={stat} />
      ))}
    </div>
  );
}
