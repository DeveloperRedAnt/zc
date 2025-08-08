import { DatePicker } from '@/components/datepicker/date-picker';
import { Input } from '@/components/input/input';
import { Label } from '@/components/label/label';
import { cn } from '@/libs/utils';
import { SupplierSectionProps } from '@/modules/stock-variant/types/stock-variant.types';
import { SelectSupplier } from './select-supplier';

export function SupplierSection({
  purchaseDate,
  setPurchaseDate,
  supplier,
  setSupplier,
  otherCosts,
  setOtherCosts,
  invoiceNumber,
  setInvoiceNumber,
  errors,
}: SupplierSectionProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Tanggal Pembelian */}
        <div>
          <Label className="mb-2 block text-sm font-medium text-gray-700">Tanggal Pembelian</Label>
          <DatePicker
            mode="single"
            placeholder="dd/mm/yyyy"
            value={purchaseDate}
            onChange={(date) => setPurchaseDate(date as Date)}
            className={cn('h-10', { 'border-red-500': errors.purchaseDate })}
            closeOnSelect={true}
          />
          {errors.purchaseDate && (
            <p className="text-red-500 text-xs mt-1">{errors.purchaseDate}</p>
          )}
        </div>
        {/* Supplier */}
        <div>
          <SelectSupplier
            supplier={supplier}
            setSupplier={setSupplier}
            error={errors.supplier}
            label="Supplier"
            placeholder="Pilih supplier"
            required={false}
            enableSearch={true}
            enablePagination={true}
          />
        </div>

        {/* Biaya Lain-lain */}
        <div>
          <Label className="mb-2 block text-sm font-medium text-gray-700">Biaya Lain-lain</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              Rp
            </span>
            <Input
              type="text"
              placeholder="0"
              className="pl-9 h-10"
              value={otherCosts}
              onChange={(e) => setOtherCosts(e.target.value)}
            />
          </div>
        </div>

        {/* No. Nota */}
        <div>
          <Label className="mb-2 block text-sm font-medium text-gray-700">No. Nota</Label>
          <Input
            type="text"
            placeholder="cth: AA112233"
            className="h-10"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
