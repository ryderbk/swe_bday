import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none min-h-[44px] min-w-[44px]';

  const sizeClasses = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5 font-serif tracking-wide',
  }[size];

  const variantClasses = {
    primary:
      'bg-rose-muted hover:bg-rose-soft text-white focus:ring-rose-muted focus:ring-offset-midnight shadow-md shadow-rose-900/20',
    secondary:
      'bg-midnight-light hover:bg-midnight-surface text-ivory border border-champagne/20 focus:ring-champagne focus:ring-offset-midnight',
    outline:
      'border border-rose-muted text-rose-soft hover:bg-rose-muted/10 focus:ring-rose-muted focus:ring-offset-midnight',
    gold:
      'bg-gradient-to-r from-champagne to-champagne-dark text-midnight font-semibold hover:brightness-105 shadow-glow-champagne focus:ring-champagne focus:ring-offset-midnight',
    ghost:
      'text-ivory-dark hover:text-ivory hover:bg-white/5 focus:ring-ivory/30',
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
};

