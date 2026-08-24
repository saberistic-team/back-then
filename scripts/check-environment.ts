import { parseRuntimeEnvironment } from "../src/config/environment";

const environment = parseRuntimeEnvironment(process.env);
process.stdout.write(
  `Environment configuration is valid for ${environment.ENVIRONMENT_ID}.\n`,
);
