import { DatePicker } from '@/components/datepicker/date-picker';
import CustomInput from '@/components/input/custom-input';
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
        <div className="flex flex-col gap-6">
          <CustomInput
            currency
            className="border-[#C2C7D0] h-10"
            placeholder="0"
            prependText="Rp"
            inputNumber
            isWidthFull
            value={otherCosts}
            label="Biaya Lain-lain"
            onChange={(e) => {
              setOtherCosts(e.target.value);
            }}
          />
        </div>

        {/* No. Nota */}
        <div className="flex flex-col gap-3">
          <CustomInput
            className="border-[#C2C7D0] h-10"
            placeholder="cth: AA112233"
            value={invoiceNumber}
            label="Nomor Nota"
            isWidthFull
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
