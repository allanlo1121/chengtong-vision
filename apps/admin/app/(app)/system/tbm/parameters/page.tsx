import { parameterQuery } from "@/lib/domain/tbm-runtime/queries";
import { listTbmSubsystems } from "@/lib/domain/tbm-runtime/services";
import { findTbmRuntimeParameters } from "@/lib/domain/tbm-runtime/services";
import { ParameterPageShell } from "./_components/ParameterPageShell";
import { ParameterList } from "./_components/ParameterList";
import { ParameterToolbar } from "./_components/ParameterToolbar";
import { ErrorBlock } from "@/components/common/error-block";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ParametersPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const query = parameterQuery.parse(params);

  let subsystems, parameters;
  try {
    [subsystems, parameters] = await Promise.all([
      listTbmSubsystems(),
      findTbmRuntimeParameters(query),
    ]);

    if (subsystems.length === 0) {
      return <div>没有子系统数据</div>;
    }

    if (!parameters || parameters.items.length === 0) {
      return <div>没有参数数据</div>;
    }
  } catch (error) {
    console.error("Error loading data:", error);
    return <ErrorBlock message="加载数据失败，请稍后再试" />;
  }

  return (
    <ParameterPageShell subsystems={subsystems} selectedSubsystemId={query.subsystemId}>
      <div className="flex h-full flex-col">
        <ParameterToolbar query={query} />
        <ParameterList parameters={parameters.items} />
      </div>
    </ParameterPageShell>
  );
}
