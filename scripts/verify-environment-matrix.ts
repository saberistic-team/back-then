import { parseRuntimeEnvironment } from "../src/config/environment";
import { readEnvironmentFile } from "./environment-file";

const staging = parseRuntimeEnvironment(
  await readEnvironmentFile("config/environments/staging.env.example"),
);
const production = parseRuntimeEnvironment(
  await readEnvironmentFile("config/environments/production.env.example"),
);

if (!staging.SUPABASE_PROJECT_REF || !production.SUPABASE_PROJECT_REF) {
  throw new Error(
    "Staging and production must declare distinct Supabase project references",
  );
}
if (staging.SUPABASE_PROJECT_REF === production.SUPABASE_PROJECT_REF) {
  throw new Error("Staging and production cannot share a Supabase project");
}
if (staging.NEXT_PUBLIC_APP_URL === production.NEXT_PUBLIC_APP_URL) {
  throw new Error("Staging and production cannot share an application origin");
}

process.stdout.write("Environment matrix is isolated and production-safe.\n");
