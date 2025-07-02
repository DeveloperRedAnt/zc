'use client';

import { Button } from '@/components/button/button';
import { PageLayout } from '@/components/page-layout/page-layout';
import Step1DetailUserForm from '@/modules/user/components/step1-detail-user-form';
import Step2PermissionForm from '@/modules/user/components/step2-permission-form';
import MultiStepWizard, { Step } from '@/components/wizard-manager/multi-step-wizard';
import WizardHeader from '@/components/wizard-manager/wizard-header';
import WizardProgressBar from '@/components/wizard-manager/wizard-progress-bar';
import React, { useState } from 'react';
import { ArrowRight } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/modules/user/store';

export default function page() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const { isFormValid } = useUserStore();

  const steps: Step[] = [
    {id: 1, title: 'Step 1', content: <Step1DetailUserForm />},
    {id: 2, title: 'Step 2', content: <Step2PermissionForm />},
  ];

  const onNextStep = () => {
    if (currentStep === 0 && !isFormValid()) {
      alert('Harap lengkapi data terlebih dahulu');
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const onPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const {
    name,
    whatsapp,
    ktp,
    email,
    password,
    isActive,
    photo,
    orgPermissions,
  } = useUserStore();

  const handleSubmit = () => {
    const payload = {
      name,
      whatsapp,
      ktp,
      email,
      password,
      is_active: isActive,
      photo, // File
      permissions: orgPermissions.map(org => ({
        orgId: org.orgId,
        position: org.position,
        permissions: org.permissions.flatMap(group =>
          group.permissions.filter(p => p.enabled).map(p => p.id)
        ),
      })),
    };

    console.log(payload);
  };


  return (
    <PageLayout title="Tambah User"
      button={<WizardHeader currentStep={currentStep} totalSteps={steps.length} />}
    >
      <WizardProgressBar currentStep={currentStep} totalSteps={steps.length} />

      <MultiStepWizard steps={steps} currentStep={currentStep} />

      <div className="flex justify-end gap-2 mt-4">
        {currentStep === 0 ? (
          <>
            <Button
              variant="outline"
              className="border-[#c2c7d0] text-[#555555]"
              onClick={() => router.push('/dashboard/users')}
            >
              Batal
            </Button>
            <Button 
              variant="info" 
              onClick={onNextStep}
              disabled={!isFormValid()}
            >
              Simpan Detail User
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              className="border-[#c2c7d0] text-[#555555]"
              onClick={onPrevStep}
            >
              Kembali ke Detail User
            </Button>
            <Button 
              variant="success"
              onClick={handleSubmit}
            >
              Simpan User
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </>
        )}
      </div>
    </PageLayout>
  );
}
