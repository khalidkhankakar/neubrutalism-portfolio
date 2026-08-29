'use client';

import React from 'react';
import { StackCategory } from '@/lib/types';

interface TechStackProps {
  categories: StackCategory[];
}

export function TechStackSection({ categories }: TechStackProps) {
  return (
    <section id="stack" className="border-t border-[#1d1d1d] bg-[#0a0a0a]">
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#1d1d1d] py-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-[var(--acc)] uppercase">
              03 /
            </span>
            <h2 className="font-sans text-[clamp(1.5rem,2.7vw,2rem)] font-semibold tracking-[-0.04em] text-[#ececec]">
              Stack
            </h2>
          </div>
          <p className="max-w-xl text-right font-mono text-[10px] tracking-[0.14em] text-[#666666] uppercase">
            tools i use every week
          </p>
        </div>

        <div className="py-10 sm:py-14">
          <div className="grid grid-cols-1 gap-[1px] border border-[#1d1d1d] bg-[#1d1d1d] sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <div key={cat.title} className="flex flex-col bg-[#0a0a0a]">
                <h3 className="flex items-center justify-between border-b border-[#1d1d1d] bg-[#0e0e0e]/50 px-5 py-3.5 font-mono text-[10.5px] font-medium tracking-[0.18em] text-[#ececec]">
                  <span>{cat.title}</span>
                  <span className="text-[#666666]">[{cat.count}]</span>
                </h3>
                <div className="divide-y divide-[#1d1d1d]">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="group flex items-baseline justify-between gap-3 px-5 py-3 transition-all duration-200 hover:bg-[#0e0e0e] hover:pl-6"
                    >
                      <b className="font-sans text-[0.88rem] font-medium text-[#ececec] transition-colors group-hover:text-[var(--acc)]">
                        {item.name}
                      </b>
                      <span className="whitespace-nowrap font-mono text-[10px] text-[#666666]">{item.meta}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
