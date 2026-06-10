"use client";

import { Input } from "@/components/ui/input";

type Props = {
  keyword?: string;
  placeholder?: string;
  onSearch?: (keyword: string) => void;
};

export function PickerToolbar({ keyword = "", placeholder = "请输入关键字", onSearch }: Props) {
  return (
    <Input
      placeholder={placeholder}
      value={keyword}
      onChange={(e) => {
        onSearch?.(e.target.value);
      }}
    />
  );
}
