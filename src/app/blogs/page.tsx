import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { BlogCard } from './_components/blog-card';
import { getAllBlogs } from '@/actions/blog.actions';
import { Blog } from '@/utils/types';
import { formatDate } from '@/utils/date';



const page = async () => {

    const allBlogs = await getAllBlogs();

    return (
        <div className="pt-32 pb-24 px-4 md:px-8 min-h-screen bg-neo-cream dark:bg-neo-black">
            <div className="max-w-5xl mx-auto">
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 font-bold mb-8 hover:text-neo-pink transition-colors">
                        <ArrowLeft size={20} /> BACK TO HOME
                    </Link>
                    <h1 className="text-6xl md:text-8xl font-display font-black text-neo-black dark:text-neo-cream drop-shadow-[5px_5px_0px_var(--shadow-color)] mb-6">
                        THE <span className="text-neo-pink">BLOGS</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-bold max-w-2xl text-gray-700 dark:text-gray-300">
                        Thoughts, tutorials, and rants about web development, design, and everything in between.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {allBlogs?.data?.map((blog: Blog, idx: number) => (
                        <BlogCard
                            id={idx}
                            slug={blog.slug}
                            title={blog.title}
                            date={formatDate(blog.createdAt)}
                            snippet={blog.description}
                            tags={blog.tags}
                            key={blog._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};


export default page;