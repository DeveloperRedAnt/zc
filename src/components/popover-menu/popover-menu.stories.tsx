import { Box, Edit, Filter, Plus, Setting, ShoppingCart } from '@icon-park/react';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BulkEditData, BulkEditPopover } from './popover-menu';

const meta: Meta<typeof BulkEditPopover> = {
  title: 'Components/Enhanced BulkEditPopover',
  component: BulkEditPopover,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
    docs: {
      description: {
        component:
          'Enhanced BulkEditPopover component that includes trigger button, backdrop, and all popover functionality in a single component. Just add it to your page and configure via props!',
      },
    },
  },
  argTypes: {
    variants: {
      description: 'Array of variant data to display',
      control: 'object',
    },
    onUpdate: {
      description: 'Callback function when bulk update is triggered',
      action: 'onUpdate',
    },
    triggerButtonText: {
      description: 'Text for the trigger button',
      control: 'text',
    },
    triggerButtonClassName: {
      description: 'CSS classes for the trigger button',
      control: 'text',
    },
    title: {
      description: 'Title of the popover',
      control: 'text',
    },
    description: {
      description: 'Description text below the title',
      control: 'text',
    },
    position: {
      description: 'Position of the popover relative to trigger button',
      control: 'select',
      options: [
        'bottom-left',
        'bottom-right',
        'top-left',
        'top-right',
        'bottom-center',
        'top-center',
      ],
    },
    gridColumns: {
      description: 'Number of columns for variant grid',
      control: 'select',
      options: [1, 2, 3, 4],
    },
    disabled: {
      description: 'Disable the entire component',
      control: 'boolean',
    },
    showSelectAll: {
      description: 'Show or hide the select all checkbox',
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleVariants: BulkEditData[] = [
  { id: '1', name: 'Small' },
  { id: '2', name: 'Medium' },
  { id: '3', name: 'Large' },
  { id: '4', name: 'Small' },
  { id: '5', name: 'Medium' },
  { id: '6', name: 'Large' },
];

const clothingVariants: BulkEditData[] = [
  { id: '1', name: 'S' },
  { id: '2', name: 'M' },
  { id: '3', name: 'L' },
  { id: '4', name: 'S' },
  { id: '5', name: 'M' },
  { id: '6', name: 'L' },
];

const manyVariants: BulkEditData[] = Array.from({ length: 20 }, (_, i) => {
  const types = ['Merah', 'Biru', 'Hijau', 'Kuning', 'Hitam'];
  const names = ['XS', 'S', 'M', 'L', 'XL'];
  return {
    id: `variant-${i + 1}`,
    type: types[i % types.length] ?? '',
    name: names[Math.floor(i / 4) % names.length] ?? '',
  };
});

// Basic example - super simple usage
export const Default: Story = {
  args: {
    variants: sampleVariants,
    onUpdate: (_selectedIds, _updates) => {},
  },
};

// Custom trigger button with icon
export const CustomTriggerButton: Story = {
  args: {
    variants: clothingVariants,
    triggerButtonText: 'Edit Products',
    triggerButtonIcon: <Edit size={16} />,
    triggerButtonClassName: 'bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md',
  },
};

// Different positions
export const BottomRight: Story = {
  args: {
    variants: sampleVariants,
    position: 'bottom-right',
    triggerButtonText: 'Bulk Actions',
    triggerButtonIcon: <Setting size={16} />,
  },
};

export const TopCenter: Story = {
  args: {
    variants: sampleVariants,
    position: 'top-center',
    triggerButtonText: 'Select Items',
    triggerButtonIcon: <Box size={16} />,
  },
};

// Custom content and styling
export const EcommerceExample: Story = {
  args: {
    variants: clothingVariants,
    triggerButtonText: 'Update Products',
    triggerButtonIcon: <ShoppingCart size={16} />,
    triggerButtonClassName:
      'bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold',
    title: 'Update Produk Fashion',
    description: 'Pilih produk yang ingin diupdate harga, stok, atau deskripsinya',
    selectAllLabel: 'Pilih Semua Produk',
    actionButtonLabel: 'Update Data Produk',
    actionButtonIcon: <Plus size={16} />,
    popoverWidth: 'w-[600px]',
    gridColumns: 2,
  },
};

// Many items with scrolling
export const ManyItems: Story = {
  args: {
    variants: manyVariants,
    triggerButtonText: 'Filter Variants',
    triggerButtonIcon: <Filter size={16} />,
    title: 'Select Color & Size Variants',
    description: 'Choose from available color and size combinations',
    maxHeight: 'max-h-64',
    gridColumns: 4,
    popoverWidth: 'w-[700px]',
  },
};

// Disabled state
export const DisabledState: Story = {
  args: {
    variants: sampleVariants,
    disabled: true,
    triggerButtonText: 'Bulk Edit (Disabled)',
    title: 'Bulk Edit Not Available',
    description: 'This feature is currently disabled',
  },
};

// No select all option
export const NoSelectAll: Story = {
  args: {
    variants: sampleVariants,
    showSelectAll: false,
    triggerButtonText: 'Manual Select',
    title: 'Manual Selection Only',
    description: 'Select items individually without select all option',
  },
};

// Empty state
export const EmptyState: Story = {
  args: {
    variants: [],
    triggerButtonText: 'No Items Available',
    title: 'No Variants',
    description: 'There are no variants available at the moment',
    emptyStateText: 'Belum ada data varian tersedia',
  },
};

// Single column layout
export const SingleColumn: Story = {
  args: {
    variants: clothingVariants,
    triggerButtonText: 'List View',
    gridColumns: 1,
    popoverWidth: 'w-[400px]',
    title: 'Product List',
    description: 'Select products from the list below',
  },
};

// Custom styling example
export const CustomStyling: Story = {
  args: {
    variants: sampleVariants,
    triggerButtonText: 'Fancy Bulk Edit',
    triggerButtonClassName:
      'bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all duration-200',
    popoverClassName:
      'border-2 border-violet-200 shadow-2xl bg-gradient-to-br from-white to-violet-50',
    title: '✨ Select Your Variants',
    description: 'Choose the variants you want to update with style!',
    actionButtonLabel: '🚀 Launch Bulk Update',
  },
};

// Real-world usage example
export const RealWorldExample: Story = {
  render: () => (
    <div className="space-y-4 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Product Management Dashboard</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Product Variants</h2>

          <div className="flex gap-3">
            <BulkEditPopover
              variants={clothingVariants}
              triggerButtonText="Update Prices"
              triggerButtonIcon={<Edit size={16} />}
              triggerButtonClassName="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              title="Update Product Prices"
              description="Select products to update prices in bulk"
              actionButtonLabel="Continue to Price Update"
              position="bottom-right"
              onUpdate={(selectedIds) => {
                alert(`Updating prices for ${selectedIds.length} products`);
              }}
            />

            <BulkEditPopover
              variants={clothingVariants}
              triggerButtonText="Manage Stock"
              triggerButtonIcon={<Box size={16} />}
              triggerButtonClassName="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              title="Stock Management"
              description="Select products to update stock quantities"
              actionButtonLabel="Update Stock Levels"
              position="bottom-right"
              onUpdate={(selectedIds) => {
                alert(`Managing stock for ${selectedIds.length} products`);
              }}
            />

            <BulkEditPopover
              variants={clothingVariants}
              triggerButtonText="Export Data"
              triggerButtonIcon={<Filter size={16} />}
              triggerButtonClassName="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              title="Export Product Data"
              description="Select products to export their data"
              actionButtonLabel="Export Selected"
              selectAllLabel="Export All Products"
              position="bottom-right"
              gridColumns={2}
              onUpdate={(selectedIds) => {
                alert(`Exporting data for ${selectedIds.length} products`);
              }}
            />
          </div>
        </div>

        <div className="text-gray-600">
          <p>
            This demonstrates how easy it is to use multiple BulkEditPopover components in a real
            application.
          </p>
          <p className="mt-2">
            Each button opens its own configured popover with different settings and behaviors.
          </p>
        </div>
      </div>
    </div>
  ),
};
