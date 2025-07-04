'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormValidator } from '@/hooks/use-form-validator/use-form-validator';
import { FormValidationProvider } from '@/hooks/use-form-validator/form-validation-context';
import FormProductForm from '@/modules/product/components/form-product';

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
