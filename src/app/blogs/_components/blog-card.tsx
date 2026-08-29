'use client'
import { ArrowUpRight, Tag } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import Link from 'next/link';

interface Props {
  id: number;
  title: string;
  slug: string;
  date: string;
  snippet: string;
  tags: { _id: string; name: string }[];
}

export const BlogCard = ({ slug, date, id, snippet, tags, title }: Props) => {
  return (
    <ScrollReveal key={id} delay={id * 0.08} direction="up" className="w-full">
      <article className="group border-b border-[#1d1d1d] py-6 transition-colors hover:bg-[#0d0d0d] sm:py-7">
        <div className="grid gap-5 md:grid-cols-[120px_minmax(0,1fr)_48px] md:items-start">
          <time className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#666666] md:pt-2">
            {date}
          </time>

          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag._id ?? tag.name}
                  className="inline-flex items-center gap-1.5 border border-[#2c2c2c] bg-[#121212] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#b3b3b3]"
                >
                  <Tag size={10} className="text-[var(--acc)]" />
                  {tag.name}
                </span>
              ))}
            </div>

            <h2 className="max-w-3xl text-2xl font-normal leading-tight text-white transition-colors group-hover:text-[var(--acc)] sm:text-3xl">
              {title}
            </h2>

            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#9c9c9c]">{snippet}</p>
          </div>

          <div className="flex justify-end md:pt-2">
            <Link
              href={`/blogs/${slug}`}
              className="grid size-11 place-items-center border border-[#2c2c2c] bg-[#0e0e0e] text-[#ececec] transition-colors hover:border-[var(--acc)] hover:text-[var(--acc)]"
              aria-label={`Read ${title}`}
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
};

