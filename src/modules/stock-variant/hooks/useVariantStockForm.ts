import { STORES } from '@/modules/stock-variant/constants/stock-variant';
import { generateId } from '@/modules/stock-variant/generate-id';
import { StockEntry } from '@/modules/stock-variant/types/stock-variant.types';
import { useCallback, useState } from 'react';

interface ProductVariant {
  id: number;
  sku_code: string;
  attributes: { attribute: string; value: string }[];
  variant_units: Array<{ price: string }>;
}

interface ProductData {
  id: number;
  variants: ProductVariant[];
}

export function useVariantStockForm(productData?: ProductData) {
  const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(undefined);
  const [supplier, setSupplier] = useState<string>('');
  const [otherCosts, setOtherCosts] = useState<string>('');
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [stockEntries, setStockEntries] = useState<StockEntry[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const setStockEntriesFromProductDetail = useCallback(() => {
    if (!productData?.variants) return;

    const entries: StockEntry[] = [];

    for (const variant of productData.variants) {
      // Loop setiap toko untuk variant ini
      for (const [storeIdx, store] of STORES.entries()) {
        const entryId = `${variant.id}-${store.id}-${storeIdx}`;
        entries.push({
          id: entryId,
          toko: '',
          stokAwal: '3',
          hargaBeli: variant.variant_units[0]?.price.replace('Rp ', '').replace('.', '') || '12000',
          tanggalKedaluwarsa: new Date('2025-12-12'),
          sku_code: variant.sku_code,
          attributes: variant.attributes,
          variant_id: variant.id,
          store_name: store.name,
        });
      }
    }

    setStockEntries(entries);
  }, [productData]);

  // Group entries berdasarkan variant
  const getEntriesByVariant = (variantId: number) => {
    return stockEntries.filter((entry) => entry.variant_id === variantId);
  };

  // Get variant title dari attributes
  const getVariantTitle = (attributes?: { attribute: string; value: string }[]) => {
    if (!attributes || attributes.length === 0) return 'Variant';
    return attributes.map((attr) => attr.value).join(' - '); // "Merah - S"
  };

  const handleAddStockToVariant = (variantId: number) => {
    const variant = productData?.variants.find((v) => v.id === variantId);
    if (!variant) return;

    const newEntry: StockEntry = {
      id: generateId(stockEntries.length),
      toko: '',
      stokAwal: '',
      hargaBeli: variant.variant_units[0]?.price.replace('Rp ', '').replace('.', '') || '',
      tanggalKedaluwarsa: undefined,
      variant_id: variantId,
      sku_code: variant.sku_code,
      attributes: variant.attributes,
    };

    setStockEntries([...stockEntries, newEntry]);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!purchaseDate) newErrors.purchaseDate = 'Tanggal Pembelian harus diisi.';
    if (!supplier) newErrors.supplier = 'Supplier harus diisi.';

    for (const [index, entry] of stockEntries.entries()) {
      if (!entry.toko) newErrors[`stockEntries[${index}].toko`] = 'Toko harus diisi.';
      const stokAwalNum = Number(entry.stokAwal);
      if (entry.stokAwal === '' || Number.isNaN(stokAwalNum) || stokAwalNum < 0) {
        newErrors[`stockEntries[${index}].stokAwal`] = 'Stok Awal harus angka positif.';
      }
      const hargaBeliNum = Number(entry.hargaBeli);
      if (entry.hargaBeli === '' || Number.isNaN(hargaBeliNum) || hargaBeliNum < 0) {
        newErrors[`stockEntries[${index}].hargaBeli`] = 'Harga Beli harus angka positif.';
      }
      if (!entry.tanggalKedaluwarsa) {
        newErrors[`stockEntries[${index}].tanggalKedaluwarsa`] = 'Tanggal Kedaluwarsa harus diisi.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRemoveStockEntry = (id: string) => {
    setStockEntries(stockEntries.filter((entry) => entry.id !== id));
  };

  const handleStockEntryChange = (
    id: string,
    field: keyof Omit<StockEntry, 'id'>,
    value: string | number | Date | undefined
  ) => {
    setStockEntries(
      stockEntries.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry))
    );
  };

  // Function untuk format data sesuai API yang diminta
  const getFormDataForAPI = useCallback(() => {
    // Filter hanya entries yang lengkap datanya
    const validEntries = stockEntries.filter(
      (entry) =>
        entry.toko &&
        entry.stokAwal &&
        entry.hargaBeli &&
        entry.tanggalKedaluwarsa &&
        entry.variant_id
    );

    return {
      supplier_id: supplier ? parseInt(supplier) : null,
      other_cost: otherCosts ? parseFloat(otherCosts) : 0,
      note:
        invoiceNumber || `INIT-STOCK-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      stock_reason_code_id: 1, // Default untuk initial stock
      type: 'in', // Default untuk stock masuk
      products: validEntries.map((entry) => {
        // Cari variant untuk mendapatkan product_id
        const variant = productData?.variants.find((v) => v.id === entry.variant_id);
        const productId = variant && productData ? productData.id : 1; // Default jika tidak ditemukan

        return {
          store_id: parseInt(entry.toko),
          product_id: productId,
          product_variant_id: entry.variant_id,
          quantity: parseInt(String(entry.stokAwal)),
          purchase_price: parseFloat(String(entry.hargaBeli)),
          expired_at: entry.tanggalKedaluwarsa
            ? entry.tanggalKedaluwarsa.toISOString().split('T')[0]
            : // Format: "2025-12-31"
              null,
        };
      }),
    };
  }, [supplier, otherCosts, invoiceNumber, stockEntries, productData]);

  return {
    // States
    purchaseDate,
    setPurchaseDate,
    supplier,
    setSupplier,
    otherCosts,
    setOtherCosts,
    invoiceNumber,
    setInvoiceNumber,
    stockEntries,
    setStockEntries,
    errors,
    setErrors,

    // Functions
    validateForm,
    handleRemoveStockEntry,
    handleStockEntryChange,
    setStockEntriesFromProductDetail,
    handleAddStockToVariant,
    getEntriesByVariant,
    getVariantTitle,
    getFormDataForAPI, // Hanya function yang dibutuhkan untuk API

    // Constants
    stores: STORES,
    variants: productData?.variants,
  };
}
