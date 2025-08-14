'use client';
import { useGetProductDetail } from '@/__generated__/api/hooks/set_variant_stock.hooks';
import { StockVariantPage } from '@/modules/stock-variant/stock-variant-page';
import { getStoreID } from '@/utils/cookies-helper';
import { useParams } from 'next/navigation';

export default function MainStockPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);

  const storeId = getStoreID();

  const productDetailQuery = useGetProductDetail(productId, storeId);

  if (productDetailQuery.isLoading) {
    return <div>Loading stock awal details...</div>;
  }

  if (productDetailQuery.isError) {
    return <div>Error loading product stock awal</div>;
  }

  const productData = productDetailQuery.data?.data;
  return <StockVariantPage productData={productData} />;
}
