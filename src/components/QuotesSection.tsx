'use client';

import React from 'react';
import { Quote } from '@/lib/types';

interface QuotesProps {
  quotes: Quote[];
}

export function QuotesSection({ quotes }: QuotesProps) {
  const bigQuote = quotes.find((q) => q.isBig) || quotes[0];
  const sideQuotes = quotes.filter((q) => !q.isBig);

  return (
    <section id="voices" className="border-t border-[#1d1d1d] bg-[#0a0a0a]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative ticks">
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-baseline gap-4 py-6 border-b border-[#1d1d1d]">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs font-medium tracking-[0.1em] text-[var(--acc)]">05 /</span>
            <h2 className="font-sans font-semibold text-[clamp(1.35rem,2.6vw,1.9rem)] tracking-[0.02em] uppercase text-[#ececec]">
              What People Say
            </h2>
          </div>
          <span className="font-mono text-[10.5px] tracking-[0.16em] text-[#666666] uppercase text-right">
            RECEIPTS INCLUDED
          </span>
        </div>

        {/* Quotes Grid */}
        <div className="py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-[1px] bg-[#1d1d1d] border border-[#1d1d1d]">
            {/* Big quote spanning column */}
            {bigQuote && (
              <div className="bg-[#0a0a0a] p-7 sm:p-8 flex flex-col justify-between gap-5 hover:bg-[#0e0e0e] transition-colors">
                <div>
                  <span className="font-serif italic text-[3.4rem] leading-[0.6] text-[var(--acc)] block mb-4 select-none">
                    “
                  </span>
                  <p className="text-base sm:text-[1.13rem] leading-[1.65] text-[#ececec] font-sans">
                    {bigQuote.text}
                  </p>
                </div>
                <footer className="font-mono text-[10px] tracking-[0.12em] text-[#666666] leading-[1.9] border-t border-[#1d1d1d] pt-4">
                  <b className="text-[var(--acc)] font-medium block text-[11px]">{bigQuote.author}</b>
                  {bigQuote.title}
                </footer>
              </div>
            )}

            {/* Stacked smaller quotes */}
            <div className="flex flex-col gap-[1px] bg-[#1d1d1d]">
              {sideQuotes.map((q) => (
                <div
                  key={q.id}
                  className="bg-[#0a0a0a] p-7 sm:p-8 flex flex-col justify-between gap-5 flex-1 hover:bg-[#0e0e0e] transition-colors"
                >
                  <div>
                    <span className="font-serif italic text-[3.2rem] leading-[0.6] text-[var(--acc)] block mb-3 select-none">
                      “
                    </span>
                    <p className="text-sm sm:text-[0.92rem] leading-[1.7] text-[#9c9c9c] font-sans">
                      {q.text}
                    </p>
                  </div>
                  <footer className="font-mono text-[10px] tracking-[0.12em] text-[#666666] leading-[1.9] border-t border-[#1d1d1d] pt-3">
                    <b className="text-[var(--acc)] font-medium block text-[11px]">{q.author}</b>
                    {q.title}
                  </footer>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
