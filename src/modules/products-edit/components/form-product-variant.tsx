// form-product-variant.tsx
'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/card/card';
import { InformationText } from '@/components/information-text/information-text';
import { Label } from '@/components/label/label';
import { Switch } from '@/components/switch/switch';
import { Edit, Right } from '@icon-park/react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useGetProductDetail } from '@/__generated__/api/hooks/product.hooks';
// Import your stores
import { useProductVariantStore } from '@/modules/products-edit/storing-data/product-variant/store';

interface VariantPrice {
  id: number;
  namePcs: string;
  quantity: number;
  price: number;
}

interface VariantItem {
  id: number;
  name: string;
  thumbnail: string | null;
  barcode: string | null;
  sku: string | null;
  isActive: boolean;
  prices: VariantPrice[];
}

interface LocalStorageVariantData {
  state: {
    currentVariant: {
      variantId: number;
      productId: string;
      name: string;
      cardValue: {
        file: string;
        barcode: string;
        sku: string;
        minStock: number;
      };
      isWholesale: boolean;
      lastSaved: string;
      multiPackErrors: { [itemId: number]: { [field: string]: string } };
      priceMultiPackList: Array<{
        id: number;
        unitName: string;
        conversionValue: number;
        price: number;
      }>;
    };
  };
  version: number;
}

