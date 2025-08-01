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
  title: string;
  description?: string | React.ReactNode;
  cancelText: string;
  confirmText: string;
  contentClassName?: string;
  onCancel?: () => void;
};

export function DialogFirstStock({
  onConfirm,
  openClose,
  title,
  description,
  cancelText,
  confirmText,
  contentClassName,
  onCancel,
}: DialogFirstStockProps) {
  return (
    <AlertDialog open={openClose}>
      <AlertDialogContent className={contentClassName}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="ghost" type="button" onClick={onCancel}>
              {cancelText}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="outline"
              onClick={onConfirm}
              type="button"
              className="bg-primary text-white"
            >
              {confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
