//tree-toolbar.tsx
"use client";

interface TreeQueryToolbarProps {
  includeChildren?: boolean;

  onIncludeChildrenChange?: (value: boolean) => void;
}

export function TreeQueryToolbar({
  includeChildren = false,

  onIncludeChildrenChange,
}: TreeQueryToolbarProps) {
  return (
    <div className="flex items-center gap-4">
      <label
        className="
          flex
          items-center
          gap-2
        "
      >
        <input
          type="checkbox"
          checked={includeChildren}
          onChange={(e) => onIncludeChildrenChange?.(e.target.checked)}
        />
        包含下级
      </label>
    </div>
  );
}
