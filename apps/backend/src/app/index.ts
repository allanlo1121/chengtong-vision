
// src/index.ts
import { bootstrap } from "./bootstrap.js";

bootstrap().catch((err) => {
  console.error("❌ Fatal error on bootstrap:", err);
  process.exit(1);
});
