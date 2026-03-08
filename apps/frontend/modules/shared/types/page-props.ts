export interface PageProps<
  TParams extends Record<string, string> = {},
  TSearchParams extends Record<string, any> = {},
> {
  params: TParams;
  searchParams: TSearchParams;
}
