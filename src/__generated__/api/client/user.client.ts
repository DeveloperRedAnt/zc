import { getDataFromApi } from '../../../utils/url';
import * as DTO from '../dto/user.dto';


export const getToken = async (params: {
  body: DTO.TokenRequestSchema
}): Promise<DTO.TokenResponseSchema> => getDataFromApi<typeof params, DTO.TokenResponseSchema, DTO.TokenRequestSchema>({
  type: 'post',
  url: '/api/auth/token',
  params,
  body: params.body,
  transformer: (data: Record<string, unknown>) => data as DTO.TokenResponseSchema
});


export const getEmployee = async (params: {
  body?: Partial<DTO.GetEmployeePayloadSchema>;
}): Promise<DTO.EmployeeListResponse[]> => getDataFromApi<Record<string, unknown>, DTO.EmployeeListResponse[]>({
  type: 'get',
  url: '/api/user-list',
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params: params.body || {},
  withPagination: true,
  transformer: (data: Record<string, unknown>) => {
    if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
      return data.data as DTO.EmployeeListResponse[];
    }
    
    if (Array.isArray(data)) {
      return data as DTO.EmployeeListResponse[];
    }
    
    console.warn('Unexpected response structure for getEmployee:', data);
    return [] as DTO.EmployeeListResponse[];
  }
});


export const getEmployeeDetail = async (params: {
  id: number;
}): Promise<DTO.EmployeeDetailDataSchema> => getDataFromApi<{}, DTO.EmployeeDetailDataSchema>({
  type: 'get',
  url: `/api/employees/${params.id}`,
  injectHeaders: ['x-device-id', 'x-organization-id'],
  transformer: (data: Record<string, unknown>) => {
    if (data && typeof data === 'object' && 'data' in data) {
      return data.data as DTO.EmployeeDetailDataSchema;
    }
    return data as DTO.EmployeeDetailDataSchema;
  }
});


export const createEmployee = async (params: {
  body: DTO.CreateEmployeePayload
}): Promise<DTO.CreateEmployeeResponse> => getDataFromApi<typeof params, DTO.CreateEmployeeResponse, DTO.CreateEmployeePayload>({
  type: 'post',
  url: '/api/v2/employees',
  injectHeaders: ['x-device-id', 'x-organization-id', ''],
  params,
  body: params.body,
  transformer: (data: Record<string, unknown>) => data as DTO.CreateEmployeeResponse
});


export const resetEmployeePassword = async (params: {
  body: {
    id_employee: number;
    password: string;
    password_confirmation: string;
  }
}): Promise<DTO.ResetEmployeePasswordResponseSchema> => getDataFromApi<typeof params, DTO.ResetEmployeePasswordResponseSchema>({
  type: 'put',
  url: `/api/employees/${params.body.id_employee}/reset-password`,
  injectHeaders: ['x-device-id', 'x-organization-id'],
  body: params.body,
  transformer: (data: Record<string, unknown>) => data as DTO.ResetEmployeePasswordResponseSchema
});


export const resetEmployeePin = async (params: {
  body: {
    id_employee: number;
  }
}): Promise<DTO.ResetEmployeePinResponseSchema> => getDataFromApi<typeof params, DTO.ResetEmployeePinResponseSchema>({
  type: 'put',
  url: `/api/employees/${params.body.id_employee}/reset-pin`,
  injectHeaders: ['x-device-id', 'x-organization-id'],
  body: params.body,
  transformer: (data: Record<string, unknown>) => data as DTO.ResetEmployeePinResponseSchema
});


export const getCompanies = async (params: {
  'x-device-id': string;
  'x-organization-id': string;
}): Promise<DTO.CompanyResponseSchema> => getDataFromApi<typeof params, DTO.CompanyResponseSchema>({
  type: 'get',
  url: '/api/companies',
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
  transformer: (data: Record<string, unknown>) => data as DTO.CompanyResponseSchema
});


export const getListPosition = async (params: {
  'x-device-id': string;
  'x-organization-id': string;
}): Promise<DTO.GetListPositionResponse[]> => getDataFromApi<typeof params, DTO.GetListPositionResponse[]>({
  type: 'get',
  url: '/api/positions',
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
  transformer: (data: Record<string, unknown>) => {
    if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
      return data.data as DTO.GetListPositionResponse[];
    }
    
    if (Array.isArray(data)) {
      return data as DTO.GetListPositionResponse[];
    }
    
    console.warn('Unexpected response structure for getListPosition:', data);
    return [] as DTO.GetListPositionResponse[];
  }
});

