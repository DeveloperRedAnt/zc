import { OptionType } from '@/components/dropdown/dropdown';

export interface ProductData {
  product: string;
  quantity: string;
}

export interface StockItem {
  store: string;
  firstStock: number;
  buyPrice: number;
  expiredDate: string; // required and string
}

export interface StockState {
  selectedPurchaseDate: string;
  selectedExpiredDate: string;
  selectedStockDate: Date | undefined;
  selectedSupplier: OptionType | null;
  selectedStore: OptionType | null;
  dataStock: Record<string, StockItem[]>;

  // Stock type flags
  hasVariantStock: boolean;
  hasPaduanStock: boolean;

  // Actions
  setSelectedPurchaseDate: (date: string) => void;
  setSelectedExpiredDate: (date: string) => void;
  setSelectedStockDate: (date: Date | undefined) => void;
  setSelectedSupplier: (supplier: OptionType | null) => void;
  setSelectedStore: (store: OptionType | null) => void;
  setDataStock: (data: Record<string, StockItem[]>) => void;
  setHasVariantStock: (hasVariant: boolean) => void;
  setHasPaduanStock: (hasPaduan: boolean) => void;

  // Stock management actions
  addStock: (variant: string) => void;
  removeStock: (variant: string, index: number) => void;
  updateStock: (
    variant: string,
    index: number,
    field: keyof StockItem,
    value: string | number | Date | undefined
  ) => void;

  // Reset
  resetState: () => void;
}

export const initialStock: StockItem = {
  store: '',
  firstStock: 0,
  buyPrice: 0,
  expiredDate: '',
};

export const PaduanProductData: ProductData[] = [
  {
    product: 'ParKaos Combed 34 cm (Merah - Small)acetamol',
    quantity: '0 pcs',
  },
  {
    product: 'Kopi Gato - 250ml',
    quantity: '0 botol',
  },
];

export const variantList = ['Merah - Small', 'Merah - Medium'];

export const optionsSupplier: OptionType[] = [
  { label: 'CV. Damri Sejahtera', value: 1 },
  { label: 'PT. Nasmoco Indonesia Terjaya', value: 5 },
  { label: 'Toko Semar Jaya Malibu', value: 7 },
  { label: 'Sheeran Company Limited', value: 10 },
];

export const optionsStore: OptionType[] = [
  { label: 'Toko Pusat', value: 1 },
  { label: 'Toko Cabang A', value: 2 },
  { label: 'Toko Cabang B', value: 3 },
  { label: 'Gudang Utama', value: 4 },
];
