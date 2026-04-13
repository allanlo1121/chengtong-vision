// import { importRegistry } from "../registry/import.registry";
// import { buildLookupMaps } from "../engine/build-lookup-maps";
// import { ImportRow, ImportRowMap } from "../types";
// import { formatZodError } from "@/lib/zod/format-zod-error";
// import { TableEntity } from "@/lib/core/types/entity.types";

// export async function processRow<T extends TableEntity>(
//     entity: T,
//     row: ImportRowMap[T]
// ) {
//     const config = importRegistry[entity];

//     const maps = await buildLookupMaps(config.requiredLookups);

//     const ctx = { maps };

//     // 1️⃣ mapper
//     const mapped = config.mapper(row);

//     // 2️⃣ lookup
//     const enriched = config.lookups
//         ? { ...mapped, ...(await config.lookups(row, ctx)) }
//         : mapped;

//     // 3️⃣ schema 校验（这里才是最终类型）
//     const parsed = config.schema.safeParse(enriched);

//     if (!parsed.success) {
//         console.error("Row validation failed", {
//             row,
//             mapped,
//             enriched,
//             errors: formatZodError(parsed.error),
//         });
//         throw new Error("校验失败");
//     }

//     // ✅ 最终类型
//     const data = parsed.data;

//     console.log("writer =", config.writer);
//     console.log("typeof writer =", typeof config.writer);

//     // 5️⃣ 写入
//     return config.writer(data);
// }
