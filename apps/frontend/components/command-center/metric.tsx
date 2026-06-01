interface MetricProps {
  label: string;
  value: string | number;
  unit?: string;
}

export function Metric({ label, value, unit }: MetricProps) {
  return (
    <div className="rounded-xl border bg-card px-5 py-4">
      <div className="text-sm text-muted-foreground">{label}</div>

      <div className="mt-3 flex items-end gap-1">
        <span className="text-3xl font-bold tracking-tight">{value}</span>

        {unit && <span className="mb-1 text-sm text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
}
