import { z } from "zod";

export const latitudeSchema = z
  .number()
  .min(-90, { message: "latitude 最小值为 -90" })
  .max(90, { message: "latitude 最大值为 90" });

export const longitudeSchema = z
  .number()
  .min(-180, { message: "longitude 最小值为 -180" })
  .max(180, { message: "longitude 最大值为 180" });
