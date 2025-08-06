# Sales Void Report Components

This module contains a refactored and modular implementation of the sales void report table with URL parameter management using nuqs.

## Architecture

The original monolithic `sales-void-table.tsx` component has been broken down into smaller, reusable components following React best practices:

### Components Structure

```
src/modules/reports/sales-void/
├── components/
│   ├── index.ts                     # Main exports
│   ├── sales-void-table.tsx         # Main container component
│   ├── void-report-filters.tsx      # Filter controls wrapper
│   ├── void-report-table-core.tsx   # Table rendering logic
│   ├── table-pagination.tsx         # Pagination controls
│   ├── search-filter.tsx            # Search input component
│   ├── select-filter.tsx            # Reusable select filter
│   └── sortable-header.tsx          # Sortable table header
├── hooks/
│   └── use-void-report-filters.ts   # nuqs URL parameter management
├── types/
│   └── void-report.types.ts         # TypeScript interfaces
└── constants/
    └── mock-data.ts                 # Mock data and filter options
```

## Key Features

### 1. **Modular Components**
- Each component has a single responsibility
- Reusable across different contexts
- Proper TypeScript interfaces and props
- Clean separation of concerns

### 2. **URL Parameter Management with nuqs**
- Search parameters are synced with URL
- Browser back/forward navigation support
- Shareable URLs with filter state
- Automatic state persistence

### 3. **Reusable Filter Components**
- `SearchFilter`: Generic search input with icon
- `SelectFilter`: Reusable dropdown filter
- `SortableHeader`: Consistent sortable table headers

## Usage

### Basic Usage

```tsx
import { VoidReportTable } from '@/modules/reports/sales-void/components'

export default function SalesVoidPage() {
  return (
    <div>
      <h1>Sales Void Report</h1>
      <VoidReportTable />
    </div>
  )
}
```

### With Custom Data

```tsx
import { VoidReportTable, VoidReport } from '@/modules/reports/sales-void/components'

const customData: VoidReport[] = [
  // your data here
]

export default function SalesVoidPage() {
  return <VoidReportTable data={customData} />
}
```

### Using Individual Components

```tsx
import { 
  SearchFilter, 
  SelectFilter, 
  useVoidReportFilters 
} from '@/modules/reports/sales-void/components'

export function CustomFilters() {
  const { filters, updateSearch, updateCashier } = useVoidReportFilters()
  
  return (
    <div className="flex gap-4">
      <SearchFilter
        value={filters.search}
        onChange={updateSearch}
        placeholder="Search transactions..."
        label="Search"
      />
      <SelectFilter
        value={filters.cashier}
        onChange={updateCashier}
        options={cashierOptions}
        label="Cashier"
        placeholder="All Cashiers"
        allOptionValue="all-cashier"
      />
    </div>
  )
}
```

## URL Parameters

The `useVoidReportFilters` hook manages these URL parameters:

- `search`: Search query string
- `responsiblePerson`: Selected responsible person filter
- `cashier`: Selected cashier filter
- `selectedPeriod`: Date range period selection (JSON encoded)
- `page`: Current page index (0-based)
- `pageSize`: Number of rows per page
- `sortBy`: Column ID being sorted
- `sortDirection`: Sort direction ('asc' or 'desc')

Example URL: `/reports/sales-void?search=AA1992280&cashier=John%20Doe&responsiblePerson=all-responsible&page=0&pageSize=10&sortBy=tglTransaksi&sortDirection=desc&selectedPeriod=%7B%22type%22%3A%22daily%22%2C%22value%22%3A%7B%22from%22%3A%222025-07-17T00%3A00%3A00.000Z%22%2C%22to%22%3A%222025-07-19T00%3A00%3A00.000Z%22%7D%7D`

## Component Props

### VoidReportTable
```tsx
interface VoidReportTableProps {
  data?: VoidReport[]  // Optional custom data, defaults to mock data
}
```

### SearchFilter
```tsx
interface SearchFilterProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  id?: string
  className?: string
}
```

### SelectFilter
```tsx
interface SelectFilterProps {
  value: string
  onChange: (value: string) => void
  options: FilterOption[]
  label: string
  placeholder: string
  id: string
  allOptionValue: string
  className?: string
}
```

### SortableHeader
```tsx
interface SortableHeaderProps<T> {
  column: Column<T, unknown>
  children: React.ReactNode
  className?: string
}
```

## Types

### VoidReport
```tsx
interface VoidReport {
  tglTransaksi: string
  noNota: string
  kasir: string
  nominalPenjualan: string
  tglVoid: string
  penanggungjawab: string
}
```

### FilterOption
```tsx
interface FilterOption {
  value: string
  label: string
}
```

## Best Practices Implemented

1. **Single Responsibility Principle**: Each component has one clear purpose
2. **Composition over Inheritance**: Components are composed together
3. **Props Interface**: All components have well-defined TypeScript interfaces
4. **Reusability**: Components can be used in different contexts
5. **URL State Management**: Filter state is persisted in URL parameters
6. **Accessibility**: Proper labels and ARIA attributes
7. **Performance**: Efficient re-rendering with proper dependencies

## Migration from Original Component

The original monolithic component has been replaced with this modular structure:

- **Before**: 384 lines in a single file
- **After**: Distributed across 8+ focused components
- **Benefits**: Better maintainability, reusability, and testability

All functionality remains the same, but now with better organization and URL parameter management.