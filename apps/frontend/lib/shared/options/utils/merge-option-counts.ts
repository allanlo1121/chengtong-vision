import { CountById, SelectOption } from "../types/option.types";

export function mergeOptionCounts(options: SelectOption[], counts: CountById[]): SelectOption[] {
  const countMap = new Map(counts.map((item) => [item.id, item.count]));

  return options.map((option) => ({
    ...option,
    count: countMap.get(option.value) ?? 0,
  }));
}
