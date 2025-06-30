import * as React from 'react';

import { cn } from '@/libs/utils';
import { Button } from '../../button/button';

type EmptyStateVariant =
  | 'unauthorized'
  | 'incomplete'
  | 'notFound'
  | 'systemProblem'
  | 'badGateway'
  | 'underMaintenance'
  | 'gatewayTimeout'
  | 'incorrectAccess'
  | 'custom';

type EmptyStateProps = {
  variant?: EmptyStateVariant;
  customIcon?: React.ReactNode;
  customTitle?: React.ReactNode;
  customDescription?: React.ReactNode;
  customActionText?: string;
  onActionClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const variants: Record<
  EmptyStateVariant,
  {
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
  }
> = {
  unauthorized: {
    icon: (
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M37.5938 39.0312H42.2812V43.7031H37.5938V39.0312Z" fill="#28A745" />
        <path
          d="M62.0781 12H18.25L0 28.1094L7.92188 43.0469V53.7188L8.14062 54.1875C8.40625 54.75 14.875 68 40.2656 68C64.875 68 72.0312 54.8281 72.3125 54.2812L72.5781 53.7656V43.2344L80 28.0781L62.0781 12ZM12.5938 45.4219H28.1719C28.5469 47.625 29.8125 49.6094 31.6719 50.8594H12.5938V45.4219ZM32.7344 44.0938V34.8594C37.4219 33.4688 42.4219 33.4688 47.1094 34.8594V44.0938C47.1094 45.2812 46.4844 46.4219 45.4531 47.0469L39.9062 50.4531L34.3906 47.0312C33.375 46.4062 32.7344 45.2812 32.7344 44.0938ZM51.6875 45.4219H67.9062V50.8594H48.1875C50.0469 49.6094 51.3125 47.6094 51.6875 45.4219ZM17.8281 57.7187C16.7344 56.9844 15.8281 56.2344 15.0938 55.5469H65.2656C61.6406 58.8438 54.1406 63.3281 40.2812 63.3281C33.8281 63.3281 24.7031 62.3437 17.8281 57.7187ZM68.5938 40.7344H51.7969V31.5312L50.2656 30.9688C43.6094 28.5312 36.2656 28.5312 29.6094 30.9688L28.0781 31.5312V40.7344H12.0156L5.89062 29.1719L20.0469 16.6719H60.3125L74.2656 29.2031L68.5938 40.7344Z"
          fill="#28A745"
        />
      </svg>
    ),
    title: 'Verifikasi Akses Diperlukan',
    description:
      'Untuk melanjutkan aktivitas Anda, silakan login terlebih dahulu. Jika mengalami kesulitan saat login, tim support kami siap membantu Anda.',
    buttonText: 'Login Sekarang',
  },
  incomplete: {
    icon: '',
    title: 'Data Tidak Lengkap',
    description:
      'Data yang Anda masukkan belum lengkap atau kurang sesuai. Mohon periksa kembali semua kolom yang wajib diisi dan pastikan formatnya sudah benar',
    buttonText: 'Periksa Kembali',
  },
  notFound: {
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1135_848)">
          <path
            d="M39.625 0C26.1875 0 15.25 10.9375 15.25 24.375C15.25 30.425 17.4625 35.9625 21.125 40.225L18.25 43.1L15.6 40.45L1.65002 54.4C-0.537476 56.5875 -0.537476 60.1625 1.65002 62.35C3.83752 64.5375 7.41253 64.5375 9.60003 62.35L23.55 48.4L20.9 45.75L23.775 42.875C28.0375 46.5375 33.575 48.75 39.625 48.75C53.0625 48.75 64 37.8125 64 24.375C64 10.9375 53.0625 0 39.625 0ZM6.95002 59.7C6.22502 60.425 5.02502 60.425 4.30002 59.7C3.57502 58.975 3.57502 57.775 4.30002 57.05L15.6 45.75L18.25 48.4L6.95002 59.7ZM39.625 45C28.25 45 19 35.75 19 24.375C19 13 28.25 3.75 39.625 3.75C51 3.75 60.25 13 60.25 24.375C60.25 35.75 51 45 39.625 45Z"
            fill="#28A745"
          />
          <path
            d="M39.625 7.5C30.325 7.5 22.75 15.075 22.75 24.375C22.75 33.675 30.325 41.25 39.625 41.25C48.925 41.25 56.5 33.675 56.5 24.375C56.5 15.075 48.925 7.5 39.625 7.5ZM39.625 37.5C32.3875 37.5 26.5 31.6125 26.5 24.375C26.5 17.1375 32.3875 11.25 39.625 11.25C46.8625 11.25 52.75 17.1375 52.75 24.375C52.75 31.6125 46.8625 37.5 39.625 37.5Z"
            fill="#28A745"
          />
          <path
            d="M43.375 17.9751L39.625 21.7251L35.875 17.9751L33.225 20.6251L36.975 24.3751L33.225 28.1251L35.875 30.7751L39.625 27.0251L43.375 30.7751L46.025 28.1251L42.275 24.3751L46.025 20.6251L43.375 17.9751Z"
            fill="#28A745"
          />
        </g>
        <defs>
          <clipPath id="clip0_1135_848">
            <rect width="64" height="64" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    title: 'Tidak Ditemukan',
    description: 'Maaf, halaman yang Anda cari sudah tidak tersedia atau dipindahkan',
    buttonText: 'Kembali ke Beranda',
  },
  systemProblem: {
    icon: '',
    title: 'Sistem Sedang Bermasalah',
    description:
      'Maaf, sistem kami sedang mengalami gangguan. Tim teknis kami sedang bekerja untuk memperbaikinya. Silakan coba lagi dalam beberapa saat.',
    buttonText: 'Muat ulang',
  },
  badGateway: {
    icon: '',
    title: 'Koneksi Terputus',
    description:
      'Sistem kami sedang mengalami masalah koneksi. Hal ini biasanya bersifat sementara. Silakan tunggu sebentar dan coba lagi.',
    buttonText: 'Coba lagi',
  },
  underMaintenance: {
    icon: '',
    title: 'Sedang Perbaikan',
    description:
      'Kami sedang melakukan perbaikan sistem untuk meningkatkan layanan kami. Perbaikan akan selesai dalam beberapa saat. Mohon kunjungi kami kembali sesaat kembali.',
    buttonText: 'Periksa Status',
  },
  gatewayTimeout: {
    icon: '',
    title: 'Sistem Terlalu Lama Merespons',
    description:
      'Maaf, sistem kami membutuhkan waktu terlalu lama untuk merespons. Silakan coba lagi dalam beberapa saat. Jika masalah berlanjut, mohon hubungi tim support kami.',
    buttonText: 'Coba lagi',
  },
  incorrectAccess: {
    icon: '',
    title: 'Cara Akses Tidak Sesuai',
    description:
      'Ups, sepertinya ada yang tidak sesuai dengan cara mengakses halaman ini. Coba periksa kembali atau hubungi kami untuk bantuan.',
    buttonText: 'Kembali ke Beranda',
  },
  custom: {
    icon: '',
    title: '',
    description: '',
    buttonText: '',
  },
};

const EmptyState: React.FC<EmptyStateProps> = ({
  variant = 'custom',
  customIcon,
  customTitle,
  customDescription,
  customActionText,
  onActionClick,
  className,
  ...props
}) => {
  const v = variants[variant] || {};
  return (
    <div className={cn('flex flex-col items-center justify-center py-12', className)} {...props}>
      <div className="w-[80px] h-[80px]">{variant === 'custom' ? customIcon : v.icon}</div>
      <div className="text-xl font-semibold mt-3">
        {variant === 'custom' ? customTitle : v.title}
      </div>
      <p className="text-sm text-center font-normal text-[#64748B] mt-2">
        {variant === 'custom' ? customDescription : v.description}
      </p>
      {(onActionClick || v.buttonText || customActionText) && (
        <Button className="h-[36px] w-auto mt-10 bg-[#24822E]" onClick={onActionClick}>
          {variant === 'custom' ? customActionText : v.buttonText}
        </Button>
      )}
    </div>
  );
};

EmptyState.displayName = 'EmptyState';

export { EmptyState };
