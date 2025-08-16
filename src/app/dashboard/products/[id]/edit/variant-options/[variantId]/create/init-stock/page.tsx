'use client';
import { useGetProductVariantDetail } from '@/__generated__/api/hooks/set_variant_stock.hooks';
import SkeletonCardContent from '@/components/card/skeleton-card-content';
import { StockVariantPage } from '@/modules/products-edit/components/options/stock-variant/stock-variant-edit-product-page';
import { useParams } from 'next/navigation';

export default function MainStockPage() {
  const params = useParams();
  const variantId = parseInt(params.variantId as string);

  const productDetailQuery = useGetProductVariantDetail(variantId);

  if (productDetailQuery.isLoading) {
    return <SkeletonCardContent />;
  }

  if (productDetailQuery.isError) {
    return <div>Error loading product stock awal</div>;
  }

  const productData = productDetailQuery.data?.data;

  return <StockVariantPage productData={productData} />;
}
