'use client'
import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { BrutalistButton } from '@/components/ui/brutalist-card';
import { useTheme } from '@/context/theme-context';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Skills', href: '#skills' },
        { name: 'Articles', href: '#articles' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);

        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);

        if (elem) {
            const offset = 100; // Header height + padding
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = elem.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-8 pointer-events-none">
            <div className="max-w-7xl mx-auto flex justify-between items-start">
                {/* Logo */}
                <div className="pointer-events-auto flex items-center gap-4">
                    <a
                        href="#"
                        onClick={(e) => handleScroll(e, '#hero')}
                        className="inline-block bg-white dark:bg-neo-black border-2 border-neo-black dark:border-neo-cream px-3 py-1 font-display text-lg md:xl shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300 text-neo-black dark:text-neo-cream"
                    >
                        DEV<span className="text-neo-pink">.</span>IO
                    </a>
                </div>

                {/* Desktop Menu - Hidden on Tablet (md) and Mobile, Visible on Large (lg) */}
                <div className="hidden lg:flex gap-4 pointer-events-auto items-center">
                    {navLinks.splice(4,6).map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="bg-white dark:bg-neo-black border-2 border-neo-black dark:border-neo-cream px-3 py-1 font-semibold shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-300 text-neo-black dark:text-neo-cream"
                        >
                            {link.name}
                        </a>
                    ))}

                    <button
                        onClick={toggleTheme}
                        className="bg-white dark:bg-neo-black border-[3px] border-neo-black dark:border-neo-cream p-1 shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-300 text-neo-black dark:text-neo-cream group"
                        aria-label="Toggle Theme"
                    >
                        <div className="relative w-6 h-6">
                            <motion.div
                                initial={false}
                                animate={{ rotate: theme === 'light' ? 0 : 180, scale: theme === 'light' ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                {theme === 'light' && <Moon size={24} />}
                            </motion.div>
                            <motion.div
                                initial={false}
                                animate={{ rotate: theme === 'dark' ? 0 : -180, scale: theme === 'dark' ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                {theme === 'dark' && <Sun size={24} />}
                            </motion.div>
                        </div>
                    </button>

                    <BrutalistButton variant="primary" className="py-2 text-base">
                        HIRE ME
                    </BrutalistButton>
                </div>

                {/* Mobile/Tablet Menu Button - Visible on md and smaller */}
                <div className="lg:hidden pointer-events-auto flex gap-2">
                    <button
                        onClick={toggleTheme}
                        className="bg-white dark:bg-neo-black border-[3px] border-neo-black dark:border-neo-cream p-2 shadow-neo active:translate-y-1 active:shadow-none text-neo-black dark:text-neo-cream transition-all duration-300"
                    >
                        {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-neo-yellow border-[3px] border-neo-black dark:border-neo-cream p-2 shadow-neo active:translate-y-1 active:shadow-none text-neo-black transition-all duration-300"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile/Tablet Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scaleY: 0.9 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -20, scaleY: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute top-24 right-4 left-4 bg-white dark:bg-neo-black border-[3px] border-neo-black dark:border-neo-cream shadow-neo-lg p-6 flex flex-col gap-4 lg:hidden pointer-events-auto z-50 origin-top"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleScroll(e, link.href)}
                                className="text-xl font-bold hover:text-neo-pink dark:hover:text-neo-pink border-b-2 border-neo-black dark:border-neo-cream pb-2 text-neo-black dark:text-neo-cream transition-colors duration-200"
                            >
                                {link.name.toUpperCase()}
                            </a>
                        ))}
                        <BrutalistButton onClick={() => setIsOpen(false)} variant="primary" className="w-full mt-2">
                            HIRE ME
                        </BrutalistButton>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};