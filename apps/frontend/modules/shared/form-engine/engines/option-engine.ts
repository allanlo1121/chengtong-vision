// engines/option-engine.ts
import { FieldValues } from "react-hook-form";
import { OptionConfig } from "../../options/types";

export async function resolveOptions<T extends FieldValues>(
  option:
    | OptionConfig
    | ((values: T) => OptionConfig)
    | ((values: T) => Promise<OptionConfig>)
    | undefined,
  values: T
): Promise<OptionConfig | undefined> {
  if (!option) return undefined;
  if (typeof option === "function") {
    return await (option as any)(values);
  }

  return option;
}
