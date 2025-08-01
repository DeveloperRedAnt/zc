'use client';
import { useGetVoucher } from '@/__generated__/api/hooks/voucher.hooks';
// Add custom hook for debounced updates
import { Button } from '@/components/button/button';
import SkeletonButton from '@/components/button/skeleton-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import SkeletonPreset from '@/components/skeleton/skeleton-preset';
import FilterVoucherList from '@/modules/voucher/components/filter-voucher-list';
import TableVoucherList from '@/modules/voucher/components/table-voucher-list';
import VoucherConfirmDialog from '@/modules/voucher/components/voucher-confirm-dialog';
import VoucherDialog from '@/modules/voucher/components/voucher-dialog';
import { Plus } from '@icon-park/react';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from './hooks/use-search-params';
import { Voucher, defaultVoucherData } from './types/voucher-types';

export default function VoucherPage() {
  const [dialogVoucherOpen, setDialogVoucherOpen] = useState(false);
  const [dialogVoucherConfirm, setDialogVoucherConfirm] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(defaultVoucherData);

  const {
    search,
    setSearch,
    page,
    setPage,
    perPage,
    setPerPage,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    setStatus,
    status,
    from,
    setFrom,
    to,
    setTo,
  } = useSearchParams();

  // Prepare request params (don't over-optimize here)
  const requestParams = {
    params: {
      'x-device-id': '1',
      'x-organization-id': '1',
      'x-store-id': '1',
    },
    body: {
      search,
      page,
      per_page: perPage,
      sort_by: sortBy,
      sort_direction: (sortOrder as 'asc' | 'desc') || undefined,
      search_by_status: status || 'all',
      start_at: from,
      end_at: to,
    },
  };

  // We're not memoizing the params anymore so React Query can detect changes properly
  const { isLoading, data: respVoucher } = useGetVoucher(requestParams);

  const handleAddVoucher = useCallback(() => {
    setIsEditMode(false);
    setSelectedVoucher(null);
    setFormData(defaultVoucherData);
    setDialogVoucherOpen(true);
  }, []);

  const handleEditVoucher = useCallback((voucher: Voucher) => {
    setIsEditMode(true);
    setSelectedVoucher(voucher);
    setFormData({
      name: voucher.name,
      type: voucher.type,
      quantity: voucher.quantity,
      period: voucher.period,
      voucher_code: voucher.voucher_code,
      status: voucher.status,
    });
    setDialogVoucherOpen(true);
  }, []);

  const handleResetForm = useCallback(() => {
    if (isEditMode && selectedVoucher) {
      setFormData({
        name: selectedVoucher.name,
        type: selectedVoucher.type,
        quantity: selectedVoucher.quantity,
        period: selectedVoucher.period,
        voucher_code: selectedVoucher.voucher_code,
        status: selectedVoucher.status,
      });
    } else {
      setFormData(defaultVoucherData);
    }
  }, [isEditMode, selectedVoucher]);

  const handleInputChange = useCallback((field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleDialogSuccess = useCallback(() => {
    setDialogVoucherConfirm(false);
    setIsEditMode(false);
    setSelectedVoucher(null);
  }, []);

  const dataVouchers: Voucher[] = useMemo(() => {
    if (!respVoucher?.data) return [];

    return respVoucher?.data.map((voucher) => ({
      id: String(voucher.id),
      name: voucher.name,
      type: voucher.type,
      quantity: String(voucher.amount),
      period: `${voucher.start_at} - ${voucher.end_at}`,
      voucher_code: voucher.code,
      status: voucher.is_active ? 'Aktif' : 'Non-Aktif',
    }));
  }, [respVoucher]);

  return (
    <>
      <Card className="my-[1rem] font-normal">
        <CardHeader className="bg-[#F2FAFF] flex flex-col lg:flex-row lg:items-center lg:justify-between p-4">
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
                <Button variant="success" onClick={handleAddVoucher}>
                  <Plus size={14} /> Tambah Voucher
                </Button>

                <VoucherDialog
                  isOpen={dialogVoucherOpen}
                  onOpenChange={setDialogVoucherOpen}
                  isEditMode={isEditMode}
                  formData={formData}
                  onInputChange={handleInputChange}
                  onReset={handleResetForm}
                  onConfirm={() => {
                    setDialogVoucherConfirm(true);
                    setDialogVoucherOpen(false);
                  }}
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
                onEditVoucher={handleEditVoucher}
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
