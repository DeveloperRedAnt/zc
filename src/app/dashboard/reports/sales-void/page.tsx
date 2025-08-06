'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import VoidReportTable from '@/modules/reports/sales-void/components/sales-void-table';

export default function page() {
  return (
    <PageLayout title="Laporan Void">
      <VoidReportTable />
    </PageLayout>
  );
}
