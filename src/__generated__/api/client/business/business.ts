import { getDataFromApi } from '../../../../utils/url';
import * as DTO from '../../dto';

export const Categories = async (): Promise<DTO.CategoriesResponse> => {
  const params = {};
  const headers = ['x-device-id'];
  const url = '/api/business/categories';

 return getDataFromApi({
    type: 'get',
    url,
    injectHeaders: headers,
    params,
    transformer: (data) => data as unknown as DTO.CategoriesResponse,
  });
};

