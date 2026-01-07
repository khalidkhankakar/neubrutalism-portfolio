'use client';
import React from 'react';
import { BrutalistButton } from '@/components/ui/brutalist-card';
import { Mail, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-neo-yellow border-t-4 border-neo-black dark:border-neo-cream py-20 px-4 transition-colors duration-300">
       <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <ScrollReveal width="100%">
            <div className="relative inline-block">
               <h2 className="text-6xl md:text-9xl font-black font-display text-neo-black relative z-10 mix-blend-multiply">
                 LET&apos;S TALK
               </h2>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[50%] bg-white border-[3px] border-neo-black -rotate-2 z-0"></div>
            </div>
          </ScrollReveal>

          <ScrollReveal width="100%" delay={0.2}>
            <p className="text-2xl font-bold max-w-2xl mx-auto text-neo-black">
              Got a project that needs some bold energy? Or just want to say hi? 
              My inbox is always open for cool ideas.
            </p>
          </ScrollReveal>

          <ScrollReveal width="100%" delay={0.4}>
            <div className="flex justify-center">
               <a href="mailto:hello@example.com" className="group">
                 <BrutalistButton className="text-2xl px-12 py-6 bg-neo-black text-white hover:bg-white hover:text-black hover:border-black shadow-[8px_8px_0px_0px_white]">
                   <span className="flex items-center gap-4">
                     <Mail /> SAY HELLO <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                   </span>
                 </BrutalistButton>
               </a>
            </div>
          </ScrollReveal>

          <div className="pt-20 flex flex-col md:flex-row justify-between items-center gap-4 font-bold border-t-[3px] border-neo-black mt-12  text-neo-black">
             <p>© 2026 .</p>
             <p>DESIGNED BY <span className="text-neo-pink">♥</span> KHALID KHAN KAKAR</p>
          </div>
       </div>
    </footer>
  );
};