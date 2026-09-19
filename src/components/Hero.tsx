/* Hallmark · macrostructure: Edit Grid · tone: technical · anchor hue: amber */
'use client';

import { ArrowDown, FileDown } from 'lucide-react';
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';
import { useApp } from '@/context/AppContext';
import { PortfolioData } from '@/lib/types';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

interface HeroProps {
  bio: PortfolioData['bio'];
}

export function Hero({ bio }: HeroProps) {
  const { openCV, scrollToSection } = useApp();

  return (
    <section id="top" className="relative overflow-hidden pb-8 pt-4 sm:pb-12 sm:pt-6 md:pb-16 md:pt-10">
      {/* Blueprint grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(#000_50%,transparent_95%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
          {/* Left Column on md+, Top on small screens: Text Content */}
          <div className="flex flex-col justify-center md:col-span-7 lg:col-span-7">
            <ScrollReveal delay={50} duration={650} direction="up">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <p className="font-mono text-[10px] font-medium tracking-[0.18em] text-[var(--acc)] uppercase sm:text-[11px]">
                  {bio.name.toUpperCase()} · {bio.positioning.toUpperCase()}
                </p>
                <span className="hidden border border-[#2c2c2c] bg-[#121212] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#9c9c9c] sm:inline-block">
                  {bio.location.toUpperCase()}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100} duration={700} direction="up">
              <h1 className="my-2 font-sans text-[clamp(2.2rem,6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#ececec] md:text-[clamp(2.4rem,4.2vw,4.4rem)] [overflow-wrap:anywhere]">
                I build <span className="text-[var(--acc)]">AI systems</span> and production software.
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={150} duration={700} direction="up">
              <p className="mb-5 max-w-[56ch] text-base leading-[1.6] text-[#9c9c9c] sm:text-[1.05rem]">
                {bio.subheadline}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200} duration={700} direction="up">
              <div className="mb-6 inline-flex max-w-full flex-wrap items-center gap-2 border border-[#222222] bg-[#0e0e0e] px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-[#8a8a8a] uppercase">
                <span className="text-[var(--acc)]">ML</span>
                <span className="text-[#ececec]">·</span>
                <span className="text-[#ececec]">Python</span>
                <span className="text-[var(--acc)]">·</span>
                <span className="text-[#ececec]">FastAPI</span>
                <span className="text-[var(--acc)]">·</span>
                <span className="text-[#ececec]">Next.js</span>
                <span className="text-[var(--acc)]">·</span>
                <span className="text-[var(--green)]">Production</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250} duration={700} direction="up">
              <div className="flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => scrollToSection('work')}
                  className="inline-flex cursor-pointer items-center gap-2 border border-[var(--acc)] bg-[var(--acc)] px-5 py-3.5 font-mono text-[11px] font-bold tracking-[0.12em] text-black whitespace-nowrap transition-colors hover:bg-[#f1f1f1]"
                >
                  EXPLORE PROJECTS <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  id="cvBtn2"
                  onClick={openCV}
                  className="inline-flex cursor-pointer items-center gap-2 border border-[#2c2c2c] bg-transparent px-5 py-3.5 font-mono text-[11px] font-bold tracking-[0.12em] text-[#ececec] whitespace-nowrap transition-colors hover:border-[var(--acc)] hover:text-[var(--acc)]"
                >
                  OPEN CV <FileDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hidden items-center gap-2 border border-[#222222] bg-[#121212] px-5 py-3.5 font-mono text-[11px] font-bold tracking-[0.12em] text-[#9c9c9c] whitespace-nowrap transition-colors hover:border-[#444444] hover:text-[#ececec] sm:inline-flex"
                >
                  CONTACT ME
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column on md+, Bottom on small screens: Shader Canvas & Image */}
          <div className="flex w-full items-center justify-center md:col-span-5 lg:col-span-5">
            <ScrollReveal delay={200} duration={750} direction="up" className="w-full">
              <div className="relative mx-auto w-full max-w-[440px] sm:max-w-[480px] md:max-w-none">
                <div className="relative aspect-[4/3.8] w-full overflow-hidden border border-[#1d1d1d] bg-[#0c0c0c] sm:aspect-square md:aspect-[4/4.5] lg:aspect-[4/4.2]">
                  {/* Animated 3D Shader Canvas */}
                  <div className="pointer-events-none absolute inset-0">
                    <ShaderGradientCanvas
                      className="absolute inset-0 h-full w-full opacity-90"
                      style={{ position: 'absolute', inset: 0 }}
                      pointerEvents="none"
                      pixelDensity={1}
                      fov={45}
                    >
                      <ShaderGradient
                        animate="on"
                        brightness={1.2}
                        cAzimuthAngle={180}
                        cDistance={3.6}
                        cPolarAngle={90}
                        cameraZoom={1}
                        color1="#ff5005"
                        color2="#dbba95"
                        color3="#d0bce1"
                        envPreset="city"
                        grain="on"
                        lightType="3d"
                        positionX={0}
                        positionY={0}
                        positionZ={0}
                        range="disabled"
                        rangeEnd={40}
                        rangeStart={0}
                        reflection={0.1}
                        rotationX={0}
                        rotationY={10}
                        rotationZ={50}
                        shader="defaults"
                        type="plane"
                        uAmplitude={1}
                        uDensity={1.3}
                        uFrequency={5.5}
                        uSpeed={0.4}
                        uStrength={4}
                        uTime={0}
                        wireframe={false}
                        zoomOut={false}
                      />
                    </ShaderGradientCanvas>
                    {/* Vignette and smooth bottom fade into background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/20 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(12,12,12,0.45)_100%)]" />
                  </div>

                  {/* Cutout Hero Image */}
                  <div className="relative z-10 flex h-full w-full items-end justify-center pt-4 sm:pt-6">
                    <img
                      src="/pics/hero.png"
                      alt={bio.name}
                      className="h-auto max-h-[94%] w-auto max-w-[92%] select-none object-contain object-bottom drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
