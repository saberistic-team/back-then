import postgres from "postgres";

import { getLocalDatabaseUrl } from "./local-database";

const sql = postgres(getLocalDatabaseUrl(), { max: 1 });

try {
  const [result] = await sql<
    Array<{
      demo_memory_count: number;
      foundation_seed_count: number;
      schema_version: string | null;
    }>
  >`
    select
      coalesce(
        (select jsonb_array_length(payload -> 'memories')
         from foundation.demo_archives
         where id = 'fictional-year-in-memories'),
        0
      )::integer as demo_memory_count,
      (select count(*) from foundation.seed_runs where seed_name = 'foundation-base')::integer
        as foundation_seed_count,
      (select value from foundation.schema_metadata where key = 'foundation_schema_version')
        as schema_version
  `;

  if (
    result.demo_memory_count !== 30 ||
    result.foundation_seed_count !== 1 ||
    result.schema_version !== "1"
  ) {
    throw new Error(`Database verification failed: ${JSON.stringify(result)}`);
  }

  process.stdout.write(
    "Database migration, seed, and 30-memory fixture verification passed.\n",
  );
} finally {
  await sql.end();
}
