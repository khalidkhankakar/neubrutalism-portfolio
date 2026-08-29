'use client';

import React from 'react';
import { ExperienceItem } from '@/lib/types';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceProps) {
  return (
    <section id="xp" className="border-t border-[#1d1d1d] bg-[#0a0a0a]">
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#1d1d1d] py-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-[var(--acc)] uppercase">
              04 /
            </span>
            <h2 className="font-sans text-[clamp(1.5rem,2.7vw,2rem)] font-semibold tracking-[-0.04em] text-[#ececec]">
              Experience
            </h2>
          </div>
          <p className="max-w-xl text-right font-mono text-[10px] tracking-[0.14em] text-[#666666] uppercase">
            roles and internships
          </p>
        </div>

        <div className="divide-y divide-[#1d1d1d] border-b border-[#1d1d1d] py-8 sm:py-12">
          {experience.map((item, idx) => (
            <div
              key={idx}
              className="group grid grid-cols-1 gap-3 py-6 md:grid-cols-[180px_1fr_auto] md:gap-6"
            >
              <div className="flex flex-col">
                <span className="font-mono text-[11.5px] tracking-[0.06em] text-[#666666]">{item.period}</span>
                {item.type && (
                  <span className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-[var(--acc)]">
                    [{item.type}]
                  </span>
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-sans text-[1.12rem] font-semibold text-[#ececec] transition-colors group-hover:text-[var(--acc)]">
                    {item.role}
                  </span>
                  <span className="font-mono text-[11px] font-medium tracking-[0.08em] text-[var(--acc)]">
                    · {item.company}
                  </span>
                </div>
                <p className="mt-2 max-w-[68ch] text-sm leading-[1.65] text-[#9c9c9c] sm:text-[0.9rem]">
                  {item.description}
                </p>

                {item.technologies && item.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.technologies.map((t) => (
                      <span
                        key={t}
                        className="border border-[#222222] bg-[#121212] px-2 py-0.5 font-mono text-[9.5px] text-[#888888] group-hover:text-[#b0b0b0]"
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
