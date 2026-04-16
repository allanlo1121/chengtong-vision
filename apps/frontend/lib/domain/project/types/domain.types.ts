import { RemoveNull } from "@/lib/utils/remove-nullable";
import { ProjectListRow } from "./db.types";
import { Camelize } from "@/lib/utils/case-converter";

export type ProjectListItem = Camelize<ProjectListRow>;
