import { parameterTemplateQuery } from "@/lib/domain/tbm-runtime/queries";

import { ParameterPageShell } from "./_components/ParameterPageShell";

import { ParameterTemplateTabsEditor } from "./_components/ParameterTemplateTabsEditor";
import {
  getParameterTemplateGroups,
  listTbmParameterTemplates,
} from "@/lib/domain/tbm-runtime/services/parameter-template.service";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ParameterTemplatePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = parameterTemplateQuery.parse(params);
  if (!query.parameterTemplateId) {
    return (
      <ParameterPageShell
        parameterTemplates={[]}
        parameterTemplatesError={"缺少参数模板ID"}
        selectedParameterTemplateId={undefined}
      >
        <div className="flex h-full min-h-0 overflow-hidden items-center justify-center text-sm text-destructive">
          缺少参数模板ID
        </div>
      </ParameterPageShell>
    );
  }

  const [parameterTemplates, groups] = await Promise.all([
    listTbmParameterTemplates(),
    getParameterTemplateGroups(query.parameterTemplateId),
  ]);

  return (
    <ParameterPageShell
      parameterTemplates={parameterTemplates}
      parameterTemplatesError={"加载参数模板失败"}
      selectedParameterTemplateId={query.parameterTemplateId}
    >
      {groups.length > 0 ? (
        <ParameterTemplateTabsEditor templateId={query.parameterTemplateId} groups={groups} />
      ) : (
        <div className="flex h-full min-h-0 overflow-hidden items-center justify-center text-sm text-destructive">
          加载模板参数失败
        </div>
      )}
    </ParameterPageShell>
  );
}
