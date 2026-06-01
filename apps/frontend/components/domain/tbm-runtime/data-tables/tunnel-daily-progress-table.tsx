// tunnel-daily-progress-table.tsx
"use client";

import * as React from "react";
import { TunnelDailyProgressItem } from "@/lib/domain/tbm-runtime/types";
import { DataTable } from "@/components/data-table/data-table";
import { getTunnelDailyProgressColumns, EditableProgressDraft } from "./get-columns";

import { updateTunnelDailyProgressAction } from "@/lib/domain/tbm-runtime/actions";
import { useRouter } from "next/navigation";

interface TunnelDailyProgressTableProps {
  data: TunnelDailyProgressItem[];
}

export function TunnelDailyProgressTable({ data }: TunnelDailyProgressTableProps) {
  const router = useRouter();
  const [editingRowId, setEditingRowId] = React.useState<string | null>(null);

  const [drafts, setDrafts] = React.useState<Record<string, EditableProgressDraft>>({});

  const columns = React.useMemo(
    () =>
      getTunnelDailyProgressColumns({
        editingRowId,
        drafts,

        onEdit: (row) => {
          setEditingRowId(row.id);
          setDrafts((prev) => ({
            ...prev,
            [row.id]: {
              ringEnd: row.ringEnd!,
              chainageEnd: row.chainageEnd!,
              planRingCount: row.planRingCount!,
            },
          }));
        },

        onCancel: () => {
          setEditingRowId(null);
        },

        onDraftChange: (rowId, key, value) => {
          setDrafts((prev) => ({
            ...prev,
            [rowId]: {
              ...prev[rowId],
              [key]: value,
            },
          }));
        },

        onSave: async (row) => {
          const draft = drafts[row.id];

          console.log("===onSave draft===", draft);
          console.log("===onSave row===", row);

          if (!draft) return;

          await updateTunnelDailyProgressAction({
            id: row.id,
            tunnelId: row.tunnelId,
            tbmId: row.tbmId,
            workDate: row.workDate,
            ringEnd: draft.ringEnd,
            chainageEnd: draft.chainageEnd,
            planRingCount: draft.planRingCount,
          });

          setEditingRowId(null);
          router.refresh();
        },
      }),
    [editingRowId, drafts]
  );

  return <DataTable columns={columns} data={data} />;
}
