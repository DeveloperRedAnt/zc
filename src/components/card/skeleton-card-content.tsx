import { cn } from '@/libs/utils';

interface SkeletonCardContentProps {
  className?: string;
  rows?: number;
  showFilter?: boolean;
  showTable?: boolean;
}

export default function SkeletonCardContent({ className }: SkeletonCardContentProps) {
  return (
    <div className={cn('p-4 space-y-4', className)}>
      <div className="w-full h-48 rounded-lg  bg-skeleton-dark animate-pulse mb-4" />
    </div>
  );
}
