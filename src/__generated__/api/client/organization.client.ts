import { getDataFromApi } from '../../../utils/url';
import * as DTO from '../dto/organization.dto';


export const getOrganization = async (params: {
  'x-device-id': string;
  page?: number;
}): Promise<DTO.OrganizationSchema> => getDataFromApi<typeof params, DTO.OrganizationSchema>({
  type: 'get',
  url: '/api/organization',
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
  transformer: (data: Record<string, unknown>) => data as DTO.OrganizationSchema
});


export const createOrganization = async (params: {
  'x-device-id': string;
  body: DTO.CreateOrganizationPayload
}): Promise<DTO.OrganizationSchema> => getDataFromApi<typeof params, DTO.OrganizationSchema, DTO.CreateOrganizationPayload>({
  type: 'post',
  url: '/api/dashboard/organizations',
  injectHeaders: ['x-device-id'],
  params,
  body: params.body,
  transformer: (data: Record<string, unknown>) => data as DTO.OrganizationSchema
});

export const updateOrganization = async (params: {
  'x-device-id': string;
  id: string;
  body: DTO.UpdateOrganizationPayload;
}): Promise<DTO.OrganizationSchema> => getDataFromApi<typeof params, DTO.OrganizationSchema, DTO.UpdateOrganizationPayload>({
  type: 'put',
  url: `/api/dashboard/organizations/${params.id}`,
  injectHeaders: ['x-device-id'],
  params,
  body: params.body,
  transformer: (data: Record<string, unknown>) => data as DTO.OrganizationSchema
});


export const selectOrganization = async (params: {
  'x-device-id': string;
  'x-organization-id': string;
}): Promise<DTO.SelectOrganizationSchema> => getDataFromApi<typeof params, DTO.SelectOrganizationSchema>({
  type: 'get',
  url: `/api/organizations/${params['x-organization-id']}`,
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
  transformer: (data: Record<string, unknown>) => data as DTO.SelectOrganizationSchema
});


export const GetOrganizationOfUser = async (params: DTO.GetOrganizationOfUserRequestSchema): Promise<Array<DTO.OrganizationSchema>> => getDataFromApi<DTO.GetOrganizationOfUserRequestSchema, Array<DTO.OrganizationSchema>>({
  type: 'get',
  url: `/api/org-of-user/${params['user-id']}`,
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
  withPagination: true,
  transformer: (data: Record<string, unknown>) => {
    // When pagination is enabled, the data is already extracted from response.data.data
    // We need to ensure it's an array
    if (Array.isArray(data)) {
      return data as Array<DTO.OrganizationSchema>;
    }
    
    // If it's not an array, return an empty array as fallback
    console.warn('Expected array response but got:', typeof data);
    return [] as Array<DTO.OrganizationSchema>;
  }
})

/**
 * Update organization
 * 
 * @param params 
 * @returns 
 */
export const UpdateOrganization = async (params: {
  'id': string;
  body: DTO.UpdateOrganizationPayload;
}): Promise<DTO.OrganizationSchema> => getDataFromApi<Record<string, unknown>, DTO.OrganizationSchema, DTO.UpdateOrganizationPayload>({
  type: 'put',
  url: `/api/dashboard/organizations/${params.id}`,
  injectHeaders: ['x-device-id', 'x-organization-id'],
  body: params.body,
  transformer: (data: Record<string, unknown>) => data as DTO.OrganizationSchema
})

  export const SelectOrganization = async (params: {
    'x-device-id': string;
    'x-organization-id': string;
  }): Promise<DTO.SelectOrganizationSchema> => getDataFromApi<typeof params, DTO.SelectOrganizationSchema>({
    type: 'get',
    url: `/api/organizations/${params['x-organization-id']}`,
    injectHeaders: ['x-device-id', 'x-organization-id'],
    params,
    transformer: (data: Record<string, unknown>) => data as DTO.SelectOrganizationSchema
  })

  export const OnInToDashboard = async (params: {
    'x-device-id': string;
    'x-organization-id': string;
    body: {
      'organizationId': string;
    }
  }): Promise<DTO.EnterOrganizationResponseSchema> => getDataFromApi<typeof params, DTO.EnterOrganizationResponseSchema>({
    type: 'post',
    url: `/api/organizations/${params['x-organization-id']}/on-in-to-dashboard`,
    injectHeaders: ['x-device-id', 'x-organization-id'],
    params,
    body: params.body,
    transformer: (data: any) => data as DTO.EnterOrganizationResponseSchema
  })

  export const getDashboardOrganizations = async (
    params?: DTO.GetDashboardOrganizationsParams
  ) => getDataFromApi<DTO.GetDashboardOrganizationsParams, DTO.ApiResponseOrganizationByEmployee>({
    type: 'get',
    url: '/api/dashboard/organizations',
    injectHeaders: ['x-device-id', 'x-organization-id'],
    params,
    // Transformer memastikan tipe data yang dikembalikan sesuai dengan yang diharapkan hook
    transformer: (data: Record<string, unknown>) => data as DTO.ApiResponseOrganizationByEmployee
  })