export const listEmployees = async (params: {
  body: Partial<DTO.EmployeeSchema>;
}): Promise<DTO.EmployeeListResponse[]> => getDataFromApi<Record<string, unknown>, DTO.EmployeeListResponse[]>({
  type: 'get',
  url: '/api/employees',
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params: {
    page: params.body.page,
    search: params.body.search,
    sort_by: params.body.sort_by,
    sort_direction: params.body.sort_direction,
    search_by_status: params.body.search_by_status,
  },
  withPagination: true,
  transformer: (data: Record<string, unknown>) => {
    let users: DTO.EmployeeListResponse[] = [];
    
    if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
      users = data.data as DTO.EmployeeListResponse[];
    } else if (Array.isArray(data)) {
      users = data as DTO.EmployeeListResponse[];
    } else {
      console.warn('Unexpected response structure for listEmployees:', data);
      return [] as DTO.EmployeeListResponse[];
    }
    
    return users.map((user: DTO.EmployeeListResponse) => ({
      ...user,
      image: user.image || '/assets/zycas/default-image-user.png',
      store_count: user.store_count || '3 Toko',
    }));
  }
});


export const updateEmployee = async (params: {
  id: number;
  body: DTO.CreateEmployeePayload;
}): Promise<DTO.CreateEmployeeResponse> => getDataFromApi<typeof params, DTO.CreateEmployeeResponse, DTO.CreateEmployeePayload>({
  type: 'put',
  url: `/api/employees/${params.id}`,
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
  body: params.body,
  transformer: (data: Record<string, unknown>) => data as DTO.CreateEmployeeResponse
});


export const listPosition = async (params: {
  body?: Partial<DTO.GetListPositionPayloadSchema>;
}): Promise<{ label: string; value: number }[]> => getDataFromApi<Record<string, unknown>, { label: string; value: number }[]>({
  type: 'get',
  url: '/api/positions',
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params: {
    page: params.body?.page,
    per_page: params.body?.per_page,
    search: params.body?.search
  },
  transformer: (data: Record<string, unknown>) => {
    let positions: DTO.GetListPositionResponse[] = [];
    
    if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
      positions = data.data as DTO.GetListPositionResponse[];
    } else if (Array.isArray(data)) {
      positions = data as DTO.GetListPositionResponse[];
    } else {
      console.warn('Unexpected response structure for listPosition:', data);
      return [];
    }
    
    return positions.map((position) => ({
      label: position.name,
      value: position.id,
    }));
  }
});


export const assignPermissionEmployee = async (params: {
  id: number;
  body: {
    store_id: number;
    position_id: number;
    permissions: (string | number)[];
  }[];
}): Promise<unknown> => getDataFromApi<typeof params, unknown, {
  store_id: number;
  position_id: number;
  permissions: (string | number)[];
}[]>({
  type: 'post',
  url: `/api/employees/${params.id}/assign-permissions`,
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
  body: params.body,
  transformer: (data: Record<string, unknown>) => data
});


export const changeEmployeePassword = async (params: {
  id: number;
  body: {
    old_password: string;
    password: string;
    password_confirmation: string;
  };
}): Promise<unknown> => getDataFromApi<typeof params, unknown>({
  type: 'put',
  url: `/api/employees/${params.id}/change-password`,
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
  body: params.body,
  transformer: (data: Record<string, unknown>) => data
});


export const changeEmployeePin = async (params: {
  id: number;
  body: {
    old_pin: string;
    pin: string;
    pin_confirmation: string;
  };
}): Promise<unknown> => getDataFromApi<typeof params, unknown>({
  type: 'put',
  url: `/api/employees/${params.id}/change-pin`,
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
  body: params.body,
  transformer: (data: Record<string, unknown>) => data
});


export const listPermissionGroup = async (params: {
  body?: {
    employee_id?: string;
  };
}): Promise<DTO.PermissionGroupSchema[]> => getDataFromApi<Record<string, unknown>, DTO.PermissionGroupSchema[]>({
  type: 'get',
  url: '/api/permission-groups/selection',
  injectHeaders: ['x-device-id', 'x-store-id', 'x-organization-id'],
  params: params.body || {},
  transformer: (data: Record<string, unknown>) => {
    if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
      return data.data as DTO.PermissionGroupSchema[];
    }
    
    if (Array.isArray(data)) {
      return data as DTO.PermissionGroupSchema[];
    }
    
    console.warn('Unexpected response structure for listPermissionGroup:', data);
    return [] as DTO.PermissionGroupSchema[];
  }
});