export default function FormProductVariant() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params?.id);

  // Get variants from store
  const setProductVariants = useProductVariantStore((state) => state.setProductVariants);

  // Get product data from API
  const { data: productDetailData } = useGetProductDetail({ id: productId });

  const [toggleVariantTableAccordion, setToggleVariantTableAccordion] = useState<
    Record<number, boolean>
  >({});
  const [finalData, setFinalData] = useState<VariantItem[]>([]);

  // Helper function to format price
  const formatPrice = useCallback((price: string | number): number => {
    if (typeof price === 'string') {
      return Number(price.replace(/[Rp.,\s]/g, '')) || 0;
    }
    return Number(price) || 0;
  }, []);

  // Helper function to create variant name from attributes
  const createVariantName = useCallback(
    (attributes: Array<{ attribute: string; value: string }>): string => {
      return attributes.map((attr) => attr.value).join(' - ');
    },
    []
  );

  // Load and process variant data
  useEffect(() => {
    if (!productDetailData?.variants) return;

    // Check for local storage data first
    const localStorageKey = 'Single-variant-edit-data';
    let localVariantData: LocalStorageVariantData | null = null;

    try {
      const stored = localStorage.getItem(localStorageKey);
      if (stored) {
        localVariantData = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error parsing local storage data:', error);
    }

    const processedVariants: VariantItem[] = productDetailData.variants.map((variant) => {
      // Pastikan id selalu number
      const variantId = Number(variant.id);

      // Cek ada data local storage & sesuai productId
      const hasLocalData =
        localVariantData?.state?.currentVariant?.variantId === variantId &&
        localVariantData?.state?.currentVariant?.productId === productId.toString();

      let variantName = '';
      if (hasLocalData) {
        // Pakai nama dari local storage
        variantName = localVariantData!.state.currentVariant.name;
      } else {
        // Generate nama dari attributes
        variantName =
          variant.attributes && variant.attributes.length > 0
            ? createVariantName(variant.attributes)
            : `Varian ${variantId}`;
      }

      // Harga multi satuan
      let prices: VariantPrice[] = [];
      if (hasLocalData) {
        prices =
          localVariantData!.state.currentVariant.priceMultiPackList.map((price) => ({
            id: price.id,
            namePcs: price.unitName,
            quantity: price.conversionValue,
            price: price.price,
          })) ?? [];
      } else {
        prices =
          variant.variant_units?.map((unit, index) => ({
            id: Number(Date.now() + index), // unique ID
            namePcs: unit.unit_name || productDetailData.package || 'Pcs',
            quantity: Number(unit.conversion_value) || 1,
            price: formatPrice(unit.price),
          })) ?? [];
      }

      let barcode = '';
      let sku = '';
      const isActive = variant.is_active ?? true;

      if (hasLocalData) {
        barcode = localVariantData!.state.currentVariant.cardValue.barcode;
        sku = localVariantData!.state.currentVariant.cardValue.sku;
      } else {
        barcode = variant.barcode || '';
        sku = variant.sku_code || '';
      }

      return {
        id: variantId,
        name: variantName,
        thumbnail: variant.thumbnail || productDetailData.thumbnail || null,
        barcode,
        sku,
        isActive,
        prices,
      };
    });

    setFinalData(processedVariants);

    // Update store with processed variants
    if (processedVariants.length > 0) {
      setProductVariants(productId.toString(), productDetailData.variants);
    }
  }, [productDetailData, productId, setProductVariants, createVariantName, formatPrice]);

  const handleToggleActiveVariant = (checked: boolean, variantId: number) => {
    setFinalData((prevData) =>
      prevData.map((item) => (item.id === variantId ? { ...item, isActive: checked } : item))
    );
  };

  const handleToggleAccordion = (variantId: number) => {
    setToggleVariantTableAccordion((prev) => ({
      ...prev,
      [variantId]: !prev[variantId],
    }));
  };

  const handleEditVariant = (variantId: number) => {
    // Navigate to edit variant page with variant ID
    router.push(`/dashboard/products/edit/${productId}/variant/${variantId}`);
  };

  const handleAddVariantOption = () => {
    // Navigate to add variant page
    router.push(`/dashboard/products/edit/${productId}/variant/add`);
  };

  if (!finalData.length) {
    return null;
  }

  return (
    <Card className="text-[#555555] px-2 my-[1rem]">
      <CardHeader className="border-b-gray-200 flex-row flex justify-between items-center">
        <CardTitle className="text-[1rem]">Varian Produk</CardTitle>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            className="text-[#555555]"
            onClick={handleAddVariantOption}
          >
            Tambah Opsi Varian
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 text-sm">
        <InformationText text="Menambah varian dari produk Anda. Jika Anda menambahkan varian, maka Barcode, Kode SKU, dan Harga Multi Satuan akan ditentukan dari varian Anda" />

        <div className="mt-4 space-y-4">
          {finalData.map((item) => (
            <Card key={item.id} className="text-[#555555] px-2 my-[1rem]">
              <CardHeader className="border-b-gray-200 flex-row flex justify-between items-center">
                <CardTitle className="text-[1rem]">{item.name}</CardTitle>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-[#555555]"
                    onClick={() => handleEditVariant(item.id)}
                  >
                    <Edit />
                    Edit Opsi Varian
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-4 text-sm">
                <div className="flex items-start gap-8">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleToggleAccordion(item.id)}
                    className="my-auto hover:bg-[none]"
                  >
                    <div
                      className={`transform transition-transform duration-500 ${
                        toggleVariantTableAccordion[item.id] ? 'rotate-90' : ''
                      }`}
                    >
                      <Right />
                    </div>
                  </Button>

                  <img
                    src={item.thumbnail || '/assets/zycas/example-product.png'}
                    alt="Product Variant"
                    className="rounded object-cover w-[6.7rem] h-[6.7rem]"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/zycas/example-product.png';
                    }}
                  />

                  <div className="flex-1 space-y-10">
                    <div className="flex w-full gap-4">
                      <div className="text-[14px] w-1/2">
                        <p className="font-semibold">Barcode:</p>
                        <p className="font-[400] mt-1">{item.barcode || '-'}</p>
                      </div>
                      <div className="text-[14px] w-1/2">
                        <p className="font-semibold">Kode SKU:</p>
                        <p className="font-[400] mt-1">{item.sku || '-'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                          <Switch
                            id={`isActiveVariant-${item.id}`}
                            checked={item.isActive}
                            onCheckedChange={(checked) =>
                              handleToggleActiveVariant(checked, item.id)
                            }
                          />
                          <Label htmlFor={`isActiveVariant-${item.id}`}>Varian Aktif</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {toggleVariantTableAccordion[item.id] && (
                  <div className="mt-4 pl-[5rem] pt-4 space-y-2">
                    <p className="mb-1">Harga Multi Satuan</p>
                    <div className="flex-1 space-y-10">
                      <div className="flex flex-wrap w-full">
                        {item.prices.length > 0 ? (
                          item.prices.map((price) => (
                            <div key={price.id} className="text-[14px] w-1/2 mt-4">
                              <p className="font-semibold">
                                {price.namePcs} - {price.quantity} {price.namePcs.toLowerCase()}:
                              </p>
                              <p className="font-[400] mt-1">
                                Rp {price.price.toLocaleString('id-ID')}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-400">Tidak ada data harga</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
