'use client';

import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';

type SalesProfitLoss = {
  periode: string;
  nama_barang: string;
  sisa: string;
  pembelian: string;
  hpp: string;
  biaya_tambahan: string;
  pajak: string;
  nama_produk: string;
  jumlah_terjual: string;
  nominal_penjualan: string;
  laba: string;
  persentase_penjualan: string;
};
const columnHelper = createColumnHelper<SalesProfitLoss>();

const mockData: SalesProfitLoss[] = [
  {
    periode: '21/01/2025',
    nama_barang: 'Papua New Guinea Organic Robusta 250 gr',
    sisa: '112 Zak',
    pembelian: '208 Zak',
    hpp: 'Rp 2.968.829',
    biaya_tambahan: 'Rp 1.460.395',
    pajak: 'Rp 156.470',
    nama_produk: 'Papua New Guinea Organic Robusta 250 gr',
    jumlah_terjual: '112 Zak',
    nominal_penjualan: 'Rp 1.109.561',
    laba: 'Rp 357.459',
    persentase_penjualan: '10,553%',
  },
  {
    periode: '20/01/2025',
    nama_barang: 'Aloe Vera Hydrating Gel 100 ml',
    sisa: '20 Jar',
    pembelian: '50 Jar',
    hpp: 'Rp 2.861.970',
    biaya_tambahan: 'Rp 792.196',
    pajak: 'Rp 167.284',
    nama_produk: 'Aloe Vera Hydrating Gel 100 ml',
    jumlah_terjual: '20 Jar',
    nominal_penjualan: 'Rp 510.824',
    laba: 'Rp 172.904',
    persentase_penjualan: '8,411%',
  },
  {
    periode: '19/01/2025',
    nama_barang: 'Rose Bloom Face Mist 60 ml',
    sisa: '156 Botol',
    pembelian: '25 Botol',
    hpp: 'Rp 1.620.436',
    biaya_tambahan: 'Rp 1.265.854',
    pajak: 'Rp 85.292',
    nama_produk: 'Rose Bloom Face Mist 60 ml',
    jumlah_terjual: '156 Botol',
    nominal_penjualan: 'Rp 1.144.466',
    laba: 'Rp 131.692',
    persentase_penjualan: '12,134%',
  },
  {
    periode: '18/01/2025',
    nama_barang: 'Organic Oat Cookies 180 gr (Raisin & Chia - Big)',
    sisa: '255 Plastik',
    pembelian: '76 Plastik',
    hpp: 'Rp 1.978.956',
    biaya_tambahan: 'Rp 1.737.384',
    pajak: 'Rp 151.964',
    nama_produk: 'Organic Oat Cookies 180 gr (Raisin & Chia - Big)',
    jumlah_terjual: '255 Plastik',
    nominal_penjualan: 'Rp 1.241.380',
    laba: 'Rp 163.640',
    persentase_penjualan: '19,2%',
  },
  {
    periode: '17/01/2025',
    nama_barang: 'Raw Honey Sumbawa 500 ml',
    sisa: '50 Botol',
    pembelian: '115 Botol',
    hpp: 'Rp 1.951.687',
    biaya_tambahan: 'Rp 1.718.538',
    pajak: 'Rp 192.327',
    nama_produk: 'Raw Honey Sumbawa 500 ml',
    jumlah_terjual: '50 Botol',
    nominal_penjualan: 'Rp 1.618.929',
    laba: 'Rp 899.954',
    persentase_penjualan: '13%',
  },
  {
    periode: '16/01/2025',
    nama_barang: 'Wedang Rempah Tradisional 1 gr (Coklat - Small)',
    sisa: '22 Sachet',
    pembelian: '12 Sachet',
    hpp: 'Rp 1.726.313',
    biaya_tambahan: 'Rp 1.231.893',
    pajak: 'Rp 185.346',
    nama_produk: 'Wedang Rempah Tradisional 1 gr (Coklat - Small)',
    jumlah_terjual: '22 Sachet',
    nominal_penjualan: 'Rp 609.479',
    laba: 'Rp 48.371',
    persentase_penjualan: '13,912%',
  },
  {
    periode: '15/01/2025',
    nama_barang: 'Mini Ceramic Diffuser 1 pcs',
    sisa: '10 Box',
    pembelian: '5 Box',
    hpp: 'Rp 2.449.505',
    biaya_tambahan: 'Rp 1.037.915',
    pajak: 'Rp 64.523',
    nama_produk: 'Mini Ceramic Diffuser 1 pcs',
    jumlah_terjual: '10 Box',
    nominal_penjualan: 'Rp 535.012',
    laba: 'Rp 54.744',
    persentase_penjualan: '19,201%',
  },
];

export function SalesProfitLossTable() {
  const columns = React.useMemo(
    () => [
      columnHelper.accessor('periode', {
        header: () => <div className="font-bold text-black">Periode</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('nama_barang', {
        header: () => <div className="font-bold text-black">Nama Barang</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('sisa', {
        header: () => <div className="font-bold text-black">Sisa</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('pembelian', {
        header: () => <div className="font-bold text-black">Pembelian</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('hpp', {
        header: () => <div className="font-bold text-black">HPP</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('biaya_tambahan', {
        header: () => <div className="font-bold text-black">Biaya Tambahan</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('pajak', {
        header: () => <div className="font-bold text-black">Pajak</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mx-auto py-2">
      <table className="min-w-full bg-white">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : typeof header.column.columnDef.header === 'function'
                      ? header.column.columnDef.header(header.getContext())
                      : header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {typeof cell.column.columnDef.cell === 'function'
                    ? cell.column.columnDef.cell(cell.getContext())
                    : cell.getValue()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
