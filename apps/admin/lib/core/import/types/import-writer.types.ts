import { TableEntity } from "@/lib/core/database/types/entity.types";

// type WriteResult = {
//     action: "insert" | "update" | "skip";
//     id?: string;
// };

// export type ImportWriter<T extends TableEntity> = {
//     upsert: (data: SchemaRowType<T>) => Promise<WriteResult>;

//     insert?: (data: SchemaRowType<T>) => Promise<WriteResult>;

//     onConflict?: string; // upsert key
// };

export type WriterResult =
  | {
      success: true;
      action: "inserted" | "updated" | "skipped";
      id: string | null;
    }
  | {
      success: false;
      error: {
        message: string;
        raw: any; // 原始数据，方便 UI 展示
      };
    };
