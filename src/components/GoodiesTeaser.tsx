'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Database, GitBranch, Radio, Sparkles, ArrowRight } from 'lucide-react';

export function GoodiesTeaser() {
  const tools = [
    {
      icon: Layers,
      title: 'Multi-Model Tokenizer',
      desc: 'Visual token parser for GPT-4o, Llama-3, BERT, and raw UTF-8 byte streams.',
      href: '/goodies#tokenizer',
    },
    {
      icon: Database,
      title: 'PostgreSQL Terminal ($ psql)',
      desc: 'Interactive SQL console to query project tables, schema definitions & metrics.',
      href: '/goodies#psql',
    },
    {
      icon: GitBranch,
      title: 'Visual Git Commit Graph',
      desc: 'Interactive branch DAG to explore engineering milestones & unified diffs.',
      href: '/goodies#git-graph',
    },
    {
      icon: Radio,
      title: 'Loss Audio Synthesizer',
      desc: 'Acoustic Web Audio harmonic synthesizer for gradient descent convergence curves.',
      href: '/goodies#synth',
    },
  ];

  return (
    <section className="py-16 border-b border-[#1d1d1d] bg-[#0c0c0c]/60">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#1d1d1d] bg-[#0e0e0e] p-6 lg:p-10 ticks">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1d1d1d]">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#2c2c2c] bg-[#121212] px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-[var(--acc)] mb-3">
                <Sparkles className="w-3 h-3 text-[var(--acc)]" />
                INTERACTIVE PLAYGROUND
              </div>
              <h2 className="font-mono text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                ML Engineering <span className="text-[var(--acc)]">Goodies</span> & Tools
              </h2>
              <p className="font-mono text-xs sm:text-sm text-[#9c9c9c] max-w-xl mt-1.5">
                Explore interactive token visualizers, fake psql terminals, visual Git commit trees, and convergence audio synths.
              </p>
            </div>

            <Link
              href="/goodies"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs font-bold bg-[var(--acc)] text-black hover:bg-white transition-colors self-start md:self-auto cursor-pointer"
            >
              <span>ENTER GOODIES PLAYGROUND</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.title}
                  href={t.href}
                  className="group p-4 border border-[#1d1d1d] bg-[#121212] hover:border-[var(--acc)] hover:bg-[#161616] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-7 h-7 border border-[#2c2c2c] group-hover:border-[var(--acc)] flex items-center justify-center text-[var(--acc)] mb-3 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="font-mono text-xs font-bold text-white group-hover:text-[var(--acc)] transition-colors">
                      {t.title}
                    </h3>
                    <p className="font-mono text-[11px] text-[#9c9c9c] mt-1.5 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-1 font-mono text-[10px] text-[#666666] group-hover:text-white transition-colors">
                    <span>LAUNCH TOOL</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
