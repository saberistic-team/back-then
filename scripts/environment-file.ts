import { readFile } from "node:fs/promises";

export async function readEnvironmentFile(
  path: string,
): Promise<Record<string, string | undefined>> {
  const source = await readFile(path, "utf8");
  const environment: Record<string, string | undefined> = {};

  for (const [index, rawLine] of source.split(/\r?\n/u).entries()) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separator = line.indexOf("=");
    if (separator === -1) {
      throw new Error(`${path}:${index + 1} is not a KEY=value entry`);
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (!/^[A-Z][A-Z0-9_]*$/u.test(key)) {
      throw new Error(
        `${path}:${index + 1} contains an invalid environment name`,
      );
    }
    environment[key] = value;
  }

  return environment;
}
