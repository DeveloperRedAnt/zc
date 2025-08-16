'use client';
import {
  useCreateVoucher,
  useGetVoucher,
  useUpdateVoucher,
} from '@/__generated__/api/hooks/voucher.hooks';
// Components
import { Button } from '@/components/button/button';
import SkeletonButton from '@/components/button/skeleton-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import type { OptionType } from '@/components/dropdown/dropdown';
import SkeletonPreset from '@/components/skeleton/skeleton-preset';
import { toast } from '@/components/toast/toast';
import FilterVoucherList from '@/modules/voucher/components/filter-voucher-list';
import TableVoucherList from '@/modules/voucher/components/table-voucher-list';
import VoucherConfirmDialog from '@/modules/voucher/components/voucher-confirm-dialog';
import VoucherDialog from '@/modules/voucher/components/voucher-dialog';
import { Plus } from '@icon-park/react';
import { format } from 'date-fns';
import { startTransition, useCallback, useMemo, useState } from 'react';
import { useSearchParams } from './hooks/use-search-params';
import { Range, defaultVoucherData } from './types/voucher-types';

const optionsStatus: OptionType[] = [
  { label: 'Pilih Tipe', value: '' },
  { label: 'Nominal', value: 'nominal' },
  { label: 'Persen', value: 'percent' },
];

