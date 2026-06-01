'use client';

import React from 'react';
import { Code2, Coffee, Palette, Zap } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export const About: React.FC = () => {
  const notes = [
    { icon: <Code2 size={20} />, label: "Code", value: "Clean interfaces, readable systems" },
    { icon: <Palette size={20} />, label: "Taste", value: "Visual rhythm before decoration" },
    { icon: <Coffee size={20} />, label: "Pace", value: "Calm iteration, fast shipping" },
    { icon: <Zap size={20} />, label: "Performance", value: "Small details, felt speed" },
  ];

  return (
    <section id="about" className="px-[var(--page-gutter)] py-[var(--space-3xl)]">
      <div className="editorial-container grid gap-[var(--space-xl)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <ScrollReveal direction="right">
          <div className="sticky top-40">
            <p className="editorial-smallcaps mb-4 text-[var(--color-accent)]">Index</p>
            <h2 className="font-display text-5xl italic leading-none text-[var(--color-ink)] md:text-7xl">
              A note on the practice.
            </h2>
          </div>
        </ScrollReveal>

        <div className="editorial-measure">
          <ScrollReveal width="100%">
            <p className="font-display text-3xl leading-tight text-[var(--color-ink)] md:text-4xl">
              I&apos;m a frontend engineer who likes software with a spine: clear structure, strong typography, useful motion, and enough restraint to let the work breathe.
            </p>
          </ScrollReveal>

          <ScrollReveal width="100%" delay={0.1}>
            <p className="mt-[var(--space-lg)] leading-8 text-[var(--color-ink-2)]">
              My work sits between product engineering and visual craft. I build with React, TypeScript, Next.js, APIs, and modern tooling, but the real target is simpler: make digital experiences that feel composed under pressure.
            </p>
          </ScrollReveal>

          <ScrollReveal width="100%" delay={0.2}>
            <div className="mt-[var(--space-xl)] divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
              {notes.map((note) => (
                <div key={note.label} className="grid gap-3 py-5 sm:grid-cols-[10rem_minmax(0,1fr)]">
                  <div className="editorial-smallcaps flex items-center gap-2 text-[var(--color-accent)]">
                    {note.icon}
                    {note.label}
                  </div>
                  <p className="text-[var(--color-ink)]">{note.value}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
