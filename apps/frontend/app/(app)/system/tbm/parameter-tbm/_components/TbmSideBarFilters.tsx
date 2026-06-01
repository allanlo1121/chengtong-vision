"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import type { TbmSidebarFilterValues } from "./ParameterBindingSidebar";

import { SelectOption } from "@/lib/shared/options/types";

interface Props {
  value: TbmSidebarFilterValues;
  onChange: (value: TbmSidebarFilterValues) => void;
  tbmTypeOptions: SelectOption[];
  manufacturerOptions: SelectOption[];
}

export function TbmSidebarFilters({ value, onChange, tbmTypeOptions, manufacturerOptions }: Props) {
  return (
    <div className="space-y-3">
      <Input
        placeholder="搜索盾构机名称 / 编号"
        value={value.search}
        onChange={(event) =>
          onChange({
            ...value,
            search: event.target.value,
          })
        }
      />

      <Select
        value={value.tbmTypeName}
        onValueChange={(nextValue) =>
          onChange({
            ...value,
            tbmTypeName: nextValue,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="盾构机类型" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">全部类型</SelectItem>

          {tbmTypeOptions.map((item) => (
            <SelectItem key={item.value} value={String(item.value)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={value.manufacturerName}
        onValueChange={(nextValue) =>
          onChange({
            ...value,
            manufacturerName: nextValue,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="盾构机厂家" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">全部厂家</SelectItem>

          {manufacturerOptions.map((item) => (
            <SelectItem key={item.value} value={String(item.value)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>盾构机直径</span>
          <span>
            {value.diameterRange[0]}m - {value.diameterRange[1]}m
          </span>
        </div>

        <Slider
          min={0}
          max={20}
          step={0.1}
          value={value.diameterRange}
          onValueChange={(nextValue) =>
            onChange({
              ...value,
              diameterRange: nextValue as [number, number],
            })
          }
        />
      </div>
    </div>
  );
}
