import { ProductVariantDetail } from '@/__generated__/api/dto/set-variant-stock.dto';
import { generateId } from '@/modules/stock-variant/generate-id';
import { StockEntry } from '@/modules/stock-variant/types/stock-variant.types';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export function useEditVariantStockForm(productData?: ProductVariantDetail) {
  const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(undefined);
  const [supplier, setSupplier] = useState<string>('');
  const [otherCosts, setOtherCosts] = useState<string>('');
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [stockEntries, setStockEntries] = useState<StockEntry[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const params = useParams();
  const productId = parseInt(params.id as string);

  function formatDateLocal(date?: Date) {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const setStockEntriesFromProductDetail = useCallback(() => {
    if (!productData?.attribute_options) return;

    const entries: StockEntry[] = [];

    const entryId = String(productId);
    entries.push({
      id: entryId,
      toko: '',
      stokAwal: '',
      hargaBeli: '',
      tanggalKedaluwarsa: undefined,
      sku_code: productData.sku,
      attribute_options: productData.attribute_options,
      variant_id: productData.id,
      store_name: '',
    });

    setStockEntries(entries);
  }, [productData, productId]);

  // Group entries berdasarkan variant
  const getEntriesByVariant = (variantId: number) => {
    return stockEntries.filter((entry) => entry.variant_id === variantId);
  };

  // Get variant title dari attributes
  const getVariantTitle = (attribute_options?: { attribute: string; option_value: string }[]) => {
    if (!attribute_options || attribute_options.length === 0) return 'Variant';
    return attribute_options.map((attr) => attr.option_value).join(' - '); // "Merah - S"
  };

  const handleAddStockToVariant = (variantId: number) => {
    const variant = productData;
    if (!variant) return;

    const newEntry: StockEntry = {
      id: generateId(stockEntries.length),
      toko: '',
      stokAwal: '',
      hargaBeli: '',
      tanggalKedaluwarsa: undefined,
      variant_id: variantId,
      sku_code: variant.sku,
      attribute_options: variant.attribute_options,
    };

    setStockEntries([...stockEntries, newEntry]);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
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
        return {
          store_id: parseInt(entry.toko),
          product_id: productId,
          product_variant_id: entry.variant_id,
          quantity: parseInt(String(entry.stokAwal)),
          purchase_price: parseFloat(String(entry.hargaBeli)),
          expired_at: entry.tanggalKedaluwarsa
            ? formatDateLocal(entry.tanggalKedaluwarsa)
            : // Format: "2025-12-31"
              null,
        };
      }),
    };
  }, [supplier, otherCosts, invoiceNumber, stockEntries, productId]);

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
    variants: productData,
  };
}
