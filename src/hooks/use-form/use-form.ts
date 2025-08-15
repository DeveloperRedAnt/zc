'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import type { DefaultValues, UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type FormMessage = {
  type: 'error' | 'success';
  message: string;
};
type MessageResponse = {
  message: string;
  success: boolean;
};

export type FormSubmitProps<T extends z.ZodTypeAny> = {
  schema: T;
  defaultValues: DefaultValues<z.infer<T>>;
  onSubmitAction: (data: z.infer<T>) => Promise<MessageResponse>;
  onError: (error: unknown) => boolean;
};

export const useFormAction = <T extends z.ZodTypeAny>(props: FormSubmitProps<T>) => {
  const { schema, defaultValues, onSubmitAction, onError } = props;

  const form: UseFormReturn<z.infer<T>> = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [message, setMessage] = useState<FormMessage | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (action: (data: z.infer<T>) => Promise<MessageResponse>) => {
    const setResponseMessage = (res: MessageResponse) => {
      if (res && 'success' in res) {
        setMessage({
          type: res.success ? 'success' : 'error',
          message: res?.message || '',
        });
      }
    };

    return async (data: z.infer<T>) => {
      setMessage(null);

      startTransition(() => {
        action(data)
          .then(setResponseMessage)
          .catch((error) => {
            if (onError(error)) {
              return;
            }
            console.error('Submission Error:', error);
            setMessage({
              type: 'error',
              message: 'Submission failed. Please try again.',
            });
          });
      });
    };
  };

  return {
    form,
    message,
    isPending,
    onSubmit: form.handleSubmit(onSubmit(onSubmitAction)),
  };
};
