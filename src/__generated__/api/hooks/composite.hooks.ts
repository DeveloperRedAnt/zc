import { useMutation } from '@tanstack/react-query';
import { postCompositeStock } from '../client/first_stock.client';

export function usePostCompositeStock() {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => postCompositeStock(data),
  });
}