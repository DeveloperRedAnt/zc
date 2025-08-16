'use client';

import StoreFilter from '@/components/store-filter/store-filter';
import { usePathname } from 'next/navigation';
import React from 'react';
import { SidebarTrigger } from '../sidebar/sidebar';
import { Breadcrumbs } from './breadcrumbs';

export default function Header({ isLoading = false }: { isLoading?: boolean }) {
  const pathname = usePathname();

  const showFilter = [
    '/dashboard/member',
    '/dashboard/products',
    '/dashboard/vouchers',
    '/dashboard/users',
  ].some((path) => pathname?.startsWith(path));

  return (
    <header
      className="flex h-[72px] shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[72px] 
      bg-white rounded-[0.5rem] m-[1rem] border-[1px solid #F1F5F9] shadow-sm"
    >
      <div className="flex items-center gap-2 px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="text-[#C2C7D0]">{'|'}</div>
        <Breadcrumbs isLoading={isLoading} />
      </div>

      {showFilter && (
        <div className="px-6">
          <StoreFilter />
        </div>
      )}
    </header>
  );
}
