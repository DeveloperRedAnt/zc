// User domain React Query hooks

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import * as api from '../client';
import * as DTO from '../dto';

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

  const { body } = params || {};

  return useQuery({
    queryKey: ['getEmployee', body.search, body.per_page, body.search_by_status, body.sort_by, body.sort_direction],
    queryFn: () =>
      api.listEmployees({
        body,
      }),
    placeholderData: (prev) => prev,
    ...options,
  });
}

export function useGetEmployeeDetail(
  id: number | undefined,
  options?: UseQueryOptions<DTO.EmployeeDetailDataSchema>
) {
  return useQuery({
    queryKey: ['getEmployeeDetail', id],
    queryFn: () => {
      return api.getEmployeeDetail({ id: id! });
    },
    enabled: !!id,
    placeholderData: (prev) => prev,
    ...options,
  });
}

export function useCreateEmployee(
  options?: UseMutationOptions<
    DTO.CreateEmployeeResponse,
    Error,
    { 
      body: DTO.CreateEmployeePayload;
    }
  >
) {
  return useMutation({
    mutationFn: (params) => api.createEmployee({ body: params.body }),
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
    body?: Partial<DTO.GetListPositionPayloadSchema>;
  },
  options?: UseQueryOptions<{ label: string; value: number }[]>
) {
  const { body } = params || {};
  const search = body?.search || '';
  const per_page = body?.per_page || 10;
  const page = body?.page || 1;

  return useQuery({
    queryKey: ['getListPosition', search, per_page, page],
    queryFn: () => api.listPosition({ body }),
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

export function useChangeEmployeePassword(
  options?: UseMutationOptions<
    unknown,
    DTO.ErrorResponseSchema,
    {
      id: number;
      body: {
        old_password: string;
        password: string;
        password_confirmation: string;
      };
    }
  >
) {
  return useMutation({
    mutationFn: (params) => api.changeEmployeePassword(params),
    ...options,
  });
}

export function useChangeEmployeePin(
  options?: UseMutationOptions<
    unknown,
    DTO.ErrorResponseSchema,
    {
      id: number;
      body: {
        old_pin: string;
        pin: string;
        pin_confirmation: string;
      };
    }
  >
) {
  return useMutation({
    mutationFn: (params) => api.changeEmployeePin(params),
    ...options,
  });
}

export function useListPermissionGroup(
  params: {
    body?: {
      employee_id?: string;
    };
  },
  options?: UseQueryOptions<DTO.PermissionGroupSchema[]>
) {
  const { body } = params || {};
  const employee_id = body?.employee_id || '';

  return useQuery({
    queryKey: ['listPermissionGroup', employee_id],
    queryFn: () => api.listPermissionGroup(params),
    ...options,
  });
}


