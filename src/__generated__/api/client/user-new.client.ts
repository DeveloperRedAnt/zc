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
  'x-device-id': string;
  'x-organization-id': string;
  body?: Partial<DTO.GetEmployeePayloadSchema>;
}): Promise<DTO.EmployeeListResponse[]> => getDataFromApi<typeof params, DTO.EmployeeListResponse[]>({
  type: 'get',
  url: '/api/employees',
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
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
  'x-device-id': string;
  'x-organization-id': string;
  id: number;
}): Promise<DTO.EmployeeDetailDataSchema> => getDataFromApi<typeof params, DTO.EmployeeDetailDataSchema>({
  type: 'get',
  url: `/api/employees/${params.id}`,
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
  transformer: (data: Record<string, unknown>) => {
    if (data && typeof data === 'object' && 'data' in data) {
      return data.data as DTO.EmployeeDetailDataSchema;
    }
    return data as DTO.EmployeeDetailDataSchema;
  }
});


export const createEmployee = async (params: {
  'x-device-id': string;
  'x-organization-id': string;
  body: DTO.CreateEmployeePayload
}): Promise<DTO.CreateEmployeeResponse> => getDataFromApi<typeof params, DTO.CreateEmployeeResponse, DTO.CreateEmployeePayload>({
  type: 'post',
  url: '/api/employees',
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
  body: params.body,
  transformer: (data: Record<string, unknown>) => data as DTO.CreateEmployeeResponse
});


export const resetEmployeePassword = async (params: {
  'x-device-id': string;
  'x-organization-id': string;
  body: {
    id_employee: number;
    password: string;
    password_confirmation: string;
  }
}): Promise<DTO.ResetEmployeePasswordResponseSchema> => getDataFromApi<typeof params, DTO.ResetEmployeePasswordResponseSchema>({
  type: 'put',
  url: '/api/employees/reset-password',
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
  body: params.body,
  transformer: (data: Record<string, unknown>) => data as DTO.ResetEmployeePasswordResponseSchema
});


export const resetEmployeePin = async (params: {
  'x-device-id': string;
  'x-organization-id': string;
  body: {
    id_employee: number;
  }
}): Promise<DTO.ResetEmployeePinResponseSchema> => getDataFromApi<typeof params, DTO.ResetEmployeePinResponseSchema>({
  type: 'put',
  url: '/api/employees/reset-pin',
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
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
  'x-device-id': string;
  'x-store-id': string;
  'x-organization-id': string;
  body: Partial<DTO.EmployeeSchema>;
}): Promise<DTO.EmployeeListResponse[]> => getDataFromApi<typeof params, DTO.EmployeeListResponse[]>({
  type: 'get',
  url: '/api/employees',
  injectHeaders: ['x-device-id', 'x-store-id', 'x-organization-id'],
  params,
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