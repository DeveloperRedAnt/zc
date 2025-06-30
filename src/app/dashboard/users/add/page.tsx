'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import AddUserForm from '@/modules/profile/components/add-user-form';

export default function page() {
  return (
    <PageLayout title="Tambah User">
      <AddUserForm />
    </PageLayout>
  );
}
