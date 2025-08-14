import { useMutation } from '@tanstack/react-query';
import { postCompositeStock } from '../../client/first_stock.client';
import { CompositeStockRequest, ResponseInitStockFirstComposiste } from '../../dto/inti-first-stock/composite.dto';

export function usePostCompositeStock() {
  return useMutation<ResponseInitStockFirstComposiste, Error, { body: CompositeStockRequest; store_id: number }>({
    mutationFn: (data) => postCompositeStock(data),
  });
}