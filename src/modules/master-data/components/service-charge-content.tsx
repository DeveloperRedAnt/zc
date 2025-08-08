'use client';

import {
  ApiServiceChargeData,
  ApiServiceChargeResponse,
  ServiceChargeStore,
} from '@/__generated__/api/dto/master-data/service-charge.dto';
import {
  useGetServiceCharge,
  useUpdateServiceCharge,
} from '@/__generated__/api/hooks/master-data/service-charge.hooks';
import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog/dialog';
import { InformationText } from '@/components/information-text/information-text';
import CustomInput from '@/components/input/custom-input';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { useToast } from '@/components/toast/toast';
import { Check, Edit, Refresh } from '@icon-park/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

const columnHelper = createColumnHelper<ServiceChargeStore>();

// Utility function to format API data to component format
const formatServiceChargeData = (apiData: ApiServiceChargeData[]): ServiceChargeStore[] => {
  return apiData.map((store) => ({
    id: store.store_id.toString(),
    name: store.store_name,
    percentage: `${store.charge.toFixed(1)}%`,
    count_tax: store.is_tax_included,
  }));
};

export default function TableStoreSwitch() {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [selectedStore, setSelectedStore] = useState<ServiceChargeStore | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taxPercent, setTaxPercent] = useState('');
  const [countTax, setCountTax] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toast = useToast();

  const {
    data: apiResponse,
    isLoading,
    refetch,
  } = useGetServiceCharge({
    body: {
      page,
      per_page: perPage,
      search: '',
      search_by_status: 'all',
      sort_by: 'store_name',
      sort_direction: 'asc',
    },
  });

  const formattedData: ServiceChargeStore[] = useMemo(() => {
    const rawData = Array.isArray(apiResponse)
      ? apiResponse
      : Array.isArray(apiResponse?.data)
        ? apiResponse.data
        : [];

    const isApiServiceChargeDataArray = (data: unknown[]): data is ApiServiceChargeData[] => {
      return data.every(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          'store_id' in item &&
          'store_name' in item &&
          'charge' in item &&
          'is_tax_included' in item
      );
    };

    if (!isApiServiceChargeDataArray(rawData)) {
      console.error('Invalid response data:', rawData);
      return [];
    }

    return formatServiceChargeData(rawData);
  }, [apiResponse]);

  // Extract pagination from apiResponse with type assertion
  const isApiResponse = (data: unknown): data is ApiServiceChargeResponse =>
    typeof data === 'object' && data !== null && 'pagination' in data && 'data' in data;

  const paginationData = isApiResponse(apiResponse)
    ? apiResponse.pagination
    : {
        current_page: 0,
        last_page: 0,
        per_page: 5,
        total: 0,
      };

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => <div className="font-semibold text-[#555555]">Toko</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('percentage', {
        header: () => <div className="font-semibold text-[#555555]">Persen Service Charge</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('count_tax', {
        header: () => <div className="font-semibold text-[#555555]">Hitung Dengan Pajak</div>,
        cell: (info) => <span>{info.getValue() ? 'Ya' : 'Tidak'}</span>,
      }),
      columnHelper.display({
        id: 'aksi',
        header: () => <div className="font-semibold text-[#555555]">Aksi</div>,
        cell: ({ row }) => {
          const store = row.original;
          return (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedStore(store);
                setTaxPercent(store.percentage.replace('%', ''));
                setCountTax(store.count_tax);
                setIsEditOpen(true);
              }}
            >
              <Edit className="mr-1" />
            </Button>
          );
        },
      }),
    ],
    []
  );

  const table = useReactTable({
    data: formattedData,
    columns,
    manualPagination: true,
    pageCount: paginationData?.last_page ?? 0,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const updateServiceChargeMutation = useUpdateServiceCharge();

  const handleSaveServiceCharge = async () => {
    if (!selectedStore) return;

    setIsUpdating(true);
    try {
      await updateServiceChargeMutation.mutateAsync({
        storeId: selectedStore.id,
        payload: {
          charge: parseFloat(taxPercent) || 0,
          is_tax_included: countTax,
        },
      });

      toast.showSuccess('Tersimpan!', 'Service Charge berhasil diperbarui.');

      setIsConfirmOpen(false);
      setIsEditOpen(false);

      // Refetch data to get updated values
      refetch();
    } catch (error) {
      toast.showError('Gagal menyimpan!', 'Terjadi kesalahan saat menyimpan Service Charge.');
      console.error('Save error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReset = () => {
    if (selectedStore) {
      setTaxPercent(selectedStore.percentage.replace('%', ''));
      setCountTax(selectedStore.count_tax);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex-row flex justify-between items-start w-full">
        <div className="flex flex-row items-center justify-between">
          <p className="text-[#555555] text-[16px] font-semibold">Service Charge</p>
        </div>
      </div>

      <div className="pt-5 pb-5">
        <InformationText text="Penentuan nominal Service Charge yang akan diterapkan di transaksi" />
      </div>

      <DataTable table={table} isLoading={isLoading} />
      <DataTablePagination
        table={table}
        onPage={setPage}
        onPageSize={setPerPage}
        page={page}
        pageSize={perPage}
        totalPages={paginationData?.last_page ?? 0}
        isLoading={isLoading}
        hidePageSize={true}
      />

      {/* === Dialog Edit === */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Persen Service Charge</DialogTitle>
          </DialogHeader>
          <div className="w-full gap-4 py-4 flex flex-col">
            <Label className="font-semibold">Untuk Toko</Label>
            <p className="text-[#555555] text-[16px] font-normal mb-2">
              {selectedStore ? selectedStore.name : 'Toko tidak ditemukan'}
            </p>
            <CustomInput
              required
              isWidthFull
              className="mb-2"
              placeholder="12.0"
              label="Service Charge"
              inputNumber
              maxDecimalDigits={1}
              maxValue={100}
              appendIcon="Percentage"
              value={taxPercent}
              onChange={(e) => setTaxPercent(e.target.value)}
            />
            <Label className="font-semibold">
              Penghitungan Service Charge <span className="text-red-500">*</span>
            </Label>
            <div className="gap-2 flex flex-row text-sm">
              <Switch
                id="count-tax-switch"
                checked={countTax}
                onCheckedChange={(checked) => setCountTax(checked)}
              />
              Hitung dengan pajak
            </div>
            <InformationText text="Hitung Dengan Pajak akan mengikutsertakan service charge dalam penghitungan pajak" />
          </div>
          <DialogFooter>
            <Button variant="ghost" type="button" onClick={handleReset}>
              <Refresh />
              Reset
            </Button>

            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="success"
                  disabled={taxPercent.trim() === '' || isUpdating}
                  onClick={() => setIsConfirmOpen(true)}
                >
                  Simpan Service Charge
                  <Check />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Anda akan menyimpan Service Charge</DialogTitle>
                  <DialogDescription className="pt-4">
                    Apakah Anda yakin akan menyimpan data Service Charge tersebut?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost" disabled={isUpdating}>
                      Tidak
                    </Button>
                  </DialogClose>
                  <Button variant="info" onClick={handleSaveServiceCharge} disabled={isUpdating}>
                    {isUpdating ? 'Menyimpan...' : 'Ya, Saya Yakin'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
