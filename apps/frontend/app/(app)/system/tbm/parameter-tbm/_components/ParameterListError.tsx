export function ParameterListError({ message }: { message: string }) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="rounded-md border border-destructive/30 bg-destructive/5 px-6 py-4 text-sm text-destructive">
        加载参数失败：{message}
      </div>
    </div>
  );
}
