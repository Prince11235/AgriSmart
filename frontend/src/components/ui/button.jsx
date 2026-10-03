import * as React from 'react';
import { cn } from '../../lib/utils';

const variants = {
  default:
    'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-500 hover:to-teal-500',
  outline:
    'border border-emerald-500/40 bg-transparent text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10',
  ghost: 'bg-transparent hover:bg-emerald-500/10 text-gray-700 dark:text-gray-200',
  destructive: 'bg-red-600 text-white hover:bg-red-500',
};

const sizes = {
  default: 'h-10 px-4 py-2 text-sm',
  sm: 'h-8 rounded-lg px-3 text-xs',
  lg: 'h-11 rounded-xl px-8 text-sm',
  icon: 'h-10 w-10',
};

export const Button = React.forwardRef(
  ({ className, variant = 'default', size = 'default', type = 'button', ...props }, ref) => (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = 'Button';
