'use client';

import { useStoreFilter } from '@/hooks/use-store-filter/use-store-filter';
import { Shop } from '@icon-park/react';
import { useState } from 'react';
import StoreSelectorPopup from './store-selector-popup';

/**
 * Example component showing how to use StoreSelectorPopup
 */
export default function StoreSelectorExample() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { selectedStore } = useStoreFilter();

  return (
    <div className="p-4">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsPopupOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Shop size={20} />
        {selectedStore ? selectedStore.label : 'Pilih Toko'}
      </button>

      {/* Current Selection Display */}
      {selectedStore && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Toko Terpilih:</div>
          <div className="font-medium">{selectedStore.label}</div>
          <div className="text-xs text-gray-500">ID: {selectedStore.value}</div>
        </div>
      )}

      {/* Store Selector Popup */}
      <StoreSelectorPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}

/**
 * Alternative usage as a floating button
 */
export function FloatingStoreSelector() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { selectedStore } = useStoreFilter();

  return (
    <>
      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsPopupOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-105 z-40"
        title={selectedStore ? selectedStore.label : 'Pilih Toko'}
      >
        <Shop size={24} className="mx-auto" />
      </button>

      {/* Store Selector Popup */}
      <StoreSelectorPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}

/**
 * Usage in header/navbar
 */
export function HeaderStoreSelector() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { selectedStore } = useStoreFilter();

  return (
    <div className="relative">
      {/* Header Button */}
      <button
        type="button"
        onClick={() => setIsPopupOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Shop size={18} />
        <span className="hidden sm:block text-sm font-medium">
          {selectedStore ? selectedStore.label : 'Pilih Toko'}
        </span>
      </button>

      {/* Store Selector Popup */}
      <StoreSelectorPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}
