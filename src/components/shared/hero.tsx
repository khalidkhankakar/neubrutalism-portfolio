'use client'

import React from 'react';
import { ArrowDown, Github, Linkedin, LucideIcon, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface SocialLink {
    icon: LucideIcon;
    href: string;
    label: string;
}

export const Hero: React.FC = () => {
    const socialLinks: SocialLink[] = [
        { icon: Github, href: 'https://github.com/khalidkhankakar/', label: 'GitHub' },
        { icon: Twitter, href: 'https://x.com/KhalidK37931474', label: 'Twitter' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/khalid-khan-kakar1/', label: 'LinkedIn' },
    ];

    return (
        <section id="hero" className="relative px-[var(--page-gutter)] pb-[var(--space-3xl)] pt-[var(--space-2xl)]">
            <div className="editorial-container">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                    className="grid gap-[var(--space-xl)] border-b border-[var(--color-rule)] pb-[var(--space-2xl)] lg:grid-cols-[minmax(0,8fr)_minmax(18rem,4fr)]"
                >
                    <div>
                        <p className="editorial-smallcaps mb-[var(--space-md)] text-[var(--color-accent)]">Full stack developer</p>
                        <h1 className="editorial-display text-[length:var(--text-display)] text-[var(--color-ink)]">
                            Digital products, set with care.
                        </h1>
                    </div>

                    <aside className="flex flex-col justify-end gap-[var(--space-md)] border-t border-[var(--color-rule)] pt-[var(--space-md)] lg:border-l lg:border-t-0 lg:pl-[var(--space-lg)] lg:pt-0">
                        <p className="font-display text-3xl italic leading-tight text-[var(--color-ink)]">
                            Turning chaotic ideas into structured, high-performance web applications.
                        </p>
                        <p className="leading-7 text-[var(--color-ink-2)]">
                            I work where product thinking, frontend craft, and practical engineering meet. React, Next.js, TypeScript, APIs, and the small details that make software feel composed.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/resume/khalid-kakar-resume.pdf" target="_blank" rel="noopener noreferrer" className="editorial-smallcaps border border-[var(--color-ink)] bg-[var(--color-ink)] px-4 py-2 text-[var(--color-paper)] transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]">
                                View resume
                            </Link>
                            <Link href="#contact" className="editorial-smallcaps border border-[var(--color-rule)] px-4 py-2 text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-paper-2)]">
                                Contact
                            </Link>
                        </div>
                        <div className="flex gap-2 pt-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="grid size-10 place-items-center border border-[var(--color-rule)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                                    >
                                        <Icon size={18} />
                                    </Link>
                                );
                            })}
                        </div>
                    </aside>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[var(--color-muted)] md:block"
            >
                <ArrowDown size={28} />
            </motion.div>
        </section>
    );
};
