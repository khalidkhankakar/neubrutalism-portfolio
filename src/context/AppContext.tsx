'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useTransition } from 'react';
import { downloadCVFile, openCVFile } from '@/lib/cv';

export type ThemeColor = 'amber' | 'green' | 'cyan' | 'violet' | 'crimson' | 'orange' | 'mono';

export const THEME_LIST: { id: ThemeColor; label: string; hex: string }[] = [
  { id: 'amber', label: 'Amber Phosphor', hex: '#ffb224' },
  { id: 'green', label: 'Matrix Green', hex: '#3ecf6e' },
  { id: 'cyan', label: 'Cyber Cyan', hex: '#00e5ff' },
  { id: 'violet', label: 'Tensor Violet', hex: '#a78bfa' },
  { id: 'crimson', label: 'Laser Crimson', hex: '#ff3366' },
  { id: 'orange', label: 'Solar Orange', hex: '#ff7a00' },
  { id: 'mono', label: 'Monochrome', hex: '#f0f0f0' },
];

interface AppContextType {
  toastMessage: string | null;
  showToast: (msg: string) => void;
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  toggleTheme: (forced?: ThemeColor) => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
  openCV: () => void;
  downloadCV: () => void;
  copyToClipboard: (text: string, message?: string) => Promise<boolean>;
  scrollToSection: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [theme, setThemeState] = useState<ThemeColor>('amber');
  const [activeSection, setActiveSection] = useState<string>('top');
  const [, startTransition] = useTransition();

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const setTheme = useCallback((newTheme: ThemeColor) => {
    setThemeState(newTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = newTheme;
    }
  }, []);

  const toggleTheme = useCallback(
    (forced?: ThemeColor) => {
      if (forced) {
        setTheme(forced);
        const item = THEME_LIST.find((t) => t.id === forced);
        showToast(`Phosphor accent: ${item?.label || forced.toUpperCase()}`);
        return;
      }
      setThemeState((current) => {
        const idx = THEME_LIST.findIndex((t) => t.id === current);
        const next = THEME_LIST[(idx + 1) % THEME_LIST.length].id;
        if (typeof document !== 'undefined') {
          document.documentElement.dataset.theme = next;
        }
        const item = THEME_LIST.find((t) => t.id === next);
        showToast(`Phosphor accent: ${item?.label || next.toUpperCase()}`);
        return next;
      });
    },
    [setTheme, showToast]
  );

  const openCV = useCallback(() => {
    openCVFile();
    showToast('Opening resume in a new tab');
  }, [showToast]);

  const downloadCV = useCallback(() => {
    downloadCVFile();
    showToast('CV downloaded — khalid-khan-cv.txt');
  }, [showToast]);

  const copyToClipboard = useCallback(
    async (text: string, message = 'Copied to clipboard'): Promise<boolean> => {
      let copied = false;
      try {
        if (typeof window !== 'undefined' && navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          copied = true;
        }
      } catch {
        copied = false;
      }

      if (!copied && typeof document !== 'undefined') {
        try {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          ta.style.top = '-9999px';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          copied = document.execCommand('copy');
          document.body.removeChild(ta);
        } catch {
          copied = false;
        }
      }

      showToast(copied ? message : 'Copied to clipboard');
      return true;
    },
    [showToast]
  );

  const scrollToSection = useCallback((id: string) => {
    const cleanId = id.replace(/^#/, '');
    const element = document.getElementById(cleanId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      startTransition(() => {
        setActiveSection(cleanId);
      });
      // Highlight flash animation
      const heading = element.querySelector('h2');
      if (heading) {
        heading.style.transition = 'color 0.3s ease';
        heading.style.color = 'var(--acc)';
        setTimeout(() => {
          heading.style.color = '';
        }, 1400);
      }
    }
  }, []);

  // Sync scrollspy on scroll
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const sections = ['work', 'stack', 'xp', 'writing', 'contact'].map((id) =>
      document.getElementById(id)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -55% 0px' }
    );

    sections.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AppContext.Provider
      value={{
        toastMessage,
        showToast,
        theme,
        setTheme,
        toggleTheme,
        activeSection,
        setActiveSection,
        openCV,
        downloadCV,
        copyToClipboard,
        scrollToSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
