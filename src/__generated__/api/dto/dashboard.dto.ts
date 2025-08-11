import { BaseResponseSchema } from "./base.dto";

export interface DashboardOverviewSchema {
    store_total: number;
    employee_total: number;
    device_linked_total: number;
}

export interface GetDashboardOverviewResponseSchema extends BaseResponseSchema <DashboardOverviewSchema> {}