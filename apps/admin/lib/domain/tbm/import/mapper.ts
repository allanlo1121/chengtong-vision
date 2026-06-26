/// @description: 员工数据映射器

import { CreateTbmInput } from "../schemas";
import { TbmImportRow } from "../types";
import { parseDiameter } from "../utils";

export const tbmMapper = (row: TbmImportRow) =>
  ({
    name: row["deviceLicense"],
    code: row["licenseNumber"],
    manageCode: row["manageNumber"],
    serialNo: row["licenseNumber"],
    diameter: parseDiameter(row["deviceSpec"]),
    power: parseDiameter(row["devicePower"]),
    model: row["deviceModel"],

    sortOrder: 0,
    isDisabled: false,

    externalId: row["id"],
    externalVersion: row["version"] ? Number(row["version"]) : 0,
  }) satisfies Omit<CreateTbmInput, "tbmTypeId" | "manufacturerId">;
