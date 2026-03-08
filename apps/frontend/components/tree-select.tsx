"use client";

import { useState, useMemo } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronDown } from "lucide-react";

export type TreeNode = {
  value: string;
  label: string;
  children: TreeNode[];
  disabled?: boolean;
};

interface Props {
  treeNodes: TreeNode[];
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function TreeSelect({ treeNodes, value, onChange, placeholder = "请选择" }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    const next = new Set(expanded);

    if (next.has(id)) next.delete(id);
    else next.add(id);

    setExpanded(next);
  }

  function findLabel(nodes: TreeNode[]): string | undefined {
    for (const n of nodes) {
      if (n.value === value) return n.label;

      const child = findLabel(n.children);
      if (child) return child;
    }
  }

  const label = useMemo(() => findLabel(treeNodes), [value, treeNodes]);

  function renderNode(node: TreeNode, level = 0) {
    const isExpanded = expanded.has(node.value);

    const match = !search || node.label.toLowerCase().includes(search.toLowerCase());

    if (!match && search) {
      const childMatch = node.children.some((c) =>
        c.label.toLowerCase().includes(search.toLowerCase())
      );

      if (!childMatch) return null;
    }

    return (
      <div key={node.value}>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded hover:bg-muted`}
          style={{ paddingLeft: level * 16 }}
        >
          {node.children.length > 0 && (
            <button type="button" onClick={() => toggle(node.value)} className="size-4">
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}

          <span
            className={`flex-1 cursor-pointer ${node.disabled ? "opacity-40" : ""}`}
            onClick={() => {
              if (node.disabled) return;

              onChange(node.value);
              setOpen(false);
            }}
          >
            {node.label}
          </span>
        </div>

        {isExpanded && node.children.map((c) => renderNode(c, level + 1))}
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {label ?? placeholder}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[320px] p-2">
        <Input
          placeholder="搜索..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-2"
        />

        <div className="max-h-[300px] overflow-auto">{treeNodes.map((n) => renderNode(n))}</div>
      </PopoverContent>
    </Popover>
  );
}
