'use client';

import React from 'react';
import { Layout, Server, Terminal } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export const Skills: React.FC = () => {
  const skills = [
    { name: "Frontend", icon: <Layout size={20} />, items: ["React", "TypeScript", "Tailwind", "Next.js"] },
    { name: "Backend", icon: <Server size={20} />, items: ["Node.js", "Python", "PostgreSQL", "Trpc"] },
    { name: "Tools", icon: <Terminal size={20} />, items: ["Git", "Docker", "VS Code", "AI & LLMs & MCP"] },
  ];

  return (
    <section id="skills" className="px-[var(--page-gutter)] py-[var(--space-3xl)]">
      <div className="editorial-container grid gap-[var(--space-xl)] border-t border-[var(--color-rule)] pt-[var(--space-xl)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <ScrollReveal width="100%">
          <div>
            <p className="editorial-smallcaps mb-4 text-[var(--color-accent)]">Toolkit</p>
            <h2 className="font-display text-5xl italic leading-none text-[var(--color-ink)] md:text-7xl">
              Tools, chosen for composure.
            </h2>
          </div>
        </ScrollReveal>

        <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
          {skills.map((skill, idx) => (
            <ScrollReveal key={skill.name} delay={idx * 0.1} width="100%">
              <div className="grid gap-6 py-6 sm:grid-cols-[12rem_minmax(0,1fr)]">
                <div className="editorial-smallcaps flex items-center gap-3 text-[var(--color-accent)]">
                  {skill.icon}
                  {skill.name}
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {skill.items.map((item) => (
                    <span key={item} className="font-display text-2xl italic text-[var(--color-ink)]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
