import { Button } from '@/components/button/button';
import { Card } from '@/components/card/card';
import { DatePicker } from '@/components/datepicker/date-picker';
import CustomInput from '@/components/input/custom-input';
import { Label } from '@/components/label/label';
import { cn } from '@/libs/utils';
import { SelectToko } from '@/modules/stock-variant/select-toko';
import { StockEntryCardProps } from '@/modules/stock-variant/types/stock-variant.types';
import { Trash2 } from 'lucide-react';
import React from 'react';

export function StockEntryCard({
  entry,
  index,
  errors,
  onRemove,
  onChange,
  removable = true,
}: StockEntryCardProps) {
  return (
    <Card className="p-4 mb-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      {/* Grid 4 kolom untuk form fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-3">
        {/* Toko */}
        <div>
          <SelectToko
            toko={entry.toko}
            setToko={(value) => onChange(entry.id, 'toko', value)}
            error={errors[`stockEntries[${index}].toko`]}
            placeholder="Pilih Toko"
            required={true}
            enableSearch={true}
            enablePagination={true}
          />
          {/* {errors[`stockEntries[${index}].toko`] && (
            <p className="text-red-500 text-xs mt-1">{errors[`stockEntries[${index}].toko`]}</p>
          )} */}
        </div>

        {/* Stok Awal */}
        <div className="flex flex-col">
          <CustomInput
            id={`stokAwal-${entry.id}`}
            className={cn('h-10', { 'border-red-500': errors[`stockEntries[${index}].stokAwal`] })}
            placeholder="0"
            inputNumber
            isWidthFull
            label="Stok Awal"
            required
            onChange={(e) => onChange(entry.id, 'stokAwal', e.target.value)}
          />
          {errors[`stockEntries[${index}].stokAwal`] && (
            <p className="text-red-500 text-xs mt-1">{errors[`stockEntries[${index}].stokAwal`]}</p>
          )}
        </div>

        {/* Harga Beli */}
        <div className="flex flex-col">
          <CustomInput
            id={`hargaBeli-${entry.id}`}
            currency
            className={cn('pl-9 h-10', {
              'border-red-500': errors[`stockEntries[${index}].hargaBeli`],
            })}
            placeholder="0"
            prependText="Rp"
            inputNumber
            isWidthFull
            label="Harga Beli"
            required
            onChange={(e) => onChange(entry.id, 'hargaBeli', e.target.value)}
          />
          {errors[`stockEntries[${index}].hargaBeli`] && (
            <p className="text-red-500 text-xs mt-1">
              {errors[`stockEntries[${index}].hargaBeli`]}
            </p>
          )}
        </div>

        {/* Tanggal Kedaluwarsa */}
        <div>
          <Label className="mb-1 block text-sm font-medium text-gray-700">
            Tanggal Kedaluwarsa <span className="text-red-500">*</span>
          </Label>
          <DatePicker
            value={entry.tanggalKedaluwarsa}
            onChange={(date) => onChange(entry.id, 'tanggalKedaluwarsa', date as Date)}
            placeholder="dd/mm/yyyy"
            className={cn('h-10 w-full', {
              'border-red-500': errors[`stockEntries[${index}].tanggalKedaluwarsa`],
            })}
            mode="single"
            closeOnSelect={true}
          />
          {errors[`stockEntries[${index}].tanggalKedaluwarsa`] && (
            <p className="text-red-500 text-xs mt-1">
              {errors[`stockEntries[${index}].tanggalKedaluwarsa`]}
            </p>
          )}
        </div>
      </div>

      {/* Delete Button - Row bawah */}
      <div className="flex justify-start">
        {removable && onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-red-400 hover:text-red-600 hover:bg-red-50 px-2 py-1 text-sm"
            onClick={() => onRemove(entry.id)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Hapus
          </Button>
        )}
      </div>
    </Card>
  );
}
