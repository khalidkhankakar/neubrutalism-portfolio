'use client';

import React from 'react';

interface TechTickerProps {
  keywords: string[];
}

export function TechTicker({ keywords }: TechTickerProps) {
  const repeatedKeywords = [...keywords, ...keywords, ...keywords];

  return (
    <div
      className="border-t border-[#1d1d1d] overflow-hidden py-3 bg-[#0a0a0a] select-none group"
      aria-hidden="true"
    >
      <div className="flex w-max animate-[ticker_36s_linear_infinite] group-hover:[animation-play-state:paused]">
        {repeatedKeywords.map((kw, i) => (
          <span
            key={`${kw}-${i}`}
            className="font-mono text-[11.5px] font-medium tracking-[0.22em] text-[#666666] whitespace-nowrap flex items-center"
          >
            {kw}
            <i className="not-italic text-[var(--acc)] mx-5">{'//'}</i>
          </span>
        ))}
      </div>
    </div>
  );
}
