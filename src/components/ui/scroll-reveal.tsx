'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
}

const directionMap = {
  up: 'translate-y-6',
  down: '-translate-y-6',
  left: 'translate-x-6',
  right: '-translate-x-6',
} as const;

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 700,
  direction = 'up',
  threshold = 0.18,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const directionClass = directionMap[direction];

  return (
    <div
      ref={ref}
      className={[
        'transition-all ease-out will-change-transform will-change-opacity',
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${directionClass}`,
        className,
      ].join(' ')}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
