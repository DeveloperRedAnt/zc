import { useTranslation } from '@/libs/i18n';
import React from 'react';
import { Button } from '../button/button';

type NavigationProps = {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
};

export const WizardNavigation: React.FC<NavigationProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between mt-6">
      <Button
        onClick={onPrevious}
        variant="outline"
        className={`${
          currentStep === 0
            ? 'invisible'
            : currentStep > 0
              ? 'bg-gray-500 text-white hover:bg-gray-600'
              : 'bg-gray-600 text-white hover:bg-gray-700'
        }`}
      >
        {t('wizard.previous')}
      </Button>

      <Button
        onClick={onNext}
        variant="outline"
        className={`${
          currentStep === totalSteps - 1
            ? 'bg-green-600 text-white hover:bg-green-700'
            : currentStep < totalSteps - 1
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {currentStep === totalSteps - 1 ? t('wizard.finish') : t('wizard.next')}
      </Button>
    </div>
  );
};

export default WizardNavigation;
