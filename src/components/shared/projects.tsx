'use client';

import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import { Project } from '@/utils/types';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import Link from 'next/link';
import Image from 'next/image';

const projects: Project[] = [
  {
    id: 1,
    title: "Vision Board",
    description: "A real-time collaborative drawing application that empowers organizations to create and collaborate on drawing boards, much like Figma!",
    tags: ["LiveBlocks", "Nextjs", "TypeScript"],
    imageUrl: "/project/vision-board.png",
    link: "https://github.com/khalidkhankakar/vision-board",
    color: "bg-[var(--color-accent)]"
  },
  {
    id: 2,
    title: "FireGrid",
    description: "A task management and collaboration tool inspired by Trello, with an intuitive Kanban interface for organizing and tracking tasks.",
    tags: ["Nextjs", "TypeScript", "Webpack"],
    imageUrl: "/project/firegird.jpg",
    link: "https://github.com/khalidkhankakar/Fire-Grid",
    color: "bg-[var(--color-accent-2)]"
  },
  {
    id: 3,
    title: "Dev Post",
    description: "A fully-featured Dev Community style platform where developers can create, share, search, and manage articles.",
    tags: ["Nextjs", "Reactjs", "React"],
    imageUrl: "/project/devpost.png",
    link: "https://github.com/khalidkhankakar/devpost",
    color: "bg-[var(--color-paper-3)]"
  }
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="px-[var(--page-gutter)] py-[var(--space-3xl)]">
      <div className="editorial-container">
        <ScrollReveal width="100%">
          <div className="mb-[var(--space-xl)] grid gap-6 border-t border-[var(--color-rule)] pt-[var(--space-lg)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
            <p className="editorial-smallcaps text-[var(--color-accent)]">Selected work</p>
            <h2 className="font-display text-5xl italic leading-none text-[var(--color-ink)] md:text-7xl">
              Projects that show the system in motion.
            </h2>
          </div>
        </ScrollReveal>

        <div className="divide-y divide-[var(--color-rule)] border-y border-[var(--color-rule)]">
          {projects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 0.1} width="100%">
              <article className="grid gap-[var(--space-lg)] py-[var(--space-xl)] lg:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(10rem,3fr)]">
                <Link href={project.link} target="_blank" className="group block overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper-2)]">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={720}
                    height={540}
                    className="aspect-[4/3] h-full w-full object-cover grayscale transition duration-[var(--dur-med)] ease-[var(--ease-out)] group-hover:scale-[1.015] group-hover:grayscale-0"
                  />
                </Link>

                <div className="flex min-w-0 flex-col justify-between gap-6">
                  <div>
                    <p className="editorial-smallcaps mb-3 text-[var(--color-muted)]">Case {String(idx + 1).padStart(2, '0')}</p>
                    <h3 className="font-display text-4xl italic leading-none text-[var(--color-ink)] md:text-5xl">{project.title}</h3>
                    <p className="mt-4 leading-7 text-[var(--color-ink-2)]">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="editorial-smallcaps border border-[var(--color-rule)] px-3 py-1 text-[var(--color-ink)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 lg:flex-col lg:items-end">
                  <Github size={20} className="text-[var(--color-muted)]" />
                  <Link href={project.link} target="_blank" className="editorial-smallcaps inline-flex items-center gap-2 border-b border-[var(--color-ink)] pb-1 text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]">
                    View source <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
