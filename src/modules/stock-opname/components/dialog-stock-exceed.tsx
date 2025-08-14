'use client';

import * as DTO from '@/__generated__/api/dto';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/alert-dialog/alert-dialog';
import { Button } from '@/components/button/button';
import React from 'react';

type DialogFirstStockProps = {
  onConfirm: () => void;
  openClose: boolean;
  cancelText: string;
  confirmText: string;
  contentClassName?: string;
  onCancel?: () => void;
  stockExceeds: DTO.StockBaikDataItem[];
  isLoading?: boolean;
};

export function DialogStockExceed({
  onConfirm,
  openClose,
  cancelText,
  confirmText,
  contentClassName,
  onCancel,
  stockExceeds,
  isLoading,
}: DialogFirstStockProps) {
  return (
    <AlertDialog open={openClose}>
      <AlertDialogContent className={contentClassName}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Stok Baik melebihi Stok Sistem
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <p className="text-gray-600">
                Terdeteksi stok produk melebihi perhitungan dari stok sistem, dimungkinkan ada
                penambahan stok yang belum tercatat pada sistem. Harap melanjutkan melalui menu
                penambahan stok untuk produk berikut:
              </p>

              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {stockExceeds.map((item) => (
                  <li key={item.product_id}>{item.name}</li>
                ))}
              </ul>

              <p className="font-medium text-gray-800">
                Apakah Anda yakin akan melanjutkan Stok Opname?
              </p>

              <p className="text-sm text-red-500">
                Anda tetap dapat menyimpan Stok Opname namun sistem akan melanjutkan pencatatan
                hanya untuk produk yang dianggap sesuai.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="ghost" type="button" onClick={onCancel} className="border-none">
              {cancelText}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              isLoading={isLoading}
              variant="destructive"
              onClick={onConfirm}
              type="button"
              className="text-red-500 bg-transparent hover:bg-transparent shadow-none"
            >
              {confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
