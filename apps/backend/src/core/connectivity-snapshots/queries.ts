import { logger } from "../logger.js";
import { supabase } from "../supabase/client.js";
import type { TbmConnectivitySnapshotInsert, TbmConnectivitySnapshotRow } from "./types.js";


export async function getConnectivitySnapshotByType(
    tbmId: string,
    state_type: string): Promise<TbmConnectivitySnapshotRow | null> {

    const { data, error } = await supabase
        .from("tbm_connectivity_snapshots")
        .select("*")
        .eq("tbm_id", tbmId)
        .eq("state_type", state_type)
        .maybeSingle();

    if (error) {
        logger.error("❌ getConnectivitySnapshotByType failed:", error);
        throw error;
    }

    return data;
}    