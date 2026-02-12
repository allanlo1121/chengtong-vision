export type SupabaseTunnelRaw = {
  id: string; // uuid
  project_id: string; // uuid NOT NULL
  project_catalog_id: string | null; // uuid
  project_work_point_id: string | null; // uuid

  name: string; // text NOT NULL
  prefix: string | null; // text

  start_chainage: number | null; // numeric(10,3)
  end_chainage: number | null; // numeric(10,3)

  longitude: number | null; // numeric(11,8)
  latitude: number | null; // numeric(10,8)

  status_id: string; // uuid → master_data
  geology: Record<string, any> | null; // jsonb
  gps: Record<string, any> | null; // jsonb

  remarks: string | null; // text

  created_at: string | null; // timestamptz
  updated_at: string | null; // timestamptz
  created_by: string | null; // uuid
  updated_by: string | null; // uuid
};

export type SupabaseTunnelOverviewRaw = {
  id: string; // uuid
  name: string; // text NOT NULL
  region_name: string | null; // text
  project_name: string; // text NOT NULL
  work_point_name: string | null; // text
  work_point_full_name: string | null; // text
  status: string; // text NOT NULL
  tunnel_length: number | null; // numeric(10,3)
  segment_count: number | null; // integer
  tbm_name: string | null; // text
};
