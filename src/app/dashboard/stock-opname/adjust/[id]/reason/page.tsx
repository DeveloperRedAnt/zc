'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import AdjustmentReasonStockOpnameForm from '@/modules/stock-opname/components/adjustment-reason-stock-opname';

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <PageLayout title="Alasan Selisih Stok Opname">
      <AdjustmentReasonStockOpnameForm stockOpnameId={params.id} />
    </PageLayout>
  );
}
