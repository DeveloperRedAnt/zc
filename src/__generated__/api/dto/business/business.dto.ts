export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface CategoriesResponse {
  data: Category[];
}