import { ParameterTemplateNode } from "@/lib/domain/tbm-runtime/types";
import { ParameterTemplateSidebar } from "./ParameterTemplateSidebar";

interface ParameterTemplatePageShellProps {
  parameterTemplates: ParameterTemplateNode[];
  parameterTemplatesError?: string;
  selectedParameterTemplateId?: number;
  children: React.ReactNode;
}

export function ParameterPageShell({
  parameterTemplates,
  parameterTemplatesError,
  selectedParameterTemplateId,
  children,
}: ParameterTemplatePageShellProps) {
  return (
    <div className="flex h-[calc(100vh-96px)] overflow-hidden rounded-lg border bg-background">
      <ParameterTemplateSidebar
        items={parameterTemplates}
        error={parameterTemplatesError}
        selectedId={selectedParameterTemplateId}
      />

      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </div>
  );
}
