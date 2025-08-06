'use client';

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
};

export function DialogStockExceed({
  onConfirm,
  openClose,
  cancelText,
  confirmText,
  contentClassName,
  onCancel,
}: DialogFirstStockProps) {
  return (
    <AlertDialog open={openClose}>
      <AlertDialogContent className={contentClassName}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Stok Baik melebihi Stok Sistem
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p className="text-gray-600">
              Terdeteksi stok produk melebihi perhitungan dari stok sistem, dimungkinkan ada
              penambahan stok yang belum tercatat pada sistem. Harap melanjutkan melalui menu
              penambahan stok untuk produk berikut:
            </p>

            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Kaos Combed 34 cm (Merah - Small)</li>
              <li>Papua New Guinea Organic Robusta 250gr</li>
            </ul>

            <p className="font-medium text-gray-800">
              Apakah Anda yakin akan melanjutkan Stok Opname?
            </p>

            <p className="text-sm text-red-500">
              Anda tetap dapat menyimpan Stok Opname namun sistem akan melanjutkan pencatatan hanya
              untuk produk yang dianggap sesuai.
            </p>
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
