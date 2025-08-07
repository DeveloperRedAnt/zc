'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import OrderDetails from '@/modules/packages/payment-confirmation/order-details';
import SelectService from '@/modules/packages/payment-confirmation/select-service';

// Using the imported Member type from '@/modules/member/types/member'

export default function PaymentConfirmationPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <PageLayout title="Pilih Layanan">
        <SelectService />
      </PageLayout>
      <PageLayout className="h-fit" title="Detail Pemesanan">
        <OrderDetails />
      </PageLayout>
    </div>
  );
}
