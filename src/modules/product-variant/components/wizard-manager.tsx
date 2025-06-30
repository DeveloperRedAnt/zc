'use client';

import { Button } from '@/components/button/button';
import { CardContent, CardHeader } from '@/components/card/card';
import { Progress } from '@/components/progress/progress';
import { Text } from '@/components/text/text';
import React, { useState } from 'react';
import { useProductVariantStore } from '../store';
import { ProductVariantStore } from '../types'; // Adjust the import path as needed
import AddProductVariant from './step-1-add-variant';
import AddDetailVariant from './step-2-detail-variant';
import AddMultiPrice from './step-3-add-price';

const WizardManager = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const { formattedData } = useProductVariantStore() as ProductVariantStore;

  // Move to step 2 with variants data from step 1
  const handleSaveVariant = () => {
    setCurrentStep(2);
  };

  // Save step 2 detail data then go to step 3
  const handleSaveDetail = () => {
    setCurrentStep(3);
  };

  // Save price data from step 3 (final save)
  const handleSavePrices = () => {
    setCurrentStep(4);
  };

  // Go back one step
  const handlePreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 4) {
    }
  };

  return (
    <>
      <CardHeader className="border-b border-gray-300 group flex flex-row flex justify-between w-full gap-2">
        <Text size="md" className="font-semibold text-base leading-6 align-middle text-[#555555]">
          Wizard Varian
        </Text>
        <Text size="md" className="text-base leading-6 align-middle text-[#555555]">
          Step {currentStep} dari 3
        </Text>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-[32px] pt-5 pb-5">
          <Progress size="default" value={(currentStep / 3) * 100} className="w-[559px] h-[16px]" />
        </div>
        {currentStep === 1 && (
          <>
            <AddProductVariant onSave={handleSaveVariant} />
          </>
        )}
        {currentStep === 2 && (
          <>
            <AddDetailVariant onBack={handlePreviousStep} onSaveDetail={handleSaveDetail} />
          </>
        )}
        {currentStep === 3 && (
          <>
            <AddMultiPrice onSave={handleSavePrices} onBack={handlePreviousStep} />
          </>
        )}
        {currentStep === 4 && (
          <>
            {/* this view will showed when u commented redirect function at step 3 */}
            <pre className="p-4 bg-gray-100 rounded text-xs text-gray-700 mb-2 overflow-x-auto">
              {JSON.stringify(formattedData, null, 2)}
            </pre>
            <div className="mt-2 flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setCurrentStep(3);
                    handlePreviousStep();
                  }}
                >
                  Kembali ke Detail Varian
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </>
  );
};

export default WizardManager;
