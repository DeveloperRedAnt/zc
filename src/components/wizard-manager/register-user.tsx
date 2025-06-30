import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

interface Step1RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  defaultValues?: Partial<RegisterFormData>;
}

const Step1RegisterForm: React.FC<Step1RegisterFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nama</label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Nama lengkap"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register('email')}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          placeholder="email@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          {...register('password')}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          placeholder="******"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      {/* Auto submit on external button */}
      <button type="submit" className="hidden" />

      {/* Live preview for debugging */}
      <pre className="bg-gray-100 p-3 rounded text-sm">{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
};

export default Step1RegisterForm;
