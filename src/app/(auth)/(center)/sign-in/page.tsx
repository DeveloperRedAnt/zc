'use client';

import { Button } from '@/components/button/button';
import { Card, CardContent } from '@/components/card/card';
import { Input } from '@/components/input/input';
import { Label } from '@/components/label/label';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import FormFieldError from '@/components/form-field-error/form-field-error';

export default function SignInPage() {
  const router = useRouter();
  const whatsappRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ whatsapp?: string; password?: string }>({});
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        whatsapp,
        password,
        redirect: false,
      });

     if (result?.error) {
        const errorMessage = 'Nomor WhatsApp atau password salah';

        const fieldError = {
          whatsapp: errorMessage,
          password: errorMessage,
        };

        setErrors(fieldError);

        // Fokus ke field yang error pertama
        if (!whatsapp) {
          whatsappRef.current?.focus();
        } else {
          passwordRef.current?.focus();
        }

        setIsLoading(false);
        return;
      }

      // Redirect to dashboard on successful login
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      setGlobalError(`Terjadi kesalahan. Silakan coba lagi. ${String(error)}`);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <Card>
          <CardContent className="space-y-2 p-0 text-[#555555]">
            <div className="h-[39.3rem] flex">
              {/* Left Side - Login Form */}
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-6">
                  {/* Logo */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <img
                        src={'/assets/zycas/zycas-logo.png'}
                        alt="Zycas Login"
                        style={{
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          height: 28,
                          marginRight: 2,
                        }}
                      />
                      <span className="text-[1rem] font-[400]">Zycas</span>
                      <span className="text-[1rem] font-[300] -ml-1">Dashboard</span>
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <h1 className="text-[1.5rem] font-semibold">Selamat Datang!</h1>
                    <p className="text-[1rem]">
                      Silahkan masuk menggunakan akun yang sudah terdaftar untuk Anda
                    </p>
                  </div>

                  {globalError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      {globalError}
                    </div>
                  )}

                  {/* Login Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">No. Whatsapp</Label>
                      <Input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        autoComplete="tel"
                        ref={whatsappRef}
                        required
                        placeholder="08xxxxxxxxxx"
                        value={whatsapp}
                        onChange={(e) => {
                          setWhatsapp(e.target.value);
                          setErrors((prev) => ({ ...prev, whatsapp: undefined }));
                        }}
                        className={`w-full mt-2 h-[2.5rem] border ${
                          errors.whatsapp ? '!border-[#F08181]' : 'border-gray-300'
                        }`}
                      />
                      <FormFieldError message={errors.whatsapp} />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          ref={passwordRef}
                          required
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors((prev) => ({ ...prev, password: undefined }));
                          }}
                          className={`w-full h-[2.5rem] border ${
                            errors.password ? '!border-[#F08181]' : 'border-gray-300'
                          }`}
                        />
                        <FormFieldError message={errors.password} />
                      </div>
                    </div>

                    {/* Login Button */}
                    <Button
                      type="submit"
                      variant="info"
                      className="w-full text-white py-2.5 rounded-[0.4rem] text-[1rem] h-[2.5rem]"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Login'}
                    </Button>

                    {/* Forgot Password */}
                    <div className="text-center">
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-[#555555] text-[1rem] font-[500]"
                      >
                        Lupa Password
                      </Button>
                    </div>
                  </form>
                  <hr />
                  {/* Register Link */}
                  <div className="text-center text-[#555555] text-[0.8rem]">
                    Belum memiliki akun? Silahkan register di app ZYCAS
                  </div>
                </div>
              </div>

              {/* Right Side - Branding */}
              <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                <img
                  className="size-full object-cover rounded-tr-lg rounded-br-lg"
                  src={'/assets/zycas/zycas-login.png'}
                  alt="Zycas Login"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Terms and Privacy */}
        <div className="text-center text-[0.8rem] text-[#555555] space-y-1 mt-4">
          <p>
            Dengan melanjutkan, berarti Anda telah menyetujui{' '}
            <button type="button" className="underline cursor-pointer">
              Terms of Service
            </button>{' '}
            dan{' '}
            <button type="button" className="underline cursor-pointer">
              Privacy Policy
            </button>{' '}
            kami.
          </p>
          <p>Copyright ZYCAS © {new Date().getFullYear()} | Powered by Red Ant Colony</p>
        </div>
      </div>
    </>
  );
}
