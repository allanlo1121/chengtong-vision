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

import { TbmSidebarFilterValues } from "./TbmSidebar";

interface OptionItem {
  id: string;
  name: string;
}

interface Props {
  value: TbmSidebarFilterValues;
  onChange: (value: TbmSidebarFilterValues) => void;
  tbmTypeOptions: OptionItem[];
  manufacturerOptions: OptionItem[];
}

export function TbmSidebarFilters({ value, onChange, tbmTypeOptions, manufacturerOptions }: Props) {
  return (
    <div className="space-y-3">
      <Input
        placeholder="搜索盾构机名称 / 编号"
        value={value.search}
        onChange={(e) =>
          onChange({
            ...value,
            search: e.target.value,
          })
        }
      />

      <Select
        value={value.tbmTypeName}
        onValueChange={(v) =>
          onChange({
            ...value,
            tbmTypeName: v,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="盾构机类型" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">全部类型</SelectItem>

          {tbmTypeOptions.map((item) => (
            <SelectItem key={item.id} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={value.manufacturerName}
        onValueChange={(v) =>
          onChange({
            ...value,
            manufacturerName: v,
          })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="盾构机厂家" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">全部厂家</SelectItem>

          {manufacturerOptions.map((item) => (
            <SelectItem key={item.id} value={item.name}>
              {item.name}
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
          onValueChange={(v) =>
            onChange({
              ...value,
              diameterRange: v as [number, number],
            })
          }
        />
      </div>
    </div>
  );
}
