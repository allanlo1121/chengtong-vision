// types/tunnel.ts
import { z } from "zod";

export const tunnelSchema = z.object({
  id: z.string().uuid(),

  tunnelName: z.string(),
  shortName: z.string(),
});

export type Tunnel = z.infer<typeof tunnelSchema>;
