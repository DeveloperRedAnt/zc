'use client';

import { PageLayout } from '@/components/page-layout/page-layout';
import EditForm from '@/modules/user/components/edit-form';

export default function page() {
  return (
    <PageLayout title="Edit User">
      <EditForm />
    </PageLayout>
  );
}
