"use client";

// import { ParameterSubsystemSidebar } from "./ParameterSubsystemSidebar";
// import { useParameterQueryFilter } from "./useParameterQueryFilter";
// import { ParameterSubsystemNode } from "@/lib/domain/tbm-runtime/types";

// interface ParameterPageClientProps {
//   subsystems: ParameterSubsystemNode[];
//   children: React.ReactNode;
// }

// export function ParameterPageClient({ subsystems, children }: ParameterPageClientProps) {
//   const { selectedSubsystemId, setSubsystemId } = useParameterQueryFilter();

//   return (
//     <div className="flex h-[calc(100vh-64px)] overflow-hidden rounded-lg border bg-background">
//       <ParameterSubsystemSidebar
//         items={subsystems}
//         selectedId={selectedSubsystemId}
//         onSelect={setSubsystemId}
//       />

//       <main className="min-w-0 flex-1 overflow-auto">{children}</main>
//     </div>
//   );
// }
