import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  variant?: 'glass' | 'solid' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  'aria-label': ariaLabel,
  variant = 'glass',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-9 h-9 p-1.5',
    md: 'w-11 h-11 p-2.5',
    lg: 'w-14 h-14 p-3.5',
  }[size];

  const variantClasses = {
    glass: 'bg-midnight-surface/80 hover:bg-midnight-light border border-champagne/20 text-ivory hover:text-champagne shadow-sm backdrop-blur-md',
    solid: 'bg-rose-muted hover:bg-rose-soft text-white shadow-md',
    ghost: 'hover:bg-white/10 text-ivory/80 hover:text-ivory',
  }[variant];

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 focus:ring-offset-midnight active:scale-90 min-h-[44px] min-w-[44px] ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

