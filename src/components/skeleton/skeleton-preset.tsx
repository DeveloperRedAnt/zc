import { Skeleton } from '@/components/skeleton/skeleton';
import { cn } from '@/libs/utils';
import React from 'react';

type SkeletonPresetProps = {
  w?: string;
  h?: string;
  className?: string;
};

const SkeletonPreset: React.FC<SkeletonPresetProps> = ({ w, h, className = '' }) => {
  return <Skeleton className={cn(h || 'h-4', w || 'w-24', className)} />;
};

export default SkeletonPreset;
