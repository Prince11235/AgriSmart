import { cn } from '../../lib/utils';

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-xl bg-gray-200/80 dark:bg-gray-700/50', className)}
      {...props}
    />
  );
}
