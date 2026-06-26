import { ParameterSubsystemNode } from "@/lib/domain/tbm-runtime/types";
import { ParameterSubsystemSidebar } from "./ParameterSubsystemSidebar";

interface ParameterPageShellProps {
  subsystems: ParameterSubsystemNode[];
  selectedSubsystemId?: number;
  children: React.ReactNode;
}

export function ParameterPageShell({
  subsystems,
  selectedSubsystemId,
  children,
}: ParameterPageShellProps) {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden rounded-lg border bg-background">
      <ParameterSubsystemSidebar items={subsystems} selectedId={selectedSubsystemId} />

      <main className="min-w-0 flex-1 overflow-auto">{children}</main>
    </div>
  );
}
