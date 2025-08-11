'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import FormOptions from '@/modules/product-variant/components/variant-options/form-options';

export default function page() {
  return (
    <PageLayout title="Edit Opsi Varian">
      <FormOptions />
    </PageLayout>
  );
}
