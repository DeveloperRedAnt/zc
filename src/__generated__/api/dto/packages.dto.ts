import { BaseResponseSchema } from "./base.dto"; 

export type ActivePackage = {
    id: number,
    name: string,
    amount: string,
    end_date: string,
    next_renewal_at: string,
    renewal_status: string,
    badge_link: string
}


export type BasicPackage = {
    id: string,
    name: string,
    description: string[],
    price: string,
    badge_link: string,
    strip_link: string,
    end_date: string,
    next_renewal_at: string,
}

export type AddOn = {
    id: number,
    add_on_name: string,
    quantity: number
}
export type OverviewPackageSchema = {
    active: {
        package: BasicPackage,
        add_on: AddOn[]
    },
    available: {
        packages: BasicPackage[],
        add_ons: {
            start_from: number,
            data: AddOn[]
        }
    }
}


export type OverviewPackageResponseSchema = BaseResponseSchema<OverviewPackageSchema>