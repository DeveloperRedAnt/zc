import Link from 'next/link';
import React from 'react';

export interface MenuLinkProps {
  url: string;
  title: string;
  isActive: boolean;
  IconComponent?: React.ComponentType<{
    theme?: string;
    size?: string | number;
    style?: React.CSSProperties;
    fill?: string;
    className?: string;
  }>;
}

const MenuLink: React.FC<MenuLinkProps> = ({ url, title, IconComponent, isActive }) => {
  return (
    <Link
      href={url}
      data-active={isActive ? 'true' : 'false'}
      className="group flex w-full items-center gap-2 overflow-hidden rounded-md text-left outline-hidden ring-sidebar-ring transition-all focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-[2.75rem] text-sm pl-2"
    >
      {/* Icon */}
      {IconComponent && (
        <IconComponent
          theme="outline"
          size="16"
          style={{ width: '16.34px', height: '16px' }}
          fill="currentColor"
          className="ml-2"
        />
      )}

      {/* Teks */}
      <span className="ml-2 font-normal text-sm leading-[20px] align-middle truncate">{title}</span>
    </Link>
  );
};

export default MenuLink;
