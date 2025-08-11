import { getDataFromApi } from '../../../utils/url';
import * as DTO from '../dto/dashboard.dto';


export const getDashboardOverview = async (): Promise<DTO.DashboardOverviewSchema> => getDataFromApi<Record<string, never>, DTO.DashboardOverviewSchema>({
  type: 'get',
  url: '/api/dashboard/organization',
  injectHeaders: ['x-device-id', 'x-organization-id'],
  params: {},
  transformer: (data: Record<string, unknown>) => data as unknown as DTO.DashboardOverviewSchema
});
