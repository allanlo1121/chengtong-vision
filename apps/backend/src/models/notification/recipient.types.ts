/* ------------------------------------------------------------------
 * 类型：结构化 Recipient
 * ------------------------------------------------------------------*/
export interface Recipient {
  employee_id: string;
  name: string;
  phone: string | null;
  role: "PROJECT_ROLE" | "SPECIAL" | "GLOBAL";
}
