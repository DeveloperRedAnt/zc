'use client';

import Dropdown from '@/components/dropdown/dropdown';
import type { OptionType } from '@/components/dropdown/dropdown';
import CustomInput from '@/components/input/custom-input';
import React, { useState } from 'react';

const optionsStatus: OptionType[] = [
  { label: 'Semua status user', value: 1 },
  { label: 'Aktif', value: 2 },
  { label: 'Dicabut', value: 3 },
];

export default function Index() {
  const [selectedStatus, setSelectedStatus] = useState<OptionType | null>({
    label: 'Semua status user',
    value: 1,
  });
  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 w-1/2">
          <div>
            <Dropdown
              label="Filter Status"
              options={optionsStatus}
              value={selectedStatus}
              onChange={setSelectedStatus}
              placeholder="Pilih Status"
              className="mt-2"
            />
          </div>
          <div>
            <CustomInput
              label="Cari User"
              prependIcon="Search"
              placeholder="Cari..."
              className="h-10"
            />
          </div>
        </div>
      </div>
    </>
  );
}
