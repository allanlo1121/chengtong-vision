import { z } from "zod";

import { CreateTunnelScheduleVersionSchema } from "./tunnel-schedule-version.schema";
import { CreateTunnelStatusTimelineSchema } from "./tunnel-status-timeline.schema";
import { CreateTunnelSchema } from "./tunnel.schema";

export const CreateTunnelFullSchema = z.object({
  ...CreateTunnelSchema.shape,
  ...CreateTunnelStatusTimelineSchema.shape,
  ...CreateTunnelScheduleVersionSchema.shape,
});

export type CreateTunnelFullInput = z.infer<typeof CreateTunnelFullSchema>;
