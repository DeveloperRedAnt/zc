'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/collapsible/collapsible';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/dropdown-menu';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/sidebar/sidebar';

import { UserAvatarProfile } from '@/components/user-avatar-profile/user-avatar-profile';
import { navItems } from '@/constants/data';
import { useLogout } from '@/hooks/use-logout';
import { useOrganizationStore } from '@/store/organization-store';
import { BankCard, HistoryQuery, LinkTwo, MoreOne, Power, Remind } from '@icon-park/react';
import { IconChevronRight, IconPhotoUp } from '@tabler/icons-react';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import CompanyLogo from '../company-logo/company-logo';
import { IconsPark } from '../icons/icons-park';
import MenuLink from '../menu-link/menu-link';
import SkeletonSidebar from './skeleton-sidebar';

export const company = {
  name: 'Acme Inc',
  logo: IconPhotoUp,
  plan: 'Enterprise',
};

export default function AppSidebar({ isLoading }: { isLoading: boolean }) {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const segment = segments[2] || segments[1] || '';
  const router = useRouter();
  const logout = useLogout('/sign-in');
  const clearOrganization = useOrganizationStore((state) => state.clearOrganization);

  const totalNavItems = React.useMemo(() => {
    return navItems.reduce((count, item) => {
      if (item.items && item.items.length > 0) {
        return count + item.items.length;
      }
      return count + 1;
    }, 0);
  }, []);

  const handleLogout = React.useCallback(() => {
    clearOrganization();
    Cookies.remove('flex');
    logout();
  }, [clearOrganization, logout]);

  const { data: session } = useSession();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>
            {isLoading ? (
              <SkeletonSidebar w="w-full" h="h-8" />
            ) : (
              <CompanyLogo
                logoSrc={'/assets/zycas/zycas-logo.png'}
                companyName={'Zycas'}
                productName={'Dashboard'}
                logoStyle={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  height: 24,
                  marginRight: 8,
                }}
                companyNameClassName={'font-normal text-base leading-[30px] align-middle'}
                productNameClassName={'font-light text-base leading-[30px] align-middle'}
              />
            )}
          </SidebarGroupLabel>
          <SidebarMenu>
            {isLoading
              ? Array.from({ length: totalNavItems }, (_, index) => ({
                  id: `skeleton-${Date.now()}-${index}`,
                  index,
                })).map(({ id, index }) => (
                  <SidebarMenuItem key={id} style={{ animationDelay: `${index * 100}ms` }}>
                    {index % 3 === 0 && (
                      <div className="py-3 pl-4 pt-4">
                        <SkeletonSidebar w="w-20" h="h-3" />
                      </div>
                    )}
                    <SidebarMenuButton>
                      <div className="flex items-center w-full animate-pulse">
                        <SkeletonSidebar w="w-4" h="h-4" className="mr-3" />
                        <SkeletonSidebar w={`w-${[16, 20, 24, 28][index % 4]}`} h="h-4" />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              : navItems.map((item) => {
                  const IconComponent = item.icon
                    ? (IconsPark[item.icon] as React.ComponentType<{
                        theme?: string;
                        size?: string | number;
                        style?: React.CSSProperties;
                        fill?: string;
                      }>)
                    : undefined;
                  return item?.items && item?.items?.length > 0 ? (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={item.isActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            isActive={segment === item.urlActive}
                          >
                            {item.title}
                            <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={segment === subItem.urlActive}
                                >
                                  <Link href={subItem.url}>{subItem.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <div className="py-3 font-medium text-sm leading-[20px] group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:-mt-6 pl-4 pt-4">
                        {item.groupTitle}
                      </div>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={segment === item.urlActive}
                      >
                        <MenuLink
                          url={item.url}
                          title={item.title}
                          isActive={segment === item.urlActive}
                          IconComponent={IconComponent ?? undefined}
                        />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {!isLoading ? (
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <UserAvatarProfile
                      className="h-8 w-8 rounded-lg"
                      showInfo
                      user={{
                        fullName: session?.user?.name,
                        emailAddresses: [
                          {
                            emailAddress: session?.user?.email as string,
                          },
                        ],
                      }}
                    />
                    <MoreOne size="16" className="ml-auto w-[16.34px] h-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  side="right"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div
                      className="px-1 py-1.5 cursor-pointer hover:bg-muted"
                      onClick={() => router.push('/dashboard/profile')}
                    >
                      {
                        <UserAvatarProfile
                          className="h-8 w-8 rounded-lg"
                          showInfo
                          user={{
                            fullName: session?.user?.name,
                            emailAddresses: [
                              {
                                emailAddress: session?.user?.email as string,
                              },
                            ],
                          }}
                        />
                      }
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link href="/dashboard/packages" className="flex items-center">
                        <BankCard
                          size="16"
                          style={{ width: '16.34px', height: '16px' }}
                          className="mr-4"
                        />
                        Manajemen Langganan
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HistoryQuery
                        size="16"
                        style={{ width: '16.34px', height: '16px' }}
                        className="mr-2"
                      />
                      Riwayat Paket
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Remind
                        size="16"
                        style={{ width: '16.34px', height: '16px' }}
                        className="mr-2"
                      />
                      Notifikasi
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LinkTwo
                        size="16"
                        style={{ width: '16.34px', height: '16px' }}
                        className="mr-2"
                        onClick={() => router.push('/dashboard/profile/devices')}
                      />
                      Device Tertaut
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <Power
                      theme="filled"
                      size="16"
                      style={{ width: '16.34px', height: '16px' }}
                      fill="#FC8888"
                      className="mr-2"
                    />
                    <span className="text-[#FC8888]">Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <SkeletonSidebar w="w-8" h="h-8" className="rounded-lg" />
                <div className="flex-1 ml-2 space-y-1">
                  <SkeletonSidebar w="w-16" h="h-3" />
                  <SkeletonSidebar w="w-24" h="h-3" />
                </div>
                <SkeletonSidebar w="w-4" h="h-4" className="ml-auto" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
