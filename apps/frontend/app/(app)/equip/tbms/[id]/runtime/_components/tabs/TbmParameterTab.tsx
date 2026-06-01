import { ParameterBindingTabsEditor } from "../cards/TbmParameterCard";

import { Tbm } from "@/lib/domain/tbm/types";

import {
  getTbmParameterBindingGroups,
  findParameterTemplateOptions,
} from "@/lib/domain/tbm-runtime/services";

export default async function TbmParameterTab({ tbm }: { tbm: Tbm }) {
  const result = await getTbmParameterBindingGroups(tbm.id);
  const templateOptionsResult = await findParameterTemplateOptions();

  if (!result.success) {
    return (
      <div className="flex h-full min-h-0 overflow-hidden items-center justify-center text-sm text-destructive">
        加载参数绑定数据失败：{result.message}
      </div>
    );
  }

  const templateOptions = templateOptionsResult.success ? templateOptionsResult.data : [];

  return (
    <div>
      <ParameterBindingTabsEditor
        tbmId={tbm.id}
        groups={result.data}
        templateOptions={templateOptions}
      />
    </div>
  );
}
