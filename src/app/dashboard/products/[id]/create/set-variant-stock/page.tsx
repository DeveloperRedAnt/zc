'use client';
import { useGetProductDetail } from '@/__generated__/api/hooks/set_variant_stock.hooks';
import { StockComposite } from '@/modules/stock-variant/stock-composite';
import { StockVariantPage } from '@/modules/stock-variant/stock-variant-page';
import { getStoreID } from '@/utils/cookies-helper';
import { useParams } from 'next/navigation';

export default function MainStockPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);

  // Ambil storeId langsung dari utils
  const storeId = getStoreID();

  const productDetailQuery = useGetProductDetail(productId, storeId, {
    enabled: !!productId && !!storeId,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  if (productDetailQuery.isLoading) {
    return <div>Loading stock awal details...</div>;
  }

  if (productDetailQuery.isError) {
    return <div>Error loading product stock awal</div>;
  }

  const productData = productDetailQuery.data?.data;
  const productType = productData?.composite ? 'composite' : 'variant';

  if (productType === 'composite') {
    return <StockComposite />;
  }

  return <StockVariantPage productData={productData} />;
}
