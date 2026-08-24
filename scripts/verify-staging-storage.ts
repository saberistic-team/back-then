import postgres from "postgres";

import {
  assertStorageBucketContract,
  type StorageBucketRow,
} from "./storage-bucket-contract";

const deploymentEnvironment = process.env.DEPLOYMENT_ENV;
const databasePassword = process.env.SUPABASE_DB_PASSWORD;
const projectRef = process.env.SUPABASE_PROJECT_REF;
const expectedStagingProjectRef = "yzzmfeqivsanztuaztdf";
const stagingPoolerHost = "aws-0-us-east-1.pooler.supabase.com";

if (deploymentEnvironment !== "staging") {
  throw new Error(
    "Hosted storage verification requires DEPLOYMENT_ENV=staging",
  );
}

if (projectRef !== expectedStagingProjectRef) {
  throw new Error("SUPABASE_PROJECT_REF is not the BackThen staging project");
}

if (!databasePassword) {
  throw new Error("SUPABASE_DB_PASSWORD is required");
}

const databaseUrl = new URL(`postgresql://${stagingPoolerHost}:5432/postgres`);
databaseUrl.username = `postgres.${projectRef}`;
databaseUrl.password = databasePassword;

const sql = postgres(databaseUrl.toString(), { max: 1, ssl: "require" });

try {
  const buckets = await sql<StorageBucketRow[]>`
    select
      id,
      name,
      public,
      file_size_limit::text,
      allowed_mime_types
    from storage.buckets
    where id in ('photos', 'recordings')
    order by id
  `;

  assertStorageBucketContract(buckets);
  process.stdout.write(
    `Hosted storage bucket verification passed for staging project ${projectRef}.\n`,
  );
} finally {
  await sql.end();
}
