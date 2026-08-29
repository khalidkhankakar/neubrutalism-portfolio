import Link from 'next/link';
import { HeaderNav } from '@/components/HeaderNav';
import { ContactFooter } from '@/components/ContactFooter';
import { getAllBlogs } from '@/actions/blog.actions';
import { BlogsListClient } from '@/components/BlogsListClient';
import { ArrowLeft,  Terminal } from 'lucide-react';
import { Metadata } from 'next';
import { formatDate } from '@/utils/date';
import { Blog } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Engineering Writing & AI Systems Notes — Khalid Khan',
  description:
    'Technical deep-dives on machine learning pipelines, FastAPI model serving, agentic coding systems, and full-stack software engineering by Khalid Khan.',
};

export default async function BlogsPage() {
  const result = await getAllBlogs();
  const blogs = result?.data || [];

  const transformedBlogs = blogs.map((blog: Blog, idx: number) => {
    const tagList: string[] = [];
    if (Array.isArray(blog.tags)) {
      blog.tags.forEach((t) => {
        if (typeof t === 'string') tagList.push(t);
        else if (t && typeof t === 'object' && 'name' in t) tagList.push((t as { name: string }).name);
      });
    }

    return {
      id: blog._id || `blog-${idx}`,
      slug: blog.slug,
      title: blog.title,
      description: blog.description,
      summary: blog.description,
      date: formatDate(blog.createdAt),
      readTime: blog.readTime || '5 min read',
      author: blog.author ? { name: blog.author } : { name: 'Khalid Khan' },
      tags: tagList.length > 0 ? tagList : ['ENGINEERING', 'SYSTEMS'],
      coverImage: blog.image || null,
    };
  });

  const bio = {
    name: 'Khalid Khan',
    role: 'AI Software Engineer | ML Engineer',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ececec] flex flex-col font-sans selection:bg-[var(--acc)] selection:text-black">
      <HeaderNav />

      <main className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1d1d1d] pb-6 text-[11px] font-mono tracking-[0.12em] text-[#9c9c9c] uppercase">
          <div className="flex items-center gap-2">
            <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--acc)]">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>KhalidKakar.pro</span>
            </Link>
            <span className="text-[#444444]">/</span>
            <span className="text-[var(--acc)]">Blogs</span>
          </div>

          <div className="flex items-center gap-3 text-[#666666]">
            <span className="inline-flex items-center gap-1.5">
              <Terminal className="h-3 w-3 text-[var(--acc)]" />
              {blogs.length} entries
            </span>
          </div>
        </div>

        <header className="border-b border-[#1d1d1d] py-8 sm:py-12">
          <p className="mb-4 font-mono text-[11px] tracking-[0.18em] text-[var(--acc)] uppercase">
            Writing archive
          </p>

          <h1 className="max-w-4xl text-4xl font-normal leading-none tracking-[-0.04em] text-white sm:text-5xl lg:text-[4rem]">
            Engineering <span className="text-[var(--acc)]">notes</span> for product builders.
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-[#9c9c9c] sm:text-lg">
            Practical write-ups on product thinking, machine learning systems, backend engineering, and the software patterns that keep modern teams moving.
          </p>
        </header>

        <BlogsListClient initialBlogs={transformedBlogs} bio={bio} />
      </main>

      <ContactFooter />
    </div>
  );
}