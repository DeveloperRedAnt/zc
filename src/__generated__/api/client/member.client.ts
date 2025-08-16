import * as DTO from '../dto';
import { getEssentialCookies } from '../utils';
import { ValidationError, apiClientWithHeaders } from './base.client';

/**
 * List Members
 */
export const listMembers = async (params: {
  'x-device-id': string;
  'x-store-id': string;
  'x-organization-id': string;
  body: Partial<DTO.GetMemberPayloadSchema>;
}) => {
  try {
    let url = '/api/members';
     
    const { store_id, device_id, organization_id } = getEssentialCookies();
    const response = await apiClientWithHeaders.get(url, { 
      headers: { 'x-device-id': device_id, 'x-organization-id': organization_id, 'x-store-id': store_id }, params: params.body });

    const members = response.data.data.map((member: DTO.MemberListResponse) => ({
      ...member,
      // Format currency values
      monthly_formatted: formatCurrency(member.purchases_summary.montly),
      yearly_formatted: formatCurrency(member.purchases_summary.yearly),
      all_time_formatted: formatCurrency(member.purchases_summary.all_time),
      // Format registration date
      registered_formatted: formatDate(member.created_at),
    }));
    
    return {
      data: members,
      pagination: response.data.pagination,
    };
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * Create Member
 */
export const createMember = async (params: {
  body: DTO.CreateMemberPayloadSchema;
}): Promise<DTO.CreateMemberResponse> => {
  try {
    const url = '/api/members';
    
    const { device_id, organization_id } = getEssentialCookies();
    const headers = {
      'x-device-id': device_id,
      'x-organization-id': organization_id,
      'x-store-id': params.body.store_id,
    };
    
    const response = await apiClientWithHeaders.post(url, params.body, { headers });
    
    return response.data;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

/**
 * Edit Member
 */
export const editMember = async (params: {
  id: string;
  body: DTO.EditMemberPayloadSchema;
}): Promise<DTO.EditMemberResponse> => {
  try {
    const url = `/api/members/${params.id}`;
    
    const { device_id, organization_id } = getEssentialCookies();
    const headers = {
      'x-device-id': device_id,
      'x-organization-id': organization_id,
      'x-store-id': params.body.store_id,
    };
    
    const response = await apiClientWithHeaders.put(url, params.body, { headers });
    
    return response.data;
  } catch (error) {
    if (error instanceof ValidationError) throw error;
    throw error;
  }
};

// Helper functions (if needed for other purposes)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount).replace('IDR', 'Rp');
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
};