'use client';

import { useEffect, useState } from 'react';
import { fetchParameterDefinitions } from '@/lib/tbm/query-history/data';

interface ParameterItem {
  code: string;
  name: string;
  unit?: string;
  digits?: number;
}

interface ParameterGroup {
  code: string;
  name: string;
  children: ParameterItem[];
}

interface Props {
  value: string[];
  onChange: (selected: string[]) => void;
  tunnel_id: string;
  filterSubsystems?: string[]; // ✅ 可选过滤指定子系统
  onNamesChange?: (map: Record<string, string>) => void; // ✅ 把 code → name 回传出去
}

export default function ParameterSelector({
  value,
  onChange,
  tunnel_id,
  filterSubsystems,
  onNamesChange,
}: Props) {
  const [groupedParams, setGroupedParams] = useState<ParameterGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchParameterDefinitions(tunnel_id);

        // ✅ 过滤子系统
        const filtered = filterSubsystems
          ? data.filter(group => filterSubsystems.includes(group.code))
          : data;

        setGroupedParams(filtered);

        // ✅ 构造 code → name 映射表
        if (onNamesChange) {
          const codeNameMap = Object.fromEntries(
            filtered.flatMap(group =>
              (group.children ?? []).map(field => [field.code, field.name])
            )
          );
          onNamesChange(codeNameMap);
        }
      } catch (err) {
        console.error('加载参数定义失败', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tunnel_id, filterSubsystems]);

  const toggle = (code: string, checked: boolean) => {
    const next = checked ? [...value, code] : value.filter(v => v !== code);
    onChange(next);
  };

  if (loading) {
    return <div className="p-4 text-gray-500">正在加载参数定义...</div>;
  }

  return (
    <div className="space-y-2 h-full w-full overflow-y-auto border rounded p-3">
      {groupedParams.map(group => (
        <div key={group.code} className="border rounded p-2">
          <details open>
            <summary className="font-bold cursor-pointer">{group.name}</summary>
            <div className="pl-4 mt-2 space-y-1">
              {(group.children ?? []).map(field => (
                <label key={field.code} className="block space-x-2">
                  <input
                    type="checkbox"
                    checked={value.includes(field.code)}
                    onChange={e => toggle(field.code, e.target.checked)}
                  />
                  <span>{field.name}</span>
                  {field.unit && (
                    <span className="text-xs text-gray-500 ml-1">({field.unit})</span>
                  )}
                </label>
              ))}
            </div>
          </details>
        </div>
      ))}
    </div>
  );
}

