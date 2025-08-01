import * as DTO from '../dto';
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
    const headers = {
      'x-device-id': params['x-device-id'],
      'x-store-id': params['x-store-id'],
      'x-organization-id': params['x-organization-id'],
    };
    const response = await apiClientWithHeaders.get(url, { headers, params: params.body });
    
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

// Helper functions
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