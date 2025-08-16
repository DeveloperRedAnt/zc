import { useQuery } from '@tanstack/react-query';
import { Categories } from '../../client/business/business';


export const useCategoryStore = () => {
  return useQuery({
    queryKey: ['category_store'],
    queryFn: async () => {
      const res = await Categories();
      if (!res) throw new Error('No data returned');
      return res;
    },
  });
};