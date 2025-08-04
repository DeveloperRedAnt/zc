import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group/toggle-group';
import { PeriodType } from '../types-datepircker-popup';

interface PeriodSelectorProps {
  view: PeriodType;
  onViewChange: (view: PeriodType) => void;
}

export function PeriodSelector({ view, onViewChange }: PeriodSelectorProps) {
  const periods = [
    { value: 'daily', label: 'Harian' },
    { value: 'weekly', label: 'Mingguan' },
    { value: 'monthly', label: 'Bulanan' },
    { value: 'quarterly', label: 'Kuartal' },
    { value: 'yearly', label: 'Tahunan' },
  ] as const;

  return (
    <div className="flex flex-col border-r border-gray-200 bg-gray-50">
      <ToggleGroup
        type="single"
        value={view}
        onValueChange={(value) => {
          if (value) onViewChange(value as PeriodType);
        }}
        className="flex flex-col p-3 gap-1"
      >
        {periods.map((period) => (
          <ToggleGroupItem
            key={period.value}
            value={period.value}
            aria-label={`Toggle ${period.value}`}
            className="w-full justify-start text-sm font-medium px-4 py-2 rounded-md data-[state=on]:bg-white data-[state=on]:text-gray-900 data-[state=on]:shadow-sm text-gray-600 hover:bg-white hover:text-gray-900"
          >
            {period.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
