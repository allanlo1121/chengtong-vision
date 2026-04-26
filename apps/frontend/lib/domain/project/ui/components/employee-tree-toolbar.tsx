"use client";

import { useEmployeeQuery } from "../../hooks/use-employee-tree";

export function EmployeeTreeToolbar() {
  const { query, updateQuery } = useEmployeeQuery();

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
