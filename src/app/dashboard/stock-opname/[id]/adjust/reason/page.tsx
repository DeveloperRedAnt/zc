'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import AdjustmentReasonStockOpnameForm from '@/modules/stock-opname/components/adjustment-reason-stock-opname';

export default function Page() {
  return (
    <PageLayout title="Alasan Selisih Stok Opname">
      <AdjustmentReasonStockOpnameForm />
    </PageLayout>
  );
}
