'use client';

import React from 'react';
import { StackCategory } from '@/lib/types';

interface TechStackProps {
  categories: StackCategory[];
}

export function TechStackSection({ categories }: TechStackProps) {
  return (
    <section id="stack" className="border-t border-[#1d1d1d] bg-[#0a0a0a]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative ticks">
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-baseline gap-4 py-6 border-b border-[#1d1d1d]">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs font-medium tracking-[0.1em] text-[var(--acc)]">03 /</span>
            <h2 className="font-sans font-semibold text-[clamp(1.35rem,2.6vw,1.9rem)] tracking-[0.02em] uppercase text-[#ececec]">
              Stack
            </h2>
          </div>
          <span className="font-mono text-[10.5px] tracking-[0.16em] text-[#666666] uppercase text-right">
            DAILY DRIVERS — NOT RESUME DECORATION
          </span>
        </div>

        {/* Stack Grid */}
        <div className="py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#1d1d1d] border border-[#1d1d1d]">
            {categories.map((cat) => (
              <div key={cat.title} className="bg-[#0a0a0a] flex flex-col">
                <h3 className="flex justify-between items-center font-mono text-[10.5px] font-medium tracking-[0.18em] text-[#ececec] px-5 py-3.5 border-b border-[#1d1d1d] bg-[#0e0e0e]/50">
                  <span>{cat.title}</span>
                  <span className="text-[#666666]">[{cat.count}]</span>
                </h3>
                <div className="divide-y divide-[#1d1d1d]">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="group flex justify-between items-baseline gap-3 px-5 py-3 transition-all duration-200 hover:pl-6 hover:bg-[#0e0e0e]"
                    >
                      <b className="font-sans text-[0.88rem] font-medium text-[#ececec] group-hover:text-[var(--acc)] transition-colors">
                        {item.name}
                      </b>
                      <span className="font-mono text-[10px] text-[#666666] whitespace-nowrap">
                        {item.meta}
                      </span>
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
