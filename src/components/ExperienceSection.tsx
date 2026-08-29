'use client';

import React from 'react';
import { ExperienceItem } from '@/lib/types';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceProps) {
  return (
    <section id="xp" className="border-t border-[#1d1d1d] bg-[#0a0a0a]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative ticks">
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-baseline gap-4 py-6 border-b border-[#1d1d1d]">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs font-medium tracking-[0.1em] text-[var(--acc)]">04 /</span>
            <h2 className="font-sans font-semibold text-[clamp(1.35rem,2.6vw,1.9rem)] tracking-[0.02em] uppercase text-[#ececec]">
              Experience
            </h2>
          </div>
          <span className="font-mono text-[10.5px] tracking-[0.16em] text-[#666666] uppercase text-right">
            PROFESSIONAL ROLES & INTERNSHIPS
          </span>
        </div>

        {/* Timeline Rows */}
        <div className="py-8 sm:py-12 divide-y divide-[#1d1d1d] border-b border-[#1d1d1d]">
          {experience.map((item, idx) => (
            <div
              key={idx}
              className="group grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-3 md:gap-6 py-6 items-baseline transition-colors"
            >
              <div className="flex flex-col">
                <span className="font-mono text-[11.5px] tracking-[0.06em] text-[#666666]">
                  {item.period}
                </span>
                {item.type && (
                  <span className="font-mono text-[9px] text-[var(--acc)] tracking-widest uppercase mt-0.5">
                    [{item.type}]
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-baseline flex-wrap gap-2">
                  <span className="font-sans font-semibold text-[1.12rem] text-[#ececec] group-hover:text-[var(--acc)] transition-colors">
                    {item.role}
                  </span>
                  <span className="font-mono text-[11px] font-medium tracking-[0.08em] text-[var(--acc)]">
                    · {item.company}
                  </span>
                </div>
                <p className="text-[#9c9c9c] text-sm sm:text-[0.9rem] leading-[1.65] max-w-[68ch] mt-2">
                  {item.description}
                </p>

                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9.5px] px-2 py-0.5 bg-[#121212] border border-[#222222] text-[#888888] group-hover:text-[#b0b0b0]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span className="font-mono text-[10.5px] tracking-[0.1em] text-[#666666] uppercase">
                {item.location}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
