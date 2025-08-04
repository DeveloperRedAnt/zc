import { Check, RotateCcw } from 'lucide-react';

import { Button } from '@/components/button/button';

interface ActionButtonsProps {
  onReset: () => void;
  onApply: () => void;
}

export function ActionButtons({ onReset, onApply }: ActionButtonsProps) {
  return (
    <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
      <Button variant="ghost" onClick={onReset} className="text-gray-600 hover:text-gray-900">
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onApply}
        className="text-[#555555] px-6 py-2 rounded-md text-sm font-medium"
      >
        Terapkan Periode
        <Check className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
