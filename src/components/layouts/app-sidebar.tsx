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
import { HistoryQuery, LinkTwo, MoreOne, Power, Remind } from '@icon-park/react';
import { IconChevronRight, IconPhotoUp } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import CompanyLogo from '../company-logo/company-logo';
import { IconsPark } from '../icons/icons-park';
import MenuLink from '../menu-link/menu-link';
export const company = {
  name: 'Acme Inc',
  logo: IconPhotoUp,
  plan: 'Enterprise',
};

export default function AppSidebar() {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const segment = segments[2] || segments[1] || '';
  const router = useRouter();

  React.useEffect(() => {
    // Side effects based on sidebar state changes
  }, []);
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>
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
          </SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
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
                      <SidebarMenuButton tooltip={item.title} isActive={segment === item.urlActive}>
                        {item.title}
                        <IconChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={segment === subItem.urlActive}>
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
                      fullName: 'Ridho',
                      emailAddresses: [
                        {
                          emailAddress: 'ridho@ridho.com',
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
                          fullName: 'Ridho',
                          emailAddresses: [
                            {
                              emailAddress: 'ridho@ridho.com',
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
                <DropdownMenuItem>
                  <Power
                    theme="filled"
                    size="16"
                    style={{ width: '16.34px', height: '16px' }}
                    fill="#FC8888"
                    className="mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="text-[#FC8888]"
                  >
                    Log Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
