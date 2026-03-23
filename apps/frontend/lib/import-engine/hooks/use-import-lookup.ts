// hooks/use-import-lookup.ts

export function buildLookupMap<T>(list: T[], key: keyof T, value: keyof T) {
  const map = new Map<string, any>();

  list.forEach((item) => {
    map.set(String(item[key]), item[value]);
  });

  return map;
}

import { useEffect, useState } from "react";

export function useImportLookups() {
  const [lookups, setLookups] = useState<any>();

  useEffect(() => {
    async function load() {
      const [orgTypes, organizations] = await Promise.all([
        fetch("/api/org-types").then((r) => r.json()),
        fetch("/api/organizations").then((r) => r.json()),
      ]);

      setLookups({
        orgTypes: new Map(orgTypes.map((o: any) => [o.name, o.id])),

        organizations: new Map(organizations.map((o: any) => [o.name, o.id])),
      });
    }

    load();
  }, []);

  return lookups;
}
