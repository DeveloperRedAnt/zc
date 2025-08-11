// Organization domain React Query hooks

import {
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import * as api from "../client";
import * as DTO from "../dto";

// --- Queries ---
export function useGetOverviewPackage(
  options?: UseQueryOptions<DTO.OverviewPackageSchema>
) {
  return useQuery({
    queryKey: ["getOverviewPackage"],
    queryFn: () => {
      return api.getOverviewPackage()
    },
    ...options,
  });
}