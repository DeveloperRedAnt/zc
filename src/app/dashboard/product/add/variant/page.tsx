import { Card } from '@/components/card/card';
import WizardManager from '@/modules/product-variant/components/wizard-manager';

export function generateMetadata() {
  return {
    title: 'Wizard Varian',
    description: 'Welcome to our project.',
  };
}

export default function Index() {
  return (
    <Card className="w-full">
      <WizardManager />
    </Card>
  );
}
