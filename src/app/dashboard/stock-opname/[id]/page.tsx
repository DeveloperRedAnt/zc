'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import { StockOpnameDetail } from '@/modules/stock-opname/components';

export default function Page() {
  return (
    <PageLayout title="Detail Stok Opname" withoutPadding={true}>
      <StockOpnameDetail />
    </PageLayout>
  );
}
