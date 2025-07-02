'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/breadcrumb/breadcrumb';

import { useBreadcrumbs } from '@/hooks/use-breadcrumbs/use-breadcrumbs';
import { Right } from '@icon-park/react';
import { Fragment } from 'react';
import SkeletonPreset from '../skeleton/skeleton-preset';
import SkeletonBreadcrums from './skeleton-breadcrumbs';

type BreadcrumbItemType = {
  title: string;
  link: string;
};

export function Breadcrumbs({ isLoading = false }: { isLoading?: boolean }) {
  const items = useBreadcrumbs();

  if (items.length === 0 && !isLoading) return null;

  const renderBreadcrumbItem = (item: BreadcrumbItemType, index: number) => {
    const isLastItem = index === items.length - 1;

    const breadcrumbLink = !isLastItem && (
      <BreadcrumbItem className="hidden md:block mr-1">
        <BreadcrumbLink className="font-semibold text-disabled" href={item.link}>
          {isLoading ? (
            <SkeletonBreadcrums
              className="rounded-sm bg-gray-200 dark:bg-gray-700"
              w="w-24"
              h="h-4"
            />
          ) : (
            item.title
          )}
        </BreadcrumbLink>
      </BreadcrumbItem>
    );

    const breadcrumbSeparator = !isLastItem && (
      <BreadcrumbSeparator className="hidden md:block mr-1">
        <Right className="text-disabled" />
      </BreadcrumbSeparator>
    );

    const breadcrumbPage = isLastItem && (
      <BreadcrumbPage className="font-semibold mr-1">
        {isLoading ? (
          <SkeletonPreset w="w-24" h="h-4" className="rounded-sm bg-gray-200 dark:bg-gray-700" />
        ) : (
          item.title
        )}
      </BreadcrumbPage>
    );

    return (
      <Fragment key={`${item.title}-${index}`}>
        {breadcrumbLink}
        {breadcrumbSeparator}
        {breadcrumbPage}
      </Fragment>
    );
  };

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-4 sm:gap-4">{items.map(renderBreadcrumbItem)}</BreadcrumbList>
    </Breadcrumb>
  );
}
