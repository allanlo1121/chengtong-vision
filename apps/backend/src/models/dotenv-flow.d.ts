declare module "dotenv-flow" {
  interface DotenvFlowOptions {
    node_env?: string;
    encoding?: string;
    default_node_env?: string;
    path?: string;
    purge_dotenv?: boolean;
  }

  function config(options?: DotenvFlowOptions): void;

  export default {
    config: config
  };
}
