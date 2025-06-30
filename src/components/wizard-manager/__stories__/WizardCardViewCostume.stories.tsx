import { Button } from '@/components/button/button';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../card/card';
import MultiStepWizard, { Step } from '../multi-step-wizard';
import Step1RegisterForm, { RegisterFormData } from '../register-user';
import WizardContainer from '../wizard-container';
import WizardHeader from '../wizard-header';
import WizardProgressBar from '../wizard-progress-bar';

const meta: Meta<typeof WizardContainer> = {
  title: 'Basic Components/WizardCardContainer',
  component: WizardContainer,
};

export default meta;

type Story = StoryObj<typeof WizardContainer>;

export const Default: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<RegisterFormData | null>(null);

    const handleFormSubmit = (data: RegisterFormData) => {
      setFormData(data);
      setCurrentStep(1);
    };
    const steps: Step[] = [
      {
        id: 1,
        title: 'Step 1',
        content: <Step1RegisterForm onSubmit={handleFormSubmit} defaultValues={formData || {}} />,
      },
      {
        id: 2,
        title: 'Preview',
        content: (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preview Data Pendaftar</h3>
            {formData ? (
              <div className="bg-gray-50 border border-gray-200 p-4 rounded">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Tidak ada data yang tersedia.</p>
            )}
          </div>
        ),
      },
    ];

    const onNextStep = () => {
      if (currentStep === 0) {
        const fakeButton = document.querySelector(
          'form button[type="submit"]'
        ) as HTMLButtonElement;
        fakeButton?.click();
      } else if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    };

    const onPrevStep = () => {
      if (currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
      }
    };

    return (
      <Card className="w-[600px] max-w-full mx-auto">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="flex flex-col gap-2">
            <div className="flex justify-between items-center w-full">
              <span className="text-lg font-semibold">Tambah User</span>
              <WizardHeader currentStep={currentStep} totalSteps={steps.length} />
            </div>
            <WizardProgressBar currentStep={currentStep} totalSteps={steps.length} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MultiStepWizard steps={steps} currentStep={currentStep} />
        </CardContent>
        <CardFooter>
          <div className="flex justify-end items-center w-full">
            <Button
              onClick={onPrevStep}
              disabled={currentStep === 0}
              className={`px-4 py-2 text-sm font-medium rounded-md mr-2 ${
                currentStep === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Sebelumnya
            </Button>

            <Button
              onClick={onNextStep}
              className="px-6 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              {currentStep === steps.length - 1 ? 'Selesai' : 'Selanjutnya'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  },
};
