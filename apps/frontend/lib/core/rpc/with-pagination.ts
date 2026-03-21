export function withPagination<T extends Record<string, any>>(
  query: T,
  pageField = "page",
  pageSizeField = "pageSize"
) {
  const page = query[pageField] ?? 1;
  const pageSize = query[pageSizeField] ?? 20;

  return {
    p_limit: pageSize,
    p_offset: (page - 1) * pageSize,
  };
}
