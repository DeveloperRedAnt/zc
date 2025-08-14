import { SubscriptionData } from '@/modules/management-subscription/types/histories';

export type SubscriptionsHistoriesResponse = {
  data: SubscriptionData[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type Package = {
  id: number | string;
  name: string;
  amount?: string;
  price?: string;
  end_date?: string;
  next_renewal_at?: string;
  renewal_status?: string;
  badge_link?: string | null;
  strip_link?: string;
  description?: string[];
};

export type AddOnPackage = {
  id: number;
  add_on_name: string;
  quantity: number;
};

export type AvailableAddOn = {
  name: string;
};

export type SubscriptionOverviewData = {
  active: {
    package: Package;
    add_on: AddOnPackage[];
  };
  available: {
    packages: Package[];
    add_ons: {
      start_from: number;
      data: AvailableAddOn[];
    };
  };
};

export type SubscriptionOverviewResponse = {
  active: {
    package: Package;
    add_on: AddOnPackage[];
  };
  available: {
    packages: Package[];
    add_ons: {
      start_from: number;
      data: AvailableAddOn[];
    };
  };
};

export type PackageComparisonItem = {
  id: number;
  name: string;
  is_available: boolean;
  message?: string | null;
  limit?: string | null;
};

export type Permission = {
  name: string;
  compare_to_package: PackageComparisonItem[];
};

export type PermissionGroup = {
  name: string;
  permissions: Permission[];
};

export type PackageComparisonResponse = {
  code: number;
  status: string;
  name: string;
  message: string;
  data: PermissionGroup[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};