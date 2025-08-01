// User domain React Query hooks

import {  UseQueryOptions, useQuery } from '@tanstack/react-query';
import * as api from '../client';
import * as DTO from '../dto';

// Define a type for the response from the API
type MemberListApiResponse = {
  data: (DTO.MemberListResponse & {
    monthly_formatted: string;
    yearly_formatted: string;
    all_time_formatted: string;
    registered_formatted: string;
  })[];
  pagination: any;
}

/**
 * List Members
 */
export function useGetMember(
  params: DTO.GetMemberSchema = {} as DTO.GetMemberSchema,
  options?: UseQueryOptions<MemberListApiResponse>
) {
  const { body, ...headers } = params || {};

  // Ensure all required fields have default values
  const bodyWithDefaults = {
    search: body?.search || '',
    page: body?.page || 1,
    per_page: body?.per_page || 10,
    search_by_status: body?.search_by_status || 'all',
    sort_by: body?.sort_by || 'name',
    sort_direction: body?.sort_direction || 'asc',
    ...body,
  };

  return useQuery<MemberListApiResponse>({
    queryKey: ['getMember', bodyWithDefaults.search, bodyWithDefaults.per_page, bodyWithDefaults.search_by_status, bodyWithDefaults.sort_by, bodyWithDefaults.sort_direction, bodyWithDefaults.page],
    queryFn: async () => {
      const response = await api.listMembers({
        ...headers,
        body: bodyWithDefaults,
      });
      
      return response;
    },
    placeholderData: (prev) => prev,
    ...options,
  });
}