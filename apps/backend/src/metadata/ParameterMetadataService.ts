import { supabase, supabaseAdmin } from "../core/supabase/client.js";
import { MetadataServiceBase } from "./MetaDataServiceBase.js";

export interface ParameterMetadata {
  code: string;
  name: string;
  unit: string | null;

  subsystem_code: string | null;
  subsystem_name: string | null;

  digits: number;
  is_alarm: boolean;
  is_deleted: boolean;
  is_virtual: boolean;
  is_group: boolean;

  true_label: string | null;
  false_label: string | null;
  sort_order: number;
  remark: string | null;
}

export class ParameterMetadataService extends MetadataServiceBase {
  private cache = new Map<string, ParameterMetadata>();
  private subsystemCache = new Map<string, string>();

  async load(): Promise<void> {
    console.log("📥 Loading Parameter Metadata...");

    await this.loadSubsystems();
    await this.loadParameters();

    this.lastRefreshed = Date.now();
    this.initialized = true;
  }

  private async loadSubsystems() {
    console.log("📥 Loading TBM Subsystems...");
    const { data, error } = await supabase.from("tbm_subsystems").select("code, name");

    if (error) throw error;

    this.subsystemCache.clear();
    for (const row of data) {
      this.subsystemCache.set(row.code, row.name);
    }
  }

  private async loadParameters() {
    const subsystems = Array.from(this.subsystemCache.keys());

    this.cache.clear();

    for (const subsystem of subsystems) {
      const { data, error } = await supabaseAdmin
        .from("tbm_runtime_parameters")
        .select("*")
        .eq("subsystem_code", subsystem)
        .order("sort_order");

      if (error) throw error;

      for (const row of data) {
        //console.log("row", row.code);

        const meta: ParameterMetadata = {
          ...row,
          subsystem_name: row.subsystem_code
            ? (this.subsystemCache.get(row.subsystem_code) ?? null)
            : null,
        };

        this.cache.set(row.code, meta);
      }
    }
  }

  get(code: string): ParameterMetadata | null {
    return this.cache.get(code) ?? null;
  }

  getAll(): ParameterMetadata[] {
    return [...this.cache.values()].sort((a, b) => a.sort_order - b.sort_order);
  }
}
