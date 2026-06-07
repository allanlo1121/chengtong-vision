"use client";

import { useProjectQuery } from "../hooks/use-project-tree";

export function ProjectTreeToolbar() {
  const { query, updateQuery } = useProjectQuery();

  return (
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={query.includeChildren}
          onChange={(e) =>
            updateQuery({
              includeChildren: e.target.checked,
              page: 1,
            })
          }
        />
        包含下级
      </label>
    </div>
  );
}
