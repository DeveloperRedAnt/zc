'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const InteractiveTabs = dynamic(() => import('@/modules/master-data/components/interactive-tab'), {
  loading: () => (
    <div className="space-y-4">
      <div className="flex border-b">
        {Array.from({ length: 5 }, () => (
          <div
            key={crypto.randomUUID()}
            className="h-12 w-24 bg-gray-200 rounded-t animate-pulse mr-2"
          />
        ))}
      </div>
      <div className="h-96 bg-gray-200 rounded animate-pulse" />
    </div>
  ),
});

const TaxMasterContent = dynamic(
  () => import('@/modules/master-data/components/tax-master/tax-master-content'),
  { loading: () => <div className="h-64 bg-gray-200 rounded animate-pulse" /> }
);

const QueueCounterContent = dynamic(
  () => import('@/modules/master-data/components/queue-counter/queue-counter-content'),
  { loading: () => <div className="h-64 bg-gray-200 rounded animate-pulse" /> }
);

const ProductUnitContent = dynamic(
  () => import('@/modules/master-data/components/product-unit/product-unit-content'),
  { loading: () => <div className="h-64 bg-gray-200 rounded animate-pulse" /> }
);

const ProductTagsContent = dynamic(
  () => import('@/modules/master-data/components/product-tags/product-tags-content'),
  { loading: () => <div className="h-64 bg-gray-200 rounded animate-pulse" /> }
);

const ProductVariantContent = dynamic(
  () => import('@/modules/master-data/components/product-variant/product-variant-content'),
  { loading: () => <div className="h-64 bg-gray-200 rounded animate-pulse" /> }
);

const PositionContent = dynamic(
  () => import('@/modules/master-data/components/position/position-content'),
  { loading: () => <div className="h-64 bg-gray-200 rounded animate-pulse" /> }
);

const PrintQueueContent = dynamic(
  () => import('@/modules/master-data/components/print-queue-content'),
  { loading: () => <div className="h-64 bg-gray-200 rounded animate-pulse" /> }
);

const ServiceChargeContent = dynamic(
  () => import('@/modules/master-data/components/service-charge-content'),
  { loading: () => <div className="h-64 bg-gray-200 rounded animate-pulse" /> }
);

const PaymentMethodContent = dynamic(
  () => import('@/modules/master-data/components/payment-method-content'),
  { loading: () => <div className="h-64 bg-gray-200 rounded animate-pulse" /> }
);

// Define tab contents with Suspense wrappers
const getTabContents = () => [
  {
    tab: {
      id: 'master-pajak',
      label: 'Master Pajak',
    },
    content: (
      <Suspense fallback={<div className="h-64 bg-gray-200 rounded animate-pulse" />}>
        <TaxMasterContent />
      </Suspense>
    ),
  },
  {
    tab: {
      id: 'no-urut-nota',
      label: 'No. Urut Nota',
    },
    content: (
      <Suspense fallback={<div className="h-64 bg-gray-200 rounded animate-pulse" />}>
        <QueueCounterContent />
      </Suspense>
    ),
  },
  {
    tab: {
      id: 'unit-produk',
      label: 'Unit Produk',
    },
    content: (
      <Suspense fallback={<div className="h-64 bg-gray-200 rounded animate-pulse" />}>
        <ProductUnitContent />
      </Suspense>
    ),
  },
  {
    tab: {
      id: 'tags-produk',
      label: 'Tags Produk',
    },
    content: (
      <Suspense fallback={<div className="h-64 bg-gray-200 rounded animate-pulse" />}>
        <ProductTagsContent />
      </Suspense>
    ),
  },
  {
    tab: {
      id: 'variant-produk',
      label: 'Varian Produk',
    },
    content: (
      <Suspense fallback={<div className="h-64 bg-gray-200 rounded animate-pulse" />}>
        <ProductVariantContent />
      </Suspense>
    ),
  },
  {
    tab: {
      id: 'jabatan',
      label: 'Jabatan',
    },
    content: (
      <Suspense fallback={<div className="h-64 bg-gray-200 rounded animate-pulse" />}>
        <PositionContent />
      </Suspense>
    ),
  },
  {
    tab: {
      id: 'cetak-no-antrian',
      label: 'Cetak No Antrian',
    },
    content: (
      <Suspense fallback={<div className="h-64 bg-gray-200 rounded animate-pulse" />}>
        <PrintQueueContent />
      </Suspense>
    ),
  },
  {
    tab: {
      id: 'service-charge',
      label: 'Service Charge',
    },
    content: (
      <Suspense fallback={<div className="h-64 bg-gray-200 rounded animate-pulse" />}>
        <ServiceChargeContent />
      </Suspense>
    ),
  },
  {
    tab: {
      id: 'metode-pembayaran',
      label: 'Metode Pembayaran',
    },
    content: (
      <Suspense fallback={<div className="h-64 bg-gray-200 rounded animate-pulse" />}>
        <PaymentMethodContent />
      </Suspense>
    ),
  },
];

export default function page() {
  const tabContents = getTabContents();

  return (
    <PageLayout title="Master Data">
      <Suspense
        fallback={
          <div className="space-y-4">
            <div className="flex border-b">
              {Array.from({ length: 9 }, () => (
                <div
                  key={crypto.randomUUID()}
                  className="h-12 w-24 bg-gray-200 rounded-t animate-pulse mr-2"
                />
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded animate-pulse" />
          </div>
        }
      >
        <InteractiveTabs
          title="Master Data"
          contents={tabContents}
          defaultActiveTab="master-pajak"
        />
      </Suspense>
    </PageLayout>
  );
}
