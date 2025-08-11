'use client';

import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import { InformationText } from '@/components/information-text/information-text';
import CustomInput from '@/components/input/custom-input';
import { Label } from '@/components/label/label';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group/radio-group';
import { Switch } from '@/components/switch/switch';
import { useTrackStockProductStore } from '@/modules/products-edit/storing-data/track-stock-product/stores'; // ✅ Import store
import React, { useState } from 'react';

const optionsExpiredDay: OptionType[] = [
  { label: '1 Hari', value: 1 },
  { label: '5 Hari', value: 5 },
  { label: '7 Hari', value: 7 },
  { label: '10 Hari', value: 10 },
];

export default function Index() {
  const [selectedExpiredDay, setSelectedExpiredDay] = useState<OptionType | null>(null);
  const [dayInputType, setDayInputType] = useState<'radio-day-select' | 'radio-day-input'>(
    'radio-day-select'
  );
  const { setTrackStock } = useTrackStockProductStore();

  const handleEnableSwitch = (enabled: boolean) => {
    setTrackStock({ is_enable_expired_reminder: enabled });
  };

  const handleDropdownChange = (option: OptionType | null) => {
    setSelectedExpiredDay(option);
    setTrackStock({
      expired_reminder_in_days: option?.value != null ? Number(option.value) : null,
      expired_reminder_in_date: null,
    });
  };

  const handleManualInput = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = Number(e.target.value);
    setTrackStock({
      expired_reminder_in_days: Number.isNaN(value) ? null : value,
      expired_reminder_in_date: null,
    });
  };

  return (
    <div className="pb-6">
      <div className="pt-6 mb-2">
        <p> Peringatan Produk Kedaluwarsa </p>
      </div>
      <InformationText text="Penentuan jumlah hari untuk peringatan sebelum kedaluwarsa" />

      <div className="flex items-center gap-2 mt-2">
        <Switch id="alertProductExpired" defaultChecked onCheckedChange={handleEnableSwitch} />
        <Label htmlFor="alertProductExpired"> Peringatan Produk Kedaluwarsa </Label>
      </div>

      <RadioGroup
        defaultValue="radio-day-select"
        onValueChange={(val) => setDayInputType(val as 'radio-day-select' | 'radio-day-input')}
        className="flex space-x-2 mb-4 mt-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="radio-day-select" value="radio-day-select" />
          <Label htmlFor="radio-day-select"> Pilih Hari </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id="radio-day-input" value="radio-day-input" />
          <Label htmlFor="radio-day-input"> Input Manual </Label>
        </div>
      </RadioGroup>

      {dayInputType === 'radio-day-select' && (
        <Dropdown
          label=""
          options={optionsExpiredDay}
          value={selectedExpiredDay}
          onChange={handleDropdownChange}
          placeholder="Pilih Hari"
          className="w-[25%] pb-1"
        />
      )}

      {dayInputType === 'radio-day-input' && (
        <CustomInput
          currency
          className="border-[#C2C7D0]"
          placeholder="0"
          appendText="Hari"
          inputNumber
          onChange={handleManualInput}
        />
      )}
    </div>
  );
}
