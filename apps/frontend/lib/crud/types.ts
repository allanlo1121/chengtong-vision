export interface CrudContext<TItem> {
  title: string;
  selectedRows: TItem[];
  clearSelection: () => void;
}
