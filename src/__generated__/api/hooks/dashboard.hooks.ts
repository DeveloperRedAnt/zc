// Organization domain React Query hooks

import {
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import * as api from "../client";
import * as DTO from "../dto";

// --- Queries ---
export function useGetDashboardOverview(
  options?: UseQueryOptions<DTO.DashboardOverviewSchema>
) {
  return useQuery({
    queryKey: ["getDashboardOverview"],
    queryFn: () => {
      return api.getDashboardOverview()
    },
    ...options,
  });
}