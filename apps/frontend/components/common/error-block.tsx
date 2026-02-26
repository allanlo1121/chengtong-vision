// components/common/error-block.tsx
import { AlertCircle } from "lucide-react";

interface ErrorBlockProps {
  title?: string;
  message?: string;
  retry?: () => void;
}

export function ErrorBlock({ title = "Something went wrong", message, retry }: ErrorBlockProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-destructive">
      <AlertCircle className="h-10 w-10 mb-4" />
      <h3 className="text-lg font-semibold">{title}</h3>
      {message && <p className="text-sm mt-2 max-w-md opacity-80">{message}</p>}
      {retry && (
        <button onClick={retry} className="mt-4 underline text-sm">
          Retry
        </button>
      )}
    </div>
  );
}
