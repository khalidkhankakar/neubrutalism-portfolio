'use client'

import React, { useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navLinks = [
        { name: 'Index', href: '/#about' },
        { name: 'Blogs', href: '/blogs' },
        { name: 'Projects', href: '/#projects' },
        { name: 'Contact', href: '/#contact' },
    ];

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);

        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);

        if (elem) {
            const elementPosition = elem.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: elementPosition - 120,
                behavior: 'smooth'
            });
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-[color-mix(in_oklch,var(--color-paper)_92%,transparent)] px-[var(--page-gutter)] pt-3 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl border-b border-[var(--color-rule)] pb-3 text-center">
                <div className="editorial-smallcaps flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[var(--color-muted)]">
                    <span>No. 01</span>
                    <span aria-hidden="true">/</span>
                    <span>Portfolio Edition</span>
                    <span aria-hidden="true">/</span>
                    <span>Asia/Karachi</span>
                </div>

                <Link
                    href="/"
                    className="editorial-display mt-1 block text-4xl italic text-[var(--color-ink)] md:text-6xl"
                >
                    Khalid Khan Kakar
                </Link>

                <div className="mt-3 hidden items-center justify-center gap-8 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={link.href.startsWith('/#') ? (e) => handleScroll(e, link.href.replace('/', '')) : undefined}
                            className="editorial-smallcaps text-[var(--color-ink)] underline decoration-transparent underline-offset-4 transition-colors hover:text-[var(--color-accent)] hover:decoration-current"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <button
                        onClick={toggleTheme}
                        className="border border-[var(--color-rule)] p-2 text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-paper-2)]"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <Link href="/resume/khalid-kakar-resume.pdf" target="_blank" rel="noopener noreferrer" className="editorial-smallcaps border border-[var(--color-ink)] bg-[var(--color-ink)] px-4 py-2 text-[var(--color-paper)] transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]">
                        Resume
                    </Link>
                </div>

                <div className="mt-3 flex justify-center gap-2 lg:hidden">
                    <button
                        onClick={toggleTheme}
                        className="border border-[var(--color-rule)] p-2 text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-2 text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)]"
                        aria-label="Open navigation"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-[var(--page-gutter)] right-[var(--page-gutter)] top-full z-50 flex flex-col gap-1 border border-[var(--color-rule)] bg-[var(--color-paper)] p-4 lg:hidden"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={link.href.startsWith('/#') ? (e) => handleScroll(e, link.href.replace('/', '')) : () => setIsOpen(false)}
                                className="border-b border-[var(--color-rule)] py-3 font-display text-2xl italic text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/resume/khalid-kakar-resume.pdf" target="_blank" rel="noopener noreferrer" className="editorial-smallcaps mt-2 bg-[var(--color-ink)] px-4 py-3 text-center text-[var(--color-paper)]" onClick={() => setIsOpen(false)}>
                            Resume
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
