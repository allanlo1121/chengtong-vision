//lib/crud/crud-toolbar.tsx

export function CrudToolbar({ left, right }: { left?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">{left}</div>

      <div className="flex items-center gap-2">{right}</div>
    </div>
  );
}
