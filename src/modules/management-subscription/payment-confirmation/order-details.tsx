// order-details.tsx
import { CheckoutPayloadSchema } from '@/__generated__/api/dto/management-subscription/checkout.dto';
import { ApiPackage } from '@/__generated__/api/dto/management-subscription/package-confirmation.dto';
import { usePostCheckout } from '@/__generated__/api/hooks/management-subscription/checkout.hooks';
import { Button } from '@/components/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog/dialog';
import CustomInput from '@/components/input/custom-input';
import { Skeleton } from '@/components/skeleton/skeleton';
import { Check, FolderSearchOne, TicketOne } from '@icon-park/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface SelectedAddon {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetailsProps {
  selectedPackage?: ApiPackage | null;
  selectedAddOns?: SelectedAddon[];
}

export default function OrderDetails({ selectedPackage, selectedAddOns = [] }: OrderDetailsProps) {
  const [isVoucherDialogOpen, setIsVoucherDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isVoucherLoading, setIsVoucherLoading] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherError, setVoucherError] = useState('');

  const router = useRouter();

  // Checkout mutation
  const checkoutMutation = usePostCheckout({
    onSuccess: (_data) => {
      setIsConfirmDialogOpen(false);
      router.push('/dashboard/management-subscription');
    },
    onError: (error) => {
      console.error('Checkout failed:', error);
      alert('Checkout gagal. Silakan coba lagi.');
      router.push('/dashboard/management-subscription');
    },
  });

  const handleVoucher = () => {
    setVoucherCode('');
    setVoucherError('');
    setIsVoucherDialogOpen(true);
  };

  const handlePayNow = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleCheckVoucher = async () => {
    if (!voucherCode.trim()) {
      setVoucherError('Masukkan kode voucher');
      return;
    }

    setIsVoucherLoading(true);
    setVoucherError('');

    setTimeout(() => {
      setIsVoucherLoading(false);
      setVoucherError('Voucher tidak tersedia atau tidak valid');
    }, 2000);
  };

  const handleConfirmPayment = async () => {
    try {
      const formatAmount = (amount: number): string => `${amount}.0`;

      const checkoutPayload: CheckoutPayloadSchema = {
        package: selectedPackage
          ? {
              package_id: Number(selectedPackage.id),
              amount: formatAmount(selectedPackage.price),
            }
          : null,
        add_ons:
          selectedAddOns.length > 0
            ? selectedAddOns.map((addon) => ({
                add_on_id: addon.id,
                quantity: addon.quantity,
                amount: formatAmount(addon.price * addon.quantity),
              }))
            : [],
      };

      await checkoutMutation.mutateAsync(checkoutPayload);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const handleCancelPayment = () => {
    setIsConfirmDialogOpen(false);
  };

  const handleCancelVoucher = () => {
    setIsVoucherDialogOpen(false);
    setIsVoucherLoading(false);
    setVoucherCode('');
    setVoucherError('');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPackageDisplayName = (packageName: string) => {
    switch (packageName?.toLowerCase()) {
      case 'paket bisnis':
        return 'Paket Bisnis ZYCAS+';
      case 'paket enterprise':
        return 'Paket Enterprise ZYCAS MAX';
      default:
        return packageName || 'Paket';
    }
  };

  // Calculate subtotal (sum of all items)
  const subTotal =
    (selectedPackage?.price || 0) +
    selectedAddOns.reduce((sum, addon) => sum + addon.price * addon.quantity, 0);

  // Calculate tax (0%)
  const taxRate = 0;
  const taxAmount = subTotal * taxRate;

  // Calculate final total
  const finalTotal = subTotal + taxAmount;

  // Skeleton Loading Component
  const renderOrderDetailsSkeleton = () => {
    return (
      <div className="overflow-hidden">
        {/* Package Item Skeleton */}
        <div className="flex justify-between px-4 py-3 border-b">
          <Skeleton className="h-4 w-[180px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>

        {/* Add-on Items Skeleton (2-3 items) */}
        {[...Array(2)].map((_, index) => (
          <div key={index} className="px-4 py-3 border-b">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
              <Skeleton className="h-4 w-[30px] mx-4" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
          </div>
        ))}

        {/* Price breakdown Skeleton */}
        <div className="flex justify-between px-4 py-3">
          <Skeleton className="h-4 w-[70px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <div className="flex justify-between px-4 py-3">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <div className="flex justify-between border-t pt-2 font-semibold px-4 py-3">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-5 w-[120px]" />
        </div>

        {/* Billing info Skeleton */}
        <div className="flex justify-between border-t pt-2 px-4 py-3">
          <div className="mt-4">
            <Skeleton className="h-3 w-[200px]" />
          </div>
        </div>

        {/* Action buttons Skeleton */}
        <div className="pt-2 px-4 py-3 flex justify-between items-center">
          <Skeleton className="h-[36px] w-[100px] rounded-md" />
          <div className="flex gap-3">
            <Skeleton className="h-[36px] w-[60px] rounded-md" />
            <Skeleton className="h-[36px] w-[140px] rounded-md" />
          </div>
        </div>
      </div>
    );
  };

  // Show skeleton while loading
  if (checkoutMutation.isPending || (!selectedPackage && selectedAddOns.length === 0)) {
    return renderOrderDetailsSkeleton();
  }

  return (
    <>
      <div className="overflow-hidden">
        {/* Package Item */}
        {selectedPackage && (
          <div className="flex justify-between px-4 py-3 border-b">
            <span>{getPackageDisplayName(selectedPackage.name)}</span>
            <span className="font-medium">{formatPrice(selectedPackage.price)}</span>
          </div>
        )}

        {/* Add-on Items */}
        {selectedAddOns.map((addon) => (
          <div key={addon.id} className="px-4 py-3 border-b">
            <div className="flex justify-between items-center">
              {/* Add-on description */}
              <div>
                <div className="capitalize">{addon.name}</div>
                <div className="text-xs text-gray-500">@ {formatPrice(addon.price)}</div>
              </div>

              {/* Quantity in the middle */}
              <div className="text-gray-500 text-sm mx-4 whitespace-nowrap">x {addon.quantity}</div>

              {/* Total price for this add-on */}
              <div className="font-medium whitespace-nowrap">
                {formatPrice(addon.price * addon.quantity)}
              </div>
            </div>
          </div>
        ))}

        {/* Price breakdown */}
        <div className="flex justify-between px-4 py-3">
          <span className="text-gray-600">Sub-Total</span>
          <span className="font-medium">{formatPrice(subTotal)}</span>
        </div>
        <div className="flex justify-between px-4 py-3">
          <span className="text-gray-600">Pajak (0%)</span>
          <span className="font-medium">{formatPrice(taxAmount)}</span>
        </div>
        <div className="flex justify-between border-t pt-2 font-semibold px-4 py-3">
          <span>Total Tagihan</span>
          <span>{formatPrice(finalTotal)}</span>
        </div>

        {/* Billing info */}
        <div className="flex justify-between border-t pt-2 px-4 py-3">
          <p className="mt-4 text-xs text-gray-500">
            Akan ditagihkan pada tanggal:
            <span className="font-semibold text-black ml-1">07 Desember 2025</span>
          </p>
        </div>

        {/* Action buttons */}
        <div className="pt-2 px-4 py-3 flex justify-between items-center">
          <Button
            className="bg-[#555555] text-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleVoucher();
            }}
            disabled={checkoutMutation.isPending}
          >
            <TicketOne theme="outline" size="24" fill="#FFFFFF" />
            Voucher
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" className="w-fit" disabled={checkoutMutation.isPending}>
              Batal
            </Button>
            <Button
              variant="success"
              onClick={handlePayNow}
              disabled={
                checkoutMutation.isPending || (!selectedPackage && selectedAddOns.length === 0)
              }
            >
              {checkoutMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Bayar Sekarang
                  <Check theme="outline" size="24" fill="#FFFFFF" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog Voucher */}
      <Dialog open={isVoucherDialogOpen} onOpenChange={setIsVoucherDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Voucher</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <CustomInput
              className="border-[#C2C7D0] h-10"
              placeholder="cth: AA112233"
              label="Masukkan Kode Voucher"
              isWidthFull
              value={voucherCode}
              onChange={(e) => {
                setVoucherCode(e.target.value);
                if (voucherError) setVoucherError('');
              }}
            />
            {voucherError && <p className="text-sm text-red-500">{voucherError}</p>}
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleCancelVoucher} disabled={isVoucherLoading}>
              Batal
            </Button>
            <Button
              variant={isVoucherLoading ? 'loading' : 'success'}
              onClick={handleCheckVoucher}
              disabled={isVoucherLoading}
            >
              {isVoucherLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  Check Voucher
                  <FolderSearchOne theme="filled" size="24" fill="#FFFFFF" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Payment Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Anda akan membayar Pembelian Layanan</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin akan membayarkan pembelian Anda sekarang?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              variant="ghost"
              onClick={handleCancelPayment}
              disabled={checkoutMutation.isPending}
            >
              Tidak
            </Button>
            <Button
              variant="info"
              onClick={handleConfirmPayment}
              disabled={checkoutMutation.isPending}
            >
              {checkoutMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                'Ya, Saya Yakin'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
