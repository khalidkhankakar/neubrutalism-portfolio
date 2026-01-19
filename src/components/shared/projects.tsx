'use client';
import React from 'react';
import { BrutalistButton, BrutalistCard } from '@/components/ui/brutalist-card';
import { ExternalLink, Github } from 'lucide-react';
import { Project }  from '@/utils/types';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

const projects: Project[] = [
  {
    id: 1,
    title: "NEO-DASHBOARD",
    description: "A high-contrast analytics dashboard for data lovers.",
    tags: ["React", "D3.js", "Tailwind"],
    imageUrl: "https://picsum.photos/seed/dash/600/400",
    link: "#",
    color: "bg-neo-blue"
  },
  {
    id: 2,
    title: "RETRO GAME",
    description: "Browser-based platformer built with Phaser.js.",
    tags: ["Phaser", "TypeScript", "Webpack"],
    imageUrl: "https://picsum.photos/seed/game/600/400",
    link: "#",
    color: "bg-neo-pink"
  },
  {
    id: 3,
    title: "CRYPTO WALLET",
    description: "Web3 wallet interface with brutalist aesthetics.",
    tags: ["Web3", "Ethers.js", "React"],
    imageUrl: "https://picsum.photos/seed/crypto/600/400",
    link: "#",
    color: "bg-neo-mint"
  }
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-4 md:px-8 bg-neo-cream dark:bg-neo-black relative transition-colors duration-300">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none transition-opacity" 
           style={{ backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="max-w-7xl mx-auto">
        <ScrollReveal width="100%">
          <div className="mb-16 text-center">
            <span className="inline-block bg-neo-yellow border-[3px] border-neo-black dark:border-neo-cream px-6 py-2 text-xl font-bold shadow-neo mb-4 -rotate-2 text-neo-black">
              MY WORK
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-black text-neo-black dark:text-neo-cream">
              FEATURED PROJECTS
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 0.15} width="100%">
              <div className="group  h-full">
                <div className="relative  h-full">
                  
                  {/* 3D Depth Layer */}
                  <div className={`absolute inset-0 ${project.color} border-[3px] border-neo-black dark:border-neo-cream translate-x-4 translate-y-4 rounded-xl -z-10`}></div>
                  
                  <BrutalistCard className="h-full flex flex-col p-0 overflow-hidden rounded-xl bg-white dark:bg-neo-dark-gray border-neo-black dark:border-neo-cream">
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden border-b-[3px] border-neo-black dark:border-neo-cream  transition-all duration-300">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 "
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <div className="bg-white border-2 border-neo-black p-1 shadow-sm text-neo-black">
                          <Github size={16} />
                        </div>
                        <div className="bg-white border-2 border-neo-black p-1 shadow-sm text-neo-black">
                          <ExternalLink size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-2xl font-black font-display mb-2 text-neo-black dark:text-neo-cream">{project.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mb-6 flex-1">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-xs font-bold bg-neo-black dark:bg-neo-cream text-white dark:text-neo-black px-2 py-1">
                            #{tag.toUpperCase()}
                          </span>
                        ))}
                      </div>

                      <BrutalistButton variant="secondary" className="w-full mt-6 text-sm py-2">
                        VIEW DETAILS
                      </BrutalistButton>
                    </div>
                  </BrutalistCard>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};