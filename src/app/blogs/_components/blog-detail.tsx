'use client';

import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { ObjectId } from 'mongoose';
import { calculateReadingTime } from '@/utils/constant';
import { formatDate } from '@/utils/date';
import { BlogMarkdownRenderer } from '@/components/BlogMarkdownRenderer';

interface Props {
  tags: { _id: ObjectId; name: string }[];
  title: string;
  date: string;
  img: string;
  content: string;
  description?: string;
  author?: string;
}

export const BlogDetail = ({
  tags,
  title,
  date,
  img,
  content,
  description,
  author = 'Khalid Kakar',
}: Props) => {
  return (
    <article className="mx-auto max-w-5xl">
      <Link
        href="/blogs"
        className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#9c9c9c] transition-colors hover:text-[var(--acc)]"
      >
        <ArrowLeft size={16} />
        Back to essays
      </Link>

      <header className="border-b border-[#1d1d1d] pb-8 sm:pb-10">
        <div className="mb-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.name}
              className="inline-flex items-center gap-1.5 border border-[#2c2c2c] bg-[#121212] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#b3b3b3]"
            >
              <Tag size={10} className="text-[var(--acc)]" />
              {tag.name}
            </span>
          ))}
        </div>

        <h1 className="max-w-4xl text-4xl font-normal leading-none tracking-[-0.04em] text-white sm:text-5xl lg:text-[4rem]">
          {title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] font-mono uppercase tracking-[0.12em] text-[#9c9c9c]">
          <div className="inline-flex items-center gap-2">
            <Calendar size={14} className="text-[var(--acc)]" />
            <span>{formatDate(date)}</span>
          </div>
          <span className="text-[#444444]">/</span>
          <div className="inline-flex items-center gap-2">
            <Clock size={14} className="text-[var(--acc)]" />
            <span>{calculateReadingTime(content)}</span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4 border-y border-[#1d1d1d] py-5">
          <Image
            src="/pics/khalid-kakar-1.jpeg"
            alt="Khalid Kakar"
            width={72}
            height={72}
            className="h-16 w-16 rounded-full border border-[#2c2c2c] object-cover grayscale"
          />

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#666666]">Author</p>
            <h3 className="mt-1 text-2xl font-normal leading-none text-white">{author}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9c9c9c]">
              {description ||
                'Khalid writes about software systems, product thinking, and the engineering decisions behind modern web products.'}
            </p>
          </div>
        </div>
      </header>

      <figure className="my-8 overflow-hidden border border-[#1d1d1d] bg-[#111111]">
        <Image
          src={img}
          width={1200}
          height={760}
          alt={title}
          className="h-[260px] w-full object-cover grayscale sm:h-[420px]"
        />
        <figcaption className="border-t border-[#1d1d1d] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#666666]">
          Feature image
        </figcaption>
      </figure>

      <article className="border-t border-[#1d1d1d] pt-8 sm:pt-10">
        {content ? (
          <BlogMarkdownRenderer content={content} />
        ) : (
          <p className="text-[#888888] italic">No content available for this post.</p>
        )}
      </article>
    </article>
  );
};


