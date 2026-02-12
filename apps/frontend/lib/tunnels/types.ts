// lib/tunnels/types.ts

export type SupabaseTunnelRaw = {
  id: string;
  project_id: string;

  name: string;
  short_name: string;

  tunnel_type: string;
  line_side: string;

  mileage_start: number | null;
  mileage_end: number | null;

  is_active: boolean;
};

export type TunnelQueryFilter = {
  projectId?: string;
  isActive?: boolean;
};
