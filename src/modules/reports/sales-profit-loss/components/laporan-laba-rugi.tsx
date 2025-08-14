import * as DTO from '@/__generated__/api/dto/reports/sales-profit.dto';
import { useProfitLoss } from '@/__generated__/api/hooks/reports/sales-profitloss.hook';
import { PageLayout } from '@/components/page-layout/page-layout';
import { SalesProfitLossTable } from '@/modules/reports/sales-profit-loss/components/sales-profit-loss-table';
import { useQueryState } from 'nuqs';
import ProfitLossChartCard from './profit-loss-card/ProfitLossChartCard';

export function LaporanLabaRugiPage() {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const [pageIndex = 1, setPageIndex] = useQueryState('page', {
    history: 'replace',
    parse: Number,
    serialize: String,
  });
  const [pageSize = 4, setPageSize] = useQueryState('per_page', {
    history: 'replace',
    parse: Number,
    serialize: String,
  });
  const [sortBy = 'period', setSortBy] = useQueryState('sort_by', {
    history: 'replace',
  });
  const [sortDirection = 'desc', setSortDirection] = useQueryState('sort_dir', {
    history: 'replace',
  });
  const [startDate = todayStr, setStartDate] = useQueryState('start_date', {
    history: 'replace',
  });
  const [endDate = todayStr, setEndDate] = useQueryState('end_date', {
    history: 'replace',
  });

  const [grouping = 'daily', setGrouping] = useQueryState('grouping', {
    history: 'replace',
  });

  const params: DTO.SalesProfitDto & { sort_by?: string; sort_dir?: string } = {
    grouping: grouping ?? 'daily',
    start_date: startDate ?? todayStr,
    end_date: endDate ?? todayStr,
    page: Number(pageIndex) + 1,
    per_page: Number(pageSize),
    sort_by: sortBy ?? 'period_start',
    sort_dir: sortDirection ?? 'desc',
  };

  const { data, isLoading, error } = useProfitLoss(params);
  const tableData: DTO.SalesProfitRow[] = Array.isArray(data?.data?.table?.data)
    ? data?.data?.table?.data
    : [];

  const lastPage = data?.data?.table?.last_page ?? 1;

  const graph = data?.data?.graph;
  const presentaseHpp = graph?.gross_margin_percent ?? 0;
  const presentaseRevenue = graph?.gross_profit ?? 0;

  return (
    <>
      <ProfitLossChartCard
        presentaseHpp={presentaseHpp}
        presentaseRevenue={presentaseRevenue}
        hppValue={graph?.total_hpp ?? 0}
        revenueValue={graph?.total_revenue ?? 0}
        title={'Bar Chart Laporan Laba Rugi'}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setGrouping={setGrouping}
      />
      <PageLayout title="Laporan Laba Rugi">
        <SalesProfitLossTable
          data={tableData}
          isLoading={isLoading}
          error={error}
          last_page={lastPage}
          sortBy={sortBy as keyof DTO.SalesProfitRow}
          sortDirection={sortDirection as 'asc' | 'desc'}
          onSortChange={(by, dir) => {
            setSortBy(by);
            setSortDirection(dir);
            setPageIndex(0);
          }}
          pageIndex={Number(pageIndex)}
          pageSize={Number(pageSize)}
          onPaginationChange={(idx, size) => {
            setPageIndex(idx);
            setPageSize(size);
          }}
        />
      </PageLayout>
    </>
  );
}
