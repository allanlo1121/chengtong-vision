import { ActionResult } from "@/lib/shared/contracts";

interface CreateFormPageOptions<TForm, TData> {
  title: string;
  permission: string;
  formComponent: React.ComponentType<{
    defaultValues?: TForm;
    onSubmit: (values: TForm) => Promise<void>;
  }>;
  loadData?: (id: string) => Promise<ActionResult<TData>>;
  submitAction: (values: TForm) => Promise<ActionResult<any>>;
  redirectTo: string;
}
