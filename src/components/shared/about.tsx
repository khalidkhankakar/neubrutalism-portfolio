'use client';
import React from 'react';
import { BrutalistCard } from '@/components/ui/brutalist-card';
import { Code2, Palette, Coffee, Zap } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export const About: React.FC = () => {
  const stats = [
    { icon: <Code2 size={32} />, label: "Clean Code", value: "100%" },
    { icon: <Palette size={32} />, label: "Creativity", value: "Over 9000" },
    { icon: <Coffee size={32} />, label: "Coffee", value: "Infinite" },
    { icon: <Zap size={32} />, label: "Speed", value: "Fast" },
  ];

  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-white dark:bg-neo-black border-y-2 border-neo-black dark:border-neo-cream relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">    
          <div className="w-full md:w-1/2">
             <ScrollReveal direction="right">
               <div className="relative ">
                 <BrutalistCard color="bg-neo-yellow" className="transform  rotate-1  z-10 relative">
                   <h2 className="text-3xl md:text-4xl font-display font-black mb-6 text-neo-black">WHO AM I?</h2>
                   <p className="text-sm md:text-lg font-semibold leading-relaxed mb-4 text-neo-black">
                     I&apos;m a frontend engineer who loves to break the mold. I specialize in building unique, high-performance web applications that leave a lasting impression.
                   </p>
                   <p className="text-lg mb-6 border-l-4 italic border-neo-black pl-4 text-neo-black">
                     &quot;Normal is boring. Let&apos;s make the web fun again.&quot;
                   </p>
                   <div className="flex gap-2">
                     <span className="px-3 py-1 bg-white border-2 border-neo-black font-bold text-sm shadow-[2px_2px_0px_0px_black] text-neo-black">React</span>
                     <span className="px-3 py-1 bg-white border-2 border-neo-black font-bold text-sm shadow-[2px_2px_0px_0px_black] text-neo-black">TypeScript</span>
                     <span className="px-3 py-1 bg-white border-2 border-neo-black font-bold text-sm shadow-[2px_2px_0px_0px_black] text-neo-black">WebGL</span>
                   </div>
                 </BrutalistCard>
                
               </div>
             </ScrollReveal>
          </div>

          <div className="w-full md:w-1/2 grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1} width="100%">
                <div className="group">
                  <div className={`
                    bg-white dark:bg-neo-dark-gray border-[2px] border-neo-black dark:border-neo-cream p-4 flex flex-col items-center justify-center gap-2
                    shadow-neo transition-transform duration-200 ease-in-out group-hover:-translate-y-2 group-hover:shadow-neo-lg
                    ${index % 2 === 0 ? '-rotate-2' : 'rotate-2'}
                  `}>
                    <div className="text-neo-pink group-hover:scale-110 transition-transform">{stat.icon}</div>
                    <h3 className="font-display font-bold text-sm md:text-lg text-neo-black dark:text-neo-cream">{stat.label}</h3>
                    <span className="font-mono text-sm bg-neo-black dark:bg-neo-cream text-white dark:text-neo-black px-2 py-1">{stat.value}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};