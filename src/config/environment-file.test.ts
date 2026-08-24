import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { readEnvironmentFile } from "../../scripts/environment-file";

describe("environment file reader", () => {
  it("reads comments, blanks, and empty values without evaluating shell syntax", async () => {
    const directory = await mkdtemp(join(tmpdir(), "backthen-env-"));
    const path = join(directory, "example.env");
    await writeFile(
      path,
      "# example\nDEPLOYMENT_ENV=local\nEMPTY=\nVALUE=plain text\n",
      "utf8",
    );

    await expect(readEnvironmentFile(path)).resolves.toEqual({
      DEPLOYMENT_ENV: "local",
      EMPTY: "",
      VALUE: "plain text",
    });
  });

  it("rejects malformed entries", async () => {
    const directory = await mkdtemp(join(tmpdir(), "backthen-env-"));
    const path = join(directory, "invalid.env");
    await writeFile(path, "not-valid\n", "utf8");
    await expect(readEnvironmentFile(path)).rejects.toThrow(
      /not a KEY=value entry/,
    );
  });
});
