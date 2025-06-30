import { Nunito, Poppins } from 'next/font/google';

import { cn } from '@/libs/utils';

const fontPoppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
});

const fontNunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700'],
});

export const fontVariables = cn(fontPoppins.variable, fontNunito.variable);
