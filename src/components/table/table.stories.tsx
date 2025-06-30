import {
  Delete,
  Edit,
  FileDisplayOne,
  ImageFiles,
  Right,
  SortAmountDown,
  SortAmountUp,
  SortThree,
  Star,
} from '@icon-park/react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DataTable } from './data-table';
import { DataTablePagination } from './data-table-pagination';

type Product = {
  star: React.ReactNode;
  image: string;
  name: string;
  packaging: string;
  size: string;
  stock: string;
  het: string;
  status: 'Aktif' | 'Non Aktif';
  aksi?: React.ReactNode;
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
  columnHelper.accessor('name', {
    header: 'Nama Produk',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('packaging', {
    header: 'Kemasan',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('size', {
    header: 'Isi / Content',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('stock', {
    header: 'Stok',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('het', {
    header: 'Het',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: 'aksi',
    header: () => <div className="font-semibold text-center"> Aksi </div>,
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <Edit
          className="w-4 h-4 cursor-pointer text-gray-600 hover:text-blue-600"
          onClick={() => handleEdit(row.original)}
        />
        <Delete
          className="w-4 h-4 cursor-pointer text-gray-600 hover:text-red-600"
          onClick={() => handleDelete(row.original)}
        />
      </div>
    ),
  }),
];

const handleEdit = (_data) => {};

const handleDelete = (_data) => {};

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

const productData: Product[] = [
  {
    star: <Star theme="filled" fill="#FCBA33" />,
    image: '/assets/zycas/example-product.png',
    name: 'Paracetamol',
    packaging: 'Botol',
    size: '10 Tablet',
    stock: '120 pcs',
    het: 'Rp 10.000',
    status: 'Aktif',
    aksi: 'Edit',
    details: [],
  },
  {
    star: <Star theme="outline" fill="#D8D8D8" />,
    image: '/assets/zycas/example-product.png',
    name: 'Amoxicillin',
    packaging: 'Botol',
    size: '60 ml',
    stock: '80 pcs',
    het: 'Rp 25.000',
    status: 'Aktif',
    details: [
      { name: 'Merah - Large', barcode: '88777229918289', sku: '557781237', het: 'Rp 10.000,00' },
    ],
  },
  {
    star: <Star theme="filled" fill="#FCBA33" />,
    image: '/assets/zycas/example-product.png',
    name: 'Vitamin C',
    packaging: 'Box',
    size: '30 Tablet',
    stock: '200 pcs',
    het: 'Rp 15.000',
    status: 'Non Aktif',
    aksi: 'Edit',
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
    star: <Star theme="filled" fill="#FCBA33" />,
    image: '/assets/zycas/example-product.png',
    name: 'Ibuprofen',
    packaging: 'Strip',
    size: '12 Tablet',
    stock: '150 pcs',
    het: 'Rp 12.000',
    status: 'Aktif',
    aksi: 'Edit',
    details: [],
  },
  {
    star: <Star theme="filled" fill="#FCBA33" />,
    image: '/assets/zycas/example-product.png',
    name: 'Cetirizine',
    packaging: 'Botol',
    size: '100 ml',
    stock: '60 pcs',
    het: 'Rp 18.000',
    status: 'Aktif',
    aksi: 'Edit',
    details: [],
  },
  {
    star: <Star theme="filled" fill="#FCBA33" />,
    image: '/assets/zycas/example-product.png',
    name: 'Antasida',
    packaging: 'Box',
    size: '20 Tablet',
    stock: '90 pcs',
    het: 'Rp 8.000',
    status: 'Aktif',
    aksi: 'Edit',
    details: [],
  },
  {
    star: <Star theme="filled" fill="#FCBA33" />,
    image: '/assets/zycas/example-product.png',
    name: 'Loperamide',
    packaging: 'Strip',
    size: '6 Tablet',
    stock: '40 pcs',
    het: 'Rp 7.000',
    status: 'Non Aktif',
    aksi: 'Edit',
    details: [],
  },
  {
    star: <Star theme="filled" fill="#FCBA33" />,
    image: '/assets/zycas/example-product.png',
    name: 'Omeprazole',
    packaging: 'Botol',
    size: '30 Kapsul',
    stock: '70 pcs',
    het: 'Rp 30.000',
    status: 'Aktif',
    aksi: 'Edit',
    details: [],
  },
  {
    star: <Star theme="filled" fill="#FCBA33" />,
    image: '/assets/zycas/example-product.png',
    name: 'Metformin',
    packaging: 'Box',
    size: '60 Tablet',
    stock: '110 pcs',
    het: 'Rp 22.000',
    status: 'Aktif',
    aksi: 'Edit',
    details: [],
  },
  {
    star: <Star theme="filled" fill="#FCBA33" />,
    image: '/assets/zycas/example-product.png',
    name: 'Simvastatin',
    packaging: 'Strip',
    size: '15 Tablet',
    stock: '55 pcs',
    het: 'Rp 19.000',
    status: 'Non Aktif',
    aksi: 'Edit',
    details: [],
  },
];

const baseColumnsWithSorting = [
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
          className="w-10 h-10 object-cover rounded-md"
          alt="image-product"
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
        <FileDisplayOne />
        <Edit />
      </div>
    ),
  }),
];

const accordionColumnsWithSorting = [
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
  ...baseColumnsWithSorting,
];

const meta: Meta<typeof DataTable> = {
  title: 'Basic Components/Table',
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  render: () => {
    const table = useReactTable({
      data: productData,
      columns: baseColumns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      state: {},
    });
    return <DataTable width={'1000px'} table={table} isLoading={false} />;
  },
};

export const Accordion: Story = {
  render: () => {
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
      <div className="container mx-auto py-10">
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
          width="1000px"
        />
        <DataTablePagination table={table} isLoading={false} />
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const table = useReactTable({
      data: [],
      columns: baseColumns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      state: {},
    });
    return (
      <div className="container mx-auto py-10">
        <DataTable table={table} isLoading={true} width="1000px" />
        <DataTablePagination table={table} isLoading={true} />
      </div>
    );
  },
};

export const Empty: Story = {
  render: () => {
    const table = useReactTable({
      data: [],
      columns: accordionColumns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      state: {},
    });
    return (
      <>
        <DataTable
          table={table}
          renderDetailRow={(row) => (
            <div className="p-4 bg-gray-50 rounded">
              <strong>Detail:</strong> {JSON.stringify(row.original, null, 2)}
            </div>
          )}
          width="1000px"
        />
        <DataTablePagination table={table} isLoading={true} />
      </>
    );
  },
};

export const WithSortingAndStyleColumn: Story = {
  render: () => {
    const table = useReactTable({
      data: productData,
      columns: accordionColumnsWithSorting,
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
            width={'1000px'}
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
  },
};
