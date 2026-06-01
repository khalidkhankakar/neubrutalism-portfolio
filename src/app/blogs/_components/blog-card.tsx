'use client'
import { ArrowUpRight, Tag } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import Link from 'next/link';

interface Props {
    id: number
    title: string,
    slug: string,
    date: string
    snippet: string
    tags: { _id: string; name: string }[];
}

export const BlogCard = ({ slug, date, id, snippet, tags, title }: Props) => {
    return (
        <ScrollReveal key={id} width="100%" delay={id * 0.08} direction="up">
            <article className="group grid gap-5 py-7 md:grid-cols-[7rem_minmax(0,1fr)_3rem] md:items-start">
                <time className="font-display text-4xl italic leading-none text-[var(--color-accent)] md:text-5xl">
                    {date}
                </time>

                <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap gap-x-3 gap-y-2">
                        {tags.map(tag => (
                            <span key={tag._id ?? tag.name} className="editorial-smallcaps inline-flex items-center gap-1 text-[var(--color-muted)]">
                                <Tag size={12} /> {tag.name}
                            </span>
                        ))}
                    </div>

                    <h2 className="font-display text-3xl italic leading-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] md:text-5xl">
                        {title}
                    </h2>
                    <p className="mt-3 max-w-2xl leading-7 text-[var(--color-ink-2)]">
                        {snippet}
                    </p>
                </div>

                <Link href={`/blogs/${slug}`} className="grid size-11 place-items-center border border-[var(--color-rule)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]" aria-label={`Read ${title}`}>
                    <ArrowUpRight size={20} />
                </Link>
            </article>
        </ScrollReveal>
    )
}

