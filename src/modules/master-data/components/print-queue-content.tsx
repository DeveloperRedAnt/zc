'use client';

import { InformationText } from '@/components/information-text/information-text';
import { Switch } from '@/components/switch/switch';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

type Store = {
  id: string;
  name: string;
  showInvoice: boolean;
  currentShowInvoice?: boolean; // optional for computed field
};

const columnHelper = createColumnHelper<Store>();

export default function TableStoreSwitch() {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(5);

  const fullData: Store[] = [
    { id: 'store-1', name: 'PT Ezhe Source', showInvoice: true },
    { id: 'store-2', name: 'PT Cipta Usaha', showInvoice: false },
    { id: 'store-3', name: 'PT Sumber Rejeki', showInvoice: true },
    { id: 'store-4', name: 'PT Andalan Citra', showInvoice: false },
    { id: 'store-5', name: 'PT Mitra Teknologi', showInvoice: false },
    { id: 'store-6', name: 'PT Sentosa Makmur', showInvoice: true },
  ];

  const totalPage = Math.ceil(fullData.length / perPage);

  const start = (page - 1) * perPage;
  const paginatedData = fullData.slice(start, start + perPage);

  const [switchState, setSwitchState] = React.useState<Record<string, boolean>>(
    Object.fromEntries(fullData.map((item) => [item.id, item.showInvoice]))
  );

  const handleToggle = (id: string) => {
    setSwitchState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ⛔ No useMemo here
  const dataWithSwitchState: Store[] = paginatedData.map((store) => ({
    ...store,
    currentShowInvoice: switchState[store.id] ?? store.showInvoice,
  }));

  const columns = [
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
              checked={store.currentShowInvoice}
              onCheckedChange={() => handleToggle(store.id)}
            />
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: dataWithSwitchState,
    columns,
    manualPagination: true,
    pageCount: totalPage,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="container mx-auto py-4">
      <div className="flex-row flex justify-between items-start w-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between p-0 relative shrink-0">
          <div className="flex flex-col font-['Poppins:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#555555] text-[16px] text-left text-nowrap">
            <p className="block leading-[24px] whitespace-pre font-semibold"> Cetak No Antrian </p>
          </div>
        </div>
      </div>

      <div className="pt-5 pb-5">
        <InformationText text="Pengaturan untuk menampilkan no. antrian di nota" />
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
    </div>
  );
}
