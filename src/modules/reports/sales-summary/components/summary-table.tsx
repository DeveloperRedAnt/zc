'use client';

import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

type SalesSummary = {
  periode: string;
  netto: string;
  bruto: string;
  diskon: string;
  pajak: string;
  transaksi_jumlah: string;
  transaksi_nominal: string;
  hpp: string;
};

const columnHelper = createColumnHelper<SalesSummary>();

export default function SummaryTable() {
  // Mock data based on the provided image
  const data: SalesSummary[] = [
    {
      periode: '19/07/2025',
      netto: 'Rp 8.262.195',
      bruto: 'Rp 4.373.475',
      diskon: 'Rp 143.758',
      pajak: 'Rp 172.772',
      transaksi_jumlah: '16 Transaksi',
      transaksi_nominal: 'Rp 86.914',
      hpp: 'Rp 3.246.808',
    },
    {
      periode: '18/07/2025',
      netto: 'Rp 2.285.097',
      bruto: 'Rp 1.069.382',
      diskon: 'Rp 42.221',
      pajak: 'Rp 164.781',
      transaksi_jumlah: '2 Transaksi',
      transaksi_nominal: 'Rp 599.537',
      hpp: 'Rp 3.246.808',
    },
    {
      periode: '17/07/2025',
      netto: 'Rp 7.267.960',
      bruto: 'Rp 4.917.177',
      diskon: 'Rp 74.707',
      pajak: 'Rp 95.488',
      transaksi_jumlah: '35 Transaksi',
      transaksi_nominal: 'Rp 380.764',
      hpp: 'Rp 3.246.808',
    },
  ];

  // No loading state for mock data
  const isLoading = false;

  // No user filter store or params needed
  /**
   * FILTER USER
   */

  /**
   * RESET PASSWORD
   */
  const [_toggleResetPassModal, _setToggleResetPassModal] = React.useState(false);
  const [_selectedUserId, _setSelectedUserId] = React.useState<number | null>(null);
  /**
   * RESET PASSWORD
   */

  /**
   * RESET PIN
   */
  const [_toggleResetPinModal, _setToggleResetPinModal] = React.useState(false);
  /**
   * RESET PIN
   */

  const baseColumns = React.useMemo(
    () => [
      columnHelper.accessor('periode', {
        header: () => <div className="font-bold text-black">Periode</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('netto', {
        header: () => <div className="font-bold text-black">Netto</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('bruto', {
        header: () => <div className="font-bold text-black">Bruto</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('diskon', {
        header: () => <div className="font-bold text-black">Diskon</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('pajak', {
        header: () => <div className="font-bold text-black">Pajak</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.display({
        id: 'transaksi',
        header: () => (
          <div className="font-bold text-black text-center">
            Transaksi
            <div className="flex justify-center gap-2 text-xs mt-1">
              <span>Jumlah</span>
              <span>Nominal</span>
            </div>
          </div>
        ),
        cell: (info) => (
          <div className="flex flex-col items-center">
            <div>{info.row.original.transaksi_jumlah}</div>
            <div>{info.row.original.transaksi_nominal}</div>
          </div>
        ),
      }),
      columnHelper.accessor('hpp', {
        header: () => <div className="font-bold text-black">HPP</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns: baseColumns,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="container mx-auto py-2">
      <DataTable table={table} />
      <DataTablePagination table={table} isLoading={isLoading} />
    </div>
  );
}
