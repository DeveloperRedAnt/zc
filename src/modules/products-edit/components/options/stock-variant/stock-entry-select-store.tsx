import { useStore } from '@/__generated__/api/hooks/supplier.hooks';
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
import { useState } from 'react';
// Import CSS module
import styles from './css/select-sticky.module.css';

interface Store {
  id: number;
  name: string;
  type: string;
  category: string;
  phone: string;
  address: string;
  lat: number;
  long: number | null;
}

interface SelectTokoProps {
  toko: string;
  setToko: (toko: string) => void;
  error?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  enableSearch?: boolean;
  enablePagination?: boolean;
  contentWidth?: 'auto' | 'fixed' | 'wide'; // New prop untuk mengatur width
}

export function SelectToko({
  toko,
  setToko,
  error,
  label = 'Toko',
  placeholder = 'Pilih Toko',
  required = false,
  className,
  enableSearch = true,
  enablePagination = true,
  contentWidth = 'auto', // Default auto width
}: SelectTokoProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  const {
    data: storeResponse,
    isLoading,
    isError,
  } = useStore(Number(page), 10, 'name', 'asc', search);

  const stores = storeResponse?.data || [];
  const pagination = storeResponse?.pagination || {
    current_page: page,
    last_page: 1,
    per_page: 10,
    total: 0,
  };

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

  // Function untuk mendapatkan nama toko yang dipilih
  const getSelectedStoreName = () => {
    if (!toko) return null;
    const selectedStore = stores.find((s: Store) => s.id.toString() === toko);
    return selectedStore?.name || null;
  };

  // Determine content class based on width prop
  const getContentClass = () => {
    switch (contentWidth) {
      case 'fixed':
        return cn(styles.selectContentSticky, styles.selectContentFixed);
      case 'wide':
        return cn(styles.selectContentSticky, styles.selectContentWide);
      default:
        return styles.selectContentSticky;
    }
  };

  return (
    <div className={className}>
      <Label htmlFor="toko" className="mb-2 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <Select onValueChange={setToko} value={toko} open={open} onOpenChange={setOpen}>
        <SelectTrigger
          className={cn(
            'h-10 text-left w-full', // Ensure trigger takes full width
            { 'border-red-500': error }
          )}
        >
          <SelectValue placeholder={placeholder} className="text-left truncate">
            {/* Custom display untuk value yang dipilih */}
            {toko && getSelectedStoreName() ? (
              <span className="text-left truncate block" title={getSelectedStoreName()!}>
                {getSelectedStoreName()}
              </span>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </SelectValue>
        </SelectTrigger>

        {/* Gunakan CSS module class dengan width adjustment */}
        <SelectContent className={getContentClass()} position="popper" sideOffset={4}>
          {/* Sticky Search Header */}
          {enableSearch && (
            <div className={styles.searchHeader}>
              <div className={styles.searchContainer}>
                <div className={styles.searchInputContainer}>
                  <Search className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Cari toko..."
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

          {/* Store List */}
          <div className={styles.supplierList}>
            {!isLoading &&
              !isError &&
              stores.length > 0 &&
              stores.map((s: Store) => (
                <SelectItem key={s.id} value={s.id.toString()}>
                  <div className={styles.supplierItem}>
                    <div className="font-medium text-gray-900">{s.name}</div>
                    <div className="text-sm text-gray-500">
                      {s.type} • {s.category} • {s.phone}
                    </div>
                    {s.address && (
                      <div className="text-xs text-gray-400 mt-1 truncate">{s.address}</div>
                    )}
                  </div>
                </SelectItem>
              ))}

            {/* Loading State */}
            {isLoading && (
              <div className={cn(styles.stateMessage, styles.loadingState)}>Loading stores...</div>
            )}

            {/* Error State */}
            {isError && (
              <div className={cn(styles.stateMessage, styles.errorState)}>Error loading stores</div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && stores.length === 0 && (
              <div className={cn(styles.stateMessage, styles.emptyState)}>
                {search ? 'Tidak ada toko ditemukan' : 'Tidak ada toko tersedia'}
              </div>
            )}
          </div>

          {/* Sticky Pagination Footer */}
          {enablePagination &&
            !isLoading &&
            !isError &&
            stores.length > 0 &&
            pagination &&
            pagination.last_page > 1 && (
              <div className={styles.paginationFooter}>
                <div className={styles.paginationContainer}>
                  <div className={styles.paginationInfo}>
                    Page {pagination.current_page} of {pagination.last_page}
                    <span style={{ marginLeft: '8px' }}>({pagination.total} items)</span>
                  </div>
                  <div className={styles.paginationButtons}>
                    <button
                      type="button"
                      disabled={pagination.current_page === 1}
                      onClick={() => handlePageChange(pagination.current_page - 1)}
                      className={styles.paginationButton}
                    >
                      <ChevronLeft className={styles.paginationIcon} />
                    </button>
                    <button
                      type="button"
                      disabled={pagination.current_page === pagination.last_page}
                      onClick={() => handlePageChange(pagination.current_page + 1)}
                      className={styles.paginationButton}
                    >
                      <ChevronRight className={styles.paginationIcon} />
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
