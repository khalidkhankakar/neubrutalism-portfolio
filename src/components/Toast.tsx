'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Toast() {
  const { toastMessage } = useApp();

  return (
    <div
      id="toast"
      role="status"
      aria-live="polite"
      className={`fixed right-5 bottom-5 z-50 flex items-center gap-3 bg-[#121212] border border-[#2c2c2c] border-l-2 border-l-[var(--acc)] px-4 py-3 font-mono text-xs text-[#ececec] shadow-2xl transition-transform duration-300 ease-out max-w-[min(88vw,380px)] ${
        toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-[140%] opacity-0 pointer-events-none'
      }`}
    >
      <Check className="w-4 h-4 text-[var(--acc)] shrink-0" />
      <span id="toastMsg" className="break-words">
        {toastMessage}
      </span>
    </div>
  );
}
