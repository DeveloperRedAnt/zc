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
import InputFile from '@/components/input/input-file';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { toast } from '@/components/toast/toast';
import { Check, Edit, Refresh, TwoDimensionalCodeOne } from '@icon-park/react';
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
  cash: string;
  debitorkredit: string;
  voucher: string;
  debt: string;
  qris: string;
  qrisImage?: string;
};

const columnHelper = createColumnHelper<Store>();

export default function TableStoreSwitch() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isQrisModalOpen, setIsQrisModalOpen] = useState(false);
  const [switchStates, setSwitchStates] = useState({
    cash: false,
    debitorkredit: false,
    voucher: false,
    debt: false,
    qris: false,
  });

  const fullData: Store[] = [
    {
      id: 'store-1',
      name: 'PT Ezhe Source',
      cash: 'active',
      debitorkredit: 'active',
      voucher: 'active',
      debt: 'active',
      qris: 'active',
      qrisImage: 'https://via.placeholder.com/200x200?text=QRIS+1',
    },
    {
      id: 'store-2',
      name: 'PT Cipta Usaha',
      cash: 'nonactive',
      debitorkredit: 'active',
      voucher: 'active',
      debt: 'nonactive',
      qris: 'nonactive',
      qrisImage: 'https://via.placeholder.com/200x200?text=QRIS+2',
    },
    {
      id: 'store-3',
      name: 'PT Sumber Rejeki',
      cash: 'active',
      debitorkredit: 'nonactive',
      voucher: 'active',
      debt: 'nonactive',
      qris: 'active',
      qrisImage: 'https://via.placeholder.com/200x200?text=QRIS+3',
    },
  ];

  const totalPage = Math.ceil(fullData.length / perPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * perPage;
    return fullData.slice(start, start + perPage);
  }, [page, perPage]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => <div className="font-semibold text-[#555555]">Toko</div>,
        cell: (info) => {
          const value = info.getValue();
          return (
            <span className={value === 'nonactive' ? 'text-red-500' : ''}>
              {value === 'active' ? 'Active' : value === 'nonactive' ? 'Non-Aktif' : value}
            </span>
          );
        },
      }),
      columnHelper.accessor('cash', {
        header: () => <div className="font-semibold text-[#555555]">Tunai</div>,
        cell: (info) => {
          const value = info.getValue();
          return (
            <span className={value === 'nonactive' ? 'text-red-500' : ''}>
              {value === 'active' ? 'Active' : value === 'nonactive' ? 'Non-Aktif' : value}
            </span>
          );
        },
      }),
      columnHelper.accessor('debitorkredit', {
        header: () => <div className="font-semibold text-[#555555]">Debit / Kredit</div>,
        cell: (info) => {
          const value = info.getValue();
          return (
            <span className={value === 'nonactive' ? 'text-red-500' : ''}>
              {value === 'active' ? 'Active' : value === 'nonactive' ? 'Non-Aktif' : value}
            </span>
          );
        },
      }),
      columnHelper.accessor('voucher', {
        header: () => <div className="font-semibold text-[#555555]">Voucher</div>,
        cell: (info) => {
          const value = info.getValue();
          return (
            <span className={value === 'nonactive' ? 'text-red-500' : ''}>
              {value === 'active' ? 'Active' : value === 'nonactive' ? 'Non-Aktif' : value}
            </span>
          );
        },
      }),
      columnHelper.accessor('debt', {
        header: () => <div className="font-semibold text-[#555555]">Hutang</div>,
        cell: (info) => {
          const value = info.getValue();
          return (
            <span className={value === 'nonactive' ? 'text-red-500' : ''}>
              {value === 'active' ? 'Active' : value === 'nonactive' ? 'Non-Aktif' : value}
            </span>
          );
        },
      }),
      columnHelper.accessor('qris', {
        header: () => <div className="font-semibold text-[#555555]">QRIS</div>,
        cell: (info) => {
          const value = info.getValue();
          return (
            <span className={value === 'nonactive' ? 'text-red-500' : ''}>
              {value === 'active' ? 'Active' : value === 'nonactive' ? 'Non-Aktif' : value}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: 'aksi',
        header: () => <div className="font-semibold text-[#555555] text-center">Aksi</div>,
        cell: ({ row }) => {
          const store = row.original;
          return (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedStore(store);
                  setIsEditOpen(true);
                  setSwitchStates({
                    cash: store.cash === 'active',
                    debitorkredit: store.debitorkredit === 'active',
                    voucher: store.voucher === 'active',
                    debt: store.debt === 'active',
                    qris: store.qris === 'active',
                  });
                }}
              >
                <Edit className="mr-1" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedStore(store);
                  setIsQrisModalOpen(true);
                }}
              >
                <TwoDimensionalCodeOne />
              </Button>
            </div>
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
      <div className="flex justify-between items-start w-full">
        <p className="text-[#555555] text-[16px] font-semibold">Service Charge</p>
      </div>

      <div className="pt-5 pb-5">
        <InformationText text="Penentuan metode pembayaran yang akan ditampilkan di transaksi" />
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

      {/* Dialog Edit */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Metode Pembayaran</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-4">
            <Label className="font-medium">Untuk Toko:</Label>
            <p className="text-[#555555] text-sm font-normal">{selectedStore?.name}</p>

            <div className="grid grid-cols-2 gap-4 pb-4">
              {(['cash', 'debitorkredit', 'voucher', 'debt', 'qris'] as const).map((method) => (
                <div key={method} className="flex items-center gap-2 pt-2">
                  <Switch
                    id={`switch-${method}`}
                    checked={switchStates[method]}
                    onCheckedChange={(checked) =>
                      setSwitchStates((prev) => ({ ...prev, [method]: checked }))
                    }
                  />
                  <Label htmlFor={`switch-${method}`}>
                    {(() => {
                      switch (method) {
                        case 'cash':
                          return 'Tunai';
                        case 'debitorkredit':
                          return 'Debit / Kredit';
                        case 'voucher':
                          return 'Voucher';
                        case 'debt':
                          return 'Hutang';
                        case 'qris':
                          return 'QRIS';
                        default:
                          return method;
                      }
                    })()}
                  </Label>
                </div>
              ))}
            </div>

            <InputFile
              defaultImageUrl="/assets/zycas/qris-placeholder.png"
              label="Unggah Gambar QRIS"
              previewPosition="top-start"
              accept="image/png, image/jpeg, image/jpg"
              fileInfoExtension=".jpg, .jpeg, .png"
              maxSize={2 * 1024 * 1024}
            />
          </div>

          <DialogFooter>
            <Button variant="ghost" type="button">
              <Refresh />
              Reset
            </Button>
            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="success" onClick={() => setIsConfirmOpen(true)}>
                  Simpan Metode
                  <Check />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Konfirmasi</DialogTitle>
                  <DialogDescription className="pt-4">
                    Apakah Anda yakin ingin menyimpan pengaturan ini?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Batal</Button>
                  </DialogClose>
                  <Button
                    variant="info"
                    onClick={() => {
                      toast.success('Berhasil disimpan!', {
                        description: 'Pengaturan berhasil diperbarui.',
                      });
                      setIsConfirmOpen(false);
                      setIsEditOpen(false);
                    }}
                  >
                    Ya, Simpan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog QRIS Image */}
      <Dialog open={isQrisModalOpen} onOpenChange={setIsQrisModalOpen}>
        <DialogContent className="sm:max-w-xs">
          <DialogHeader>
            <DialogTitle>QRIS {selectedStore?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <img
              src={selectedStore?.qrisImage}
              alt={`QRIS ${selectedStore?.name}`}
              className="w-48 h-48 object-cover rounded-md border"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
