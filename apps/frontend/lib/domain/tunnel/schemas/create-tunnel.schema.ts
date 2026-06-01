import { z } from "zod";

import { TunnelScheduleVersionSchema } from "./tunnel-schedule-version.schema";
import { TunnelStatusTimelineSchema } from "./tunnel-status-timeline.schema";
import { TunnelSchema } from "./tunnel.schema";

export const CreateTunnelFullSchema = z.object({
  ...TunnelSchema.shape,
  ...TunnelStatusTimelineSchema.shape,
  ...TunnelScheduleVersionSchema.shape,
});

export type CreateTunnelFullInput = z.infer<typeof CreateTunnelFullSchema>;
