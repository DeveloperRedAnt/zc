// Example usage of StoreFilterComposable component
import React, { useState } from 'react';
import StoreFilterComposable, { type OptionType } from './store-filter-composable';

// Example 1: Basic usage with state management
export function BasicExample() {
  const [selectedStoreId, setSelectedStoreId] = useState<number | string | null>(null);
  const [selectedStore, setSelectedStore] = useState<{ id: number | string; name: string } | null>(
    null
  );

  const handleStoreChange = (storeId: number | string | null, store: OptionType | null) => {
    setSelectedStoreId(storeId);

    if (store) {
      setSelectedStore({
        id: store.value,
        name: store.data.name,
      });
    } else {
      setSelectedStore(null);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Basic Store Filter Example</h3>

      <StoreFilterComposable
        selectedStore={selectedStore}
        onChangeSelect={handleStoreChange}
        placeholder="Pilih toko..."
        className="w-full max-w-md"
      />

      <div className="mt-4 p-3 bg-gray-100 rounded">
        <p>
          <strong>Selected Store ID:</strong> {selectedStoreId || 'None'}
        </p>
        <p>
          <strong>Selected Store Name:</strong> {selectedStore?.name || 'None'}
        </p>
      </div>
    </div>
  );
}

// Example 2: Pre-selected store
export function PreSelectedExample() {
  const [selectedStore, setSelectedStore] = useState<{ id: number | string; name: string } | null>({
    id: 1,
    name: 'Toko Utama',
  });

  const handleStoreChange = (_storeId: number | string | null, store: OptionType | null) => {
    if (store) {
      setSelectedStore({
        id: store.value,
        name: store.data.name,
      });
    } else {
      setSelectedStore(null);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Pre-selected Store Example</h3>

      <StoreFilterComposable
        selectedStore={selectedStore}
        onChangeSelect={handleStoreChange}
        placeholder="Pilih toko lain..."
        showLabel={true}
        label="Toko yang dipilih:"
      />
    </div>
  );
}

// Example 3: Without label, custom styling
export function CustomStyledExample() {
  const [selectedStore, setSelectedStore] = useState<{ id: number | string; name: string } | null>(
    null
  );

  const handleStoreChange = (_storeId: number | string | null, store: OptionType | null) => {
    if (store) {
      setSelectedStore({
        id: store.value,
        name: store.data.name,
      });
    } else {
      setSelectedStore(null);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Custom Styled Example</h3>

      <div className="bg-white p-4 border rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter berdasarkan toko
        </label>

        <StoreFilterComposable
          selectedStore={selectedStore}
          onChangeSelect={handleStoreChange}
          placeholder="-- Semua toko --"
          showLabel={false}
          className="w-full"
        />
      </div>
    </div>
  );
}

// Example 4: Disabled state
export function DisabledExample() {
  const selectedStore = {
    id: 5,
    name: 'Toko Cabang Jakarta',
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Disabled State Example</h3>

      <StoreFilterComposable
        selectedStore={selectedStore}
        onChangeSelect={() => {}} // No-op function
        disabled={true}
        placeholder="Toko tidak dapat diubah"
        label="Toko terpilih (readonly):"
      />
    </div>
  );
}

// Example 5: Form integration
export function FormIntegrationExample() {
  const [formData, setFormData] = useState({
    storeId: null as number | string | null,
    storeName: '',
    description: '',
  });

  const selectedStore = formData.storeId
    ? {
        id: formData.storeId,
        name: formData.storeName,
      }
    : null;

  const handleStoreChange = (storeId: number | string | null, store: OptionType | null) => {
    setFormData((prev) => ({
      ...prev,
      storeId: storeId,
      storeName: store?.data.name || '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Form Integration Example</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pilih Toko <span className="text-red-500">*</span>
          </label>
          <StoreFilterComposable
            selectedStore={selectedStore}
            onChangeSelect={handleStoreChange}
            placeholder="Pilih toko untuk laporan ini"
            showLabel={false}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
            placeholder="Masukkan deskripsi..."
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={!formData.storeId}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default function StoreFilterExamples() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">StoreFilterComposable Examples</h1>

      <div className="space-y-8">
        <BasicExample />
        <PreSelectedExample />
        <CustomStyledExample />
        <DisabledExample />
        <FormIntegrationExample />
      </div>
    </div>
  );
}
