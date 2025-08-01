export interface Organization {
  id: number;
  name: string;
  [key: string]: unknown;
}

export interface OrganizationSelectOption {
  value: string;
  label: string;
}

export const formatOrganizationOptions = (data: Organization[]): OrganizationSelectOption[] =>
  data.map((org) => ({
    value: String(org.id),
    label: `#${org.id}  - ${org.name}`,
  }));

export const getSelectedOrganization = (
  selectedOrg: string,
  dataOrganization: OrganizationSelectOption[],
  dataOrganizationOfUser: Organization[]
): Organization | undefined => {
  const chosenOrg = dataOrganization.find((org) => org.value === selectedOrg);
  return Array.isArray(dataOrganizationOfUser) && chosenOrg
    ? dataOrganizationOfUser.find((org) => org.id === Number(chosenOrg.value))
    : undefined;
};
