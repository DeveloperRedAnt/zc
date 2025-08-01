// Organization domain React Query hooks

import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import * as api from "../client";
import { apiClientWithHeaders } from "../client/base.client";
import * as DTO from "../dto";
import { getQueryKey } from "./base.hooks";

// --- Queries ---
export function useGetOrganization(
  params: DTO.GetOrganizationSchema,
  options?: UseQueryOptions<DTO.OrganizationSchema>
) {
  return useQuery({
    queryKey: getQueryKey("getOrganization", params),
    queryFn: () => api.getOrganization(params),
    ...options,
  });
}

export function useGetOrganizationsOfUser(
  params: DTO.GetOrganizationOfUserRequestSchema,
  options?: UseQueryOptions<DTO.OrganizationSchema>
) {
  return useQuery({
    queryKey: getQueryKey("getOrganizationsOfUser", params),
    queryFn: () => api.GetOrganizationOfUser(params),
    ...options,
  });
}

export function useCreateOrganization(
  options?: UseMutationOptions<
    DTO.OrganizationSchema,
    Error,
    {
      "x-device-id": string;
      body: DTO.CreateOrganizationPayload;
    }
  >
) {
  return useMutation({
    mutationFn: (params) => api.createOrganization(params),
    ...options,
  });
}

// POST Organization
export function useUpdateOrganization(
  options?: UseMutationOptions<
    DTO.OrganizationSchema,
    Error,
    {
      id: string;
      body: DTO.UpdateOrganizationPayload;
    }
  >
) {
  return useMutation({
    mutationFn: (params) => api.UpdateOrganization(params),
    ...options,
  });
}

export const useListOrganizationEmployees = async (params: {
  "x-organization-id": string;
  "x-device-id": string;
  body?: {
    page?: number;
    limit?: number;
  };
}) => {
  try {
    const url = `/api/store-of-org/${params["x-organization-id"]}`;

    const headers = {
      "x-organization-id": params["x-organization-id"],
      "x-device-id": params["x-device-id"],
    };

    const page = params.body?.page ?? 1;
    const limit = params.body?.limit ?? 10;
    const queryParams = { page, limit };

    const response = await apiClientWithHeaders.get(url, {
      headers,
      params: queryParams,
    });
    return response.data as DTO.ApiResponseOrganizationByEmployee;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
};

export function useSelectOrganization(
  params: DTO.GetListOrganizationSchema,
  options?: UseQueryOptions<DTO.SelectOrganizationSchema>
) {
  return useQuery({
    queryKey: getQueryKey("selectOrganization", params),
    queryFn: () => {
      return api.SelectOrganization({
        "x-device-id": params["x-device-id"],
        "x-organization-id": params["x-organization-id"],
      });
    },
    ...options,
  });
}

export function useOnInToDashboard(
  options?: UseMutationOptions<
    DTO.EnterOrganizationResponseSchema,
    Error,
    {
      "x-device-id": string;
      "x-organization-id": string;
      body: { organizationId: string };
    }
  >
) {
  return useMutation({
    mutationFn: (params) => api.OnInToDashboard(params),
    ...options,
  });
}

// list organization for dashboard
export function useGetDashboardOrganizationsEmploye(
  params: DTO.GetDashboardOrganizationsParams,
  options?: UseQueryOptions<DTO.ApiResponseOrganizationByEmployee>
) {
  return useQuery({
    queryKey: [
      "getDashboardOrganizations",
      params.page,
      params.per_page,
      params.search,
      params.sort_by,
      params.sort_direction,
    ],
    queryFn: () => api.getDashboardOrganizations(params),
    ...options,
  });
}
