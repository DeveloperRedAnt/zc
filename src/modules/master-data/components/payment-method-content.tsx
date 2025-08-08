'use client';

import {
  ApiPaymentMethod,
  ApiResponsePaymentMethod,
  ApiStoreData,
  PaymentMethodStore,
} from '@/__generated__/api/dto/master-data/payment-method.dto';
import {
  useGetPaymentMethod,
  useUpdatePaymentMethod,
} from '@/__generated__/api/hooks/master-data/payment-method.hooks';
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
import { useToast } from '@/components/toast/toast';
import { Check, Edit, Refresh, TwoDimensionalCodeOne } from '@icon-park/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

const columnHelper = createColumnHelper<PaymentMethodStore>();

// Utility function to format API data to component format
const formatPaymentMethodData = (apiData: ApiStoreData[]): PaymentMethodStore[] => {
  return apiData.map((store) => {
    const getStatusByPaymentId = (paymentId: number): 'active' | 'nonactive' => {
      const payment = store[`payment_${paymentId}` as keyof ApiStoreData] as ApiPaymentMethod;
      return payment?.status ? 'active' : 'nonactive';
    };

    const getImageByPaymentId = (paymentId: number): string | undefined => {
      const payment = store[`payment_${paymentId}` as keyof ApiStoreData] as ApiPaymentMethod;
      return payment?.image_url || undefined;
    };

    return {
      id: store.id.toString(),
      name: store.name,
      cash: getStatusByPaymentId(1),
      debitorkredit: getStatusByPaymentId(2),
      voucher: getStatusByPaymentId(3),
      debt: getStatusByPaymentId(4),
      qris: getStatusByPaymentId(5),
      qrisImage: getImageByPaymentId(5) || 'null',
    };
  });
};

