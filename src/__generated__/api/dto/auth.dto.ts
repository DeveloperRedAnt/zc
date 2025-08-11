import type { CreateOrganizationPayload } from '@/__generated__/api/dto/organization.dto';

export type Organizations = CreateOrganizationPayload[];

export type OrganizationUser = {
    id: number,
    name: string,
    code: string,
    address: string,
    phone: string,
    created_at: string,
    updated_at: string,
    nib: string,
    npwp: string,
    email: string,
    image: string,
    owner_id: number,
}