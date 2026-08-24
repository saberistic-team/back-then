import { demoArchive } from "../src/features/demo/fixtures";
import { demoArchiveSchema } from "../src/features/demo/schema";

const archive = demoArchiveSchema.parse(demoArchive);
process.stdout.write(
  `Validated fictional demo archive ${archive.id} with ${archive.memories.length} memories.\n`,
);
