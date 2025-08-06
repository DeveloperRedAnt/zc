import * as DTO from '@/__generated__/api/dto';
import { Card, CardContent, CardHeader } from '@/components/card/card';
import { useTranslation } from '@/libs/i18n';
import { useMemo } from 'react';
import DetailField from '../card-photo/detail-field';
import PermissionList from './permission-detail';

export type UserDetailProps = {
  identityNumber: string;
  phoneNumber: string;
  email: string;
  organization: {
    id: number;
    name: string;
  };
  stores: DTO.EmployeeStoreSchema[];
};
export default function UserDetail({
  identityNumber,
  phoneNumber,
  email,
  organization,
  stores,
}: UserDetailProps) {
  const { t } = useTranslation();

  // User configuration with translations
  const userConfig = useMemo(
    () => [
      {
        key: 'ktp',
        label: t('profile.userProfile.userDetail.fields.ktp'),
        value: identityNumber,
        labelClassName: "font-semibold font-['Poppins:SemiBold']",
      },
      {
        key: 'whatsapp',
        label: t('profile.userProfile.userDetail.fields.whatsapp'),
        value: phoneNumber,
      },
      {
        key: 'email',
        label: t('profile.userProfile.userDetail.fields.email'),
        value: email,
      },
    ],
    [t, identityNumber, phoneNumber, email]
  );

  const permissions = stores.map((store) => {
    const categories = store.permission_groups.map((group) => {
      return {
        title: group.name,
        permissions: group.permissions.map((permission) => permission.name),
      };
    });

    const permissionCount = store.permission_groups.reduce(
      (total, group) => total + group.permissions.length,
      0
    );

    return {
      id: store.id.toString(),
      title: store.name,
      permissionCount: permissionCount,
      jabatan: store.position?.name || '-',
      categories: categories,
    };
  });

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
        <div className="w-full mt-8 border-t border-[#F1F5F9]">
          <h4 className="text-sm mb-6 mt-6">{t('profile.userProfile.userDetail.permission')}</h4>
          <div
            className="font-semibold font-[600] text-sm mt-2 mb-2"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {t('profile.userProfile.userDetail.organization')}{' '}
          </div>
          <div className="text-sm">{`${organization.id} - ${organization.name}`}</div>
        </div>
        <div>
          <PermissionList sections={permissions} initiallyExpanded="#1123" />
        </div>
      </CardContent>
    </Card>
  );
}
