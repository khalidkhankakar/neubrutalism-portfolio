'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface BlogInteractiveBarProps {
  title: string;
}

export function BlogInteractiveBar({ title }: BlogInteractiveBarProps) {
  const { copyToClipboard } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = (totalScroll / windowHeight) * 100;
        setScrollProgress(Number(scroll.toFixed(2)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    if (typeof window !== 'undefined') {
      await copyToClipboard(window.location.href, 'Article link copied to clipboard!');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="sticky top-16 z-30 bg-[#0c0c0c]/90 backdrop-blur-md border-b border-[#1c1c1c] transition-all">
      {/* Reading Progress Line */}
      <div
        className="h-[2px] bg-[var(--acc)] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 text-xs font-mono">
        <Link
          href="/blogs"
          className="flex items-center gap-1.5 text-[#888888] hover:text-[var(--acc)] transition-colors shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">BACK TO ESSAYS</span>
          <span className="sm:hidden">ESSAYS</span>
        </Link>

        {/* Truncated Active Title on Mobile/Desktop */}
        <span className="text-[#666666] truncate max-w-xs sm:max-w-md hidden md:inline">
          {title}
        </span>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[11px] text-[#666666] hidden sm:inline">
            PROGRESS: <b className="text-[var(--acc)] font-bold">{Math.round(scrollProgress)}%</b>
          </span>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] hover:border-[var(--acc)] text-[#ececec] transition-colors cursor-pointer"
            title="Copy article link"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[var(--green)]" />
                <span className="text-[var(--green)] text-[10px]">LINK COPIED</span>
              </>
            ) : (
              <>
                <Share2 className="w-3 h-3" />
                <span className="text-[10px]">SHARE</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
