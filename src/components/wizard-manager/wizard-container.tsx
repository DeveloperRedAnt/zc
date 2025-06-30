import React, { useState } from 'react';
import MultiStepWizard, { Step } from './multi-step-wizard';
import WizardHeader from './wizard-header';
import WizardNavigation from './wizard-navigation';
import WizardProgressBar from './wizard-progress-bar';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/card/card';

const WizardContainer: React.FC<{ steps: Step[] }> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <Card className="w-[600px] max-w-full mx-auto">
      <CardHeader className="bg-gray-50 border-b px-6 py-4">
        <WizardHeader currentStep={currentStep} totalSteps={steps.length} />
        <WizardProgressBar currentStep={currentStep} totalSteps={steps.length} />
      </CardHeader>
      <CardContent>
        <MultiStepWizard steps={steps} currentStep={currentStep} />
      </CardContent>
      <CardFooter>
        <WizardNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={() => setCurrentStep((s) => Math.max(0, s - 1))}
          onNext={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
        />
      </CardFooter>
    </Card>
  );
};

export default WizardContainer;
