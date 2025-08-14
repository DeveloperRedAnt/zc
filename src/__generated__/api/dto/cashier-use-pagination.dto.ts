  
  
  export interface EmployeeListResponse {
    id: number;
    name: string;
    email: string;
    phone: string;
    is_active: boolean;
    store_count: number | string; 
    image: string | null;
  }

  export interface EmployeeListPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  }

  export interface EmployeeListApiResponse {
    code: number;
    status: string;
    name: string;
    message: string;
    data: EmployeeListResponse[];
    pagination: EmployeeListPagination;
  }

  // Request body yang kamu kirim ke API
  export interface EmployeeSchema {
    id: number;
    name: string;
    email: string;
    phone: string;
    is_active: boolean;
    store_count: number;
    image?: string | null;
  }


  export type FilteringEmployee = {
    per_page: number;
    search: string;
    sort_by: string;
    sort_direction: string;
    search_by_status: 'all' | 'active' | 'inactive';
    page: number;
  }