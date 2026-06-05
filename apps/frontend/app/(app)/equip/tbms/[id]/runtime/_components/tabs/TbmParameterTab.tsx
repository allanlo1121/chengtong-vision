import { ParameterBindingTabsEditor } from "../cards/TbmParameterCard";

import { Tbm } from "@/lib/domain/tbm/types";

import {
  getTbmParameterBindingGroups,
  findParameterTemplateOptions,
} from "@/lib/domain/tbm-runtime/services";
import { TbmParameterBindingGroup } from "@/lib/domain/tbm-runtime/types/tbm-parameter-binding.types";
import { ErrorBlock } from "@/components/common/error-block";
import { TemplateOption } from "@/lib/domain/tbm-runtime/types";

export default async function TbmParameterTab({ tbm }: { tbm: Tbm }) {
  let tbmParameterBindingGroups: TbmParameterBindingGroup[] = [];
  let templateOptions: TemplateOption[] = [];

  try {
    tbmParameterBindingGroups = await getTbmParameterBindingGroups(tbm.id);
    templateOptions = await findParameterTemplateOptions();
  } catch (error) {
    console.error("Error fetching TBM parameter binding groups or template options:", error);
    return (
      <ErrorBlock
        message={error instanceof Error ? error.message : "加载参数绑定信息失败，请稍后再试。"}
      />
    );
  }

  return (
    <div>
      <ParameterBindingTabsEditor
        tbmId={tbm.id}
        groups={tbmParameterBindingGroups}
        templateOptions={templateOptions}
      />
    </div>
  );
}