export default function TableStoreSwitch() {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [selectedStore, setSelectedStore] = useState<PaymentMethodStore | null>(null);
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
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  const toast = useToast();

  const {
    data: apiResponse,
    isLoading,
    refetch,
  } = useGetPaymentMethod({
    body: {
      page,
      per_page: perPage,
      search: '',
      search_by_status: 'all',
      sort_by: 'name',
      sort_direction: 'asc',
    },
  });

  // Format the data for the table
  const formattedData: PaymentMethodStore[] = useMemo(() => {
    const rawData = Array.isArray(apiResponse) ? apiResponse : apiResponse?.data;
    if (!rawData || !Array.isArray(rawData)) return [];

    const isApiStoreDataArray = (data: unknown[]): data is ApiStoreData[] => {
      return data.every(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          'name' in item &&
          'payment_1' in item &&
          'payment_2' in item
      );
    };

    if (!isApiStoreDataArray(rawData)) {
      console.error('Invalid response data:', rawData);
      return [];
    }

    return formatPaymentMethodData(rawData);
  }, [apiResponse]);

  // Extract pagination from apiResponse with type assertion
  const isApiResponse = (data: unknown): data is ApiResponsePaymentMethod =>
    typeof data === 'object' && data !== null && 'pagination' in data && 'data' in data;

  const paginationData = isApiResponse(apiResponse)
    ? apiResponse.pagination
    : {
        current_page: 0,
        last_page: 0,
        per_page: 10,
        total: 0,
      };

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => <div className="font-semibold text-[#555555]">Toko</div>,
        cell: (info) => {
          const value = info.getValue();
          return <span>{value}</span>;
        },
      }),
      ...(['cash', 'debitorkredit', 'voucher', 'debt', 'qris'] as const).map((method) =>
        columnHelper.accessor(method, {
          header: () => {
            const labelMap: Record<typeof method, string> = {
              cash: 'Tunai',
              debitorkredit: 'Debit / Kredit',
              voucher: 'Voucher',
              debt: 'Utang',
              qris: 'Qris',
            };
            return <div className="font-semibold text-[#555555]">{labelMap[method]}</div>;
          },
          cell: (info) => {
            const value = info.getValue();
            return (
              <span className={value === 'nonactive' ? 'text-red-500' : ''}>
                {value === 'active' ? 'Aktif' : 'Non-Aktif'}
              </span>
            );
          },
        })
      ),
      columnHelper.display({
        id: 'aksi',
        header: () => <div className="font-semibold text-[#555555] text-center">Aksi</div>,
        cell: ({ row }) => {
          const store = row.original;
          return (
            <div className="flex gap-2 justify-center">
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
                  setUploadedImage(store.qrisImage ? new File([], store.qrisImage) : null);
                }}
              >
                <Edit className="mr-1" />
              </Button>
              {store.qrisImage !== 'null' && (
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
              )}
            </div>
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

  const updatePaymentMethodMutation = useUpdatePaymentMethod();

  const handleSavePaymentMethod = async () => {
    if (!selectedStore) return;

    setIsUpdating(true);
    try {
      // Create payments array based on switch states
      const payments = [
        { id: 1, active: switchStates.cash }, // tunai
        { id: 2, active: switchStates.debitorkredit }, // debit/kredit
        { id: 3, active: switchStates.voucher }, // voucher
        { id: 4, active: switchStates.debt }, // hutang
        { id: 5, active: switchStates.qris }, // qris
      ];

      await updatePaymentMethodMutation.mutateAsync({
        storeId: selectedStore.id,
        payments,
        image: uploadedImage || undefined,
      });

      toast.showSuccess('Berhasil disimpan!', 'Pengaturan berhasil diperbarui.');

      setIsConfirmOpen(false);
      setIsEditOpen(false);

      // Refetch data to get updated values
      refetch();
    } catch (error) {
      toast.showError('Gagal menyimpan!', 'Terjadi kesalahan saat menyimpan pengaturan.');
      console.error('Save error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReset = () => {
    if (selectedStore) {
      setSwitchStates({
        cash: selectedStore.cash === 'active',
        debitorkredit: selectedStore.debitorkredit === 'active',
        voucher: selectedStore.voucher === 'active',
        debt: selectedStore.debt === 'active',
        qris: selectedStore.qris === 'active',
      });
      setUploadedImage(selectedStore.qrisImage ? new File([], selectedStore.qrisImage) : null);
      setImageKey((prev) => prev + 1); // retrigger image update
    }
  };

  return (
    <div className="container mx-auto py-4">
      <p className="text-[#555555] text-[16px] font-semibold">Service Charge</p>

      <div className="pt-5 pb-5">
        <InformationText text="Penentuan metode pembayaran yang akan ditampilkan di transaksi" />
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
                    {
                      {
                        cash: 'Tunai',
                        debitorkredit: 'Debit / Kredit',
                        voucher: 'Voucher',
                        debt: 'Hutang',
                        qris: 'QRIS',
                      }[method]
                    }
                  </Label>
                </div>
              ))}
            </div>

            <InputFile
              key={imageKey}
              defaultImageUrl={
                selectedStore?.qrisImage !== 'null'
                  ? selectedStore?.qrisImage
                  : '/assets/zycas/qris-placeholder.png'
              }
              label="Unggah Gambar QRIS"
              previewPosition="top-start"
              accept="image/png, image/jpeg, image/jpg"
              fileInfoExtension=".jpg, .jpeg, .png"
              maxSize={2 * 1024 * 1024}
              onChange={(file) => setUploadedImage(file)}
            />
          </div>

          <DialogFooter>
            <Button variant="ghost" type="button" onClick={handleReset}>
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
                    <Button variant="ghost" disabled={isUpdating}>
                      Batal
                    </Button>
                  </DialogClose>
                  <Button variant="info" onClick={handleSavePaymentMethod} disabled={isUpdating}>
                    {isUpdating ? 'Menyimpan...' : 'Ya, Simpan'}
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
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/assets/zycas/qris-placeholder.png';
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
