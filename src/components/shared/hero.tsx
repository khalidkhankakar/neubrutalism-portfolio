'use client'
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, Twitter, Linkedin } from 'lucide-react';
import { BrutalistButton } from '@/components/ui/brutalist-card';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { left, top, width, height } = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section id="hero" className="min-h-screen pt-32 pb-20 px-4 md:px-8 flex items-center justify-center relative overflow-hidden bg-neo-cream dark:bg-neo-black transition-colors duration-300">
            {/* Background Decor */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-20 left-10 w-16 h-16 bg-neo-yellow border-[3px] border-neo-black dark:border-neo-cream rounded-full shadow-neo animate-float z-0"
            ></motion.div>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-40 right-10 w-24 h-24 bg-neo-purple border-[3px] border-neo-black dark:border-neo-cream transform rotate-12 shadow-neo animate-float-delayed -z-0"
            ></motion.div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10" ref={containerRef}>

                {/* Left Content */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-block bg-neo-mint border-[3px] border-neo-black dark:border-neo-cream px-4 py-1 font-bold shadow-neo-sm transform -rotate-2 text-neo-black"
                    >
                        FULL STACK DEVELOPER
                    </motion.div>

                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-display font-black leading-tight text-neo-black dark:text-neo-cream drop-shadow-sm"
                    >
                        I BUILD <br />
                        <span className="text-neo-pink relative inline-block">
                            DIGITAL
                            <svg className="absolute w-full h-4 -bottom-1 left-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <motion.path
                                    d="M0 5 Q 50 10 100 5"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="none"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 1 }}
                                />
                            </svg>
                        </span> <br />
                        EXPERIENCES
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-300 max-w-lg border-l-4 border-neo-black dark:border-neo-cream pl-6"
                    >
                        Turning chaotic ideas into structured, high-performance web applications with a touch of madness.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        <BrutalistButton variant="primary">
                            VIEW PROJECTS
                        </BrutalistButton>
                        <BrutalistButton variant="outline">
                            CONTACT ME
                        </BrutalistButton>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="flex gap-4 pt-8"
                    >
                        {[Github, Twitter, Linkedin].map((Icon, idx) => (
                            <a key={idx} href="#" className="p-3 bg-white dark:bg-neo-black border-[3px] border-neo-black dark:border-neo-cream shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all text-neo-black dark:text-neo-cream">
                                <Icon size={24} />
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Right 3D Centerpiece */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.2, type: "spring" }}
                    className="relative h-[500px] w-full flex items-center justify-center perspective-1000"
                >
                    {/* Interactive 3D Container */}
                    <div
                        className="relative w-full max-w-md aspect-square transition-transform duration-100 ease-out"
                        style={{
                            transform: `rotateY(${mousePos.x * 20}deg) rotateX(${-mousePos.y * 20}deg)`,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {/* Back Card */}
                        <div
                            className="absolute inset-0 bg-neo-black dark:bg-white border-[4px] border-black dark:border-white rounded-3xl transform translate-z-[-40px] translate-x-8 translate-y-8"
                        ></div>

                        {/* Middle Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-neo-yellow border-[3px] border-black dark:border-neo-cream rounded-full shadow-neo flex items-center justify-center transform translate-z-[20px] animate-bounce-slow">
                            <span className="text-4xl font-black text-neo-black">JS</span>
                        </div>

                        <div className="absolute -bottom-5 -left-5 w-32 h-16 bg-neo-blue border-[3px] border-black dark:border-neo-cream shadow-neo flex items-center justify-center transform translate-z-[40px] -rotate-6">
                            <span className="text-xl font-black text-white">REACT</span>
                        </div>

                        {/* Main Card (Avatar) */}
                        <div
                            className="absolute inset-0 bg-white dark:bg-neo-dark-gray border-[4px] border-neo-black dark:border-neo-cream rounded-2xl shadow-[10px_10px_0px_0px_var(--shadow-color)] overflow-hidden flex flex-col transform translate-z-[0px]"
                        >
                            {/* Browser Header */}
                            <div className="bg-neo-black h-12 flex items-center px-4 gap-2 border-b-[4px] border-neo-black dark:border-neo-cream">
                                <div className="w-4 h-4 rounded-full bg-neo-pink border border-white"></div>
                                <div className="w-4 h-4 rounded-full bg-neo-yellow border border-white"></div>
                                <div className="w-4 h-4 rounded-full bg-neo-mint border border-white"></div>
                                <div className="ml-4 bg-white/20 h-6 w-1/2 rounded-md"></div>
                            </div>

                            {/* Image / Content */}
                            <div className="flex-1 bg-neo-purple relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/designer/800/800')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-neo-black/80 to-transparent flex flex-col justify-end p-6">
                                    <span className="text-white font-black text-3xl">ALEX DEV</span>
                                    <span className="text-neo-yellow font-bold">CREATIVE ENGINEER</span>
                                </div>

                                {/* Sticker */}
                                <div className="absolute top-4 right-4 bg-white border-[3px] border-black px-3 py-1 rotate-12 shadow-neo text-sm font-bold text-neo-black">
                                    OPEN FOR WORK
                                </div>
                            </div>
                        </div>

                        {/* Floating Code Snippet */}
                        <div className="absolute top-1/2 -right-12 bg-white dark:bg-neo-black border-[3px] border-neo-black dark:border-neo-cream p-4 shadow-neo transform translate-z-[60px] translate-y-12 rotate-3 hidden md:block">
                            <pre className="font-mono text-sm font-bold text-neo-black dark:text-neo-cream">
                                {`const awesome = true;
if (client.needsCool) {
  createMagic();
}`}
                            </pre>
                        </div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
            >
                <ArrowDown size={40} className="text-neo-black dark:text-neo-cream" />
            </motion.div>
        </section>
    );
};