// packages/database/src/postgres.ts

import postgres from "postgres";

export const sql = postgres(process.env.DATABASE_URL!, {
  max: 10,
});
