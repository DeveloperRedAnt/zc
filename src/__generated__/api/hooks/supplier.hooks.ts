import { useOrganizationStore } from '@/store/organization-store';
import { useQuery } from '@tanstack/react-query';
import { getStore, getSupplier } from '../client/first_stock.client';

export const useSuppliers = (page?: number, search?: string) => {
    const organization = useOrganizationStore.getState().organization;

    return useQuery({
        queryKey: ['suppliers', page, search],
        queryFn: () => getSupplier({
            //   'x-organization-id': String(organization?.id ?? '1'),
            'x-organization-id': String("1"),
            page,
            search,
        }),
        enabled: !!organization?.id
    });
};

export const useStore = (
    page?: number,
    perpage?: number,
    sort_by?: string,
    sort_direction?: 'asc' | 'desc',
    search?: string
) => {
    const organization = useOrganizationStore.getState().organization;
    return useQuery({
        queryKey: ['stores', page, perpage, sort_by, sort_direction, search],
        queryFn: () => getStore({
            'x-organization-id': "1",
            'x-device-id': "1",
            page,
            perpage,
            sort_by,
            sort_direction,
            search,
        }),
        enabled: !!organization?.id
    });
};
