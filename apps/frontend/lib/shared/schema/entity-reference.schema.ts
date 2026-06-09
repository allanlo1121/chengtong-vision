import { z } from "zod";
import { idSchema } from "./common.schema";

export const EntityReferenceSchema = z.object({
  id: idSchema,
  name: z.string(),
});
