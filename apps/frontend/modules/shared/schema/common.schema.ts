import { z } from "zod";

export const idSchema = z.uuid({
  message: "必须是合法 UUID",
});

export const createdAtSchema = z.iso.datetime();

export const updatedAtSchema = z.iso.datetime();

export const countryCodeSchema = z
  .string()
  .regex(/^[A-Z]{2}$/, { message: "国家代码必须为2位大写字母" })
  .optional()
  .nullable();

export const adminRegionCodeSchema = z
  .string()
  .regex(/^\d{6}$/, { message: "行政区代码必须为6位数字" })
  .optional()
  .nullable();
