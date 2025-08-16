import { useQuery } from '@tanstack/react-query';
import { getModelStore } from '../../client/business/business-models';


export const useBusinesModel = () => {
  return useQuery({
    queryKey: ['business_model_store'],
    queryFn: async () => {
      const res = await getModelStore();
      if (!res) throw new Error('No data returned');
      return res;
    },
  });
};