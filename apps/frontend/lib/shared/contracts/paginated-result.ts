// paginated-result.ts

export interface PageData<T> {
  items: T[];
  total: number;
}

export interface PaginatedResult<T> extends PageData<T> {
  page: number;
  pageSize: number;
}
