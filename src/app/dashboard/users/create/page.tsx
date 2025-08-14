'use client';

import { useCreateEmployee, useUpdateEmployee } from '@/__generated__/api/hooks';
import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import { toast } from '@/components/toast/toast';
import MultiStepWizard, { Step } from '@/components/wizard-manager/multi-step-wizard';
import WizardHeader from '@/components/wizard-manager/wizard-header';
import WizardProgressBar from '@/components/wizard-manager/wizard-progress-bar';
import Step1DetailUserForm from '@/modules/user/components/step1-detail-user-form';
import Step2PermissionForm from '@/modules/user/components/step2-permission-form';
import { useUserStore } from '@/modules/user/store';
import { ArrowRight } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function page() {
  const router = useRouter();

  const {
    name,
    phone,
    id_number,
    email,
    password,
    password_confirmation,
    isActive,
    photo,
    isFormValid,
  } = useUserStore();

  const [employeeId, setEmployeeId] = useState<number | null>(null);

  const { mutateAsync: createEmployee } = useCreateEmployee();
  const { mutateAsync: updateEmployee } = useUpdateEmployee();

  useEffect(() => {
    const stored = localStorage.getItem('employeeId');
    if (stored) {
      setEmployeeId(Number(stored));
    }
  }, []);

  const steps: Step[] = [
    { id: 1, title: 'Step 1', content: <Step1DetailUserForm employeeId={employeeId} /> },
    { id: 2, title: 'Step 2', content: <Step2PermissionForm /> },
  ];

  const submitStep1 = async () => {
    if (!isFormValid()) {
      toast.warning('Perhatian!', {
        description: 'Harap lengkapi data terlebih dahulu',
      });
      return;
    }

    const basePayload = {
      name,
      phone,
      id_number,
      email,
      password,
      password_confirmation,
      is_active: isActive,
    };

    try {
      if (!employeeId) {
        const payload = photo ? { ...basePayload, image: photo } : basePayload;

        const response = await createEmployee({
          body: payload,
        });

        const newId = response.id; // Access id directly from response
        localStorage.setItem('employeeId', String(newId));
        setEmployeeId(newId);
        router.push(`/dashboard/users/${newId}/assign-permission`);
      } else {
        await updateEmployee({
          id: employeeId,
          body: photo ? { ...basePayload, image: photo } : basePayload,
        });
        router.push(`/dashboard/users/${employeeId}/assign-permission`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Gagal!', {
        description:
          'Gagal menyimpan user, Pastikan No. Whatsapp dan Email tidak sama dengan user lain',
      });
    }
  };

  return (
    <PageLayout
      title="Tambah User"
      button={<WizardHeader currentStep={0} totalSteps={steps.length} />}
    >
      <WizardProgressBar currentStep={0} totalSteps={steps.length} />

      <MultiStepWizard steps={steps} currentStep={0} />

      <div className="flex justify-end gap-2 mt-4">
        <>
          <Button
            variant="outline"
            className="border-[#c2c7d0] text-[#555555]"
            onClick={() => {
              router.push('/dashboard/users');
            }}
          >
            Batal
          </Button>
          <Button variant="info" onClick={submitStep1} disabled={!isFormValid()}>
            Simpan Detail User
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </>
      </div>
    </PageLayout>
  );
}
