import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import {
  Edit,
  FileDisplayOne,
  ImageFiles,
  Right,
  SortAmountDown,
  SortAmountUp,
  SortThree,
  Star,
} from '@icon-park/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

type Product = {
  star: React.ReactNode;
  image: string;
  name: string;
  packaging: string;
  size: string;
  stock: string;
  het: string;
  status: 'Aktif' | 'Non Aktif';
  details: Variant[];
};

type Variant = {
  name: string;
  barcode: string;
  sku: string;
  het: string;
};

const columnHelper = createColumnHelper<Product>();
const baseColumns = [
  columnHelper.accessor('star', {
    header: () => (
      <div className="flex justify-center">
        <Star theme="outline" fill="#555555" />
      </div>
    ),
    cell: (info) => <div className="flex justify-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor('image', {
    header: () => (
      <div className="flex justify-center">
        <ImageFiles theme="filled" className="text-[1rem]" fill="#555555" />
      </div>
    ),
    cell: (info) => (
      <div className="flex justify-center">
        <img
          src={info.getValue()}
          alt={`${info.row.original.name} product`}
          className="w-10 h-10 object-cover rounded-md"
        />
      </div>
    ),
  }),
  columnHelper.accessor('name', {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <div
          onClick={column.getToggleSortingHandler()}
          className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
        >
          Nama Produk
          {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
          {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
          {!isSorted && <SortThree theme="outline" size="16" />}
        </div>
      );
    },
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor('packaging', {
    header: () => <div className="font-semibold text-[#555555]">Kemasan</div>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('size', {
    header: () => <div className="font-semibold text-[#555555]">Isi / Content</div>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('stock', {
    header: () => <div className="font-semibold text-[#555555]">Stok</div>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('het', {
    header: () => <div className="font-semibold text-[#555555]">HET</div>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <div
          onClick={column.getToggleSortingHandler()}
          className="font-semibold text-[#555555] cursor-pointer select-none flex items-center justify-center gap-1"
        >
          Status
          {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
          {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
          {!isSorted && <SortThree theme="outline" size="16" />}
        </div>
      );
    },
    cell: (info) => {
      const value = info.getValue();
      const isAktif = value === 'Aktif';
      return (
        <div
          className={`h-[1.5rem] px-3 py-1 text-[0.75rem] rounded w-[4.4rem] mx-auto text-center ${
            isAktif ? 'bg-[#ECFDF5] text-[#75BF85]' : 'bg-[#FAFAFA] text-[#C2C7D0]'
          }`}
        >
          {value}
        </div>
      );
    },
    enableSorting: true,
    enableColumnFilter: true, // penting untuk filter
  }),
  columnHelper.display({
    id: 'aksi',
    header: () => <div className="font-semibold text-[#555555] text-center">Aksi</div>,
    cell: () => (
      <div className="flex gap-2 justify-center items-center">
        <FileDisplayOne className="cursor-pointer" />
        <Edit className="cursor-pointer" />
      </div>
    ),
  }),
];
const productData: Product[] = [
  {
    star: <Star theme="filled" fill="#FCBA33" />,
    image: '/assets/zycas/example-product.png',
    name: 'Papua New Guinea Organic Robusta',
    packaging: 'Botol',
    size: '250 gr',
    stock: '1.000 pcs',
    het: 'Rp 10.000.000',
    status: 'Aktif',
    details: [], // kosong
  },
  {
    star: <Star theme="filled" fill="#FCBA33" />,
    image: '/assets/zycas/example-product.png',
    name: 'Kopi Gato',
    packaging: 'Kertas',
    size: '500 gr',
    stock: '1.000 pcs',
    het: 'Rp 10.000.000',
    status: 'Aktif',
    details: [
      { name: 'Merah - Small', barcode: '78882271827781', sku: '557781235', het: 'Rp 10.000,00' },
      {
        name: 'Merah - Medium',
        barcode: '128281721872812',
        sku: '557781236',
        het: 'Rp 80.000.000,00',
      },
    ],
  },
  {
    star: <Star theme="outline" fill="#D8D8D8" />,
    image: '/assets/zycas/example-product.png',
    name: 'Barang seken nih jangan beli',
    packaging: 'Botol',
    size: '1 L',
    stock: '1.000 pcs',
    het: 'Rp 10.000.000',
    status: 'Non Aktif',
    details: [
      { name: 'Merah - Large', barcode: '88777229918289', sku: '557781237', het: 'Rp 10.000,00' },
    ],
  },
];

const accordionColumns = [
  {
    id: 'expander',
    header: () => null,
    cell: ({ row }) => {
      const hasDetails = row.original.details?.length > 0;
      if (!hasDetails) return null;

      return (
        <button
          onClick={() => row.toggleExpanded()}
          className="flex items-center justify-center w-8 h-8 cursor-pointer"
          aria-label={row.getIsExpanded() ? 'Collapse' : 'Expand'}
          type="button"
        >
          <div
            className={`transform transition-transform duration-500 ${
              row.getIsExpanded() ? 'rotate-90' : ''
            }`}
          >
            <Right />
          </div>
        </button>
      );
    },
    size: 32,
  },
  ...baseColumns,
];

export default function Index() {
  const table = useReactTable({
    data: productData,
    columns: accordionColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {},
  });
  return (
    <>
      <div className="container mx-auto py-2">
        <DataTable
          table={table}
          renderDetailRow={(row) => {
            const details = row.original.details;
            if (!details || details.length === 0) return null;

            return (
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="px-6 py-2 border-b"> Produk </th>
                    <th className="px-6 border-b"> No. Barcode </th>
                    <th className="px-6 border-b"> Kode SKU </th>
                    <th className="px-6 border-b"> HET </th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((d) => (
                    <tr key={d.sku}>
                      <td className="px-6 py-[19px] border-b">{d.name}</td>
                      <td className="px-6 py-[19px] border-b">{d.barcode}</td>
                      <td className="px-6 py-[19px] border-b">{d.sku}</td>
                      <td className="px-6 py-[19px] border-b">{d.het}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          }}
        />
        <DataTablePagination table={table} isLoading={false} />
      </div>
    </>
  );
}
