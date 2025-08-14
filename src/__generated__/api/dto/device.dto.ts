export interface DeviceOwner {
  id: number;
  name: string;
  email: string;
  phone: string;
  org_count: number;
}

export interface DeviceOrganization {
  id: number;
  name: string;
  phone: string;
  nib: string | null;
  npwp: string | null;
  address: string;
  email: string;
  image: string | null;
  owner: DeviceOwner;
}

export interface DeviceStore {
  id: number;
  name: string;
  address: string;
  lat: number;
  long: number;
  phone: string;
  type: string;
  category: string;
}

export interface DeviceData {
  id: number;
  name: string;
  model: string;
  serial_number: string;
  code: string;
  store: DeviceStore;
  organization: DeviceOrganization;
}

export interface DeviceResponse {
  data: DeviceData;
}

export interface DeviceListResponse {
  data: DeviceData[];
}