import { Button } from '@/components/button/button';
import { StockEntryListProps } from '@/modules/stock-variant/types/stock-variant.types';
import { Plus } from 'lucide-react';
import { StockEntryCard } from './stock-entry-card';

export function StockEntryList({
  stockEntries,
  errors,
  onRemove,
  onChange,
  onAdd,
  showAddButton = true,
}: StockEntryListProps) {
  return (
    <>
      <div className="space-y-0">
        {stockEntries.map((entry, index) => (
          <StockEntryCard
            key={entry.id}
            entry={entry}
            index={index}
            errors={errors}
            onRemove={onRemove}
            onChange={onChange}
            removable={stockEntries.length > 1}
          />
        ))}
        {showAddButton && (
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onAdd}
              className="border-blue-200 hover:bg-blue-50 hover:border-blue-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Stok Toko Lain
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
