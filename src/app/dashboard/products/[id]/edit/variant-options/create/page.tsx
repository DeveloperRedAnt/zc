'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import FormOptions from '@/modules/products-edit/components/options/form-add-options';

export default function page() {
  return (
    <PageLayout title="Tambah Opsi Varian">
      <FormOptions />
    </PageLayout>
  );
}
