import { z } from "zod";

export const tbmSubsystemSchema = z.object({
  id: z.number().meta({
    table: "tbm_subsystems",
    label: "ID",
    field: "id",
    searchable: true,
    sortable: true,
    component: "input",
    section: "基本信息",
    type: "text",
    disabled: true,
    required: true,
    readonly: true,
    colSpan: 1,
  }),
});
