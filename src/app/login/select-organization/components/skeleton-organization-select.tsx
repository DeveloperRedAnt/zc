import { Skeleton } from '@/components/skeleton/skeleton';
import { ReactNode } from 'react';

interface SkeletonSelectProps {
  label?: string;
  icon?: ReactNode;
  skeletonClassName?: string;
  containerClassName?: string;
}

export const SkeletonSelect: React.FC<SkeletonSelectProps> = ({
  label = 'Pilih Organisasi',
  icon,
  skeletonClassName = 'w-full h-10 rounded',
  containerClassName = 'flex flex-col gap-2 mb-2',
}) => (
  <div className={containerClassName}>
    <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
      {icon}
      {label}
    </label>
    <Skeleton className={skeletonClassName} />
  </div>
);
