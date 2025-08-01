import type { OptionType } from '@/components/dropdown/dropdown';

export type StoreFormData = {
  name: string;
  address: string;
  phone: string;
  type: string;
  category: string;
  lat: number;
  long: number;
};

export type FormStoreProps = {
  loadingDataStore?: boolean;
  optionsTypeStore: OptionType[];
  optionsCatStore: OptionType[];
  onFormChange?: (formData: StoreFormData) => void;
  initialValues?: StoreFormData;
};
