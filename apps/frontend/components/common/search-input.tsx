// components/search-input.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search as SearchIcon } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  paramKey?: string; // 默认 search
  resetPageKey?: string; // 默认 page
  debounce?: number;
}

export function SearchInput({
  placeholder = "Search...",
  paramKey = "search",
  resetPageKey = "page",
  debounce = 400,
}: SearchInputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentValue = searchParams.get(paramKey) ?? "";
  const [value, setValue] = useState(currentValue);

  // URL → input 同步
  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set(paramKey, term);
      params.set(resetPageKey, "1");
    } else {
      params.delete(paramKey);
      params.set(resetPageKey, "1");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, debounce);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder={placeholder}
        className="block w-full rounded-md border px-3 py-2 pl-10 text-sm"
      />
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
