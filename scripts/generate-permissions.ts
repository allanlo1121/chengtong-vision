import "dotenv/config";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs/promises";
import path from "node:path";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const OUTPUT_PATH = path.resolve("apps/admin/lib/rbac/permissions.ts");

const DRY_RUN = process.argv.includes("--dry");
const CI_MODE = process.argv.includes("--check");

async function generate() {
  console.log("🔄 Fetching permissions from database...");

  const { data, error } = await supabase
    .schema("rbac")
    .from("permissions")
    .select("module, action, code, is_disabled")
    .eq("is_disabled", false);

  if (error) {
    console.error("❌ Failed to fetch permissions:", error);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.warn("⚠ No permissions found.");
    return;
  }

  // 按 module 分组
  const grouped: Record<string, Record<string, string>> = {};

  for (const row of data) {
    const module = row.module.toUpperCase();
    const action = row.action.toUpperCase();

    if (!grouped[module]) {
      grouped[module] = {};
    }

    grouped[module][action] = row.code;
  }

  // 排序 module
  const sortedModules = Object.keys(grouped).sort();

  let output = `// ============================================
// 🚨 AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
// ============================================

export const Permission = {\n`;

  for (const module of sortedModules) {
    output += `  ${module}: {\n`;

    const sortedActions = Object.keys(grouped[module]).sort();

    for (const action of sortedActions) {
      output += `    ${action}: "${grouped[module][action]}",\n`;
    }

    output += `  },\n`;
  }

  output += `} as const;\n\n`;

  output += `
type ValueOf<T> = T[keyof T];
type NestedValueOf<T> = ValueOf<ValueOf<T>>;
export type PermissionCode = NestedValueOf<typeof Permission>;
`;

  if (DRY_RUN) {
    console.log("🧪 Dry run output:\n");
    console.log(output);
    return;
  }

  if (CI_MODE) {
    try {
      const existing = await fs.readFile(OUTPUT_PATH, "utf8");
      if (existing !== output) {
        console.error("❌ permissions.ts is out of date.");
        process.exit(1);
      }
      console.log("✅ permissions.ts is up to date.");
      return;
    } catch {
      console.error("❌ permissions.ts does not exist.");
      process.exit(1);
    }
  }

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, output, "utf8");

  console.log("✅ permissions.ts generated successfully.");
}

generate();
