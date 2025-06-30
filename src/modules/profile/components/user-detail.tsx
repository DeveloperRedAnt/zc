import { Card, CardContent, CardHeader } from '@/components/card/card';
import { useTranslation } from '@/libs/i18n';
import DetailField from '../card-photo/detail-field';
import PermissionList, { PermissionSection } from './permission-detail';

// const userConfig = [
//   {
//     key: 'ktp',
//     label: 'KTP:',
//     value: '3405513543610002',
//     labelClassName: 'font-semibold text-sm',
//   },
//   {
//     key: 'whatsapp',
//     label: 'No. Whatsapp:',
//     value: '08235189613166',
//     labelClassName: 'font-semibold text-sm',
//   },
//   {
//     key: 'email',
//     label: 'Email:',
//     value: 'shanju@gmail.com',
//     labelClassName: 'font-semibold text-sm',
//   },
// ];

const sectionsData: PermissionSection[] = [
  {
    id: '#1123',
    title: '#1123 - Indosemar Juanda',
    permissionCount: 3,
    jabatan: 'Kasir',
    categories: [
      {
        title: 'Kasir',
        permissions: [
          'Buat Transaksi',
          'Tutup Kasir',
          'Tampilan Tabel',
          'Split Bill',
          'Buka Kasir',
          'Tampilan Grid',
          'Produk Cuma-Cuma',
        ],
      },
      {
        title: 'Produk',
        permissions: ['Lihat List Produk', 'Lihat Detail Produk'],
      },
    ],
  },
  {
    id: '#1124',
    title: '#1124 - Contoh Lain',
    permissionCount: 2,
    jabatan: 'Manager',
    categories: [
      {
        title: 'Manajemen',
        permissions: ['Kelola Staf', 'Lihat Laporan'],
      },
    ],
  },
];
export default function UserDetail() {
  const { t } = useTranslation();

  // User configuration with translations
  const userConfig = [
    {
      key: 'ktp',
      label: t('profile.userProfile.userDetail.fields.ktp'),
      value: '3405513543610002',
      labelClassName: "font-semibold font-['Poppins:SemiBold']",
    },
    {
      key: 'whatsapp',
      label: t('profile.userProfile.userDetail.fields.whatsapp'),
      value: '08235189613166',
    },
    {
      key: 'email',
      label: t('profile.userProfile.userDetail.fields.email'),
      value: 'shanju@gmail.com',
    },
  ];
  return (
    <Card className="w-full">
      <CardHeader>
        <h4 className="text-sm">{t('profile.userProfile.userDetail.title')}</h4>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap w-full">
          {userConfig.map((field, idx) => (
            <DetailField
              key={field.key}
              label={field.label}
              value={field.value}
              width="w-1/2"
              labelClassName={field.labelClassName}
              className={idx !== userConfig.length - 1 ? 'mb-4' : ''}
            />
          ))}
        </div>
        <div className="w-full mt-3">
          <h4 className="text-sm mb-6 mt-3">{t('profile.userProfile.userDetail.permission')}</h4>
          <div className="font-normal text-sm mt-2 mb-2">
            {t('profile.userProfile.userDetail.organization')}{' '}
          </div>
          <div className="text-sm">{t('profile.userProfile.userDetail.orgExample')}</div>
        </div>
        <div>
          <PermissionList sections={sectionsData} initiallyExpanded="#1123" />
        </div>
      </CardContent>
    </Card>
  );
}
