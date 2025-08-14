//table-sales-detail.tsx
import {
  ApiTransactionData,
  ApiTransactionItem,
} from '@/__generated__/api/dto/reports/sales-details.dto';
import { useGetDetailTransaction } from '@/__generated__/api/hooks/reports/sales-details.hooks';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { Pic, Right, SortAmountDown, SortAmountUp, SortThree } from '@icon-park/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useMemo } from 'react';

type TransactionDetail = {
  id: string;
  tanggal: string;
  no_transaksi: string;
  kasir: string;
  total_transaksi: number;
  tambahan_biaya: number;
  potongan: number;
  service_charge: number;
  pajak: number;
  products: ProductDetail[];
};

type ProductDetail = {
  nama_produk: string;
  jumlah_penjualan: string;
  nominal_penjualan: string;
  image_url: string;
  qty_unit: number;
  qty: number;
  variant_unit_name: string;
  total_nominal: number;
};

type SalesDetailsTableProps = {
  cashierFilter?: string;
  productFilter?: string;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  startDate?: string;
  endDate?: string;
};

type Pagination = {
  page: number;
  per_page: number;
  start_date?: string;
  end_date?: string;
  cashier_id?: number;
  product_id?: number;
};

// Function to transform API data to table format
const transformApiDataToTableFormat = (apiData: ApiTransactionData[]): TransactionDetail[] => {
  return apiData.map((transaction, index) => ({
    id: `${transaction.code}-${index}`,
    tanggal: transaction.transaction_date,
    no_transaksi: transaction.code,
    kasir: transaction.cashier,
    total_transaksi: transaction.total_transaction,
    tambahan_biaya: transaction.additional_fee,
    potongan: transaction.discount,
    service_charge: transaction.service_charge,
    pajak: transaction.tax,
    products: transaction.items.map((item: ApiTransactionItem) => ({
      nama_produk: item.product_name,
      jumlah_penjualan: `${item.qty} ${item.variant_unit_name}`,
      nominal_penjualan: formatCurrency(item.total_nominal),
      image_url: item.variant_product_image || '/assets/zycas/default-image-product.png',
      qty_unit: item.qty_unit,
      qty: item.qty,
      variant_unit_name: item.variant_unit_name,
      total_nominal: item.total_nominal,
    })),
  }));
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export default function SalesDetailsTable({
  cashierFilter,
  productFilter,
  currentPage = 1,
  onPageChange,
  startDate,
  endDate,
}: SalesDetailsTableProps) {
  // Build API parameters based on filters
  const apiParams = useMemo(() => {
    const params: Pagination = {
      page: currentPage ?? 1,
      per_page: 10,
    };

    // Add filters if they exist and are not empty strings
    if (startDate?.trim()) params.start_date = startDate;
    if (endDate?.trim()) params.end_date = endDate;
    if (cashierFilter?.trim()) params.cashier_id = parseInt(cashierFilter);
    if (productFilter?.trim()) params.product_id = parseInt(productFilter);

    return params;
  }, [currentPage, startDate, endDate, cashierFilter, productFilter]);

  // Fetch transaction details with filters
  const {
    data: transactionResponse,
    isLoading,
    error,
  } = useGetDetailTransaction({
    body: apiParams,
  });

  // Transform API data to table format
  const tableData = useMemo(() => {
    if (!transactionResponse?.data) return [];
    return transformApiDataToTableFormat(transactionResponse.data);
  }, [transactionResponse?.data]);

  const columnHelper = createColumnHelper<TransactionDetail>();

  const baseColumns = [
    columnHelper.accessor('tanggal', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Tanggal
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => formatDate(info.getValue()),
      enableSorting: true,
    }),
    columnHelper.accessor('no_transaksi', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            No. Transaksi
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('kasir', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Kasir
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('total_transaksi', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Total Transaksi
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => formatCurrency(info.getValue()),
      enableSorting: true,
    }),
    columnHelper.accessor('tambahan_biaya', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Tambahan Biaya
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => formatCurrency(info.getValue()),
      enableSorting: true,
    }),
    columnHelper.accessor('potongan', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Potongan
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => formatCurrency(info.getValue()),
      enableSorting: true,
    }),
    columnHelper.accessor('service_charge', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Service Charge
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => formatCurrency(info.getValue()),
      enableSorting: true,
    }),
    columnHelper.accessor('pajak', {
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <div
            onClick={column.getToggleSortingHandler()}
            className="font-semibold text-[#555555] cursor-pointer select-none flex items-center gap-1"
          >
            Pajak
            {isSorted === 'asc' && <SortAmountUp theme="outline" size="16" />}
            {isSorted === 'desc' && <SortAmountDown theme="outline" size="16" />}
            {!isSorted && <SortThree theme="outline" size="16" />}
          </div>
        );
      },
      cell: (info) => formatCurrency(info.getValue()),
      enableSorting: true,
    }),
  ];

  // Add accordion expander column
  const accordionColumns = [
    {
      id: 'expander',
      header: () => null,
      cell: ({ row }) => {
        const hasProducts = row.original.products?.length > 0;
        if (!hasProducts) return null;

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
    manualPagination: true,
    pageCount: transactionResponse?.pagination?.last_page || 0,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: 10,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newPagination = updater({
          pageIndex: currentPage - 1,
          pageSize: 10,
        });
        onPageChange?.(newPagination.pageIndex + 1);
      }
    },
  });

  if (error) {
    return (
      <div className="container mx-auto py-2">
        <div className="text-center py-8">
          <p className="text-red-500">Error loading transaction details: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-2">
      <DataTable
        table={table}
        isLoading={isLoading}
        renderDetailRow={(row) => {
          const products = row.original.products;
          if (!products || products.length === 0) return null;

          return (
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="flex justify-center p-2">
                    <Pic theme="filled" />
                  </th>
                  <th className="px-6 py-2 border-b">Nama Produk</th>
                  <th className="px-6 border-b text-center">Jumlah Penjualan</th>
                  <th className="px-6 border-b text-right">Nominal Penjualan</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={`${row.original.id}-${index}`}>
                    <td className="flex justify-center p-3">
                      <div className="w-9 h-9 relative">
                        <img
                          src={product.image_url}
                          alt={product.nama_produk}
                          className="object-cover rounded-md w-full h-full"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/assets/zycas/default-image-product.png';
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-[19px] border-b">{product.nama_produk}</td>
                    <td className="px-6 py-[19px] border-b text-center">
                      {product.qty} {product.variant_unit_name}
                    </td>
                    <td className="px-6 py-[19px] border-b text-right">
                      {formatCurrency(product.total_nominal)}
                    </td>
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
