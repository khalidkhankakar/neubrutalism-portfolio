'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, ArrowRight, BookOpen, Terminal } from 'lucide-react';
import { Article } from '@/lib/types';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

interface WritingProps {
  articles: Article[];
}

export function WritingSection({ articles }: WritingProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
    if (articles.length > 0) {
      return { [articles[0].id]: true };
    }
    return {};
  });

  const togglePost = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatTags = (tags: string | string[] | undefined): string => {
    if (!tags) return 'ENGINEERING';
    if (Array.isArray(tags)) {
      return tags.map((t) => (typeof t === 'string' ? t : (t as { name?: string })?.name || '')).filter(Boolean).join(' · ');
    }
    return tags;
  };

  return (
    <section id="writing" className="border-t border-[#1d1d1d] bg-[#0a0a0a]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative ticks">
        {/* Section Header */}
        <ScrollReveal delay={120} duration={700} direction="up">
          <div className="flex flex-wrap justify-between items-baseline gap-4 py-6 border-b border-[#1d1d1d]">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs font-medium tracking-[0.1em] text-[var(--acc)]">06 /</span>
              <h2 className="font-sans font-semibold text-[clamp(1.35rem,2.6vw,1.9rem)] tracking-[0.02em] uppercase text-[#ececec]">
                Writing & Systems Notes
              </h2>
            </div>
            <Link
              href="/blogs"
              className="font-mono text-[10.5px] tracking-[0.16em] text-[#9c9c9c] hover:text-[var(--acc)] uppercase flex items-center gap-1.5 transition-colors"
            >
              <span>VIEW ALL ESSAYS ({articles.length})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Posts List */}
        {articles.length === 0 ? (
          <div className="py-12 text-center font-mono text-xs text-[#666666] border-b border-[#1d1d1d]">
            <Terminal className="w-4 h-4 text-[var(--acc)] mx-auto mb-2" />
            <span>NO_ARTICLES_FOUND — CHECK BACK SHORTLY</span>
          </div>
        ) : (
          <div className="py-8 sm:py-12 divide-y divide-[#1d1d1d] border-b border-[#1d1d1d]">
            {articles.map((post, index) => {
              const isOpen = !!openIds[post.id];
              const tagString = formatTags(post.tags);

              return (
                <ScrollReveal key={post.id} delay={index * 90 + 180} duration={700} direction="up">
                  <article className="group">
                    <button
                      type="button"
                      onClick={() => togglePost(post.id)}
                      aria-expanded={isOpen}
                      className="w-full grid grid-cols-[1fr_auto_2rem] sm:grid-cols-[120px_1fr_auto_2rem] gap-3 sm:gap-4 items-center text-left py-4 sm:py-5 cursor-pointer bg-transparent focus:outline-none"
                    >
                      <span className="col-span-full sm:col-span-1 font-mono text-[11px] text-[#666666] tracking-[0.08em]">
                        {post.date}
                      </span>
                      <span className="font-sans font-medium text-[clamp(0.98rem,1.8vw,1.18rem)] text-[#ececec] group-hover:text-[var(--acc)] transition-colors">
                        {post.title}
                      </span>
                      <span className="font-mono text-[10.5px] text-[#666666] whitespace-nowrap">
                        {post.readTime}
                      </span>
                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center border border-[#2c2c2c] text-[#9c9c9c] group-hover:border-[var(--acc)] group-hover:text-[var(--acc)] transition-all duration-300 ${
                          isOpen ? 'rotate-45 border-[var(--acc)] text-[var(--acc)]' : ''
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-1 pb-7 sm:pl-[calc(120px+1rem)] pr-2 space-y-4">
                          <p className="max-w-[68ch] text-[#9c9c9c] text-sm sm:text-[0.92rem] leading-[1.7]">
                            {post.description || post.summary}
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                            <p className="font-mono text-[10px] tracking-[0.1em] text-[#666666]">
                              TOPIC — <b className="text-[var(--acc)] font-medium">{tagString}</b>
                            </p>

                            <Link
                              href={`/blogs/${post.slug || post.id}`}
                              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-white bg-[#141414] hover:bg-[var(--acc)] hover:text-black border border-[#2c2c2c] hover:border-[var(--acc)] px-3 py-1.5 transition-all"
                            >
                              <BookOpen className="w-3 h-3" />
                              <span>READ FULL ESSAY</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* Bottom CTA to /blogs */}
        <div className="py-6 flex justify-center sm:justify-end">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#ececec] hover:text-[var(--acc)] border border-[#222222] hover:border-[var(--acc)] px-4 py-2 bg-[#0e0e0e] transition-colors"
          >
            <span>EXPLORE ALL TECHNICAL ESSAYS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
