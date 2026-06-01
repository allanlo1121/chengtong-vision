// components/command-center/status-row.tsx

interface StatusRowProps {
  label: string;
  value: string;
  color: string;
}

export function StatusRow({ label, value, color }: StatusRowProps) {
  return (
    <div className="flex items-center justify-between px-4">
      <span className="flex items-center gap-1 text-muted-foreground">
        <span className={`size-4 rounded-full ${color}`} />

        {label}
      </span>

      <span className="text-lg font-semibold text-foreground">{value}</span>
    </div>
  );
}
