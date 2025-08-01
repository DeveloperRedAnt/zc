import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/card/card';
import { cn } from '@/libs/utils';
import React from 'react';
import SkeletonButton from '../button/skeleton-button';

interface PageLayoutProps {
  title?: string;
  button?: React.ReactNode;
  description?: string;
  requiredText?: string;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

export const PageSection: React.FC<PageLayoutProps> = ({
  title,
  button = null,
  description = '',
  requiredText = '',
  children,
  className = '',
  isLoading = false,
}) => {
  return (
    <Card className={cn(className, 'my-2')}>
      <CardHeader className="p-6 border-b border-[#F1F5F9]">
        <div className="flex justify-between items-center">
          {isLoading ? (
            <>
              <SkeletonButton className="w-[110px]" />
              <SkeletonButton className="w-[140px] mr-3.5" />
            </>
          ) : (
            <>
              <CardTitle className="size-[16px] leading-[24px] text-nowrap text-foreground">
                {title}
              </CardTitle>
              {button}
            </>
          )}
        </div>
      </CardHeader>

      {(description || requiredText) && (
        <div className="p-6">
          {description && (
            <CardDescription className="text-[#555555]">{description}</CardDescription>
          )}
          {requiredText && <p className="text-sm text-[#F08181] mt-2">{requiredText}</p>}
        </div>
      )}
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  );
};
