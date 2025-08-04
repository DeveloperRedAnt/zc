'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import InteractiveTabs from '@/modules/master-data/components/interactive-tab';
import ProductUnitContent from '@/modules/master-data/components/product-unit/product-unit-content';
import QueueCounterContent from '@/modules/master-data/components/queue-counter-content';
import TaxMasterContent from '@/modules/master-data/components/tax-master-content';

// Generic placeholder component for not-yet-implemented tabs
function PlaceholderContent({ title }: { title: string }) {
  return (
    <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start w-full">
      <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0 w-full">
        <div className="flex flex-col font-['Poppins:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#555555] text-[16px] text-left text-nowrap">
          <p className="block leading-[24px] whitespace-pre font-semibold">{title}</p>
        </div>
      </div>
      <div className="box-border content-stretch flex flex-col gap-4 items-center justify-center p-8 relative shrink-0 w-full bg-gray-50 rounded-lg">
        <div className="text-[#555555] text-[16px] font-['Poppins:Medium',_sans-serif]">
          Fitur {title} belum tersedia
        </div>
        <div className="text-[#888888] text-[14px] font-['Nunito:Regular',_sans-serif] text-center">
          Halaman ini sedang dalam pengembangan
        </div>
      </div>
    </div>
  );
}

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
    content: <PlaceholderContent title="Tags Produk" />,
  },
  {
    tab: {
      id: 'varian-produk',
      label: 'Varian Produk',
    },
    content: <PlaceholderContent title="Varian Produk" />,
  },
  {
    tab: {
      id: 'jabatan',
      label: 'Jabatan',
    },
    content: <PlaceholderContent title="Jabatan" />,
  },
  {
    tab: {
      id: 'cetak-no-antrian',
      label: 'Cetak No Antrian',
    },
    content: <PlaceholderContent title="Cetak No Antrian" />,
  },
  {
    tab: {
      id: 'service-charge',
      label: 'Service Charge',
    },
    content: <PlaceholderContent title="Service Charge" />,
  },
  {
    tab: {
      id: 'metode-pembayaran',
      label: 'Metode Pembayaran',
    },
    content: <PlaceholderContent title="Metode Pembayaran" />,
  },
];

export default function page() {
  return (
    <PageLayout title="Master Data">
      <InteractiveTabs title="Master Data" contents={tabContents} defaultActiveTab="master-pajak" />
    </PageLayout>
  );
}
