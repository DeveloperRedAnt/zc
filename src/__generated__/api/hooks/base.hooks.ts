import * as DTO from '../dto';

export const getQueryKey = (fnName: string, params: DTO.GetOrganizationSchema) => [fnName, params];