'use client';

import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import { InformationText } from '@/components/information-text/information-text';
import CustomInput from '@/components/input/custom-input';
import { Label } from '@/components/label/label';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group/radio-group';
import { Switch } from '@/components/switch/switch';
import { useTrackStockProductStore } from '@/modules/products-edit/storing-data/track-stock-product/stores'; // ✅ Import store
import React, { useState, useEffect, useCallback } from 'react';

const optionsExpiredDay: OptionType[] = [
  { label: '1 Hari', value: 1 },
  { label: '5 Hari', value: 5 },
  { label: '7 Hari', value: 7 },
  { label: '10 Hari', value: 10 },
];

interface Props {
  productId: number;
}

export default function Index({ productId }: Props) {
  const trackStockStore = useTrackStockProductStore();
  // Calculate derived values from store data directly
  const storeData = trackStockStore.products[productId] ?? {
    is_enable_expired_reminder: false,
    expired_reminder_in_days: 1,
  };
  const isExpiredReminderEnabled = storeData.is_enable_expired_reminder;
  const expiredReminderInDays = storeData.expired_reminder_in_days;

  // Determine if current value matches predefined options
  const matchingOption = expiredReminderInDays
    ? optionsExpiredDay.find((option) => option.value === expiredReminderInDays) || null
    : null;

  // Determine input type based on whether value matches predefined options
  const dayInputType: 'radio-day-select' | 'radio-day-input' = matchingOption
    ? 'radio-day-select'
    : 'radio-day-input';
  const selectedExpiredDay: OptionType | null = matchingOption;

  // For manual input, show the value if there's no matching option, or if we explicitly want manual input
  const manualInputValue = expiredReminderInDays ? expiredReminderInDays.toString() : '';

  // Local state for radio button selection only
  const [currentInputType, setCurrentInputType] = useState<'radio-day-select' | 'radio-day-input'>(
    dayInputType
  );

  // Sync currentInputType when store data changes
  useEffect(() => {
    setCurrentInputType(dayInputType);
  }, [dayInputType]);

  const handleEnableSwitch = useCallback(
    (enabled: boolean) => {
      trackStockStore.setTrackStock(productId, { is_enable_expired_reminder: enabled });
    },
    [productId, trackStockStore.setTrackStock]
  );

  const handleDropdownChange = useCallback(
    (option: OptionType | null) => {
      trackStockStore.setTrackStock(productId, {
        expired_reminder_in_days: option?.value != null ? Number(option.value) : null,
        expired_reminder_in_date: null,
      });
    },
    [productId, trackStockStore.setTrackStock]
  );

  const handleManualInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = Number(e.target.value);
      trackStockStore.setTrackStock(productId, {
        expired_reminder_in_days: Number.isNaN(value) ? null : value,
        expired_reminder_in_date: null,
      });
    },
    [productId, trackStockStore.setTrackStock]
  );

  return (
    <div className="pb-6">
      <div className="pt-6 mb-2">
        <p> Peringatan Produk Kedaluwarsa </p>
      </div>
      <InformationText text="Penentuan jumlah hari untuk peringatan sebelum kedaluwarsa" />

      <div className="flex items-center gap-2 mt-2">
        <Switch
          id="alertProductExpired"
          checked={isExpiredReminderEnabled}
          onCheckedChange={handleEnableSwitch}
        />
        <Label htmlFor="alertProductExpired"> Peringatan Produk Kedaluwarsa </Label>
      </div>

      <RadioGroup
        value={currentInputType}
        onValueChange={(val) => setCurrentInputType(val as 'radio-day-select' | 'radio-day-input')}
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

      {currentInputType === 'radio-day-select' && (
        <Dropdown
          label=""
          options={optionsExpiredDay}
          value={selectedExpiredDay}
          onChange={handleDropdownChange}
          placeholder="Pilih Hari"
          className="w-[25%] pb-1"
        />
      )}

      {currentInputType === 'radio-day-input' && (
        <CustomInput
          currency
          className="border-[#C2C7D0]"
          placeholder="0"
          value={manualInputValue}
          appendText="Hari"
          inputNumber
          onChange={handleManualInput}
        />
      )}
    </div>
  );
}
