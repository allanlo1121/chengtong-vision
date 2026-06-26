"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { TbmDailyProgressListItem } from "@/lib/domain/tbm-runtime/types";
import { UpdateTbmDailyProgressInput } from "@/lib/domain/tbm-runtime/schemas";
import { calcDistance, formatMeters } from "@/lib/utils/format";

export type EditableProgressDraft = Partial<
  Pick<UpdateTbmDailyProgressInput, "ringEnd" | "chainageEnd" | "planRingCount">
>;

interface GetColumnsOptions {
  editingRowId: string | null;
  drafts: Record<string, EditableProgressDraft>;
  onEdit: (row: TbmDailyProgressListItem) => void;
  onCancel: () => void;
  onSave: (row: UpdateTbmDailyProgressInput) => void;
  onDraftChange: (rowId: string, key: keyof EditableProgressDraft, value: number | null) => void;
}

const meterFields = ["chainageStart", "chainageEnd"];

function NumberCell({
  row,
  field,
  editingRowId,
  drafts,
  onDraftChange,
}: {
  row: TbmDailyProgressListItem;
  field: keyof EditableProgressDraft;
  editingRowId: string | null;
  drafts: Record<string, EditableProgressDraft>;
  onDraftChange: GetColumnsOptions["onDraftChange"];
}) {
  const isEditing = editingRowId === row.id;

  const value = drafts[row.id]?.[field] ?? row[field] ?? "";

  const isMeterField = meterFields.includes(field);

  if (!isEditing) {
    const value = row[field];

    return (
      <div className="w-[120px]  border-l pl-3 text-right tabular-nums">
        {value == null ? "-" : isMeterField ? Number(value).toFixed(2) : value}
      </div>
    );
  }

  return (
    <Input
      type="number"
      value={value}
      onChange={(event) => {
        const next = event.target.value;
        onDraftChange(row.id, field, next === "" ? null : Number(next));
      }}
      className="h-8 w-[120px]"
    />
  );
}

export function getTunnelDailyProgressColumns({
  editingRowId,
  drafts,
  onEdit,
  onCancel,
  onSave,
  onDraftChange,
}: GetColumnsOptions): ColumnDef<TbmDailyProgressListItem>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "workDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="进度日期" />,
      cell: ({ row }) => (
        <div className="w-[120px]  border-l pl-3 text-right tabular-nums">
          {row.getValue("workDate")}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "ringStart",
      header: ({ column }) => <DataTableColumnHeader column={column} title="开始环号" />,
      cell: ({ row }) => (
        <div className="w-[120px]  border-l pl-3 text-right tabular-nums">
          {row.original.ringStart}
        </div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "ringEnd",
      header: ({ column }) => <DataTableColumnHeader column={column} title="结束环号" />,
      cell: ({ row }) => (
        <NumberCell
          row={row.original}
          field="ringEnd"
          editingRowId={editingRowId}
          drafts={drafts}
          onDraftChange={onDraftChange}
        />
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "planRingCount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="计划进度（环）" />,
      cell: ({ row }) => (
        <NumberCell
          row={row.original}
          field="planRingCount"
          editingRowId={editingRowId}
          drafts={drafts}
          onDraftChange={onDraftChange}
        />
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      id: "completedRings",
      header: ({ column }) => <DataTableColumnHeader column={column} title="完成环数" />,
      cell: ({ row }) => {
        const draft = drafts[row.original.id];

        const ringStart = row.original.ringStart ?? 0;
        const ringEnd = draft?.ringEnd ?? row.original.ringEnd ?? 0;

        return (
          <div className="w-[120px]  border-l pl-3 text-right tabular-nums">
            {calcDistance(ringStart, ringEnd)}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "chainageStart",
      header: ({ column }) => <DataTableColumnHeader column={column} title="开始里程" />,
      cell: ({ row }) => (
        <div className="w-[120px]  border-l pl-3 text-right tabular-nums">
          {row.original.chainageStart}
        </div>
      ),
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "chainageEnd",
      header: ({ column }) => <DataTableColumnHeader column={column} title="结束里程" />,
      cell: ({ row }) => (
        <NumberCell
          row={row.original}
          field="chainageEnd"
          editingRowId={editingRowId}
          drafts={drafts}
          onDraftChange={onDraftChange}
        />
      ),
      enableSorting: false,
      enableHiding: true,
    },

    {
      id: "completedChainage",
      header: ({ column }) => <DataTableColumnHeader column={column} title="完成里程" />,
      cell: ({ row }) => {
        const draft = drafts[row.original.id];

        const chainageStart = row.original.chainageStart ?? 0;
        const chainageEnd = draft?.chainageEnd ?? row.original.chainageEnd ?? 0;

        return (
          <div className="w-[120px]  border-l pl-3 text-right tabular-nums">
            {formatMeters(calcDistance(chainageStart, chainageEnd))}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const isEditing = editingRowId === row.original.id;

        if (isEditing) {
          return (
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                onClick={() =>
                  onSave({
                    id: row.original.id,
                    tbmId: row.original.tbmId,
                    workDate: row.original.workDate,
                    ringEnd: drafts[row.original.id]?.ringEnd!,
                    chainageEnd: drafts[row.original.id]?.chainageEnd!,
                    planRingCount: drafts[row.original.id]?.planRingCount!,
                  })
                }
              >
                保存
              </Button>
              <Button size="sm" variant="outline" onClick={onCancel}>
                取消
              </Button>
            </div>
          );
        }

        return (
          <div className="flex justify-end">
            <Button size="sm" variant="outline" onClick={() => onEdit(row.original)}>
              编辑
            </Button>
          </div>
        );
      },
    },
  ];
}
