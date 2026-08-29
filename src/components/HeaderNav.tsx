'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Menu, X,  ChevronDown } from 'lucide-react';
import { useApp, THEME_LIST } from '@/context/AppContext';

export function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { activeSection, openCV, setTheme, theme, scrollToSection } = useApp();

  const isGoodiesPage = pathname === '/goodies';
  const isBlogsPage = pathname?.startsWith('/blogs');
  const isSubPage = isGoodiesPage || isBlogsPage;

  const navLinks = [
    { label: 'WORK', href: '/#work', id: 'work' },
    { label: 'STACK', href: '/#stack', id: 'stack' },
    { label: 'EXPERIENCE', href: '/#xp', id: 'xp' },
    { label: 'BLOGS', href: '/blogs', id: 'blogs', isRoute: true },
    { label: 'GOODIES', href: '/goodies', id: 'goodies', isRoute: true },
    { label: 'CONTACT', href: '/#contact', id: 'contact' },
  ];

  // Close palette on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) {
        setPaletteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, isRoute?: boolean) => {
    setMobileMenuOpen(false);
    if (isRoute) {
      return; // Let next/link handle standard route navigation
    }
    if (!isSubPage) {
      e.preventDefault();
      scrollToSection(targetId);
    }
  };

  const currentThemeObj = THEME_LIST.find((t) => t.id === theme) || THEME_LIST[0];

  return (
    <header
      id="siteNav"
      className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1d1d1d] transition-all"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 h-16">
          {/* Brand */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, 'top')}
            className="group flex items-center gap-2.5 font-mono text-[13px] font-bold tracking-[0.06em] text-[#ececec] hover:text-white transition-colors"
            id="brandLink"
          >
            <span className="w-[11px] h-[11px] border-2 border-[var(--acc)] rotate-45 transition-transform duration-500 ease-out group-hover:rotate-[225deg]" />
            <span>
              KHALID<b className="text-[var(--acc)] font-bold">KAKAR</b>.PRO
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 ml-auto" aria-label="Main Navigation">
            {navLinks.map((link) => {
              let isActive = false;
              if (link.id === 'blogs') {
                isActive = !!isBlogsPage;
              } else if (link.id === 'goodies') {
                isActive = isGoodiesPage;
              } else {
                isActive = !isSubPage && activeSection === link.id;
              }

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id, link.isRoute)}
                  className={`relative font-mono text-[11px] font-medium tracking-[0.14em] py-1.5 transition-colors duration-200 flex items-center gap-1.5 ${
                    isActive ? 'text-[var(--acc)] font-bold' : 'text-[#9c9c9c] hover:text-[#ececec]'
                  }`}
                >
                  {link.label}
                  {link.id === 'blogs' && (
                    <span className="text-[9px] px-1 py-0.2 bg-[#1d1d1d] border border-[#2c2c2c] text-[var(--acc)] tracking-normal font-mono rounded-none">
                      ESSAYS
                    </span>
                  )}
                  {link.id === 'goodies' && (
                    <span className="text-[9px] px-1 py-0.2 bg-[#1d1d1d] border border-[#2c2c2c] text-[var(--acc)] tracking-normal font-mono rounded-none">
                      TOYS
                    </span>
                  )}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-[var(--acc)] transition-all duration-200 ${
                      isActive ? 'w-full' : 'w-0 hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 ml-auto md:ml-0">
            {/* Multi-Color Theme Switcher Dropdown */}
            <div className="relative" ref={paletteRef}>
              <button
                type="button"
                onClick={() => setPaletteOpen((prev) => !prev)}
                title={`Current Phosphor: ${currentThemeObj.label}`}
                className="flex items-center gap-1.5 border border-[#2c2c2c] px-2.5 py-1 text-[10px] font-mono text-[#ececec] hover:border-[var(--acc)] transition-colors bg-[#0e0e0e] cursor-pointer"
                aria-label="Select theme phosphor color"
                aria-expanded={paletteOpen}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block border border-black/40"
                  style={{ backgroundColor: currentThemeObj.hex }}
                />
                <span className="uppercase font-semibold hidden sm:inline">{theme}</span>
                <ChevronDown className="w-3 h-3 text-[#666666]" />
              </button>

              {paletteOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-[#0e0e0e] border border-[#2c2c2c] shadow-2xl p-2 z-50 animate-fade-in">
                  <div className="text-[9px] font-mono text-[#666666] tracking-[0.1em] px-2 py-1 uppercase border-b border-[#1d1d1d] mb-1">
                    Phosphor Color Palette
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {THEME_LIST.map((t) => {
                      const isSelected = theme === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setTheme(t.id);
                            setPaletteOpen(false);
                          }}
                          className={`flex items-center justify-between px-2 py-1.5 text-[11px] font-mono text-left transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#181818] text-[#ffffff] font-bold border-l-2 border-[var(--acc)]'
                              : 'text-[#9c9c9c] hover:bg-[#141414] hover:text-[#ececec]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/40"
                              style={{ backgroundColor: t.hex }}
                            />
                            <span>{t.label}</span>
                          </div>
                          {isSelected && <span className="text-[9px] text-[var(--acc)]">ACTIVE</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Live Status indicator */}
            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hidden lg:flex items-center gap-2 border border-[#2c2c2c] px-3 py-1 font-mono text-[10px] font-medium tracking-[0.12em] text-[#9c9c9c] hover:border-[var(--green)] hover:text-[#ececec] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
              OPEN TO WORK
            </Link>

            {/* GitHub */}
            <a
              href="https://github.com/khalidkhankakar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#9c9c9c] hover:text-[var(--acc)] transition-colors p-1"
              aria-label="Khalid Khan's GitHub Profile"
            >
              <Github className="w-[18px] h-[18px]" />
            </a>

            {/* CV Download Mini Button */}
            <button
              id="cvBtn"
              type="button"
              onClick={openCV}
              className="font-mono text-[10px] font-bold tracking-[0.12em] bg-[var(--acc)] text-black border border-[var(--acc)] px-3 py-1.5 hover:bg-[#ececec] hover:border-[#ececec] transition-colors cursor-pointer"
            >
              OPEN CV
            </button>

            {/* Mobile Hamburger Button */}
            <button
              id="burger"
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden flex items-center justify-center p-2 border border-[#2c2c2c] text-[#ececec] hover:border-[var(--acc)] transition-colors bg-[#0e0e0e] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[var(--acc)]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mMenu"
            ref={mobileMenuRef}
            className="md:hidden border-t border-[#1d1d1d] py-3 flex flex-col space-y-1 animate-fade-in bg-[#0a0a0a]"
          >
            {navLinks.map((link) => {
              let isActive = false;
              if (link.id === 'blogs') {
                isActive = !!isBlogsPage;
              } else if (link.id === 'goodies') {
                isActive = isGoodiesPage;
              } else {
                isActive = !isSubPage && activeSection === link.id;
              }

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id, link.isRoute)}
                  className={`font-mono text-xs tracking-[0.16em] py-2.5 px-1 border-b border-[#1d1d1d] flex items-center justify-between transition-colors ${
                    isActive ? 'text-[var(--acc)] font-bold bg-[#121212]/50' : 'text-[#9c9c9c] hover:text-[var(--acc)]'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.id === 'blogs' && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-[#1d1d1d] border border-[#2c2c2c] text-[var(--acc)] font-mono">
                      ESSAYS
                    </span>
                  )}
                  {link.id === 'goodies' && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-[#1d1d1d] border border-[#2c2c2c] text-[var(--acc)] font-mono">
                      TOYS
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-3 pb-1 flex flex-col gap-2">
              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-[10px] text-[#666666] tracking-wider uppercase">PHOSPHOR THEME:</span>
                <div className="flex items-center gap-2">
                  {THEME_LIST.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id)}
                      title={t.label}
                      className={`w-5 h-5 rounded-full border transition-transform cursor-pointer ${
                        theme === t.id ? 'border-white scale-125 ring-1 ring-[var(--acc)]' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: t.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
