import { describe, expect, it } from "vitest";

import { getLocalDatabaseUrl } from "../../scripts/local-database";

describe("local database guard", () => {
  it("uses the Supabase local database by default", () => {
    expect(getLocalDatabaseUrl({})).toContain("127.0.0.1:54322");
  });

  it("allows an explicit loopback database", () => {
    expect(
      getLocalDatabaseUrl({
        LOCAL_DATABASE_URL:
          "postgresql://postgres:postgres@localhost:54322/postgres",
      }),
    ).toContain("localhost");
  });

  it("rejects remote fixture targets", () => {
    expect(() =>
      getLocalDatabaseUrl({
        LOCAL_DATABASE_URL: "postgresql://user:secret@example.com/database",
      }),
    ).toThrow(/only connect to a local database/);
  });
});
