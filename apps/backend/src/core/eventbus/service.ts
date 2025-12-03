
// import type { Json } from "../supabase/supabase.types";
// import type { AlarmEvent, TbmActiveOperationalInsert } from "./types";


// export function buildActiveEventInsert(ev: AlarmEvent): TbmActiveOperationalInsert {
//     return {
//         tbm_id: ev.tbmId,
//         param_code: ev.paramCode,
//         value: ev.value,
//         window_ms: ev.window_ms ?? 0,
//         severity_id: ev.severity,

//         ring_no: ev.ringNo ?? null,
//         parameters: (ev.parameters as unknown as Json) ?? null,
//         payload: ev.payload ?? null,
//         message: ev.message ?? null,
//         occurred_at: new Date(ev.timestamp).toISOString(),

//     };
// }
