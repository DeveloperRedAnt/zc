'use client';

import {
  ApiTaxMasterData,
  ApiTaxMasterResponse,
  TaxMasterStore,
} from '@/__generated__/api/dto/master-data/tax-master.dto';
import { useGetTaxMaster } from '@/__generated__/api/hooks/master-data/tax-master.hooks';
import { Button } from '@/components/button/button';
import { DataTable } from '@/components/table/data-table';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { Edit } from '@icon-park/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

type TableTaxMasterListProps = {
  handleEditButton?: (taxMaster: TaxMasterStore) => void;
};

const columnHelper = createColumnHelper<TaxMasterStore>();

// Utility function to format API data to component format
const formatTaxMasterData = (apiData: ApiTaxMasterData[]): TaxMasterStore[] => {
  return apiData.map((store) => ({
    id: store.store_id.toString(),
    npwp: store.npwp,
    name: store.store,
    percentage: `${store.tax.toFixed(1)}%`,
  }));
};

export default function Index({ handleEditButton }: TableTaxMasterListProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const {
    data: apiResponse,
    isLoading,
    refetch: _,
  } = useGetTaxMaster({
    body: {
      page,
      per_page: perPage,
      search: '',
      search_by_status: 'all',
      sort_by: 'store',
      sort_direction: 'asc',
    },
  });

  const formattedData: TaxMasterStore[] = useMemo(() => {
    const rawData = Array.isArray(apiResponse)
      ? apiResponse
      : Array.isArray(apiResponse?.data)
        ? apiResponse.data
        : [];

    const isApiTaxMasterDataArray = (data: unknown[]): data is ApiTaxMasterData[] => {
      return data.every(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          'store_id' in item &&
          'store' in item &&
          'tax' in item &&
          'npwp' in item
      );
    };

    if (!isApiTaxMasterDataArray(rawData)) {
      console.error('Invalid response data:', rawData);
      return [];
    }

    return formatTaxMasterData(rawData);
  }, [apiResponse]);

  // Extract pagination from apiResponse
  const isApiResponse = (data: unknown): data is ApiTaxMasterResponse =>
    typeof data === 'object' &&
    data !== null &&
    'data' in data &&
    typeof (data as { data: unknown }).data === 'object' &&
    (data as { data: unknown }).data !== null &&
    'pagination' in (data as { data: { pagination: unknown } }).data;

  const paginationData = isApiResponse(apiResponse)
    ? apiResponse.data.pagination
    : {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
      };

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: () => <div className="font-semibold text-black">Toko</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.accessor('percentage', {
        header: () => <div className="font-semibold text-black">Persen Pajak</div>,
        cell: (info) => <span>{info.getValue()}</span>,
      }),
      columnHelper.display({
        id: 'aksi',
        header: () => <div className="font-semibold text-black text-center">Aksi</div>,
        cell: ({ row }) => {
          const store = row.original;
          return (
            <div className="flex gap-2 justify-center items-center">
              <Button variant="ghost" size="sm" onClick={() => handleEditButton?.(store)}>
                <Edit className="cursor-pointer hover:text-blue-600 transition-colors" />
              </Button>
            </div>
          );
        },
      }),
    ],
    [handleEditButton]
  );

  const table = useReactTable({
    data: formattedData,
    columns,
    manualPagination: true,
    pageCount: paginationData?.last_page ?? 1,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="container py-2 w-full">
      <DataTable table={table} isLoading={isLoading} />
      <DataTablePagination
        table={table}
        onPage={setPage}
        onPageSize={setPerPage}
        page={page - 1} // DataTablePagination uses 0-based indexing
        pageSize={perPage}
        totalPages={paginationData?.last_page ?? 1}
        isLoading={isLoading}
        hidePageSize={true}
      />
    </div>
  );
}
