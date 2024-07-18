export type SearchPizzaParams = {
  currentPage: number;
  category: string;
  search: string;
  sortBy: string;
}

export type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface PizzasSliceState {
  items: Pizza[];
  status: Status;
  totalPages: number;
}