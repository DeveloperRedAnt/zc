import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto';

export const getModelStore = async (): Promise<DTO.BusinessModel> => {
  const params = {};
  const headers = ['x-device-id'];
  const url = '/api/business/models';

 return getDataFromApi({
    type: 'get',
    url,
    injectHeaders: headers,
    params,
    transformer: (data) => data as unknown as DTO.BusinessModel,
  });
};

