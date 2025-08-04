import { ApiProduct } from '@/__generated__/api/dto'; // Sesuaikan dengan path types Anda
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
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

type Product = {
  id: number;
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

type TableProductListProps = {
  data?: ApiProduct[];
  isLoading?: boolean;
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
  onPageChange?: (page: number) => void; // Add this prop
  currentPage?: number; // Add this prop
};

// Function to transform API data to table format
const transformApiDataToTableFormat = (apiData: ApiProduct[]): Product[] => {
  return apiData.map((product) => ({
    id: product.id,
    star: product.is_favorite ? (
      <Star theme="filled" fill="#FCBA33" />
    ) : (
      <Star theme="outline" fill="#D8D8D8" />
    ),
    image: product.thumbnail || '/assets/zycas/example-product.png',
    name: product.brand,
    packaging: product.package || '-',
    size: product.content || '-',
    stock: '-', // Data stok tidak tersedia, bisa diganti kalau field-nya ada
    het: product.price || '-',
    status: 'Aktif', // Tidak tersedia di API, default sementara
    details:
      product.variants?.map((variant) => ({
        name: variant.name || '-',
        barcode: variant.barcode || '-',
        sku: variant.sku || '-',
        het: variant.het || '-',
      })) || [],
  }));
};

export default function TableProductList({
  data = [],
  isLoading = false,
  meta,
  onPageChange, // Add this prop
  currentPage = 1, // Add this prop
}: TableProductListProps) {
  // Transform API data to table format
  const tableData = useMemo(() => {
    return transformApiDataToTableFormat(data);
  }, [data]);

  const router = useRouter();

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
      enableColumnFilter: true,
    }),
    columnHelper.display({
      id: 'aksi',
      header: () => <div className="font-semibold text-[#555555] text-center">Aksi</div>,
      cell: (info) => (
        <div className="flex gap-2 justify-center items-center">
          <div className="relative group">
            <FileDisplayOne
              className="cursor-pointer"
              onClick={() => router.push(`/dashboard/product/${info.row.original.id}`)}
            />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-xs px-2 py-1 rounded shadow z-10 whitespace-nowrap">
              Detail
            </span>
          </div>
          <div className="relative group">
            <Edit className="cursor-pointer" />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex bg-gray-700 text-white text-xs px-2 py-1 rounded shadow z-10 whitespace-nowrap">
              Ubah
            </span>
          </div>
        </div>
      ),
    }),
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

  const table = useReactTable({
    data: tableData,
    columns: accordionColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true, // Enable manual pagination since we're using API pagination
    pageCount: meta?.total_pages || 0,
    state: {
      pagination: {
        pageIndex: (currentPage || 1) - 1, // Use currentPage prop instead of meta
        pageSize: meta?.per_page || 10,
      },
    },
    onPaginationChange: (updater) => {
      // Handle pagination change
      if (typeof updater === 'function') {
        const newPagination = updater({
          pageIndex: (currentPage || 1) - 1,
          pageSize: meta?.per_page || 10,
        });
        onPageChange?.(newPagination.pageIndex + 1); // Convert back to 1-based index
      }
    },
  });

  return (
    <div className="container mx-auto py-2">
      <DataTable
        table={table}
        isLoading={isLoading}
        renderDetailRow={(row) => {
          const details = row.original.details;
          if (!details || details.length === 0) return null;

          return (
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="px-6 py-2 border-b">Produk</th>
                  <th className="px-6 border-b">No. Barcode</th>
                  <th className="px-6 border-b">Kode SKU</th>
                  <th className="px-6 border-b">HET</th>
                </tr>
              </thead>
              <tbody>
                {details.map((d) => (
                  <tr key={d.sku + d.barcode}>
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
      <DataTablePagination table={table} isLoading={isLoading} />
    </div>
  );
}
