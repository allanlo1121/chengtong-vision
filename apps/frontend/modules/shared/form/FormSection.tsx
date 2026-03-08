export function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 border p-6 rounded-lg">
      <h3 className="font-semibold text-lg">{title}</h3>

      {children}
    </div>
  );
}
