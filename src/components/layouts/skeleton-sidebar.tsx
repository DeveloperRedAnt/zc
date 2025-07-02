import { Skeleton } from '@/components/skeleton/skeleton';
import { cn } from '@/libs/utils';
import React from 'react';

type SkeletonSidebarProps = {
  w?: string;
  h?: string;
  className?: string;
};

const SkeletonSidebar: React.FC<SkeletonSidebarProps> = ({
  w = 'w-24',
  h = 'h-4',
  className = '',
}) => {
  return <Skeleton className={cn(h, w, className)} />;
};

export default SkeletonSidebar;
