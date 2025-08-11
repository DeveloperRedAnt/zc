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


export const GetOrganizationOfUser = async (params: DTO.GetOrganizationOfUserRequestSchema): Promise<Array<DTO.GetOrganizationOfUserResponseSchema>> => getDataFromApi<DTO.GetOrganizationOfUserRequestSchema, Array<DTO.GetOrganizationOfUserResponseSchema>>({
  type: 'get',
  url: `/api/org-of-user/${params['user-id']}`,
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params,
  withPagination: true,
  transformer: (data: Record<string, unknown>) => {

    console.log("data", data)
    // The API response has the format: { data: [...] }
    // Extract the data array from the response
    if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
      return data.data as Array<DTO.GetOrganizationOfUserResponseSchema>;
    }
    
    // If data is already an array (in case of different response structure)
    if (Array.isArray(data)) {
      return data as Array<DTO.GetOrganizationOfUserResponseSchema>;
    }
    
    // Fallback to empty array
    console.warn('Unexpected response structure for GetOrganizationOfUser:', data);
    return [] as Array<DTO.GetOrganizationOfUserResponseSchema>;
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
    transformer: (data: Record<string, unknown>) => data as DTO.EnterOrganizationResponseSchema
  })

  export const getDashboardOrganizations = async (
    params?: DTO.GetDashboardOrganizationsParams
  ) => getDataFromApi<DTO.GetDashboardOrganizationsParams, DTO.DashboardOrganizationsResponse>({
    type: 'get',
    url: '/api/dashboard/organizations',
    injectHeaders: ['x-device-id', 'x-organization-id'],
    params,
    withPagination: true,
    transformer: (data: Record<string, unknown>) => data as unknown as DTO.DashboardOrganizationsResponse
  })
