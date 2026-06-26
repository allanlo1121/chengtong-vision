// types/realtime/connectivity.ts
import { record, z } from "zod";

export const tbmConnectivityRowSchema = z.object({
  tbmId: z.string(), // id uuid NOT NULL

  tbmCode: z.string(), // tbm_code text NOT NULL
  tbmName: z.string().nullable(), // tbm_name text
  lastRing: z.number().nullable(), // last_ring integer
  tbmOperationStatusCode: z.string(), // tbm_operation_status text NOT NULL
  plcOnline: z.boolean().nullable(), // plc_online boolean NOT NULL
  networkOnline: z.boolean().nullable(), // network_online boolean NOT NULL

  projectName: z.string().nullable(), // project_name text NOT NULL
  workPointName: z.string().nullable(), // work_point_name text
  tunnelName: z.string().nullable(), // tunnel_name text NOT NULL
  tunnelLength: z.number().nullable(), // tunnel_length numeric(10,3)
  segmentCount: z.number().nullable(), // segment_count integer

  lastRealdataAt: z.string().nullable(), // recorded_at timestamp NOT NULL
  lastHeartbeatAt: z.string().nullable(), // last_heartbeat_at timestamp NOT NULL
  recordedAt: z.string().nullable(), // recorded_at timestamp NOT NULL
});

export type TbmConnectivityRow = z.infer<typeof tbmConnectivityRowSchema>;
