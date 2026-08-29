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
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative ticks">
        {/* Section Header */}
        <ScrollReveal delay={120} duration={700} direction="up">
          <div className="flex flex-wrap justify-between items-baseline gap-4 py-6 border-b border-[#1d1d1d]">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs font-medium tracking-[0.1em] text-[var(--acc)]">01 /</span>
              <h2 className="font-sans font-semibold text-[clamp(1.35rem,2.6vw,1.9rem)] tracking-[0.02em] uppercase text-[#ececec]">
                Capabilities
              </h2>
            </div>
            <span className="font-mono text-[10.5px] tracking-[0.16em] text-[#666666] uppercase text-right">
              WHAT I ACTUALLY DO — ALL DAY, EVERY DAY
            </span>
          </div>
        </ScrollReveal>

        <div className="py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[#1d1d1d] border border-[#1d1d1d]">
            {capabilities.map((cap, index) => {
              const IconComponent = iconMap[cap.iconName] || Server;
              return (
                <ScrollReveal
                  key={cap.id}
                  delay={index * 80 + 180}
                  duration={700}
                  direction="up"
                  className="h-full"
                >
                  <div className="group h-full bg-[#0a0a0a] p-6 sm:p-7 flex flex-col justify-between min-h-[228px] hover:bg-[#0e0e0e] transition-colors duration-250">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[11px] text-[#666666]">{cap.idx}</span>
                        <IconComponent className="w-5 h-5 text-[#9c9c9c] group-hover:text-[var(--acc)] transition-colors duration-250" />
                      </div>
                      <h3 className="font-mono font-bold text-[12.5px] tracking-[0.1em] text-[#ececec]">
                        {cap.title}
                      </h3>
                      <p className="text-[#9c9c9c] text-sm leading-[1.65]">
                        {cap.description}
                      </p>
                    </div>
                    <div className="font-mono text-[9.5px] tracking-[0.12em] text-[#666666] border-t border-[#1d1d1d] pt-3 mt-4 group-hover:text-[var(--acc)] transition-colors duration-250">
                      {cap.footer}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
