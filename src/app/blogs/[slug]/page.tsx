import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { BlogDetail } from '../_components/blog-detail';
import Link from 'next/link';
import { getBlog } from '@/actions/blog.actions';

const page = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

const { slug } = await params
 const blog = await getBlog(slug);


  if (!blog) {
    return (
      <div className="editorial-shell flex min-h-screen items-center justify-center px-[var(--page-gutter)]">
        <div className="max-w-xl text-center">
          <h1 className="font-display text-5xl italic leading-none text-[var(--color-ink)] md:text-7xl">Post not found.</h1>
          <Link href="/blogs" className="editorial-smallcaps mt-8 inline-flex items-center gap-2 text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]">
            <ArrowLeft size={18} /> Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="editorial-shell min-h-screen px-[var(--page-gutter)] py-[var(--space-3xl)]">
        <BlogDetail
        title={blog.title}
        content={blog.content}
        tags={blog.tags}
        img={blog.image}
        date={blog.createdAt}
        />
    </div>
  );
};


export default page;
