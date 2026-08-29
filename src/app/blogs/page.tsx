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
  
  // Transform blogs to match Article interface
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
      {/* Top Navbar */}
      <HeaderNav />

      {/* Main Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb & Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1d1d1d] text-xs font-mono">
          <div className="flex items-center gap-2 text-[#9c9c9c]">
            <Link
              href="/"
              className="hover:text-[var(--acc)] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>KHALIDKAKAR.PRO</span>
            </Link>
            <span className="text-[#444444]">/</span>
            <span className="text-[var(--acc)] font-bold">BLOGS</span>
          </div>

          <div className="flex items-center gap-4 text-[#666666] tracking-wider text-[11px]">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-[var(--acc)]" />
              <span>REPORTS_PUBLISHED: {blogs.length}</span>
            </span>
            <span className="hidden sm:inline text-[#333333]">|</span>
            <span className="hidden sm:inline">FORMAT: MARKDOWN + CODE</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="py-8 sm:py-12 border-b border-[#1d1d1d] relative ticks">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-medium tracking-[0.1em] text-[var(--acc)]">
              06.1 / ARCHIVES
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border border-[#2c2c2c] bg-[#121212] text-[#9c9c9c]">
              TECHNICAL ESSAYS & RESEARCH NOTES
            </span>
          </div>

          <h1 className="font-sans font-extrabold text-[clamp(2rem,4vw,3.2rem)] tracking-[-0.02em] uppercase text-white leading-tight">
            Engineering <span className="text-[var(--acc)]">Writing</span> & Systems Notes
          </h1>

          <p className="mt-4 text-[#9c9c9c] max-w-[75ch] text-base sm:text-lg leading-relaxed">
            Practical breakdowns on Machine Learning workflows, FastAPI microservices, agentic coding architectures, real-time collaboration, and full-stack software engineering.
          </p>
        </div>

        {/* Client-side Search, Tag Filter, and Blog Grid */}
        <BlogsListClient initialBlogs={transformedBlogs} bio={bio} />
      </main>

      {/* Footer */}
      <ContactFooter />
    </div>
  );
}