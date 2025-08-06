import { Skeleton } from '@/components/skeleton/skeleton';
import { TableCell, TableRow } from '@/components/table/core/table';

interface TableSkeletonProps {
  rows: number;
  columns: number;
}

export function TableSkeleton({ rows, columns }: TableSkeletonProps) {
  const skeletonRows = Array.from({ length: rows }, (_, rowIndex) => ({
    id: `skeleton-row-${rowIndex}`,
    cells: Array.from({ length: columns }, (_, colIndex) => ({
      id: `skeleton-cell-${rowIndex}-${colIndex}`,
    })),
  }));

  return (
    <>
      {skeletonRows.map((row) => (
        <TableRow key={row.id}>
          {row.cells.map((cell) => (
            <TableCell key={cell.id} className="py-4">
              <Skeleton className="h-4 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
