'use client'
import { ArrowUpRight, Tag } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import Link from 'next/link';
import { BrutalistCard } from '@/components/ui/brutalist-card';

interface Props {
    id: number
    title: string,
    slug: string,
    date: string
    snippet: string
    tags: { _id: string; name: string }[];
}

export const BlogCard = ({ slug, date, id, snippet, tags, title}: Props) => {
    return (
        <ScrollReveal key={id} width="100%" delay={id * 0.1} direction="up">
            <div className="group relative h-full">
                {/* Background Shadow Block */}
                <div className={`absolute inset-0  border-[3px] border-black dark:border-neo-cream translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6`}></div>

                <BrutalistCard className="bg-white dark:bg-neo-black hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all duration-300 h-full flex flex-col">
                    <div className="flex flex-col h-full">

                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <span key={tag.name} className="flex items-center gap-1 text-xs font-bold uppercase bg-gray-100 dark:bg-neo-dark-gray text-neo-black dark:text-neo-cream px-2 py-1 border border-black dark:border-neo-cream rounded-full">
                                        <Tag size={12} /> {tag.name}
                                    </span>
                                ))}
                            </div>

                        </div>

                        {/* Content */}
                        <div className="flex-1 mb-6">
                            <h3 className="text-2xl md:text-3xl font-black font-display mb-4 group-hover:text-neo-purple transition-colors text-neo-black dark:text-neo-cream leading-tight">
                                {title}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 font-bold leading-relaxed">
                                {snippet}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-end mt-auto pt-6 border-t-[3px] border-black dark:border-neo-cream border-dashed">
                            <div className="font-bold text-lg">
                                {date}
                            </div>
                            <Link href={`/blogs/${slug}`} className="w-12 h-12 bg-neo-yellow border-[3px] border-black dark:border-neo-cream flex items-center justify-center shadow-neo group-hover:shadow-neo-lg group-hover:bg-neo-pink group-hover:text-white transition-all text-neo-black">
                                <ArrowUpRight size={24} strokeWidth={3} />
                            </Link>
                        </div>

                    </div>
                </BrutalistCard>
            </div>
        </ScrollReveal>
    )
}

