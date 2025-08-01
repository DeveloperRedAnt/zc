'use client';

import { FormValidationProvider } from '@/hooks/use-form-validator/form-validation-context';
import FormAddOrganization from '@/modules/auth/components/form-add-organization';
// import { useOrganizationStore } from '@/store/organization-store';
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import Cookies from 'js-cookie';

export default function Index() {
  //  const router = useRouter();
  //   const organization = useOrganizationStore((state) => state.organization);

  //   useEffect(() => {
  //     if (organization === undefined || organization === null) {
  //        Cookies.remove('flex');
  //       useOrganizationStore.getState().clearOrganization();
  //       router.replace('/sign-in');
  //     }
  //   }, [organization, router]);

  // console.log('organization', organization);
  return (
    <>
      <FormValidationProvider>
        <FormAddOrganization />
      </FormValidationProvider>
    </>
  );
}
