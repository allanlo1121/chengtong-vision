"use client";

import { useState, useMemo, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronDown } from "lucide-react";

export type TreeNode = {
  value: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
};

interface Props {
  treeNodes: TreeNode[];
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function TreeSelect({
  treeNodes,
  value,
  onChange,
  placeholder = "请选择",
  disabled = false,
}: Props) {
  console.log("tree-select", treeNodes);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  /** 构建索引 */
  const { nodeMap, parentMap } = useMemo(() => {
    const nodeMap = new Map<string, TreeNode>();
    const parentMap = new Map<string, string | null>();

    function walk(nodes: TreeNode[], parent: string | null) {
      for (const n of nodes) {
        nodeMap.set(n.value, n);
        parentMap.set(n.value, parent);

        if (n.children) {
          walk(n.children, n.value);
        }
      }
    }

    walk(treeNodes, null);

    return { nodeMap, parentMap };
  }, [treeNodes]);

  /** 当前 label */
  const label = useMemo(() => {
    return value ? nodeMap.get(value)?.label : undefined;
  }, [value, nodeMap]);

  /** 展开路径 */
  function expandPath(id: string) {
    const next = new Set(expanded);

    let current: string | null = id;

    while (current) {
      const parent = parentMap.get(current);

      if (parent) {
        next.add(parent);
      }

      current = parent ?? null;
    }

    setExpanded(next);
  }

  /** 打开时展开选中节点 */
  useEffect(() => {
    if (open && value) {
      expandPath(value);
    }
  }, [open, value]);

  /** toggle */
  function toggle(id: string) {
    const next = new Set(expanded);

    if (next.has(id)) next.delete(id);
    else next.add(id);

    setExpanded(next);
  }

  /** 搜索 */
  const keyword = search.toLowerCase();

  function renderNode(node: TreeNode, level = 0): React.ReactNode {
    const isExpanded = expanded.has(node.value);

    const match = !keyword || node.label.toLowerCase().includes(keyword);

    const childMatch = node.children?.some((c) => c.label.toLowerCase().includes(keyword)) ?? false;

    if (!match && !childMatch && keyword) return null;

    return (
      <div key={node.value}>
        <div
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-muted"
          style={{ paddingLeft: level * 16 }}
        >
          {node.children?.length ? (
            <button type="button" onClick={() => toggle(node.value)} className="size-4">
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          ) : (
            <span className="size-4" />
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

        {isExpanded && node.children?.map((c) => renderNode(c, level + 1))}
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start" disabled={disabled}>
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
