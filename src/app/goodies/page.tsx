import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Terminal, Database, GitBranch, Layers, Radio } from 'lucide-react';
import { getPortfolioData } from '@/lib/data';
import { HeaderNav } from '@/components/HeaderNav';
import { TokenVisualizer } from '@/components/goodies/TokenVisualizer';
import { PostgresTerminal } from '@/components/goodies/PostgresTerminal';
import { GitGraphVisualizer } from '@/components/goodies/GitGraphVisualizer';
import { LossAudioSynth } from '@/components/goodies/LossAudioSynth';
import { ContactFooter } from '@/components/ContactFooter';

export const metadata: Metadata = {
  title: 'ML Engineering Goodies & Interactive Sandbox — Alex Chen',
  description:
    'Interactive tools for ML engineers: Multi-model Tokenizer visualizer, interactive PostgreSQL ($ psql) terminal, visual Git commit graph with project milestones, and gradient descent audio sonification.',
  openGraph: {
    title: 'ML Engineering Goodies & Interactive Sandbox — Alex Chen',
    description:
      'Interactive tools for ML engineers: Tokenizer visualizer, psql database terminal, visual Git graph milestones, and loss audio synthesizer.',
  },
};

export default async function GoodiesPage() {
  const data = await getPortfolioData();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ececec] selection:bg-[var(--acc)] selection:text-black">
      <HeaderNav />
      <main>
        {/* Top Banner / Breadcrumb */}
        <section className="border-b border-[#1d1d1d] bg-[#0c0c0c] py-8 lg:py-12">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 font-mono text-xs text-[#666666] mb-4">
              <Link
                href="/"
                className="hover:text-[var(--acc)] flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>RETURN TO PORTFOLIO</span>
              </Link>
              <span>/</span>
              <span className="text-[var(--acc)]">GOODIES.DIR</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 border border-[#2c2c2c] bg-[#121212] px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-[var(--acc)] mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--acc)] animate-ping" />
                  INTERACTIVE ML PLAYGROUND & ENGINEERING TOYS
                </div>
                <h1 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white uppercase">
                  ENGINEERING <span className="text-[var(--acc)]">GOODIES</span> & SANDBOX
                </h1>
                <p className="font-mono text-xs sm:text-sm text-[#9c9c9c] max-w-2xl mt-2 leading-relaxed">
                  Interactive multi-model token visualizers, fake PostgreSQL database terminals ($ psql), interactive Git commit graphs with milestone reveals, and loss curve acoustic sonification.
                </p>
              </div>

              {/* Quick stats badge */}
              <div className="flex items-center gap-4 font-mono text-xs border border-[#1d1d1d] bg-[#121212] p-3 text-[#666666]">
                <div>
                  <span className="text-[10px] block">MODULES</span>
                  <b className="text-white">4 TOOLS</b>
                </div>
                <div className="w-[1px] h-6 bg-[#222222]" />
                <div>
                  <span className="text-[10px] block">RUNTIME</span>
                  <b className="text-[var(--green)]">CLIENT-SIDE</b>
                </div>
                <div className="w-[1px] h-6 bg-[#222222]" />
                <div>
                  <span className="text-[10px] block">STATUS</span>
                  <b className="text-[var(--acc)]">ONLINE</b>
                </div>
              </div>
            </div>

            {/* Quick jump anchor bar */}
            <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-[#1d1d1d] font-mono text-[11px]">
              <a
                href="#tokenizer"
                className="px-3 py-1 bg-[#121212] border border-[#1d1d1d] text-[#9c9c9c] hover:border-[var(--acc)] hover:text-white transition-colors"
              >
                #01 TOKEN VISUALIZER
              </a>
              <a
                href="#psql"
                className="px-3 py-1 bg-[#121212] border border-[#1d1d1d] text-[#9c9c9c] hover:border-[var(--acc)] hover:text-white transition-colors"
              >
                #02 POSTGRES TERMINAL ($ PSQL)
              </a>
              <a
                href="#git-graph"
                className="px-3 py-1 bg-[#121212] border border-[#1d1d1d] text-[#9c9c9c] hover:border-[var(--acc)] hover:text-white transition-colors"
              >
                #03 GIT COMMIT GRAPH
              </a>
              <a
                href="#synth"
                className="px-3 py-1 bg-[#121212] border border-[#1d1d1d] text-[#9c9c9c] hover:border-[var(--acc)] hover:text-white transition-colors"
              >
                #04 AUDIO SONIFICATION
              </a>
            </div>
          </div>
        </section>

        {/* Main Goodies Content Section */}
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Tool 01: Token Visualizer */}
          <section id="tokenizer" className="scroll-mt-20">
            <div className="flex items-center gap-2 font-mono text-xs text-[#666666] mb-3 uppercase tracking-wider">
              <span>TOOL 01 // SUBWORD TOKENIZATION ENGINE</span>
            </div>
            <TokenVisualizer />
          </section>

          {/* Tool 02: Postgres Terminal */}
          <section id="psql" className="scroll-mt-20">
            <div className="flex items-center gap-2 font-mono text-xs text-[#666666] mb-3 uppercase tracking-wider">
              <span>TOOL 02 // RELATIONAL DATABASE SHELL</span>
            </div>
            <PostgresTerminal />
          </section>

          {/* Tool 03: Git Graph Visualizer */}
          <section id="git-graph" className="scroll-mt-20">
            <div className="flex items-center gap-2 font-mono text-xs text-[#666666] mb-3 uppercase tracking-wider">
              <span>TOOL 03 // VERSION CONTROL COMMIT DAG</span>
            </div>
            <GitGraphVisualizer />
          </section>

          {/* Tool 04: Audio Sonification */}
          <section id="synth" className="scroll-mt-20">
            <div className="flex items-center gap-2 font-mono text-xs text-[#666666] mb-3 uppercase tracking-wider">
              <span>TOOL 04 // CONVERGENCE ACOUSTICS</span>
            </div>
            <LossAudioSynth />
          </section>
        </div>
      </main>

      {/* Footer */}
      <ContactFooter bio={data.bio} />
    </div>
  );
}
