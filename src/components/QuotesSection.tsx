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
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#1d1d1d] py-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-[var(--acc)] uppercase">
              05 /
            </span>
            <h2 className="font-sans text-[clamp(1.5rem,2.7vw,2rem)] font-semibold tracking-[-0.04em] text-[#ececec]">
              Feedback
            </h2>
          </div>
          <p className="max-w-xl text-right font-mono text-[10px] tracking-[0.14em] text-[#666666] uppercase">
            notes from collaborators
          </p>
        </div>

        <div className="py-10 sm:py-14">
          <div className="grid grid-cols-1 gap-[1px] border border-[#1d1d1d] bg-[#1d1d1d] lg:grid-cols-[1.15fr_1fr]">
            {bigQuote && (
              <div className="flex flex-col justify-between gap-5 bg-[#0a0a0a] p-7 transition-colors hover:bg-[#0e0e0e] sm:p-8">
                <div>
                  <span className="mb-4 block select-none text-[3.4rem] leading-[0.6] text-[var(--acc)]">“</span>
                  <p className="font-sans text-base leading-[1.65] text-[#ececec] sm:text-[1.13rem]">{bigQuote.text}</p>
                </div>
                <footer className="border-t border-[#1d1d1d] pt-4 font-mono text-[10px] leading-[1.9] tracking-[0.12em] text-[#666666]">
                  <b className="block text-[11px] font-medium text-[var(--acc)]">{bigQuote.author}</b>
                  {bigQuote.title}
                </footer>
              </div>
            )}

            <div className="flex flex-col gap-[1px] bg-[#1d1d1d]">
              {sideQuotes.map((q) => (
                <div
                  key={q.id}
                  className="flex flex-1 flex-col justify-between gap-5 bg-[#0a0a0a] p-7 transition-colors hover:bg-[#0e0e0e] sm:p-8"
                >
                  <div>
                    <span className="mb-3 block select-none text-[3.2rem] leading-[0.6] text-[var(--acc)]">“</span>
                    <p className="font-sans text-sm leading-[1.7] text-[#9c9c9c] sm:text-[0.92rem]">{q.text}</p>
                  </div>
                  <footer className="border-t border-[#1d1d1d] pt-3 font-mono text-[10px] leading-[1.9] tracking-[0.12em] text-[#666666]">
                    <b className="block text-[11px] font-medium text-[var(--acc)]">{q.author}</b>
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
