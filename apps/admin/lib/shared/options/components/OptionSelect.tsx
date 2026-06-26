import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectOption } from "@/lib/shared/options/types";

type OptionSelectProps = {
  value?: string;
  options: SelectOption[];
  placeholder?: string;
  allLabel?: string;
  className?: string;
  onChange: (value: string | undefined) => void;
};

export function OptionSelect({
  value,
  options,
  placeholder = "请选择",
  allLabel = "全部",
  className = "w-[180px]",
  onChange,
}: OptionSelectProps) {
  return (
    <Select
      value={value ?? "all"}
      onValueChange={(nextValue) => {
        onChange(nextValue === "all" ? undefined : nextValue);
      }}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">{allLabel}</SelectItem>

        {options.map((item) => (
          <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
            <div className="flex w-full items-center justify-between gap-3">
              <span>{item.label}</span>

              {typeof item.count === "number" && (
                <span className="text-xs text-muted-foreground">{item.count}</span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
