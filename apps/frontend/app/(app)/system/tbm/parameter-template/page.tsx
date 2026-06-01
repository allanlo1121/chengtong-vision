import { parameterTemplateQuery } from "@/lib/domain/tbm-runtime/queries";

// import { findTbmRuntimeParameters } from "@/lib/domain/tbm-runtime/services";
import { ParameterPageShell } from "./_components/ParameterPageShell";
// import { ParameterList } from "./_components/ParameterList";
// import { ParameterToolbar } from "./_components/ParameterToolbar";
// import { ParameterListError } from "./_components/ParameterListError";
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

  const [parameterTemplates, groups] = await Promise.all([
    listTbmParameterTemplates(),
    getParameterTemplateGroups(query.parameterTemplateId),
  ]);

  return (
    <ParameterPageShell
      parameterTemplates={parameterTemplates.success ? parameterTemplates.data : []}
      parameterTemplatesError={parameterTemplates.success ? undefined : parameterTemplates.message}
      selectedParameterTemplateId={query.parameterTemplateId}
    >
      {groups.success ? (
        <ParameterTemplateTabsEditor templateId={query.parameterTemplateId} groups={groups.data} />
      ) : (
        <div className="flex h-full min-h-0 overflow-hidden items-center justify-center text-sm text-destructive">
          加载模板参数失败：{groups.message}
        </div>
      )}
    </ParameterPageShell>
  );
}
