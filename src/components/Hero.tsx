/* Hallmark · macrostructure: Edit Grid · tone: technical · anchor hue: amber */
'use client';

import React from 'react';
import { ArrowDown, FileDown } from 'lucide-react';
import { Terminal } from './Terminal';
import { TrainingMonitor } from './TrainingMonitor';
import { useApp } from '@/context/AppContext';
import { PortfolioData } from '@/lib/types';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

interface HeroProps {
  bio: PortfolioData['bio'];
}

export function Hero({ bio }: HeroProps) {
  const { openCV, scrollToSection } = useApp();

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-10 sm:pt-14 md:pt-18">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(#000_45%,transparent_96%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <ScrollReveal delay={50} duration={650} direction="up">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-[var(--acc)] uppercase sm:text-[11px]">
              {bio.name.toUpperCase()} · {bio.positioning.toUpperCase()}
            </p>
            <span className="hidden border border-[#2c2c2c] bg-[#121212] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#9c9c9c] sm:inline-block">
              {bio.location.toUpperCase()}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100} duration={700} direction="up">
          <h1 className="my-3 max-w-[18ch] font-sans text-[clamp(2.5rem,6vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[#ececec]">
            I build <span className="text-[var(--acc)]">AI systems</span> and production software.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={150} duration={700} direction="up">
          <p className="mb-6 max-w-[66ch] text-base leading-[1.7] text-[#9c9c9c] sm:text-[1.05rem]">
            {bio.subheadline}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200} duration={700} direction="up">
          <div className="mb-8 inline-flex max-w-full flex-wrap items-center gap-2 border border-[#222222] bg-[#0e0e0e] px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-[#8a8a8a] uppercase">
            <span className="text-[var(--acc)]">ML</span>
            <span className="text-[#ececec]">·</span>
            <span className="text-[#ececec]">Python</span>
            <span className="text-[var(--acc)]">·</span>
            <span className="text-[#ececec]">FastAPI</span>
            <span className="text-[var(--acc)]">·</span>
            <span className="text-[#ececec]">Next.js</span>
            <span className="text-[var(--acc)]">·</span>
            <span className="text-[var(--green)]">Production</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={250} duration={700} direction="up">
          <div className="mb-11 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => scrollToSection('work')}
              className="inline-flex cursor-pointer items-center gap-2 border border-[var(--acc)] bg-[var(--acc)] px-5 py-3.5 font-mono text-[11px] font-bold tracking-[0.12em] text-black transition-colors hover:bg-[#f1f1f1]"
            >
              EXPLORE PROJECTS <ArrowDown className="h-4 w-4" />
            </button>
            <button
              id="cvBtn2"
              onClick={openCV}
              className="inline-flex cursor-pointer items-center gap-2 border border-[#2c2c2c] bg-transparent px-5 py-3.5 font-mono text-[11px] font-bold tracking-[0.12em] text-[#ececec] transition-colors hover:border-[var(--acc)] hover:text-[var(--acc)]"
            >
              OPEN CV <FileDown className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden items-center gap-2 border border-[#222222] bg-[#121212] px-5 py-3.5 font-mono text-[11px] font-bold tracking-[0.12em] text-[#9c9c9c] transition-colors hover:border-[#444444] hover:text-[#ececec] sm:inline-flex"
            >
              CONTACT ME
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300} duration={800} direction="up">
          <div className="grid grid-cols-1 gap-[1px] border border-[#1d1d1d] bg-[#1d1d1d] lg:grid-cols-[1.5fr_1fr]">
            <Terminal />
            <TrainingMonitor />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
