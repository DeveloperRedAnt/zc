import { useSuppliers } from '@/__generated__/api/hooks/supplier.hooks';
import { Label } from '@/components/label/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select/select';
import { cn } from '@/libs/utils';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
// Import CSS module
import styles from './css/select-sticky.module.css';

interface Supplier {
  id: number;
  name: string;
  pic: string;
  phone: string;
  created_at: string;
}

interface SelectSupplierProps {
  supplier: string;
  setSupplier: (supplier: string) => void;
  error?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  enableSearch?: boolean;
  enablePagination?: boolean;
}

export function SelectSupplier({
  supplier,
  setSupplier,
  error,
  label = 'Supplier',
  placeholder = 'Pilih supplier',
  required = false,
  className,
  enableSearch = true,
  enablePagination = true,
}: SelectSupplierProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [allSuppliers, setAllSuppliers] = useState<Supplier[]>([]);

  const { data: suppliersResponse, isLoading, isError } = useSuppliers(page, search);

  const suppliers = suppliersResponse?.data || [];
  const pagination = suppliersResponse?.pagination || {
    current_page: page,
    last_page: 1,
    per_page: 10,
    total: 0,
  };

  // Simpan semua suppliers yang sudah di-load untuk mencari selected value
  useEffect(() => {
    if (suppliers.length > 0) {
      setAllSuppliers((prev) => {
        const newSuppliers = suppliers.filter((s) => !prev.find((p) => p.id === s.id));
        return [...prev, ...newSuppliers];
      });
    }
  }, [suppliers]);

  const handleSearch = () => {
    setSearch(searchTerm);
    setPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Function untuk mendapatkan nama supplier yang dipilih
  const getSelectedSupplierName = () => {
    if (!supplier) return null;
    const selectedSupplier = allSuppliers.find((s: Supplier) => s.id.toString() === supplier);
    return selectedSupplier?.name || null;
  };

  return (
    <div className={className}>
      <Label htmlFor="supplier" className="mb-2 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <Select onValueChange={setSupplier} value={supplier} open={open} onOpenChange={setOpen}>
        <SelectTrigger className={cn('h-10 text-left', { 'border-red-500': error })}>
          <SelectValue placeholder={placeholder}>
            {supplier && getSelectedSupplierName() ? getSelectedSupplierName() : placeholder}
          </SelectValue>
        </SelectTrigger>

        <SelectContent
          className={cn(
            styles.selectContentSticky,
            'w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          {/* Sticky Search Header */}
          {enableSearch && (
            <div className={styles.searchHeader}>
              <div className={styles.searchContainer}>
                <div className={styles.searchInputContainer}>
                  <Search className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Cari supplier..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={styles.searchInput}
                  />
                </div>
                {/* <button
                  type="button"
                  onClick={handleSearch}
                  disabled={isLoading}
                  className={styles.searchButton}
                >
                  Cari
                </button> */}
              </div>
            </div>
          )}

          {/* Supplier List */}
          <div className={styles.supplierList}>
            {!isLoading &&
              !isError &&
              suppliers.length > 0 &&
              suppliers.map((s: Supplier) => (
                <SelectItem key={s.id} value={s.id.toString()} className="cursor-pointer">
                  <div className="flex flex-col">
                    <div className="font-medium text-gray-900">{s.name}</div>
                    <div className="text-sm text-gray-500">
                      {s.pic} • {s.phone}
                    </div>
                  </div>
                </SelectItem>
              ))}

            {/* Loading State */}
            {isLoading && <div className="p-3 text-center text-gray-500">Loading suppliers...</div>}

            {/* Error State */}
            {isError && <div className="p-3 text-center text-red-500">Error loading suppliers</div>}

            {/* Empty State */}
            {!isLoading && !isError && suppliers.length === 0 && (
              <div className="p-3 text-center text-gray-500">
                {search ? 'Tidak ada supplier ditemukan' : 'Tidak ada supplier tersedia'}
              </div>
            )}
          </div>

          {/* Sticky Pagination Footer */}
          {enablePagination &&
            !isLoading &&
            !isError &&
            suppliers.length > 0 &&
            pagination &&
            pagination.last_page > 1 && (
              <div className="sticky bottom-0 bg-white border-t p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Page {pagination.current_page} of {pagination.last_page}
                    <span className="ml-2">({pagination.total} items)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      type="button"
                      disabled={pagination.current_page === 1}
                      onClick={() => handlePageChange(pagination.current_page - 1)}
                      className="p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      disabled={pagination.current_page === pagination.last_page}
                      onClick={() => handlePageChange(pagination.current_page + 1)}
                      className="p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