export default function VoucherPage() {
  const [dialogVoucherOpen, setDialogVoucherOpen] = useState(false);
  const [dialogVoucherConfirm, setDialogVoucherConfirm] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<TableVoucher | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(defaultVoucherData);
  const [selectedStoreVoucher, setSelectedStoreVoucher] = useState<OptionType | null>(null);
  const [selectedRange, setSelectedRange] = useState<Range | undefined>(undefined);

  const [selectedStatus, setSelectedStatus] = useState<OptionType | null>({
    label: 'Pilih Tipe',
    value: '',
  });

  const { mutateAsync: createVoucher } = useCreateVoucher();
  const { mutateAsync: updateVoucher } = useUpdateVoucher();

  const {
    search,
    page,
    setPage,
    perPage,
    setPerPage,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    status,
    setStatus,
    from,
    setFrom,
    to,
    setTo,
    setSearch,
  } = useSearchParams();

  // Prepare request params with dynamic store ID
  const requestParams = useMemo(
    () => ({
      body: {
        search,
        page,
        per_page: perPage,
        sort_by: sortBy,
        sort_direction: (sortOrder as 'asc' | 'desc') || undefined,
        search_by_status: status || '',
        start_at: from,
        end_at: to,
      },
    }),
    [search, page, perPage, sortBy, sortOrder, status, from, to]
  );

  // We're not memoizing the params anymore so React Query can detect changes properly
  const { isLoading, data: respVoucher } = useGetVoucher(requestParams);

  const handleAddVoucher = useCallback(() => {
    // Batch state updates to prevent multiple re-renders
    startTransition(() => {
      setIsEditMode(false);
      setSelectedVoucher(null);
      setFormData(defaultVoucherData);
      setSelectedStatus({ label: 'Pilih Tipe', value: '' });
      setSelectedRange(undefined);
      setSelectedStoreVoucher(null);
    });

    // Open dialog separately to avoid rendering dialog with stale state
    setTimeout(() => {
      setDialogVoucherOpen(true);
    }, 0);
  }, []);

  const handleSelectVoucher = useCallback((voucher: TableVoucher) => {
    setSelectedVoucher(voucher); // Now accepts TableVoucher type
    setFormData({
      ...defaultVoucherData,
      name: voucher.name,
      period: `${voucher.start_at} - ${voucher.end_at}`,
      code: voucher.code,
      store: voucher.store.id,
      amount: voucher.amount,
      type: voucher.type,
    });
    setSelectedStoreVoucher({
      label: `#${voucher.store.id} - ${voucher.store.name}`,
      value: voucher.store.id,
    });
    setSelectedRange({
      from: new Date(voucher.start_at),
      to: new Date(voucher.end_at),
    });

    // Find matching status option
    const matchedStatus = optionsStatus.find((opt) => opt.value === voucher.type);
    setSelectedStatus(matchedStatus || null);
  }, []);

  const handleEditVoucher = useCallback(
    (voucher: TableVoucher) => {
      // Fix type comparison - 'persen' is not part of the expected type
      if (voucher.type === 'percent' || voucher.type === 'nominal') {
        // Types are already correct, no need to modify
      } else {
        // Default to 'nominal' for any unexpected type
        voucher.type = 'nominal';
      }

      setIsEditMode(true);
      handleSelectVoucher(voucher);
      setDialogVoucherOpen(true);
    },
    [handleSelectVoucher]
  );

  const handleResetForm = useCallback(() => {
    if (isEditMode && selectedVoucher) {
      setFormData({
        name: selectedVoucher.name,
        type: selectedVoucher.type,
        amount: selectedVoucher.amount,
        period: `${selectedVoucher.start_at} - ${selectedVoucher.end_at}`,
        code: selectedVoucher.code,
        store: selectedVoucher.store.id,
      });
      setSelectedStoreVoucher({
        label: `#${selectedVoucher.store.id} - ${selectedVoucher.store.name}`,
        value: selectedVoucher.store.id,
      });
      setSelectedRange({
        from: new Date(selectedVoucher.start_at),
        to: new Date(selectedVoucher.end_at),
      });

      const optionVoucherPercent = optionsStatus.find((opt) => opt.value === selectedVoucher.type);
      setSelectedStatus(optionVoucherPercent || null);
    } else {
      setFormData(defaultVoucherData);
    }
  }, [isEditMode, selectedVoucher]);

  const handleInputChange = useCallback((field: keyof typeof formData, value: string) => {
    setFormData((prev) => {
      const newValue = field === 'amount' ? (value !== '' ? Number(value) : 0) : value;
      // Prevent unnecessary re-renders if value hasn't changed
      if (prev[field] === newValue) return prev;
      return {
        ...prev,
        [field]: newValue,
      };
    });
  }, []);

  const handleDialogSuccess = useCallback(async () => {
    try {
      const amount = Number(formData.amount);

      const voucherPayload = {
        name: formData.name,
        code: formData.code,
        type: selectedStatus?.value?.toString() || '',
        amount,
        start_at: selectedRange?.from ? format(selectedRange.from, 'yyyy-MM-dd') : undefined,
        end_at: selectedRange?.to ? format(selectedRange.to, 'yyyy-MM-dd') : undefined,
        store: Number(selectedStoreVoucher?.value),
        store_id: 1,
      };

      if (isEditMode && selectedVoucher) {
        await updateVoucher({
          id: Number(selectedVoucher.id),
          body: voucherPayload,
        });
      } else {
        await createVoucher({
          body: voucherPayload,
        });
      }

      toast.success(isEditMode ? 'Terupdate!' : 'Tersimpan!', {
        description: isEditMode
          ? 'Voucher Anda telah berhasil diupdate'
          : 'Voucher Anda telah berhasil tersimpan',
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error('Gagal menyimpan voucher', {
        description: 'Silakan periksa data Anda dan coba lagi',
      });
    }

    setDialogVoucherConfirm(false);
    setDialogVoucherOpen(false);
    setIsEditMode(false);
    setSelectedVoucher(null);
    setFormData(defaultVoucherData);
    setSelectedRange(undefined);
    setSelectedStoreVoucher(null);
    setSelectedStatus({ label: 'Pilih Tipe', value: '' });
  }, [
    createVoucher,
    updateVoucher,
    formData,
    selectedRange,
    selectedStoreVoucher,
    isEditMode,
    selectedVoucher,
    selectedStatus,
  ]);

  // Define interfaces to handle API response and TableVoucherList compatibility
  interface ApiVoucherResponse {
    id: number | string;
    name: string;
    type: string;
    amount: number;
    quantity?: string;
    period?: string;
    code: string;
    voucher_code?: string;
    status?: string;
    start_at: string;
    end_at: string;
    store: {
      id: number;
      name: string;
    };
    is_active?: boolean;
  }

  // This matches the internal Voucher type from TableVoucherList
  // with is_active added for compatibility with voucher-types.ts Voucher
  // Use this type across the component for consistency
  type TableVoucher = {
    id: string; // Keep as string for UI display purposes
    name: string;
    type: string;
    amount: number;
    quantity: string;
    period: string;
    code: string;
    voucher_code: string;
    status: string;
    start_at: string;
    end_at: string;
    store: {
      id: number;
      name: string;
    };
    is_active: boolean;
  };

  const dataVouchers = useMemo<TableVoucher[]>(() => {
    if (!respVoucher?.data) return [];

    const mappedData = (respVoucher?.data || []).map((voucher: ApiVoucherResponse) => ({
      id: String(voucher.id),
      name: voucher.name,
      type: voucher.type,
      amount: voucher.amount,
      quantity: voucher.quantity || '',
      period: voucher.period || '',
      code: voucher.code,
      voucher_code: voucher.voucher_code || voucher.code,
      status: voucher.is_active ? 'Aktif' : 'Non-Aktif', // Match the expected status format in TableVoucherList
      start_at: voucher.start_at,
      end_at: voucher.end_at,
      store: voucher.store,
      is_active: !!voucher.is_active, // Convert to boolean for compatibility
    }));

    return mappedData;
  }, [respVoucher]);
  return (
    <>
      <Card className="my-[1rem] font-normal">
        <CardHeader className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-bold">
              {isLoading ? (
                <SkeletonPreset className="h-8 w-40 bg-slate-200" />
              ) : (
                'List Data Voucher'
              )}
            </CardTitle>
          </div>
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0">
            {isLoading ? (
              <SkeletonButton className="h-[40px] w-[120px] rounded-md" />
            ) : (
              <>
                <Button variant="info" onClick={handleAddVoucher}>
                  <Plus size={14} /> Tambah Voucher
                </Button>

                <VoucherDialog
                  isOpen={dialogVoucherOpen}
                  onOpenChange={setDialogVoucherOpen}
                  isEditMode={isEditMode}
                  formData={formData}
                  onInputChange={handleInputChange}
                  onReset={handleResetForm}
                  selectedRange={selectedRange}
                  setSelectedRange={setSelectedRange}
                  onConfirm={() => {
                    setDialogVoucherConfirm(true);
                    setDialogVoucherOpen(false);
                  }}
                  optionsStatus={optionsStatus}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />

                <VoucherConfirmDialog
                  isOpen={dialogVoucherConfirm}
                  onOpenChange={setDialogVoucherConfirm}
                  isEditMode={isEditMode}
                  onCancel={() => {
                    setDialogVoucherConfirm(false);
                    setDialogVoucherOpen(true);
                  }}
                  onConfirm={handleDialogSuccess}
                />
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {isLoading ? (
            <SkeletonCardContent className="w-full" />
          ) : (
            <>
              <FilterVoucherList
                loadingDataVoucher={isLoading}
                from={from}
                setFrom={setFrom}
                to={to}
                setTo={setTo}
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
              />
              <TableVoucherList
                isLoading={isLoading}
                onEditVoucher={(org) => handleEditVoucher(org as TableVoucher)}
                page={page}
                vouchers={dataVouchers}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
