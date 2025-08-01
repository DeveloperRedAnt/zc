// User domain React Query hooks

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../client';
import * as DTO from '../dto';
import { getQueryKey } from './base.hooks';

export function useResetEmployeePassword(
  options?: UseMutationOptions<DTO.ResetEmployeePasswordResponseSchema, DTO.ErrorResponseSchema, DTO.ResetEmployeePasswordRequestSchema>
) {
  return useMutation({
    mutationFn: (params) => api.resetEmployeePassword(params),
    ...options,
  });
}
/**
 * RESET PASSWORD
 */

/**
 * RESET PIN
 */
export function useResetEmployeePin(
  options?: UseMutationOptions<DTO.ResetEmployeePinResponseSchema, DTO.ErrorResponseSchema, {
    'x-device-id': string; 
    'x-store-id': string; 
    'x-organization-id': string; 
    body: {
      id_employee: number;
    }
  }>
) {
  return useMutation({
    mutationFn: (params) => api.resetEmployeePin(params),
    ...options,
  });
}


export function useGetEmployee(
  params: DTO.GetEmployeeSchema = {} as DTO.GetEmployeeSchema,
  options?: UseQueryOptions<DTO.EmployeeListResponse[]>
) {

  const { body, ...headers } = params || {};

  return useQuery({
    queryKey: ['getEmployee', body.search, body.per_page, body.search_by_status, body.sort_by, body.sort_direction],
    queryFn: () =>
      api.listEmployees({
        ...headers,
        body,
      }),
    placeholderData: (prev) => prev,
    ...options,
  });
}

export function useGetEmployeeDetail(
  params: DTO.GetEmployeeDetailSchema,
  options?: UseQueryOptions<DTO.EmployeeDetailDataSchema>
) {
  const { id, ...headers } = params;

  return useQuery({
    queryKey: ['getEmployeeDetail', id],
    queryFn: () =>
      api.detailEmployee({
        ...headers,
        id,
      }),
    placeholderData: (prev) => prev,
    ...options,
  });
}


export function useCreateEmployee(
  options?: UseMutationOptions<
    DTO.CreateEmployeeResponse,
    Error,
    { 
      'x-organization-id': string; 
      body: FormData;
    }
  >
) {
  return useMutation({
    mutationFn: (params) => api.createEmployee(params),
    ...options,
  });
}

/**
 * UPDATE EMPLOYEE
 */
export function useUpdateEmployee(
  options?: UseMutationOptions<
    DTO.CreateEmployeeResponse,
    Error,
    {
      id: number;
      'x-organization-id': string;
      body: DTO.CreateEmployeePayload;
    }
  >
) {
  return useMutation({
    mutationFn: (params) => api.updateEmployee(params),
    ...options,
  });
}

/**
 * MASTER DATA - POSITION
 */
export function useGetListPosition(
  params: { 
    'x-device-id': string; 
    'x-store-id': string; 
    'x-organization-id': string;
  },
  options?: UseQueryOptions<DTO.GetListPositionResponse>
) {
  return useQuery({
    queryKey: getQueryKey('getListPosition', params),
    queryFn: () => api.listPosition(params),
    ...options,
  });
}

/**
 * ASSIGN PERMISSION USER
 */
export function useAssignPermissionEmployee(
  options?: UseMutationOptions<
    unknown, // Response type can be customized
    Error,
    {
      id: number;
      'x-organization-id': string;
      body: {
        store_id: number;
        position_id: number;
        permissions: (string | number)[];
      }[];
    }
  >
) {
  return useMutation({
    mutationFn: (params) => api.assignPermissionEmployee(params),
    ...options,
  });
}

