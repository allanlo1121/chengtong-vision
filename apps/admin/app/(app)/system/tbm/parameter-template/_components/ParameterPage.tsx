// import { findRuntimeParameters } from "@/lib/domain/parameter/repositories";
// import { buildParameterTree } from "@/lib/domain/parameter/utils/build-parameter-tree";
// import { ParameterPageClient } from "./_components/ParameterPageClient";
// import { parameterQuery } from "@/lib/domain/parameter/schemas/parameter-query";
// import { listTbmSubsystems } from "@/lib/domain/tbm-runtime/repositories/client";

// interface PageProps {
//   searchParams: Promise<Record<string, string | string[] | undefined>>;
// }

// export default async function ParameterPage({ searchParams }: PageProps) {
//   const params = await searchParams;
//   const query = parameterQuery.parse(params);

//   const result = await findRuntimeParameters(query);

//   const subsystem = await listTbmSubsystems();

//   return <ParameterPageClient subsystems={subsystem} />;
// }
