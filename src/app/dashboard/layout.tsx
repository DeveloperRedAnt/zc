export const dynamic = 'force-dynamic';

import KBar from '@/components/kbar/kbar';
import AppSidebar from '@/components/layouts/app-sidebar';
import PageContainer from '@/components/layouts/page-container';
import { SidebarInset, SidebarProvider } from '@/components/sidebar/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Zycash Dashboard',
  description: 'Dashboard Zycash',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <PageContainer>{children}</PageContainer>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
