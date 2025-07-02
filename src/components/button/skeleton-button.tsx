import SkeletonPreset from '@/components/skeleton/skeleton-preset';
import { cn } from '@/libs/utils';
import React from 'react';

interface SkeletonButtonProps {
  w?: string;
  h?: string;
  className?: string;
}

const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  w = 'w-24',
  h = 'h-10',
  className = '',
}) => {
  return <SkeletonPreset w={w} h={h} className={cn(className)} />;
};

export default SkeletonButton;
