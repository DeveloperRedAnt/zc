import { getDataFromApi } from '../../../utils/url';
import * as DTO from '../dto';

export const getOverviewPackage = async (): Promise<DTO.OverviewPackageSchema> => getDataFromApi<Record<string, never>, DTO.OverviewPackageSchema>({
  type: 'get',
  url: '/api/dashboard/subscriptions/overview',
  injectHeaders: [],
  params: {},
  transformer: (data: Record<string, unknown>) => data as DTO.OverviewPackageSchema
});