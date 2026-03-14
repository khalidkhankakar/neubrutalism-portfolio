'use client'
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ObjectId } from 'mongoose'
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
        <div className="max-w-4xl mx-auto">
            <ScrollReveal width="100%">
                <Link href="/blogs" className="inline-flex items-center gap-2 font-bold mb-8 hover:text-neo-pink transition-colors">
                    <ArrowLeft size={20} /> BACK TO BLOG
                </Link>

                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map(tag => (
                            <span key={tag.name} className="flex items-center gap-1 text-sm font-bold uppercase bg-white dark:bg-neo-dark-gray text-neo-black dark:text-neo-cream px-3 py-1 border-2 border-black dark:border-neo-cream rounded-full shadow-neo-sm">
                                <Tag size={14} /> {tag.name}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-display font-black text-neo-black dark:text-neo-cream mb-6 leading-tight">
                        {title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-700 dark:text-gray-300 font-bold mb-8">
                        <div className="flex items-center gap-2">
                            <Calendar size={20} />
                            <span>{formatDate(date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={20} />
                            <span>{calculateReadingTime(content)}</span>
                        </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 p-4 bg-white dark:bg-neo-dark-gray border-[3px] border-black dark:border-neo-cream shadow-neo">
                        <Image
                            src={'/pics/khalid-kakar-1.jpeg'}
                            alt={"khalid kakar"}
                            width={100}
                            height={100}
                            className="w-16 h-16 rounded-full border-2 border-black dark:border-neo-cream object-cover"
                        />
                        <div>
                            <h3 className="font-black text-xl text-neo-black dark:text-neo-cream">Khalid Kakar</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mt-1">Khalid simplifies complex modern web development topics into simple words with expertise in Next.js and React.js.</p>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Featured Image */}
            <ScrollReveal width="100%" delay={0.1}>
                <div className="mb-12 relative group">
                    <div className={`absolute inset-0  border-[3px] border-black dark:border-neo-cream translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 -z-10`}></div>
                    <Image 
                        src={img}
                        width={1200}
                        height={1200}
                        alt={title}
                        className="w-full h-[400px] md:h-[500px] object-cover border-[3px] border-black dark:border-neo-cream bg-white"
                    />
                </div>
            </ScrollReveal>

            {/* Content */}
            <ScrollReveal width="100%" delay={0.2}>
               <div
                className=' prose-lg max-w-none w-full prose-headings:font-title font-default prose mt-4 dark:prose-invert focus:outline-none prose-a:text-neo-pink hover:prose-a:text-neo-purple  text-neo-black dark:text-neo-cream font-medium leading-relaxed'
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
            </ScrollReveal>
        </div>
    )
}

