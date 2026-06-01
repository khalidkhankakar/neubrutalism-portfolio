'use client'
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { ObjectId } from 'mongoose'
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { calculateReadingTime } from '@/utils/constant';
import { formatDate } from '@/utils/date';

interface Props {
    tags:{ _id:ObjectId,name:string}[],
    title: string
    date: string
    img: string
    content: string
}

export const BlogDetail = ({ tags,
    title,
    date,
    img,
    content,}: Props) => {
    return (
        <article className="editorial-container">
            <ScrollReveal width="100%">
                <Link href="/blogs" className="editorial-smallcaps mb-8 inline-flex items-center gap-2 text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]">
                    <ArrowLeft size={18} /> Back to blog
                </Link>

                <header className="mb-[var(--space-xl)] border-b border-[var(--color-rule)] pb-[var(--space-xl)]">
                    <div className="mb-6 flex flex-wrap gap-x-3 gap-y-2">
                        {tags.map(tag => (
                            <span key={tag.name} className="editorial-smallcaps inline-flex items-center gap-1 text-[var(--color-muted)]">
                                <Tag size={12} /> {tag.name}
                            </span>
                        ))}
                    </div>

                    <h1 className="editorial-display max-w-5xl text-[length:var(--text-display-s)] italic text-[var(--color-ink)]">
                        {title}
                    </h1>

                    <div className="editorial-smallcaps mt-8 flex flex-wrap items-center gap-6 text-[var(--color-muted)]">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{formatDate(date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{calculateReadingTime(content)}</span>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-4 border-y border-[var(--color-rule)] py-4">
                        <Image
                            src={'/pics/khalid-kakar-1.jpeg'}
                            alt={"khalid kakar"}
                            width={100}
                            height={100}
                            className="size-16 border border-[var(--color-rule)] object-cover grayscale"
                        />
                        <div>
                            <h3 className="font-display text-2xl italic leading-none text-[var(--color-ink)]">Khalid Kakar</h3>
                            <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--color-ink-2)]">Khalid simplifies complex modern web development topics into simple words with expertise in Next.js and React.js.</p>
                        </div>
                    </div>
                </header>
            </ScrollReveal>

            <ScrollReveal width="100%" delay={0.1}>
                <figure className="mb-[var(--space-xl)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-3">
                    <Image
                        src={img}
                        width={1200}
                        height={720}
                        alt={title}
                        className="h-[320px] w-full object-cover grayscale md:h-[520px]"
                    />
                    <figcaption className="editorial-smallcaps mt-3 text-[var(--color-muted)]">Featured image</figcaption>
                </figure>
            </ScrollReveal>

            <ScrollReveal width="100%" delay={0.2}>
               <div
                className='editorial-prose prose prose-lg mx-auto mt-4 w-full max-w-[72ch] focus:outline-none prose-headings:font-normal prose-pre:rounded-none'
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            </ScrollReveal>
        </article>
    )
}

