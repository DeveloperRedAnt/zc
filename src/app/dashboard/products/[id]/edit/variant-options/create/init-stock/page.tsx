'use client';
import { useGetProductDetail } from '@/__generated__/api/hooks/set_variant_stock.hooks';
import { StockVariantPage } from '@/modules/products-edit/components/options/stock-variant/stock-variant-edit-product-page';
import { useParams } from 'next/navigation';

export default function MainStockPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);

  const productDetailQuery = useGetProductDetail(productId);

  if (productDetailQuery.isLoading) {
    return <div>Loading stock awal details...</div>;
  }

  if (productDetailQuery.isError) {
    return <div>Error loading product stock awal</div>;
  }

  const productData = productDetailQuery.data;
  return <StockVariantPage productData={productData} />;
}
