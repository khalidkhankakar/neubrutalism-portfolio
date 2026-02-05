'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Camera } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import Image from 'next/image';

const images = [
    {
        id: 1,
        src: "/pics/img1.jfif",
        alt: "Workspace Setup",
        caption: "CHAOS STATION",
        rotation: -3,
        color: "bg-neo-pink"
    },
    {
        id: 2,
        src: "/pics/img1.jfif",
        alt: "Design Sketch",
        caption: "BRAINSTORMING",
        rotation: 2,
        color: "bg-neo-yellow"
    },
    {
        id: 3,
        src: "/pics/img1.jfif",
        alt: "Code Snippet",
        caption: "LATE NIGHTS",
        rotation: -1,
        color: "bg-neo-blue"
    },
    {
        id: 4,
        src: "/pics/img1.jfif",
        alt: "Conference",
        caption: "IN THE WILD",
        rotation: 4,
        color: "bg-neo-mint"
    },
    {
        id: 5,
        src: "/pics/img1.jfif",
        alt: "Coffee Art",
        caption: "FUEL",
        rotation: -2,
        color: "bg-neo-purple"
    },
    {
        id: 6,
        src: "/pics/img1.jfif",
        alt: "Coffee Art",
        caption: "FUEL",
        rotation: -2,
        color: "bg-neo-purple"
    }
];

export const Gallery: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const selectedImage = images.find(img => img.id === selectedId);

    return (
        <section id="gallery" className="py-24 px-4 md:px-8 bg-white dark:bg-neo-black border-t-[4px] border-neo-black dark:border-neo-cream overflow-hidden relative transition-colors duration-300">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-20 left-10 w-32 h-32 border-4 border-neo-black dark:border-neo-cream rounded-full border-dashed animate-spin-slow"></div>
                <div className="absolute bottom-40 right-10 w-64 h-64 bg-neo-yellow rotate-12 -z-10"></div>
            </div>

            <div className="max-w-7xl mx-auto">
                <ScrollReveal width="100%">
                    <div className="text-center mb-20 relative">
                        <div className="inline-block relative">
                            <span className="absolute -top-6 -right-6 text-neo-pink transform rotate-12">
                                <Camera size={48} strokeWidth={2.5} />
                            </span>
                            <h2 className="text-6xl md:text-8xl font-display font-black text-neo-black dark:text-neo-cream relative z-10">
                                VISUAL <br className="md:hidden" /> DUMP
                            </h2>
                            <div className="absolute -bottom-2 left-0 w-full h-6 bg-neo-mint -z-0 transform -rotate-2"></div>
                        </div>
                        <p className="mt-8 text-xl font-bold max-w-2xl mx-auto border-2 border-neo-black dark:border-neo-cream p-4 shadow-neo bg-white dark:bg-neo-dark-gray text-neo-black dark:text-neo-cream rotate-1">
                            A collection of pixels, memories, and things that look cool.
                            <span className="block text-sm text-gray-500 dark:text-gray-400 mt-2 font-mono">  CLICK TO EXPAND</span>
                        </p>
                    </div>
                </ScrollReveal>

                <div className="flex justify-center flex-wrap gap-12">
                    {images.map((img, index) => (
                        <ScrollReveal key={img.id} delay={index * 0.1} width="fit-content">
                            <motion.div
                                key={img.id}
                                layoutId={`container-${img.id}`}
                                onClick={() => setSelectedId(img.id)}
                                className={`
                    relative cursor-pointer group
                    w-64 h-64
                    md:w-96 md:h-96
                `}
                                initial={{ rotate: img.rotation }}
                                whileHover={{ scale: 1.02, rotate: 0, zIndex: 10 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {/* Back Shadow Block */}
                                <div
                                    className={`absolute inset-0 ${img.color} border-[3px] border-black dark:border-neo-cream translate-x-3 translate-y-3 transition-transform group-hover:translate-x-5 group-hover:translate-y-5`}
                                ></div>

                                {/* Main Card */}
                                <div className="absolute inset-0 bg-white dark:bg-neo-black border-[2px] border-black dark:border-neo-cream p-3 flex flex-col shadow-sm">
                                    <div className="relative flex-1 overflow-hidden border-2 border-black dark:border-neo-cream bg-gray-100">
                                        <motion.img
                                            layoutId={`img-${img.id}`}
                                            src={img.src}
                                            alt={img.alt}
                                            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div className="bg-white border-2 border-black p-2 rounded-full shadow-neo transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                                <Maximize2 size={24} className="text-black" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Caption */}
                                    <div className="mt-3 text-center relative">
                                        <span className="font-display font-black text-xl tracking-wider uppercase bg-transparent z-10 relative text-neo-black dark:text-neo-cream">
                                            {img.caption}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedId && selectedImage && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-neo-black/90 backdrop-blur-sm cursor-zoom-out"
                        />

                        <motion.div
                            layoutId={`container-${selectedImage.id}`}
                            className="relative w-full max-w-4xl bg-white dark:bg-neo-black border-4 border-neo-black dark:border-neo-cream p-4 md:p-6 shadow-neo-xl z-10 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4 border-b-4 border-neo-black dark:border-neo-cream pb-2">
                                <h3 className="text-3xl font-black font-display text-neo-black dark:text-neo-cream">{selectedImage.caption}</h3>
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="bg-neo-pink text-white border-2 border-black p-1 hover:bg-black transition-colors cursor-pointer"
                                >
                                    <X size={32} />
                                </button>
                            </div>

                            <div className="relative aspect-video border-[3px] border-black dark:border-neo-cream overflow-hidden bg-gray-100">
                                <motion.img
                                    layoutId={`img-${selectedImage.id}`}
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <div className="flex gap-2">
                                    <span className="bg-neo-yellow border-2 border-black px-3 py-1 font-bold text-sm text-black">#PHOTOGRAPHY</span>
                                    <span className="bg-neo-mint border-2 border-black px-3 py-1 font-bold text-sm text-black">#VISUALS</span>
                                </div>
                                <span className="font-mono font-bold text-gray-500 dark:text-gray-400">ID: {selectedImage.id}</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};