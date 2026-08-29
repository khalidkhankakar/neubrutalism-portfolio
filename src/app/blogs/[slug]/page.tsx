import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { BlogDetail } from '../_components/blog-detail';
import { BlogInteractiveBar } from '@/components/BlogInteractiveBar';
import Link from 'next/link';
import { getBlog } from '@/actions/blog.actions';
import { HeaderNav } from '@/components/HeaderNav';
import { ContactFooter } from '@/components/ContactFooter';
import { formatDate } from '@/utils/date';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog || !blog.title) {
      return {
        title: 'Essay Not Found — Khalid Khan',
        description: 'The requested engineering essay could not be found.',
      };
    }

    return {
      title: `${blog.title} — Khalid Khan`,
      description: blog.description || 'Read this engineering essay by Khalid Khan',
      openGraph: {
        title: `${blog.title} — Khalid Khan`,
        description: blog.description || 'Engineering breakdown by Khalid Khan',
        images: blog.image ? [{ url: blog.image }] : [],
      },
    };
  } catch {
    return {
      title: 'Engineering Essay — Khalid Khan',
      description: 'Read technical writing by Khalid Khan.',
    };
  }
}

const BlogSlugPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  let blog: any = null;
  try {
    blog = await getBlog(slug);
  } catch (error) {
    console.error(`Failed to fetch blog with slug: ${slug}`, error);
    blog = null;
  }

  if (!blog || !blog.title) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#ececec] flex flex-col font-sans">
        <HeaderNav />
        <main className="flex-1 flex items-center justify-center max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-xl text-center space-y-6">
            <div>
              <span className="font-mono text-xs text-[var(--acc)] tracking-widest uppercase">
                404 // NOT_FOUND
              </span>
              <h1 className="font-sans font-extrabold text-[clamp(2rem,4vw,3.2rem)] tracking-[-0.02em] uppercase text-white leading-tight mt-2">
                Essay <span className="text-[var(--acc)]">Not</span> Found
              </h1>
            </div>

            <p className="text-[#9c9c9c] text-base sm:text-lg leading-relaxed">
              The article you&apos;re looking for doesn&apos;t exist or has been moved. Try exploring the archive.
            </p>

            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-black bg-[var(--acc)] hover:bg-white px-4 py-2.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO ESSAYS ARCHIVE</span>
            </Link>
          </div>
        </main>
        <ContactFooter />
      </div>
    );
  }

  // Ensure tags is always an array of { _id, name } or strings
  const tags = Array.isArray(blog.tags)
    ? blog.tags
    : typeof blog.tags === 'string'
    ? blog.tags.split('·').map((t: string, i: number) => ({ _id: `tag-${i}`, name: t.trim() }))
    : [];

  const formattedDate = formatDate(blog.createdAt || new Date().toISOString());

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ececec] flex flex-col font-sans selection:bg-[var(--acc)] selection:text-black">
      {/* Top Navbar */}
      <HeaderNav />

      {/* Floating Interactive Reading Bar */}
      <BlogInteractiveBar title={blog.title} />

      {/* Main Container */}
      <main className="flex-1 max-w-[1080px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Blog Detail Component */}
        <BlogDetail
          title={blog.title}
          content={blog.content}
          tags={tags}
          img={blog.image}
          date={formattedDate}
          description={blog.description}
          author={blog.author || 'Khalid Khan'}
        />
      </main>

      {/* Footer */}
      <ContactFooter />
    </div>
  );
};

export default BlogSlugPage;