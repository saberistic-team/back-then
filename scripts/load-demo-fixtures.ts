import postgres from "postgres";

import { demoArchive } from "../src/features/demo/fixtures";
import { getLocalDatabaseUrl } from "./local-database";

const sql = postgres(getLocalDatabaseUrl(), { max: 1 });

try {
  await sql`
    insert into foundation.demo_archives (id, fixture_version, payload, loaded_at)
    values (
      ${demoArchive.id},
      ${demoArchive.fixtureVersion},
      ${sql.json(demoArchive)},
      now()
    )
    on conflict (id) do update
    set fixture_version = excluded.fixture_version,
        payload = excluded.payload,
        loaded_at = excluded.loaded_at
  `;
  process.stdout.write(
    `Loaded ${demoArchive.memories.length} fictional demo memories.\n`,
  );
} finally {
  await sql.end();
}
