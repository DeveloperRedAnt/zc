'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import InteractiveTabs from '@/modules/master-data/components/interactive-tab';
import PaymentMethodContent from '@/modules/master-data/components/payment-method-content';
import PositionContent from '@/modules/master-data/components/position/position-content';
import PrintQueueContent from '@/modules/master-data/components/print-queue-content';
import ProductTagsContent from '@/modules/master-data/components/product-tags/product-tags-content';
import ProductUnitContent from '@/modules/master-data/components/product-unit/product-unit-content';
import ProductVariantContent from '@/modules/master-data/components/product-variant/product-variant-content';
import QueueCounterContent from '@/modules/master-data/components/queue-counter-content';
import ServiceChargeContent from '@/modules/master-data/components/service-charge-content';
import TaxMasterContent from '@/modules/master-data/components/tax-master-content';

// Define tab contents
const tabContents = [
  {
    tab: {
      id: 'master-pajak',
      label: 'Master Pajak',
    },
    content: <TaxMasterContent />,
  },
  {
    tab: {
      id: 'no-urut-nota',
      label: 'No. Urut Nota',
    },
    content: <QueueCounterContent />,
  },
  {
    tab: {
      id: 'unit-produk',
      label: 'Unit Produk',
    },
    content: <ProductUnitContent />,
  },
  {
    tab: {
      id: 'tags-produk',
      label: 'Tags Produk',
    },
    content: <ProductTagsContent />,
  },
  {
    tab: {
      id: 'variant-produk',
      label: 'Varian Produk',
    },
    content: <ProductVariantContent />,
  },
  {
    tab: {
      id: 'jabatan',
      label: 'Jabatan',
    },
    content: <PositionContent />,
  },
  {
    tab: {
      id: 'cetak-no-antrian',
      label: 'Cetak No Antrian',
    },
    content: <PrintQueueContent />,
  },
  {
    tab: {
      id: 'service-charge',
      label: 'Service Charge',
    },
    content: <ServiceChargeContent />,
  },
  {
    tab: {
      id: 'metode-pembayaran',
      label: 'Metode Pembayaran',
    },
    content: <PaymentMethodContent />,
  },
];

export default function page() {
  return (
    <PageLayout title="Master Data">
      <InteractiveTabs title="Master Data" contents={tabContents} defaultActiveTab="master-pajak" />
    </PageLayout>
  );
}
