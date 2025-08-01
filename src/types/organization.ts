export interface Organization {
  id: number;
  name: string;
  flex: string;
}

export interface OrganizationStore {
  organization: Organization | null;
  setOrganization: (org: Organization) => void;
  clearOrganization: () => void;
}
