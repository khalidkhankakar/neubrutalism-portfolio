'use client';
import React from 'react';
import { BrutalistCard, BrutalistButton } from '@/components/ui/brutalist-card';
import { ArrowUpRight, Tag } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import Link from 'next/link';

// TODO: fetch articals form
const articles = [
  {
    id: 1,    
    title: "Next.Js Server Actions",
    slug:"next.js-server-actions",
    date: "MAR 24",
    snippet: "You will explore in this blog that what is Next.js server actions and how they work with pratical examples",
    tags: ["Nextjs", "Javascript", "ReactJs"],
    color: "bg-neo-yellow"
  },
  {
    id: 2,
    title: "5 useful Typescript tips and tricks",
    slug:"5-useful-typescript-tips-and-tricks",
    date: "MAR 20",
    snippet: "Learn more about the typescript such as generics, as const keyword, destructing array and object in typescript and more.",
    tags: ["React", "Typescript"],
    color: "bg-neo-mint"
  },
  {
    id: 3,
    title: "Common Utility Types of TypeScript",
    date: "MAR 25",
    slug:"common-utility-types-of-typescript",
    snippet: "Learn about the TypeScript Utility Types How they modify other types and make life easior for generate the other types.",
    tags: ["Typescript"],
    color: "bg-neo-pink"
  }
];

export const Articles: React.FC = () => {
  return (
    <section id="articles" className="py-24 px-4 md:px-8 bg-neo-purple relative border-t-4 border-neo-black dark:border-neo-cream">
      {/* Background Decor */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-white border-[3px] border-black rounded-full shadow-neo animate-bounce-slow opacity-20"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollReveal width="100%">
          <div className="flex flex-col  justify-between mb-16 gap-6">
            <div>
              <span className="inline-block bg-neo-mint border-[3px] border-neo-black dark:border-neo-cream px-4 py-1 font-bold shadow-neo mb-4 transform -rotate-1 text-neo-black">
                READ MY MIND
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white dark:text-black drop-shadow-[3px_3px_0px_var(--shadow-color)]">
                LATEST <br/> THOUGHTS
              </h2>
            </div>
            
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {articles.map((article, index) => (
            <ScrollReveal key={article.id} width="100%" delay={index * 0.1} direction="left">
              <div className="group relative">
                {/* Background Shadow Block */}
                <div className={`absolute inset-0 ${article.color}   dark:border-neo-cream translate-x-1 translate-y-1 md:translate-x-3 md:translate-y-3 -z-10 transition-transform group-hover:translate-x-4 group-hover:translate-y-4`}></div>
                
                <BrutalistCard className="bg-white dark:bg-neo-black hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col md:flex-row gap-6 md:items-center">
                    
                    {/* Date Block */}
                    <div className="shrink-0 flex md:flex-col items-center justify-center bg-neo-black dark:bg-neo-cream text-white dark:text-neo-black p-4 w-full md:w-24 border-2 border-black dark:border-neo-cream gap-2 md:gap-0">
                      <span className="text-3xl md:text-sm font-bold opacity-80">{article.date.split(' ')[0]}</span>
                      <span className="text-3xl font-black">{article.date.split(' ')[1]}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                         {article.tags.map(tag => (
                           <span key={tag} className="flex items-center gap-1 text-xs font-bold uppercase bg-gray-100 dark:bg-neo-dark-gray text-neo-black dark:text-neo-cream px-2 py-1 border border-black dark:border-neo-cream rounded-full">
                             <Tag size={12} /> {tag}
                           </span>
                         ))}
                      </div>
                      <h3 className="text-lg md:text-xl font-black font-display mb-2 group-hover:text-neo-purple transition-colors text-neo-black dark:text-neo-cream">
                        {article.title}
                      </h3>
                      <p className="text-gray-700 text-sm dark:text-gray-300 font-semibold leading-relaxed">
                        {article.snippet}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="shrink-0">
                      <Link href={`/blogs/${article.slug}`} className="w-full md:w-12 h-12 bg-neo-yellow border-[3px] border-black dark:border-neo-cream flex items-center justify-center shadow-neo group-hover:shadow-neo-lg group-hover:bg-neo-pink group-hover:text-white transition-all text-neo-black">
                        <ArrowUpRight size={24} strokeWidth={3} />
                      </Link>
                    </div>

                  </div>
                </BrutalistCard>
              </div>
            </ScrollReveal>
          ))}
        </div>
        
        <div className="mt-12 ">
          <Link href={'/blogs'} className='cursor-pointer'>
            <BrutalistButton variant="secondary" className="w-full">
              VIEW ALL POSTS
            </BrutalistButton>
          </Link>
        </div>
      </div>
    </section>
  );
};