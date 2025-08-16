'use client';
import {
  useCreateVoucher,
  useGetVoucher,
  useUpdateVoucher,
} from '@/__generated__/api/hooks/voucher.hooks';
// Components
import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import { useToast } from '@/components/toast/toast';
import FilterVoucherList from '@/modules/voucher/components/filter-voucher-list';
import TableVoucherList from '@/modules/voucher/components/table-voucher-list';
import VoucherConfirmDialog from '@/modules/voucher/components/voucher-confirm-dialog';
import { Plus } from '@icon-park/react';
import { useCallback, useMemo, useRef, useState } from 'react';
import CreateVoucherPopup, { type VoucherDialogRef } from './components/voucher-dialog';
import { useSearchParams } from './hooks/use-search-params';

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

export default function VoucherPage() {
  const [dialogVoucherOpen, setDialogVoucherOpen] = useState(false);
  const [dialogVoucherConfirm, setDialogVoucherConfirm] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<TableVoucher | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const voucherDialogRef = useRef<VoucherDialogRef>(null);

  const toast = useToast();

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
    if (dialogVoucherOpen) {
      setDialogVoucherOpen(false);
    }

    setIsEditMode(false);
    setSelectedVoucher(null);

    setTimeout(() => {
      setDialogVoucherOpen(true);
    }, 100);
  }, [dialogVoucherOpen]);

  const handleSelectVoucher = useCallback((voucher: TableVoucher) => {
    setSelectedVoucher(voucher); // Now accepts TableVoucher type
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

  const handleVoucherConfirm = useCallback(() => {
    // Show confirm dialog
    setDialogVoucherConfirm(true);
    setDialogVoucherOpen(false);
  }, []);

  const handleVoucherSubmit = useCallback(async () => {
    try {
      // Get voucher data from dialog ref
      const voucherData = voucherDialogRef.current?.getPendingData();

      if (!voucherData) {
        toast.showError('Gagal menyimpan!', 'Data voucher tidak valid');
        return;
      }

      if (isEditMode && selectedVoucher) {
        await updateVoucher({
          id: Number(selectedVoucher.id),
          body: voucherData,
        });
        toast.showSuccess('Tersimpan!', 'Voucher Anda telah berhasil tersimpan!');
      } else {
        await createVoucher({
          body: voucherData,
        });
        toast.showSuccess('Tersimpan!', 'Voucher Anda telah berhasil terupdate');
      }

      // Reset state
      setIsEditMode(false);
      setSelectedVoucher(null);
      setDialogVoucherOpen(false);
      setDialogVoucherConfirm(false);

      // Force reset dialog form via key change
      setTimeout(() => {
        setIsEditMode(false);
        setSelectedVoucher(null);
      }, 100);

      // Reload page after 1 second
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.showError('Gagal!', 'Silakan periksa data Anda dan coba lagi');
      setDialogVoucherConfirm(false);
    }
  }, [createVoucher, updateVoucher, isEditMode, selectedVoucher, toast]);

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
            <CardTitle className="text-lg font-bold">List Data Voucher</CardTitle>
          </div>
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0">
            <>
              <Button variant="info" onClick={handleAddVoucher}>
                <Plus size={14} /> Tambah Voucher
              </Button>
            </>
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
      <CreateVoucherPopup
        key={isEditMode ? `edit-${selectedVoucher?.id}` : 'add'}
        ref={voucherDialogRef}
        isEditMode={isEditMode}
        isOpen={dialogVoucherOpen}
        onOpenChange={setDialogVoucherOpen}
        voucher={
          selectedVoucher
            ? {
                id: selectedVoucher.id,
                name: selectedVoucher.name,
                code: selectedVoucher.code,
                type: selectedVoucher.type,
                amount: selectedVoucher.amount,
                start_at: selectedVoucher.start_at,
                end_at: selectedVoucher.end_at,
                store: selectedVoucher.store,
              }
            : undefined
        }
        onConfirm={handleVoucherConfirm}
      />

      <VoucherConfirmDialog
        isOpen={dialogVoucherConfirm}
        onOpenChange={setDialogVoucherConfirm}
        isEditMode={isEditMode}
        onCancel={() => {
          setDialogVoucherConfirm(false);
          setDialogVoucherOpen(true);
        }}
        onConfirm={handleVoucherSubmit}
      />
    </>
  );
}
