

import type { Database } from "../supabase/supabase.types";

export type TbmConnectivitySnapshotRow =
    Database["public"]["Tables"]["tbm_connectivity_snapshots"]["Row"];

export type TbmConnectivitySnapshotInsert =
    Database["public"]["Tables"]["tbm_connectivity_snapshots"]["Insert"];