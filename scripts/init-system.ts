import "dotenv/config";

import { runBootstrap } from "@cv/database";

async function main() {
  console.log("Initializing system...");

  await runBootstrap();
}

main().catch((error) => {
  console.error(error);

  process.exit(1);
});
