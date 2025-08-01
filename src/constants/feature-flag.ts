import { create } from 'zustand';

// Supported entities and actions
export type Entity =
  | 'organization'
  | 'store'
  | 'user'
  | 'product'
  | 'voucher'
  | 'member'
  | 'report';

type ReportType =
  | 'salesSummary'
  | 'salesDaily'
  | 'salesProduct'
  | 'salesVarian'
  | 'salesCashier'
  | 'salesPaymentType'
  | 'salesVoid'
  | 'profitLoss';
type Action = 'create' | 'read' | 'update' | 'delete';

// Feature flag map type
export type FeatureFlagMap = {
  [K in Exclude<Entity, 'report'>]: {
    [action in Action]: boolean;
  };
} & {
  report: {
    [key in ReportType]: boolean;
  };
};

// Store state and actions
type FeatureFlagState = {
  flags: FeatureFlagMap;
  setFlag: (entity: Entity, action: Action, enabled: boolean) => void;
  getFlag: (entity: Entity, action: Action) => boolean;
  bulkSetFlags: (flags: Partial<FeatureFlagMap>) => void;
};

// Initial flag values (example)
const initialFlags: FeatureFlagMap = {
  organization: {
    create: true,
    read: true,
    update: false,
    delete: false,
  },
  store: {
    create: true,
    read: true,
    update: true,
    delete: false,
  },
  user: {
    create: false,
    read: true,
    update: false,
    delete: false,
  },
  product: {
    create: true,
    read: true,
    update: true,
    delete: true,
  },
  voucher: {
    create: false,
    read: true,
    update: false,
    delete: false,
  },
  member: {
    create: false,
    read: true,
    update: false,
    delete: false,
  },
  report: {
    salesSummary: true,
    salesDaily: true,
    salesProduct: true,
    salesVarian: true,
    salesCashier: true,
    salesPaymentType: true,
    salesVoid: true,
    profitLoss: true,
  },
};

export const useFeatureFlagStore = create<
  FeatureFlagState & {
    setReportFlag: (report: ReportType, enabled: boolean) => void;
    getReportFlag: (report: ReportType) => boolean;
  }
>((set, get) => ({
  flags: initialFlags,
  setFlag: (entity, action, enabled) => {
    if (entity === 'report') throw new Error('Use setReportFlag for report entity');
    set((state) => ({
      flags: {
        ...state.flags,
        [entity]: {
          ...state.flags[entity],
          [action]: enabled,
        },
      },
    }));
  },
  getFlag: (entity, action) => {
    if (entity === 'report') throw new Error('Use getReportFlag for report entity');
    return get().flags[entity][action];
  },
  setReportFlag: (report, enabled) =>
    set((state) => ({
      flags: {
        ...state.flags,
        report: {
          ...state.flags.report,
          [report]: enabled,
        },
      },
    })),
  getReportFlag: (report) => get().flags.report[report],
  bulkSetFlags: (flags) =>
    set((state) => ({
      flags: {
        ...state.flags,
        ...Object.fromEntries(
          Object.entries(flags).map(([entity, actions]) => [
            entity,
            { ...state.flags[entity as keyof FeatureFlagMap], ...actions },
          ])
        ),
      },
    })),
}));

// Usage:
// useFeatureFlagStore.getState().getFlag('organization', 'create')
// useFeatureFlagStore.getState().getReportFlag('salesSummary')

// Usage example:
// const canCreateOrg = useFeatureFlagStore((s) => s.getFlag('organization', 'create'));
