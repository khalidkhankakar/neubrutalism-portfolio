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
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <ScrollReveal delay={120} duration={700} direction="up">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#1d1d1d] py-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-[var(--acc)] uppercase">
                02 /
              </span>
              <h2 className="font-sans text-[clamp(1.5rem,2.7vw,2rem)] font-semibold tracking-[-0.04em] text-[#ececec]">
                Selected Work
              </h2>
            </div>
            <p className="max-w-xl text-right font-mono text-[10px] tracking-[0.14em] text-[#666666] uppercase">
              systems · ml · product · tooling
            </p>
          </div>
        </ScrollReveal>

        <div className="divide-y divide-[#1d1d1d] border-b border-[#1d1d1d] py-8 sm:py-12">
          {projects.map((project, index) => {
            const isOpen = !!openIds[project.id];
            return (
              <ScrollReveal key={project.id} delay={index * 90 + 150} duration={700} direction="up">
                <article className="group">
                  <button
                    type="button"
                    onClick={() => toggleProject(project.id)}
                    aria-expanded={isOpen}
                    className="grid w-full cursor-pointer grid-cols-[2.5rem_1fr_auto_2rem] items-center gap-3 bg-transparent py-5 text-left focus:outline-none sm:grid-cols-[3.2rem_1fr_auto_auto_2rem] sm:gap-4 sm:py-6"
                  >
                    <span className="font-mono text-xs text-[#666666]">{project.idx}</span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-sans text-[clamp(1.05rem,2vw,1.3rem)] font-semibold text-[#ececec] transition-colors group-hover:text-[var(--acc)]">
                          {project.name}
                        </span>
                        {project.isOss && (
                          <span className="border border-[var(--acc)] px-1.5 py-0.5 font-mono text-[8.5px] font-bold tracking-[0.14em] text-[var(--acc)]">
                            OSS
                          </span>
                        )}
                      </div>
                      <span className="mt-1 block font-mono text-[11px] tracking-[0.05em] text-[#666666]">
                        {project.tagline}
                      </span>
                    </div>
                    <span className="hidden font-mono text-[10.5px] tracking-[0.06em] text-[#666666] sm:inline-block">
                      {project.tags}
                    </span>
                    <span className="hidden font-mono text-xs text-[#666666] md:inline-block">{project.year}</span>
                    <div
                      className={`flex h-7 w-7 items-center justify-center border border-[#2c2c2c] text-[#9c9c9c] transition-all duration-300 group-hover:border-[var(--acc)] group-hover:text-[var(--acc)] sm:h-8 sm:w-8 ${
                        isOpen ? 'rotate-45 border-[var(--acc)] text-[var(--acc)]' : ''
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </div>
                  </button>

                  <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="space-y-4 pb-8 pr-2 pt-1 sm:pl-[3.2rem]">
                        <p className="max-w-[72ch] text-sm leading-[1.7] text-[#9c9c9c] sm:text-[0.93rem]">
                          {project.summary}
                        </p>

                        {project.architecture && (
                          <div className="max-w-[72ch] overflow-x-auto border border-[#222222] bg-[#0e0e0e] p-3 font-mono text-[11px] text-[#888888]">
                            <span className="mb-1 block font-bold text-[var(--acc)]">SYSTEM:</span>
                            <span className="text-[#ececec]">{project.architecture}</span>
                          </div>
                        )}

                        <div className="my-5 flex flex-wrap gap-6 sm:gap-9">
                          {project.metrics.map((m, idx) => (
                            <div key={idx}>
                              <b className="block font-mono text-[1.1rem] font-medium text-[var(--acc)]">{m.value}</b>
                              <span className="font-mono text-[9.5px] tracking-[0.12em] text-[#666666] uppercase">
                                {m.label}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#1a1a1a] pt-2">
                          <div className="font-mono text-[10px] tracking-[0.1em] text-[#666666] uppercase">
                            {project.role}
                          </div>

                          <div className="flex items-center gap-3">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 border border-[#2c2c2c] bg-[#141414] px-3 py-1.5 font-mono text-[11px] font-bold text-white transition-all hover:border-[var(--acc)] hover:bg-[var(--acc)] hover:text-black"
                              >
                                <Github className="h-3.5 w-3.5" />
                                <span>GITHUB</span>
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 border border-[#2c2c2c] bg-[#141414] px-3 py-1.5 font-mono text-[11px] font-bold text-white transition-all hover:bg-white hover:text-black"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                                <span>LIVE</span>
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
