import { createClient } from "../supabase/server";
import { RPC_MAP } from "./rpc-map";
import { buildRpcArgs } from "./build-rpc-args";

type RpcName = keyof typeof RPC_MAP;

export async function rpc<TName extends RpcName, TQuery extends Record<string, any>>(
  name: TName,
  query: TQuery
) {
  const supabase = await createClient();

  const config = RPC_MAP[name];

  if (!config) {
    throw new Error(`RPC config not found: ${name}`);
  }

  const args = buildRpcArgs(query, config);

  const { data, error } = await supabase.rpc(name, args);

  return { data, error };
}
