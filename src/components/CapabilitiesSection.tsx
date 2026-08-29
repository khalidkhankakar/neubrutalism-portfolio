/* Hallmark · macrostructure: Edit Grid · tone: technical · anchor hue: amber */
'use client';

import React from 'react';
import { Server, Database, Gauge, Layers, FlaskConical, GitBranch } from 'lucide-react';
import { Capability } from '@/lib/types';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

interface CapabilitiesProps {
  capabilities: Capability[];
}

const iconMap = {
  Server: Server,
  Database: Database,
  Gauge: Gauge,
  Layers: Layers,
  FlaskConical: FlaskConical,
  GitBranch: GitBranch,
};

export function CapabilitiesSection({ capabilities }: CapabilitiesProps) {
  return (
    <section id="caps" className="border-t border-[#1d1d1d] bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <ScrollReveal delay={120} duration={700} direction="up">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#1d1d1d] py-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-[var(--acc)] uppercase">
                01 /
              </span>
              <h2 className="font-sans text-[clamp(1.5rem,2.7vw,2rem)] font-semibold tracking-[-0.04em] text-[#ececec]">
                Capabilities
              </h2>
            </div>

            <p className="max-w-xl text-right font-mono text-[10px] tracking-[0.14em] text-[#666666] uppercase">
              systems, models, and product work
            </p>
          </div>
        </ScrollReveal>

        <div className="py-10 sm:py-14">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((cap, index) => {
              const IconComponent = iconMap[cap.iconName] || Server;

              return (
                <ScrollReveal
                  key={cap.id}
                  delay={index * 70 + 140}
                  duration={700}
                  direction="up"
                  className="h-full"
                >
                  <article className="group h-full border border-[#1d1d1d] bg-[#0d0d0d] p-5 transition-all duration-250 ease-out hover:-translate-y-1 hover:border-[#2b2b2b] hover:bg-[#101010] sm:p-6">
                    <div className="flex items-center justify-between border-b border-[#1d1d1d] pb-4">
                      <span className="font-mono text-[10px] tracking-[0.14em] text-[#666666] uppercase">
                        {cap.idx}
                      </span>

                      <div className="flex h-9 w-9 items-center justify-center border border-[#262626] bg-[#111111] text-[#cfcfcf] transition-colors duration-250 group-hover:border-[var(--acc)]/40 group-hover:text-[var(--acc)]">
                        <IconComponent className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <h3 className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[#f0f0f0] uppercase">
                        {cap.title}
                      </h3>

                      <p className="text-sm leading-6 text-[#9a9a9a]">
                        {cap.description}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-[#1d1d1d] pt-3">
                      <span className="font-mono text-[9px] tracking-[0.12em] text-[#666666] uppercase transition-colors duration-250 group-hover:text-[var(--acc)]">
                        {cap.footer}
                      </span>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
