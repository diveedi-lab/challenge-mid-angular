
export interface Paged<T> {
  data: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}
