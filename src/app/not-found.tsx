export const dynamic = 'force-dynamic';

import KBar from '@/components/kbar/kbar';
import AppSidebar from '@/components/layouts/app-sidebar';
import PageContainer from '@/components/layouts/page-container';
import { PageLayout } from '@/components/page-layout/page-layout';
import { SidebarInset, SidebarProvider } from '@/components/sidebar/sidebar';
import { EmptyState } from '@/components/state/empty-state/empty-state';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Zycash Dashboard - Not Found',
  description: 'Dashboard Zycash',
};

export default async function NotFoundPage() {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar isLoading={false} />
        <SidebarInset>
          <PageContainer>
            <PageLayout title="404 - Page Not Found">
              <EmptyState />
            </PageLayout>
          </PageContainer>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
