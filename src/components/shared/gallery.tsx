'use client'

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const images = [
    { id: 1, src: "/pics/khalid-kakar-1.jpeg", alt: "Khalid kakar", caption: "Seriously Cool" },
    { id: 2, src: "/pics/khalid-kakar-2.jpeg", alt: "Khalid kakar", caption: "Just Playing Around" },
    { id: 3, src: "/pics/khalid-kakar-3.jpeg", alt: "Khalid kakar", caption: "Enjoying the Party" },
    { id: 4, src: "/pics/khalid-kakar-4.jpeg", alt: "Khalid kakar", caption: "In The Wild" },
    { id: 5, src: "/pics/khalid-kakar-5.jpeg", alt: "Khalid kakar", caption: "Vibe Check" },
    { id: 6, src: "/pics/khalid-kakar-6.jpeg", alt: "Khalid kakar", caption: "With Flowers" }
];

export const Gallery: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedImage = images.find(img => img.id === selectedId);

    return (
        <section id="gallery" className="px-[var(--page-gutter)] py-[var(--space-3xl)]">
            <div className="editorial-container">
                <ScrollReveal width="100%">
                    <div className="mb-[var(--space-xl)] grid gap-6 border-t border-[var(--color-rule)] pt-[var(--space-lg)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
                        <p className="editorial-smallcaps text-[var(--color-accent)]">Gallery</p>
                        <div>
                            <h2 className="font-display text-5xl italic leading-none text-[var(--color-ink)] md:text-7xl">
                                A small visual appendix.
                            </h2>
                            <p className="mt-5 max-w-2xl leading-7 text-[var(--color-ink-2)]">
                                A collection of pixels, memories, and field notes from outside the editor.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 gap-[var(--space-md)] sm:grid-cols-2 lg:grid-cols-3">
                    {images.map((img, index) => (
                        <ScrollReveal key={img.id} delay={index * 0.06} width="100%">
                            <motion.button
                                type="button"
                                layoutId={`container-${img.id}`}
                                onClick={() => setSelectedId(img.id)}
                                className="group w-full border border-[var(--color-rule)] bg-[var(--color-paper)] p-3 text-left transition-colors hover:border-[var(--color-ink)]"
                                whileHover={{ y: -3 }}
                                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="relative block overflow-hidden bg-[var(--color-paper-2)]">
                                    <motion.img
                                        layoutId={`img-${img.id}`}
                                        src={img.src}
                                        alt={img.alt}
                                        className="aspect-[4/5] w-full object-cover grayscale transition duration-[var(--dur-med)] ease-[var(--ease-out)] group-hover:scale-[1.015] group-hover:grayscale-0"
                                    />
                                    <span className="absolute right-3 top-3 grid size-9 place-items-center border border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink)] opacity-0 transition-opacity group-hover:opacity-100">
                                        <Maximize2 size={16} />
                                    </span>
                                </span>
                                <span className="editorial-smallcaps mt-3 block text-[var(--color-muted)]">{img.caption}</span>
                            </motion.button>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedId && selectedImage && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <motion.button
                            type="button"
                            aria-label="Close gallery"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-[color-mix(in_oklch,var(--color-ink)_86%,transparent)]"
                        />

                        <motion.figure
                            layoutId={`container-${selectedImage.id}`}
                            className="relative z-10 w-full max-w-4xl border border-[var(--color-rule)] bg-[var(--color-paper)] p-3"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute right-3 top-3 z-20 grid size-10 place-items-center border border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink)] hover:border-[var(--color-ink)]"
                                aria-label="Close image"
                            >
                                <X size={20} />
                            </button>
                            <motion.img
                                layoutId={`img-${selectedImage.id}`}
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="max-h-[78vh] w-full object-contain"
                            />
                            <figcaption className="editorial-smallcaps mt-3 text-[var(--color-muted)]">{selectedImage.caption}</figcaption>
                        </motion.figure>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
