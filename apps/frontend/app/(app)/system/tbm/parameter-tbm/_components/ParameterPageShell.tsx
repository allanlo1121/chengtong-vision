import { ParameterBindingSidebar, TbmSidebarFilterValues } from "./ParameterBindingSidebar";
import { TbmPickerItem } from "@/lib/domain/tbm/types/picker.types";
import { SelectOption } from "@/lib/shared/options/types";

interface ParameterTemplatePageShellProps {
  tbms: TbmPickerItem[];
  selectedId?: string;
  filters: TbmSidebarFilterValues;
  tbmTypeOptions: SelectOption[];
  manufacturerOptions: SelectOption[];
  error?: string;
  children: React.ReactNode;
}

export function ParameterPageShell({
  tbms,
  selectedId,
  filters,
  tbmTypeOptions,
  manufacturerOptions,
  error,
  children,
}: ParameterTemplatePageShellProps) {
  return (
    <div className="flex h-[calc(100vh-96px)] overflow-hidden rounded-lg border bg-background">
      <ParameterBindingSidebar
        tbms={tbms}
        selectedId={selectedId}
        filters={filters}
        tbmTypeOptions={tbmTypeOptions}
        manufacturerOptions={manufacturerOptions}
        error={error}
      />

      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </div>
  );
}
