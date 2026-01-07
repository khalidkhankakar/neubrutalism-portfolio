'use client';
import React from 'react';
import { Terminal, Database, Layout, Cpu, Globe, Server } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export const Skills: React.FC = () => {
  const skills = [
    { name: "Frontend", icon: <Layout />, items: ["React", "TypeScript", "Tailwind", "Next.js"], color: "bg-neo-pink" },
    { name: "Backend", icon: <Server />, items: ["Node.js", "Python", "PostgreSQL", "GraphQL"], color: "bg-neo-blue" },
    { name: "Tools", icon: <Terminal />, items: ["Git", "Docker", "AWS", "Figma"], color: "bg-neo-yellow" },
  ];

  return (
    <section id="skills" className="py-20 px-4 md:px-8 bg-neo-black dark:bg-neo-cream text-white dark:text-neo-black border-t-4 border-black dark:border-neo-cream transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
         <ScrollReveal width="100%">
           <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-8">
              <h2 className="text-5xl md:text-7xl font-display font-black text-white dark:text-neo-black">
                THE <br/> <span className="text-transparent bg-clip-text bg-linear-to-r from-neo-pink to-neo-yellow">TOOLKIT</span>
              </h2>
              <div className="bg-white dark:bg-neo-black text-black dark:text-neo-cream p-6 border-[3px] border-neo-mint shadow-[8px_8px_0px_0px_#4ECDC4] max-w-sm transform rotate-1">
                <p className="font-bold text-lg">
                  I don&apos;t just use tools; I bend them to my will. Here is my arsenal of choice for digital destruction (creation).
                </p>
              </div>
           </div>
         </ScrollReveal>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.2} direction="up" width="100%">
                <div className="relative group h-full">
                  <div className={`absolute inset-0 ${skill.color} border-[3px] border-white dark:border-neo-black translate-x-3 translate-y-3`}></div>
                  <div className="relative bg-white dark:bg-neo-black text-black dark:text-neo-cream border-[3px] border-black dark:border-neo-black p-8 hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-200 h-full">
                     <div className="flex items-center gap-4 mb-6 border-b-4 border-black dark:border-neo-cream pb-4">
                       <div className={`p-3 ${skill.color} border-2 border-black shadow-neo-sm text-black`}>
                         {skill.icon}
                       </div>
                       <h3 className="text-2xl font-black">{skill.name.toUpperCase()}</h3>
                     </div>
                     
                     <div className="space-y-3">
                       {skill.items.map((item, i) => (
                         <div key={i} className="flex items-center justify-between font-bold text-lg group/item">
                            <span>{item}</span>
                            <span className="w-2 h-2 bg-black dark:bg-neo-cream opacity-0 group-hover/item:opacity-100 transition-opacity"></span>
                         </div>
                       ))}
                     </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
         </div>
      </div>
    </section>
  );
};