'use client';

import React, { useState } from 'react';
import { Plus, Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/types';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

interface SelectedWorkProps {
  projects: Project[];
}

export function SelectedWorkSection({ projects }: SelectedWorkProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
    if (projects.length > 0) {
      return { [projects[0].id]: true };
    }
    return { pulseai: true };
  });

  const toggleProject = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="work" className="border-t border-[#1d1d1d] bg-[#0a0a0a]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative ticks">
        {/* Section Header */}
        <ScrollReveal delay={120} duration={700} direction="up">
          <div className="flex flex-wrap justify-between items-baseline gap-4 py-6 border-b border-[#1d1d1d]">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs font-medium tracking-[0.1em] text-[var(--acc)]">02 /</span>
              <h2 className="font-sans font-semibold text-[clamp(1.35rem,2.6vw,1.9rem)] tracking-[0.02em] uppercase text-[#ececec]">
                Selected Work
              </h2>
            </div>
            <span className="font-mono text-[10.5px] tracking-[0.16em] text-[#666666] uppercase text-right">
              05 SYSTEMS · ML INFERENCE · AGENTIC CLI · FULL STACK
            </span>
          </div>
        </ScrollReveal>

        <div className="py-8 sm:py-12 divide-y divide-[#1d1d1d] border-b border-[#1d1d1d]">
          {projects.map((project, index) => {
            const isOpen = !!openIds[project.id];
            return (
              <ScrollReveal key={project.id} delay={index * 90 + 150} duration={700} direction="up">
                <article className="group">
                  <button
                    type="button"
                    onClick={() => toggleProject(project.id)}
                    aria-expanded={isOpen}
                    className="w-full grid grid-cols-[2.5rem_1fr_auto_2rem] sm:grid-cols-[3.2rem_1fr_auto_auto_2rem] gap-3 sm:gap-4 items-center text-left py-5 sm:py-6 cursor-pointer bg-transparent focus:outline-none"
                  >
                    <span className="font-mono text-xs text-[#666666]">{project.idx}</span>
                    <div>
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="font-sans font-semibold text-[clamp(1.05rem,2vw,1.3rem)] text-[#ececec] group-hover:text-[var(--acc)] transition-colors">
                          {project.name}
                        </span>
                        {project.isOss && (
                          <span className="font-mono text-[8.5px] font-bold tracking-[0.14em] text-[var(--acc)] border border-[var(--acc)] px-1.5 py-0.5">
                            OPEN SOURCE
                          </span>
                        )}
                      </div>
                      <span className="block font-mono text-[11px] text-[#666666] tracking-[0.05em] mt-1">
                        {project.tagline}
                      </span>
                    </div>
                    <span className="hidden sm:inline-block font-mono text-[10.5px] text-[#666666] tracking-[0.06em]">
                      {project.tags}
                    </span>
                    <span className="hidden md:inline-block font-mono text-xs text-[#666666]">
                      {project.year}
                    </span>
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-[#2c2c2c] text-[#9c9c9c] group-hover:border-[var(--acc)] group-hover:text-[var(--acc)] transition-all duration-300 ${
                        isOpen ? 'rotate-45 border-[var(--acc)] text-[var(--acc)]' : ''
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-1 pb-8 sm:pl-[3.2rem] pr-2 space-y-4">
                        <p className="max-w-[72ch] text-[#9c9c9c] text-sm sm:text-[0.93rem] leading-[1.7]">
                          {project.summary}
                        </p>

                        {project.architecture && (
                          <div className="p-3 border border-[#222222] bg-[#0e0e0e] font-mono text-[11px] text-[#888888] overflow-x-auto max-w-[72ch]">
                            <span className="text-[var(--acc)] font-bold block mb-1">SYSTEM ARCHITECTURE:</span>
                            <span className="text-[#ececec]">{project.architecture}</span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-6 sm:gap-9 my-5">
                          {project.metrics.map((m, idx) => (
                            <div key={idx}>
                              <b className="block font-mono text-[1.1rem] font-medium text-[var(--acc)]">
                                {m.value}
                              </b>
                              <span className="font-mono text-[9.5px] tracking-[0.12em] text-[#666666] uppercase">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#1a1a1a]">
                          <div className="font-mono text-[10px] tracking-[0.1em] text-[#666666] uppercase">
                            {project.role}
                          </div>

                          <div className="flex items-center gap-3">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-white bg-[#141414] hover:bg-[var(--acc)] hover:text-black border border-[#2c2c2c] hover:border-[var(--acc)] px-3 py-1.5 transition-all"
                              >
                                <Github className="w-3.5 h-3.5" />
                                <span>GITHUB REPO</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-white bg-[#141414] hover:bg-white hover:text-black border border-[#2c2c2c] px-3 py-1.5 transition-all"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>LIVE APP</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
