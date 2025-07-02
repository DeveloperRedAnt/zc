export const dynamic = 'force-dynamic';

import SkeletonCardContent from '@/components/card/skeleton-card-content';
import KBar from '@/components/kbar/kbar';
import AppSidebar from '@/components/layouts/app-sidebar';
import PageContainer from '@/components/layouts/page-container';
import { PageLayout } from '@/components/page-layout/page-layout';
import { SidebarInset, SidebarProvider } from '@/components/sidebar/sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zycash Dashboard',
  description: 'Dashboard Zycash',
};

export default function LoadingPage() {
  return (
    <KBar>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar isLoading={true} />
        <SidebarInset>
          <PageContainer isLoading={true}>
            <PageLayout isLoading={true}>
              <SkeletonCardContent />
            </PageLayout>
          </PageContainer>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
