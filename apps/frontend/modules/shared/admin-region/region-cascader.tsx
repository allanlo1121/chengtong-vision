"use client";

import { useEffect, useState } from "react";
import { getOptions } from "@/modules/shared/options/services/option.service";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

import { SelectOption } from "../options/types";

export function RegionCascader({
  value,
  onChange,
}: {
  value: { province?: string; city?: string; district?: string };
  onChange: (value: { province?: string; city?: string; district?: string }) => void;
}) {
  const [provinces, setProvinces] = useState<SelectOption[]>([]);
  const [cities, setCities] = useState<SelectOption[]>([]);
  const [districts, setDistricts] = useState<SelectOption[]>([]);

  const province = value?.province;
  const city = value?.city;
  const district = value?.district;

  useEffect(() => {
    getOptions({
      source: "admin_regions",
      level: 1,
    }).then(setProvinces);
  }, []);

  useEffect(() => {
    if (!province) return;

    getOptions({
      source: "admin_regions",
      level: 2,
      parentCode: province,
    }).then(setCities);
  }, [province]);

  useEffect(() => {
    if (!city) return;

    getOptions({
      source: "admin_regions",
      level: 3,
      parentCode: city,
    }).then(setDistricts);
  }, [city]);

  return (
    <div className="flex gap-2">
      {/* 省 */}
      <Select value={province} onValueChange={(v) => onChange({ province: v })}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="省" />
        </SelectTrigger>

        <SelectContent>
          {provinces.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 市 */}
      <Select
        value={city}
        onValueChange={(v) =>
          onChange({
            province,
            city: v,
          })
        }
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="市" />
        </SelectTrigger>

        <SelectContent>
          {cities.map((c) => (
            <SelectItem key={c.value} value={c.value}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 区 */}
      <Select
        value={district}
        onValueChange={(v) =>
          onChange({
            province,
            city,
            district: v,
          })
        }
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="区县" />
        </SelectTrigger>

        <SelectContent>
          {districts.map((d) => (
            <SelectItem key={d.value} value={d.value}>
              {d.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
