import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { BlogCard } from './_components/blog-card';
import { getAllBlogs } from '@/actions/blog.actions';
import { Blog } from '@/utils/types';
import { formatDate } from '@/utils/date';



const page = async () => {

    const allBlogs = await getAllBlogs();

    return (
        <div className="editorial-shell min-h-screen px-[var(--page-gutter)] py-[var(--space-3xl)]">
            <div className="editorial-container">
                <div className="mb-[var(--space-xl)] border-b border-[var(--color-rule)] pb-[var(--space-xl)]">
                    <Link href="/" className="editorial-smallcaps mb-8 inline-flex items-center gap-2 text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]">
                        <ArrowLeft size={18} /> Back to home
                    </Link>
                    <h1 className="editorial-display max-w-4xl text-[length:var(--text-display-s)] italic text-[var(--color-ink)]">
                        Notes from the workbench.
                    </h1>
                    <p className="mt-6 max-w-2xl font-display text-2xl italic leading-tight text-[var(--color-ink)] md:text-3xl">
                        Thoughts, tutorials, and field notes about web development, design, and the choices behind the interface.
                    </p>
                </div>

                <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
                    {allBlogs?.data?.map((blog: Blog, idx: number) => (
                        <BlogCard
                            id={idx}
                            slug={blog.slug}
                            title={blog.title}
                            date={formatDate(blog.createdAt)}
                            snippet={blog.description}
                            tags={blog.tags ?? []}
                            key={blog._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};


export default page;
