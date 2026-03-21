export type RpcFieldConfig<TInput = any, TValue = any> = {
  field: string;
  transform?: (value: TValue, input: TInput) => any;
};

export type RpcMap = typeof import("./rpc-map").RPC_MAP;
