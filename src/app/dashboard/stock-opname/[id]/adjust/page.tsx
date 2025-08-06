'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import AdjustmentStockOpnameForm from '@/modules/stock-opname/components/adjustment-stock-opname-form';

export default function Page() {
  return (
    <PageLayout title="Penyesuaian Stok Opname">
      <AdjustmentStockOpnameForm />
    </PageLayout>
  );
}
