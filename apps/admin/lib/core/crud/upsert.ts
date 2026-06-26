// import { TableInsert, TableKey, TableRow } from "../types/entity.types";
// import { diffFields } from "./diff-fields";
// import { findOne } from "./findone";
// import { insertOne } from "./insert";
// import { updateOne } from "./update";

// export function isEmpty(obj: object) {
//     return Object.keys(obj).length === 0;
// }

// export async function smartUpsert<T extends TableKey>(
//     target: T,
//     match: Partial<TableRow<T>>,
//     input: Partial<TableRow<T>>,
//     options?: {
//         ignoreKeys?: (keyof TableRow<T>)[];
//     }
// ): Promise<{
//     action: "insert" | "update" | "skip";
//     row: TableRow<T>;
// }> {
//     const existing = await findOne(target, match);

//     // 🟢 insert
//     if (!existing) {
//         const row = await insertOne(target, input);
//         return { action: "insert", row };
//     }

//     // 🔵 diff
//     const changes = diffFields(existing, input, [
//         "id",
//         "created_at",
//         "created_by",
//         ...(options?.ignoreKeys ?? []),
//     ]);

//     // ⚪ skip
//     if (isEmpty(changes)) {
//         return { action: "skip", row: existing };
//     }

//     // 🔴 update（⚠️ 用 match，不用 id）
//     const row = await updateOne(target, match, changes);

//     return { action: "update", row };
// }
