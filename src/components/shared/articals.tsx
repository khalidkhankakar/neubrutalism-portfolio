'use client';

import React from 'react';
import { ArrowUpRight, Tag } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import Link from 'next/link';

const articles = [
  {
    id: 1,
    title: "Next.Js Server Actions",
    slug: "next.js-server-actions",
    date: "MAR 24",
    snippet: "Explore what Next.js server actions are and how they work with practical examples.",
    tags: ["Nextjs", "Javascript", "ReactJs"],
  },
  {
    id: 2,
    title: "5 useful Typescript tips and tricks",
    slug: "5-useful-typescript-tips-and-tricks",
    date: "MAR 20",
    snippet: "Learn about generics, the as const keyword, destructuring arrays and objects in TypeScript, and more.",
    tags: ["React", "Typescript"],
  },
  {
    id: 3,
    title: "Common Utility Types of TypeScript",
    date: "MAR 25",
    slug: "common-utility-types-of-typescript",
    snippet: "Learn how TypeScript utility types modify other types and make it easier to generate new shapes.",
    tags: ["Typescript"],
  }
];

export const Articles: React.FC = () => {
  return (
    <section id="articles" className="px-[var(--page-gutter)] py-[var(--space-3xl)]">
      <div className="editorial-container">
        <ScrollReveal width="100%">
          <div className="mb-[var(--space-xl)] grid gap-6 border-t border-[var(--color-rule)] pt-[var(--space-lg)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <p className="editorial-smallcaps text-[var(--color-accent)]">Letters</p>
            <h2 className="font-display text-5xl italic leading-none text-[var(--color-ink)] md:text-7xl">
              Notes from the workbench.
            </h2>
          </div>
        </ScrollReveal>

        <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
          {articles.map((article, index) => (
            <ScrollReveal key={article.id} width="100%" delay={index * 0.08} direction="left">
              <article className="grid gap-5 py-7 md:grid-cols-[7rem_minmax(0,1fr)_3rem] md:items-center">
                <time className="font-display text-4xl italic text-[var(--color-accent)]">{article.date}</time>
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {article.tags.map(tag => (
                      <span key={tag} className="editorial-smallcaps inline-flex items-center gap-1 text-[var(--color-muted)]">
                        <Tag size={12} /> {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-3xl italic leading-tight text-[var(--color-ink)] md:text-4xl">
                    {article.title}
                  </h3>
                  <p className="mt-2 max-w-2xl leading-7 text-[var(--color-ink-2)]">
                    {article.snippet}
                  </p>
                </div>
                <Link href={`/blogs/${article.slug}`} className="grid size-11 place-items-center border border-[var(--color-rule)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]" aria-label={`Read ${article.title}`}>
                  <ArrowUpRight size={20} />
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <Link href="/blogs" className="editorial-smallcaps mt-[var(--space-lg)] inline-flex items-center gap-2 border-b border-[var(--color-ink)] pb-1 text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
          View all posts <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
};
