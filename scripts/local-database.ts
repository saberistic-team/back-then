const defaultLocalDatabaseUrl =
  "postgresql://postgres:postgres@127.0.0.1:54322/postgres";

export function getLocalDatabaseUrl(
  source: Readonly<Record<string, string | undefined>> = process.env,
): string {
  const databaseUrl = source.LOCAL_DATABASE_URL || defaultLocalDatabaseUrl;
  const parsed = new URL(databaseUrl);

  if (!new Set(["127.0.0.1", "localhost", "::1"]).has(parsed.hostname)) {
    throw new Error(
      "Fixture and verification scripts only connect to a local database",
    );
  }

  return databaseUrl;
}
