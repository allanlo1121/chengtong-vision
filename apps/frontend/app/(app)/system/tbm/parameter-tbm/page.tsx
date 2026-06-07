// import { findTbmRuntimeParameters } from "@/lib/domain/tbm-runtime/services";
import { ParameterPageShell } from "./_components/ParameterPageShell";
// import { ParameterList } from "./_components/ParameterList";
// import { ParameterToolbar } from "./_components/ParameterToolbar";
// import { ParameterListError } from "./_components/ParameterListError";
import { ParameterBindingTabsEditor } from "./_components/ParameterBindingTabsEditor";

import { TbmPickerQuery } from "@/lib/domain/tbm/types";
import { listTbmPicker } from "@/lib/domain/tbm/services";
import { getTbmParameterBindingGroups } from "@/lib/domain/tbm-runtime/services/tbm-parameter-binding.service";

import { getOptions } from "@/lib/shared/options/services/option.service";

interface PageProps {
  searchParams: Promise<TbmPickerQuery>;
}
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const selectedId = params.tbmId ? params.tbmId : undefined;

  const filters = {
    search: params.search ?? "",
    tbmTypeName: params.tbmTypeName ?? "all",
    manufacturerName: params.manufacturerName ?? "all",
    diameterRange: [
      Number(params.diameterRange?.[0] ?? 0),
      Number(params.diameterRange?.[1] ?? 12),
    ] as [number, number],
  };

  const result = await listTbmPicker({
    search: filters.search,
    tbmTypeName: filters.tbmTypeName,
    manufacturerName: filters.manufacturerName,
    diameterRange: filters.diameterRange,
    page: Number(params.page ?? 1),
    pageSize: 20,
  });

  if (!result.success) {
    return (
      <div className="flex h-full min-h-0 overflow-hidden items-center justify-center text-sm text-destructive">
        加载盾构机列表失败：{result.message}
      </div>
    );
  }

  const [tbmTypeOption, manufacturerOptions, groups] = await Promise.all([
    getOptions({
      source: "master",
      code: "TBM_TYPE",
    }),
    getOptions({
      source: "customers",
      categoryCode: "10500009",
    }),
    getTbmParameterBindingGroups(result.data.items[0].id!),
  ]);

  return (
    <ParameterPageShell
      tbms={result.success && result.data ? result.data.items : []}
      selectedId={selectedId}
      filters={filters}
      tbmTypeOptions={tbmTypeOption}
      manufacturerOptions={manufacturerOptions}
    >
      {groups.length > 0 ? (
        <ParameterBindingTabsEditor tbmId={selectedId} groups={groups} />
      ) : (
        <div className="flex h-full min-h-0 overflow-hidden items-center justify-center text-sm text-destructive">
          加载模板参数失败
        </div>
      )}
    </ParameterPageShell>
  );
}
