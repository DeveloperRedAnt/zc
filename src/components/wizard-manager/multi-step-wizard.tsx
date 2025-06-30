export type Step = {
  id: number;
  title: string;
  content: React.ReactNode;
};

export type WizardProps = {
  steps: Step[];
  currentStep: number;
};

const MultiStepWizard: React.FC<WizardProps> = ({ steps, currentStep }) => {
  return <div className="min-h-96 px-6 py-4">{steps[currentStep]?.content}</div>;
};

export default MultiStepWizard;
