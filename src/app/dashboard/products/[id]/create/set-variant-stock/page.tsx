'use client';
import { useGetProductDetail } from '@/__generated__/api/hooks/set_variant_stock.hooks';
import { StockComposite } from '@/modules/stock-variant/stock-composite';
import { StockVariantPage } from '@/modules/stock-variant/stock-variant-page';
import { useParams } from 'next/navigation';

export default function MainStockPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);

  const productDetailQuery = useGetProductDetail(productId, 56, {
    enabled: !!productId,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  // Handle loading state
  if (productDetailQuery.isLoading) {
    return <div>Loading stock awal details...</div>;
  }

  // Handle error state
  if (productDetailQuery.isError) {
    return <div>Error loading product stock awal</div>;
  }

  // Use the fetched data with proper typing
  const productData = productDetailQuery.data?.data;

  // Determine product type based on composite field
  const productType = productData?.composite ? 'composite' : 'variant';

  if (productType === 'composite') {
    return <StockComposite />;
  }

  return <StockVariantPage productData={productData} />;
}
