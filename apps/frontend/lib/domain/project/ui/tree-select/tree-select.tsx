"use client";

import { useState } from "react";
import { useTreeSelect } from "../hooks/use-tree-select";
import { TreePanel } from "./tree-panel";

export function TreeSelect({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);

  const { selectedNode, expandedIds } = useTreeSelect(value);

  return (
    <div className="relative">
      {/* 输入框 */}
      <div className="border px-3 py-2 cursor-pointer" onClick={() => setOpen(!open)}>
        {selectedNode?.name ?? "请选择"}
      </div>

      {/* 弹层 */}
      {open && (
        <div className="absolute bg-white border w-80 max-h-96 overflow-auto z-50">
          <TreePanel
            expandedIds={expandedIds}
            onSelect={(node) => {
              onChange(node.id);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
