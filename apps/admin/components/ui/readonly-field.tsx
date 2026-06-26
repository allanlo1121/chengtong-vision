// components/ui/ReadOnlyField.tsx
import React from "react";

interface ReadOnlyFieldProps {
  label: string;
  value?: React.ReactNode;
  placeholder?: React.ReactNode;
}

export function ReadOnlyField({ label, value, placeholder = "-" }: ReadOnlyFieldProps) {
  return (
    <div className="space-y-1 flex flex-row items-start">
      <div className="w-24 text-sm text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">{value ?? placeholder}</div>
    </div>
  );
}
