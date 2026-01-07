import React from 'react';

interface BrutalistCardProps {
    children: React.ReactNode;
    className?: string;
    color?: string; // Hex or tailwind class for bg
    hoverEffect?: boolean;
}

export const BrutalistCard: React.FC<BrutalistCardProps> = ({
    children,
    className = '',
    color = 'bg-white dark:bg-neo-black',
    hoverEffect = true
}) => {
    return (
        <div
            className={`
        relative border-[3px] border-neo-black dark:border-neo-cream p-6 ${color} 
        shadow-neo transition-all duration-300 ease-out
        ${hoverEffect ? 'hover:-translate-y-1 hover:translate-x-1 hover:shadow-neo-lg' : ''}
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
    const baseStyle = "px-6 py-3 font-bold border-[3px] border-neo-black dark:border-neo-cream text-lg transition-all duration-200 ease-out active:translate-y-1 active:shadow-none flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-neo-pink text-white shadow-neo hover:-translate-y-1 hover:translate-x-1 hover:shadow-neo-lg",
        secondary: "bg-neo-yellow text-neo-black shadow-neo hover:-translate-y-1 hover:translate-x-1 hover:shadow-neo-lg",
        outline: "bg-transparent text-neo-black dark:text-neo-cream shadow-neo hover:bg-neo-black dark:hover:bg-neo-cream hover:text-white dark:hover:text-neo-black hover:-translate-y-1 hover:translate-x-1 hover:shadow-neo-lg"
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