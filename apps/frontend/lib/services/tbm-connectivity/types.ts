// export type SupabaseTbmRaw = {
//     id: string;                         // uuid

//     tbm_name: string | null;
//     tbm_code: string | null;
//     tbm_type_code: string | null;

//     manufacturer_subject_id: string | null;
//     property_subject_id: string | null;
//     keeping_subject_id: string | null;
//     tbm_source_code: string | null;

//     property_subject_name_snapshot: string | null;
//     keeping_subject_name_snapshot: string | null;

//     tbm_model: string | null;
//     tbm_code_snapshot_at: string | null;
// };

export type SupabaseTbmConnectivityOverviewRaw = {
  tbm_id: string; // uuid
  tbm_code: string; // text NOT NULL
  tbm_name: string | null; // text
  last_ring: number | null; // integer
  tbm_operation_status_code: string; // text NOT NULL
  plc_online: boolean; // boolean NOT NULL
  network_online: boolean; // boolean NOT NULL
  project_name: string; // text NOT NULL
  work_point_name: string | null; // text
  tunnel_name: string; // text NOT NULL
  tunnel_length: number | null; // numeric(10,3)
  segment_count: number | null; // integer
  last_realdata_at: string; // timestamp NOT NULL
  last_heartbeat_at: string; // timestamp NOT NULL
  recorded_at: string; // timestamp NOT NULL
};
