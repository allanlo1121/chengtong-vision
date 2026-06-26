// shared/contracts/pagination-query.ts

export interface PaginationQuery {
  page: number;
  pageSize: number;
  search?: string;
}
