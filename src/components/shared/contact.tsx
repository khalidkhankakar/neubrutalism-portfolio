'use client';

import React from 'react';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import Link from 'next/link';

export const Contact: React.FC = () => {
  return (
    <footer id="contact" className="px-[var(--page-gutter)] py-[var(--space-3xl)]">
      <div className="editorial-container border-t border-[var(--color-rule)] pt-[var(--space-xl)]">
        <ScrollReveal width="100%">
          <div className="grid gap-[var(--space-xl)] lg:grid-cols-[minmax(0,8fr)_minmax(18rem,4fr)]">
            <div>
              <p className="editorial-smallcaps mb-4 text-[var(--color-accent)]">Letter close</p>
              <h2 className="editorial-display text-[length:var(--text-display-s)] italic text-[var(--color-ink)]">
                Let&apos;s make the next thing legible.
              </h2>
            </div>

            <aside className="flex flex-col justify-end gap-5 border-t border-[var(--color-rule)] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="font-display text-3xl italic leading-tight text-[var(--color-ink)]">
                Yours,<br />
                <span className="not-italic">Khalid Khan Kakar</span>
              </p>
              <p className="leading-7 text-[var(--color-ink-2)]">
                P.S. Project notes, product ideas, and thoughtful hellos are welcome.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link target="_blank" href="mailto:khalidkhankakar2468@gmail.com" className="editorial-smallcaps inline-flex items-center justify-center gap-3 border border-[var(--color-ink)] bg-[var(--color-ink)] px-4 py-3 text-[var(--color-paper)] transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]">
                  <Mail size={18} /> Say hello <ArrowRight size={16} />
                </Link>
                <Link target="_blank" href="https://wa.me/03708218757" className="editorial-smallcaps inline-flex items-center justify-center gap-3 border border-[var(--color-rule)] px-4 py-3 text-[var(--color-ink)] transition-colors hover:border-[var(--color-ink)] hover:bg-[var(--color-paper-2)]">
                  <MessageCircle size={18} /> WhatsApp <ArrowRight size={16} />
                </Link>
              </div>
            </aside>
          </div>
        </ScrollReveal>

        <div className="editorial-smallcaps mt-[var(--space-xl)] flex flex-col justify-between gap-3 border-t border-[var(--color-rule)] pt-4 text-[var(--color-muted)] md:flex-row">
          <p>© 2026</p>
          <p>Khalid Khan Kakar</p>
        </div>
      </div>
    </footer>
  );
};
