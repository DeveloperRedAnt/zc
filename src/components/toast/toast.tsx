import React from 'react';
import { Toaster as Sonner, toast } from 'sonner';
export type ToastProps = React.ComponentProps<typeof Sonner>;

const Toaster = (props: ToastProps) => {
  const defaultClassNames = {
    toast:
      'group text-sm rounded-lg p-5 min-w-64 border font-sans font-semibold toast group-[.toaster]:shadow-lg flex items-center gap-3',
    actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
    cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
    success:
      'group-[.toaster]:bg-emerald-500 group-[.toaster]:text-pale-green-100 group-[.toaster]:border-emerald-500 dark:group-[.toaster]:bg-emerald-500 dark:group-[.toaster]:border-emerald-500',
    error: 'group-[.toaster]:bg-toast-error group-[.toaster]:text-pale-green-1000',
    warning:
      'group-[.toaster]:bg-orange-400 group-[.toaster]:text-white group-[.toaster]:border-orange-200 dark:group-[.toaster]:bg-orange-900 dark:group-[.toaster]:text-orange-100 dark:group-[.toaster]:border-orange-800',
    info: 'group-[.toaster]:bg-blue-100 group-[.toaster]:text-blue-900 group-[.toaster]:border-blue-200 dark:group-[.toaster]:bg-blue-900 dark:group-[.toaster]:text-blue-100 dark:group-[.toaster]:border-blue-800',
  };

  return (
    <Sonner
      toastOptions={{
        classNames: {
          ...defaultClassNames,
          actionButton: 'bg-zinc-400',
          cancelButton: 'bg-orange-400',
          closeButton: 'bg-lime-400',
        },
      }}
      {...props}
    />
  );
};

export { toast, Toaster };
