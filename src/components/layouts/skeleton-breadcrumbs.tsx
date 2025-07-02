import { Skeleton } from '@/components/skeleton/skeleton';
import { cn } from '@/libs/utils';
import React from 'react';

type SkeletonBreadcrumbsProps = {
  w?: string;
  h?: string;
  className?: string;
};

const SkeletonBreadcrumbs: React.FC<SkeletonBreadcrumbsProps> = ({
  w = 'w-24',
  h = 'h-4',
  className = '',
}) => {
  return <Skeleton className={cn(h, w, className)} />;
};

export default SkeletonBreadcrumbs;
