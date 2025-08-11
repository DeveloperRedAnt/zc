'use client';

import { FormValidationProvider } from '@/hooks/use-form-validator/form-validation-context';
import { useFormValidator } from '@/hooks/use-form-validator/use-form-validator';
import FormProductForm from '@/modules/products-edit/components/form-product';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Index() {
  const [toggleStatusTrackingEnabled, setToggleStatusTrackingEnabled] = useState(true);
  const router = useRouter();
  const { validateFields } = useFormValidator();

  return (
    <FormValidationProvider>
      <FormProductForm
        toggleStatusTrackingEnabled={toggleStatusTrackingEnabled}
        onTrackStockChange={setToggleStatusTrackingEnabled}
        validateFields={validateFields}
        router={router}
      />
    </FormValidationProvider>
  );
}
