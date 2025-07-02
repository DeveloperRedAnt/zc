import React from 'react';

const WizardProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({
  currentStep,
  totalSteps,
}) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  return (
    <div className="w-[35rem] bg-[#D8D8D8] rounded-full h-[1rem] mx-auto">
      <div
        className="bg-[#0FA6C1] h-[1rem] rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default WizardProgressBar;
