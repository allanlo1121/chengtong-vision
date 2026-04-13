import { ActionResult } from "@/lib/shared/contracts/action-result";

interface CreateDetailPageOptions<T> {
  title: string;
  permission: string;
  loadData: (id: string) => Promise<ActionResult<T>>;
  renderDetail: (data: T) => React.ReactNode;
}
