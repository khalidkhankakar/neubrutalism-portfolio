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
    <section id="top" className="relative pt-10 sm:pt-14 md:pt-18 pb-16 overflow-hidden">
      {/* Blueprint Grid Background Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(#000_45%,transparent_96%)]"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal delay={50} duration={650} direction="up">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <p className="font-mono text-[11px] font-medium tracking-[0.2em] text-[var(--acc)] uppercase">
              {'// '}{bio.name.toUpperCase()} — {bio.positioning.toUpperCase()}
            </p>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border border-[#2c2c2c] bg-[#121212] text-[#9c9c9c] hidden sm:inline-block">
              {bio.location.toUpperCase()}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100} duration={700} direction="up">
          <h1 className="font-sans font-bold text-[clamp(2.3rem,6vw,5.2rem)] leading-[1.05] tracking-[-0.025em] text-[#ececec] max-w-[20ch] my-3">
            Building <span className="text-[var(--acc)]">intelligent</span> software from models to <em className="font-serif italic font-normal text-[1.06em] text-white tracking-normal">production</em>.
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={150} duration={700} direction="up">
          <p className="max-w-[66ch] text-[#9c9c9c] text-base sm:text-[1.05rem] leading-[1.7] mb-5">
            {bio.subheadline}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200} duration={700} direction="up">
          <div className="inline-flex items-center gap-2 border border-[#222222] bg-[#0e0e0e] px-3.5 py-1.5 font-mono text-[10.5px] sm:text-[11px] text-[#888888] tracking-wider mb-8 overflow-x-auto max-w-full">
            <span className="text-[var(--acc)] font-bold">PIPELINE:</span>
            <span className="text-[#ececec]">Data</span>
            <span className="text-[var(--acc)]">→</span>
            <span className="text-[#ececec]">ML Model</span>
            <span className="text-[var(--acc)]">→</span>
            <span className="text-[#ececec]">FastAPI</span>
            <span className="text-[var(--acc)]">→</span>
            <span className="text-[#ececec]">AI System</span>
            <span className="text-[var(--acc)]">→</span>
            <span className="text-[#ececec]">Next.js</span>
            <span className="text-[var(--acc)]">→</span>
            <span className="text-[var(--green)] font-bold">Production</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={250} duration={700} direction="up">
          <div className="flex flex-wrap items-center gap-3.5 mb-11">
            <button
              onClick={() => scrollToSection('work')}
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.12em] px-5 py-3.5 bg-[var(--acc)] text-black border border-[var(--acc)] hover:bg-[#ececec] hover:border-[#ececec] transition-colors cursor-pointer"
            >
              EXPLORE PROJECTS <ArrowDown className="w-4 h-4" />
            </button>
            <button
              id="cvBtn2"
              onClick={openCV}
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.12em] px-5 py-3.5 bg-transparent text-[#ececec] border border-[#2c2c2c] hover:border-[var(--acc)] hover:text-[var(--acc)] transition-colors cursor-pointer"
            >
              OPEN CV <FileDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.12em] px-5 py-3.5 bg-[#121212] text-[#9c9c9c] border border-[#222222] hover:border-[#444444] hover:text-[#ececec] transition-colors cursor-pointer hidden sm:inline-flex"
            >
              CONTACT ME
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300} duration={800} direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-[1px] bg-[#1d1d1d] border border-[#1d1d1d]">
            <Terminal />
            <TrainingMonitor />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
