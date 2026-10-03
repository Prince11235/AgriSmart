import { cn } from '../../lib/utils';

export function Badge({ className, variant = 'default', ...props }) {
  const styles =
    variant === 'outline'
      ? 'border border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
      : 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200';
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', styles, className)}
      {...props}
    />
  );
}
