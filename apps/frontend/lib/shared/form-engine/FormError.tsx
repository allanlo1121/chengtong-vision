export function FormError({ error }: { error: string | undefined }) {
  if (!error) return null;

  return <p className="text-sm text-destructive">{error}</p>;
}
