import { parameterQuery } from "@/lib/domain/tbm-runtime/queries";
import { listTbmSubsystems } from "@/lib/domain/tbm-runtime/services";
import { findTbmRuntimeParameters } from "@/lib/domain/tbm-runtime/services";
import { ParameterPageShell } from "./_components/ParameterPageShell";
import { ParameterList } from "./_components/ParameterList";
import { ParameterToolbar } from "./_components/ParameterToolbar";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ParametersPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const query = parameterQuery.parse(params);

  const [subsystems, parameters] = await Promise.all([
    listTbmSubsystems(),
    findTbmRuntimeParameters(query),
  ]);

  if (!subsystems.success) {
    return <div>加载子系统失败: {subsystems.message}</div>;
  }

  if (!parameters.success) {
    return <div>加载参数失败: {parameters.message}</div>;
  }

  return (
    <ParameterPageShell subsystems={subsystems.data} selectedSubsystemId={query.subsystemId}>
      <div className="flex h-full flex-col">
        <ParameterToolbar query={query} />
        <ParameterList parameters={parameters.data.items} />
      </div>
    </ParameterPageShell>
  );
}
