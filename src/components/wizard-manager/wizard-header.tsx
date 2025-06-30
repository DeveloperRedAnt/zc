import React from 'react';

const WizardHeader: React.FC<{ currentStep: number; totalSteps: number }> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-gray-500">
        Step {currentStep + 1} dari {totalSteps}
      </span>
    </div>
  );
};

export default WizardHeader;
