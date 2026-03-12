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
      <div className="min-h-screen flex items-center justify-center bg-neo-cream dark:bg-neo-black">
        <div className="text-center">
          <h1 className="text-4xl font-black font-display mb-4">Post Not Found</h1>
          <Link href="/blog" className="inline-flex items-center gap-2 font-bold hover:text-neo-pink transition-colors">
            <ArrowLeft size={20} /> BACK TO BLOG
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 min-h-screen bg-neo-cream dark:bg-neo-black">
        <BlogDetail
        title={blog.title}
        content={blog.content}
        tags={blog.tags}
        img={blog.image}
        // color={'bg-neo-dark-gray'}
        date={blog.createdAt}
        // readTime='2 Min'        
        />
    </div>
  );
};


export default page;