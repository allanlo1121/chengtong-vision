"use client";

import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function TreeSearch({ value, onChange }: Props) {
  return (
    <div className="p-2">
      <input
        onChange={async (e) => {
          const keyword = e.target.value;

          const res = await fetch(`/api/tree/search?keyword=${keyword}`);
          const list = await res.json();

          // 点击搜索结果 → 直接定位
        }}
      />
    </div>
  );
}
