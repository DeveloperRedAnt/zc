import React from 'react';
import { SidebarTrigger } from '../sidebar/sidebar';
import { Breadcrumbs } from './breadcrumbs';

export default function Header() {
  return (
    <header
      className="flex h-[72px] shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 
      bg-white rounded-[0.5rem] m-[1rem] border-[1px solid #F1F5F9] shadow-sm"
    >
      <div className="flex items-center gap-2 px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="text-[#C2C7D0]">{'|'}</div>
        <Breadcrumbs />
      </div>
    </header>
  );
}
