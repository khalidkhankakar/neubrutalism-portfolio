'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Copy, ArrowUpRight, FileDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PortfolioData } from '@/lib/types';
import { portfolioData } from '@/lib/data';

interface ContactFooterProps {
  bio?: PortfolioData['bio'];
}

export function ContactFooter({ bio = portfolioData.bio }: ContactFooterProps) {
  const { copyToClipboard, openCV } = useApp();
  const [localTime, setLocalTime] = useState<string>('ISLAMABAD — --:--:-- PKT');

  useEffect(() => {
    const updateTime = () => {
      try {
        const fmt = new Intl.DateTimeFormat('en-PK', {
          timeZone: 'Asia/Karachi',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setLocalTime(`ISLAMABAD — ${fmt.format(new Date())} PKT`);
      } catch {
        setLocalTime('ISLAMABAD — PKT');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const links = [
    { label: 'GITHUB', href: bio.github },
    { label: 'LINKEDIN', href: bio.linkedin },
    { label: 'X / TWITTER', href: bio.twitter },
    { label: 'PORTFOLIO', href: bio.portfolioUrl },
  ];

  const techCredits = [
    'PYTHON',
    'PYTORCH',
    'FASTAPI',
    'NEXT.JS',
    'TYPESCRIPT',
    'SCIKIT-LEARN',
    'DRIZZLE ORM',
    'POSTGRESQL',
    'BUN',
  ];

  return (
    <footer id="contact" className="border-t border-[#1d1d1d] bg-[#0a0a0a]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative ticks">
        {/* Contact CTA */}
        <div className="pt-16 pb-6">
          <span className="font-mono text-xs font-medium tracking-[0.1em] text-[var(--acc)]">07 /</span>
          <h2 className="font-sans font-bold text-[clamp(2rem,5vw,4.2rem)] leading-[1.05] tracking-[-0.02em] text-[#ececec] max-w-[20ch] mt-3">
            Let&apos;s build <span className="text-[var(--acc)]">intelligent</span> systems together.
          </h2>
          <p className="max-w-[62ch] text-[#9c9c9c] text-base leading-[1.7] mt-5">
            Looking for AI Software Engineering, ML Engineering, or Full Stack development roles and impactful collaborations. Reach out directly via email or phone.
          </p>

          {/* Contact Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[780px] mt-8">
            {/* Email action card */}
            <div className="flex items-center gap-3.5 border border-[#1d1d1d] hover:border-[#2c2c2c] p-4 sm:px-5 sm:py-4 bg-[#0a0a0a] transition-colors">
              <Mail className="w-4 h-4 text-[var(--acc)] shrink-0" />
              <b className="font-mono text-xs sm:text-sm font-medium tracking-[0.02em] text-[#ececec] truncate">
                {bio.email}
              </b>
              <button
                id="copyEmail"
                onClick={() => copyToClipboard(bio.email, `Copied email: ${bio.email}`)}
                className="ml-auto inline-flex items-center gap-1.5 border border-[#2c2c2c] px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.12em] text-[#9c9c9c] hover:border-[var(--acc)] hover:text-[var(--acc)] transition-colors cursor-pointer shrink-0"
              >
                <Copy className="w-3 h-3" />
                COPY
              </button>
            </div>

            {/* Phone action card */}
            <div className="flex items-center gap-3.5 border border-[#1d1d1d] hover:border-[#2c2c2c] p-4 sm:px-5 sm:py-4 bg-[#0a0a0a] transition-colors">
              <Phone className="w-4 h-4 text-[var(--green)] shrink-0" />
              <b className="font-mono text-xs sm:text-sm font-medium tracking-[0.02em] text-[#ececec] truncate">
                {bio.phone}
              </b>
              <button
                id="copyPhone"
                onClick={() => copyToClipboard(bio.phone, `Copied phone: ${bio.phone}`)}
                className="ml-auto inline-flex items-center gap-1.5 border border-[#2c2c2c] px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.12em] text-[#9c9c9c] hover:border-[var(--green)] hover:text-[var(--green)] transition-colors cursor-pointer shrink-0"
              >
                <Copy className="w-3 h-3" />
                COPY
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3.5 mt-5">
            <a
              href={`mailto:${bio.email}`}
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.12em] px-5 py-3.5 bg-[var(--acc)] text-black border border-[var(--acc)] hover:bg-[#ececec] hover:border-[#ececec] transition-colors"
            >
              OPEN MAIL APP <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              id="cvBtn3"
              onClick={openCV}
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.12em] px-5 py-3.5 bg-transparent text-[#ececec] border border-[#2c2c2c] hover:border-[var(--acc)] hover:text-[var(--acc)] transition-colors cursor-pointer"
            >
              OPEN CV <FileDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Social / External Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#1d1d1d] border border-[#1d1d1d] mt-12">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#0a0a0a] flex items-center justify-between p-4 sm:p-5 font-mono text-[11px] font-medium tracking-[0.16em] text-[#9c9c9c] hover:text-[var(--acc)] hover:bg-[#0e0e0e] transition-all"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#666666] group-hover:text-[var(--acc)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          ))}
        </div>

        {/* Built with credits */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-6 border-b border-[#1d1d1d] mt-10">
          <span className="font-mono text-[9.5px] tracking-[0.18em] text-[#666666]">BUILT WITH</span>
          {techCredits.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] font-medium tracking-[0.14em] text-[#666666] hover:text-[#ececec] transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom copyright and live clock */}
        <div className="flex flex-wrap justify-between items-center gap-3 py-6 font-mono text-[10px] tracking-[0.12em] text-[#666666]">
          <span>© 2026 KHALID KHAN · AI SOFTWARE ENGINEER</span>
          <span className="text-[#9c9c9c] tabular-nums">{localTime}</span>
        </div>
      </div>
    </footer>
  );
}
