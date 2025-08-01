import { create } from 'zustand';

type UserFormState = {
  name: string;
  phone: string;
  id_number: string;
  email: string;
  password: string;
  password_confirmation: string;
  isActive: boolean;
  setField: (field: string, value: string | boolean) => void;
  reset: () => void;
  isFormValid: () => boolean;
  photo: File | null;
  setPhoto: (photo: File | null) => void;
};

type Store = UserFormState;

export const useUserStore = create<Store>()((set, get) => ({
  name: '',
  phone: '',
  id_number: '',
  email: '',
  password: '',
  password_confirmation: '',
  isActive: true,
  photo: null,

  setPhoto: (photo) => set({ photo }),

  setField: (field, value) => set({ [field]: value }),

  reset: () =>
    set({
      name: '',
      phone: '',
      id_number: '',
      email: '',
      password: '',
      password_confirmation: '',
      isActive: true,
      photo: null,
    }),

  isFormValid: () => {
    const { name, phone, password, password_confirmation, email, id_number } = get();
    return (
      name.trim() !== '' &&
      phone.trim().length >= 10 &&
      phone.trim().length <= 16 &&
      email.trim() !== '' &&
      password.length >= 6 &&
      password === password_confirmation &&
      (id_number.trim() === '' || id_number.length === 16)
    );
  },
}));

/**
 * FILTER USER
 */
export type StatusFilter = 'active' | 'inactive' | 'all';
type SortDirection = 'asc' | 'desc';

type UserFilterStore = {
  perPage: number;
  search: string;
  searchByStatus: StatusFilter;
  sortBy: string;
  sortDirection: SortDirection;
  setSearch: (value: string) => void;
  setStatus: (value: StatusFilter) => void;
  setSort: (field: string, direction: SortDirection) => void;
};

export const useUserFilterStore = create<UserFilterStore>((set) => ({
  perPage: 10,
  search: '',
  searchByStatus: 'all',
  sortBy: 'name',
  sortDirection: 'asc',
  setSearch: (search) => set({ search }),
  setStatus: (searchByStatus) => set({ searchByStatus }),
  setSort: (sortBy, sortDirection) => set({ sortBy, sortDirection }),
}));

type RefreshUserListStore = {
  shouldRefresh: boolean;
  triggerRefresh: () => void;
  resetRefresh: () => void;
};

export const useRefreshUserListStore = create<RefreshUserListStore>((set) => ({
  shouldRefresh: false,
  triggerRefresh: () => set({ shouldRefresh: true }),
  resetRefresh: () => set({ shouldRefresh: false }),
}));
/**
 * FILTER USER
 */
