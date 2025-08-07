'use client';

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
import { toast } from '@/components/toast/toast';
import { Check, Edit, Refresh } from '@icon-park/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

type Store = {
  id: string;
  name: string;
  percentage: string;
  count_tax: boolean;
};

const columnHelper = createColumnHelper<Store>();

export default function TableStoreSwitch() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const fullData: Store[] = [
    { id: 'store-1', name: 'PT Ezhe Source', percentage: '10.0%', count_tax: true },
    { id: 'store-2', name: 'PT Cipta Usaha', percentage: '0.0%', count_tax: false },
    { id: 'store-3', name: 'PT Sumber Rejeki', percentage: '10.0%', count_tax: true },
    { id: 'store-4', name: 'PT Andalan Citra', percentage: '0.0%', count_tax: false },
    { id: 'store-5', name: 'PT Mitra Teknologi', percentage: '0.0%', count_tax: false },
    { id: 'store-6', name: 'PT Sentosa Makmur', percentage: '10.0%', count_tax: true },
  ];

  const totalPage = Math.ceil(fullData.length / perPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * perPage;
    return fullData.slice(start, start + perPage);
  }, [page, perPage]);

  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taxPercent, setTaxPercent] = useState('');

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
    data: paginatedData,
    columns,
    manualPagination: true,
    pageCount: totalPage,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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

      <DataTable table={table} isLoading={false} />
      <DataTablePagination
        table={table}
        onPage={setPage}
        onPageSize={setPerPage}
        page={page}
        pageSize={perPage}
        totalPages={totalPage}
        isLoading={false}
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
                checked={selectedStore ? selectedStore.count_tax : false}
                onCheckedChange={(checked) => {
                  if (selectedStore) {
                    setSelectedStore({ ...selectedStore, count_tax: checked });
                  }
                }}
              />
              Hitung dengan pajak
            </div>
            <InformationText text="Hitung Dengan Pajak akan mengikutsertakan service charge dalam penghitungan pajak" />
          </div>
          <DialogFooter>
            <Button variant="ghost" type="button" onClick={() => setTaxPercent('')}>
              <Refresh />
              Reset
            </Button>

            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="success"
                  disabled={taxPercent.trim() === ''}
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
                    <Button variant="ghost">Tidak</Button>
                  </DialogClose>
                  <Button
                    variant="info"
                    onClick={() => {
                      toast.success('Tersimpan!', {
                        description: 'Service Charge berhasil diperbarui.',
                      });
                      setIsConfirmOpen(false);
                      setIsEditOpen(false);
                    }}
                  >
                    Ya, Saya Yakin
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
