import { RpcFieldConfig } from "./types";

export function buildRpcArgs<TInput extends Record<string, any>>(
  input: TInput,
  config: Record<string, RpcFieldConfig<TInput>>
) {
  const result: Record<string, unknown> = {};

  for (const key in config) {
    const cfg = config[key];
    if (!cfg) continue;

    const { field, transform } = cfg;

    let value = input[key];

    if (value === null || value === undefined) continue;

    if (transform) {
      value = transform(value, input);
    }

    result[field] = value;
  }

  return result;
}
