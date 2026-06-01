import React from 'react';

interface BrutalistCardProps {
    children: React.ReactNode;
    className?: string;
    color?: string;
    hoverEffect?: boolean;
}

export const BrutalistCard: React.FC<BrutalistCardProps> = ({
    children,
    className = '',
    color = 'bg-[var(--color-paper)]',
    hoverEffect = true
}) => {
    return (
        <div
            className={`
        relative border-y border-[var(--color-rule)] p-6 ${color}
        transition-[border-color,background-color,color,transform] duration-[var(--dur-med)] ease-[var(--ease-out)]
        ${hoverEffect ? 'hover:border-[var(--color-ink)] hover:-translate-y-0.5' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
}

export const BrutalistButton: React.FC<BrutalistButtonProps> = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseStyle = "px-4 py-2 editorial-smallcaps border border-[var(--color-ink)] transition-[background-color,color,transform,border-color] duration-[var(--dur-short)] ease-[var(--ease-out)] active:translate-y-px flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]",
        secondary: "bg-[var(--color-paper)] text-[var(--color-ink)] hover:bg-[var(--color-paper-2)]",
        outline: "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]"
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
