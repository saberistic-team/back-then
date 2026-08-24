import packageJson from "../../../../package.json";

import { getRuntimeEnvironment } from "@/config/environment";

export const dynamic = "force-dynamic";

export function GET() {
  const environment = getRuntimeEnvironment();

  return Response.json(
    {
      environment: environment.DEPLOYMENT_ENV,
      service: packageJson.name,
      status: "ok",
      version: packageJson.version,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
