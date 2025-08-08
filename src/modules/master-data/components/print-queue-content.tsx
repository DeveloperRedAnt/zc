'use client';

import {
  ApiQueueTicketData,
  ApiQueueTicketsResponse,
  QueueTicketStore,
} from '@/__generated__/api/dto/master-data/print-queue.dto';
import {
  useGetQueueTickets,
  useUpdateQueueTicket,
} from '@/__generated__/api/hooks/master-data/print-queue.hooks';
import { InformationText } from '@/components/information-text/information-text';
import { Switch } from '@/components/switch/switch';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { useToast } from '@/components/toast/toast';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

const columnHelper = createColumnHelper<QueueTicketStore>();

// Utility function to format API data to component format
const formatQueueTicketData = (apiData: ApiQueueTicketData[]): QueueTicketStore[] => {
  return apiData.map((store) => ({
    id: store.store_id.toString(),
    name: `Store ${store.store_id}`, // You might want to get store names from another API
    is_printed: store.is_printed,
  }));
};

export default function TableQueueTickets() {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [switchState, setSwitchState] = useState<Record<string, boolean>>({});
  const toast = useToast();

  const {
    data: apiResponse,
    isLoading,
    refetch,
  } = useGetQueueTickets({
    body: {
      page,
      per_page: perPage,
      search: '',
      search_by_status: 'all',
      sort_by: 'store_id',
      sort_direction: 'asc',
    },
  });

  const formattedData: QueueTicketStore[] = useMemo(() => {
    const rawData = Array.isArray(apiResponse)
      ? apiResponse
      : Array.isArray(apiResponse?.data)
        ? apiResponse.data
        : [];

    const isApiQueueTicketDataArray = (data: unknown[]): data is ApiQueueTicketData[] => {
      return data.every(
        (item) =>
          typeof item === 'object' && item !== null && 'store_id' in item && 'is_printed' in item
      );
    };

    if (!isApiQueueTicketDataArray(rawData)) {
      console.error('Invalid response data:', rawData);
      return [];
    }

    const formatted = formatQueueTicketData(rawData);

    // Inisialisasi state switch hanya jika datanya valid
    const initialSwitchState: Record<string, boolean> = {};
    for (const store of formatted) {
      initialSwitchState[store.id] = store.is_printed;
    }
    setSwitchState(initialSwitchState);

    return formatted;
  }, [apiResponse]);

  // Extract pagination from apiResponse with type assertion
  const isApiResponse = (data: unknown): data is ApiQueueTicketsResponse =>
    typeof data === 'object' && data !== null && 'pagination' in data && 'data' in data;

  const paginationData = isApiResponse(apiResponse)
    ? apiResponse.pagination
    : {
        current_page: 0,
        last_page: 0,
        per_page: 5,
        total: 0,
      };

  const updateQueueTicketMutation = useUpdateQueueTicket();

  const handleToggle = async (storeId: string) => {
    const currentState = switchState[storeId] ?? false;
    const newState = !currentState;

    // Optimistically update the UI
    setSwitchState((prev) => ({
      ...prev,
      [storeId]: newState,
    }));

    try {
      await updateQueueTicketMutation.mutateAsync({
        storeId,
        payload: {
          is_printed: newState,
        },
      });

      toast.showSuccess('Berhasil!', 'Pengaturan cetak no antrian berhasil diperbarui.');

      // Refetch data to get updated values
      refetch();
    } catch (error) {
      // Revert the optimistic update on error
      setSwitchState((prev) => ({
        ...prev,
        [storeId]: currentState,
      }));

      toast.showError('Gagal menyimpan!', 'Terjadi kesalahan saat memperbarui pengaturan.');
      console.error('Update error:', error);
    }
  };

  // Merge formatted data with current switch state
  const dataWithSwitchState: QueueTicketStore[] = formattedData.map((store) => ({
    ...store,
    is_printed: switchState[store.id] ?? store.is_printed,
  }));

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => <div className="font-semibold text-[#555555]">Toko</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.display({
        id: 'switch',
        header: () => (
          <div className="font-semibold text-[#555555] text-center">Tampilkan di Nota</div>
        ),
        cell: (info) => {
          const store = info.row.original;
          return (
            <div className="flex justify-center">
              <Switch
                id={`switch-${store.id}`}
                checked={store.is_printed}
                onCheckedChange={() => handleToggle(store.id)}
                disabled={updateQueueTicketMutation.isPending}
              />
            </div>
          );
        },
      }),
    ],
    [handleToggle, updateQueueTicketMutation.isPending]
  );

  const table = useReactTable({
    data: dataWithSwitchState,
    columns,
    manualPagination: true,
    pageCount: paginationData?.last_page ?? 0,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="container mx-auto py-4">
      <div className="flex-row flex justify-between items-start w-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0">
          <div className="flex flex-col font-['Poppins:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#555555] text-[16px] text-left text-nowrap">
            <p className="block leading-[24px] whitespace-pre font-semibold">Cetak No Antrian</p>
          </div>
        </div>
      </div>

      <div className="pt-5 pb-5">
        <InformationText text="Pengaturan untuk menampilkan no. antrian di nota" />
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
    </div>
  );
}
