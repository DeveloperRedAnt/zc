'use client';

import { Info } from '@icon-park/react';

import React from 'react';

export default function VariantOptionsList({ options }) {
  return (
    <div className="px-2 py-2">
      <h2 className="text-md font-medium text-gray-700 mb-6">List Opsi Varian yang Telah Dibuat</h2>

      <div className="flex items-start gap-3 mb-6">
        <Info theme="filled" className="text-gray-600 mt-0.5 flex-shrink-0" size={18} />
        <p className="text-gray-600 text-sm">
          Anda tidak dapat memilih kembali opsi varian yang sudah dibuat dibawah ini
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {options.map((option, index) => (
          <div
            key={`variant-option-${option.variant_option_id}-${index}`}
            className="flex items-center gap-2"
          >
            <div className="w-1 h-1 bg-gray-600 rounded-full flex-shrink-0" />
            <span className="text-gray-600 text-sm">{option.attribute_option_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
