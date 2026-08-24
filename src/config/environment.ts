import { z } from "zod";

const blankToUndefined = (value: unknown) => (value === "" ? undefined : value);
const optionalString = z.preprocess(
  blankToUndefined,
  z.string().min(1).optional(),
);
const optionalUrl = z.preprocess(blankToUndefined, z.url().optional());
const optionalEmail = z.preprocess(blankToUndefined, z.email().optional());
const featureFlag = z
  .enum(["true", "false"])
  .default("false")
  .transform((value) => value === "true");

const environmentSchema = z
  .object({
    DEPLOYMENT_ENV: z.enum(["local", "staging", "production"]).default("local"),
    ENVIRONMENT_ID: z.string().min(1).default("backthen-local"),
    NEXT_PUBLIC_APP_URL: z.url().default("http://127.0.0.1:3000"),
    NEXT_PUBLIC_SUPABASE_URL: optionalUrl,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: optionalString,
    SUPABASE_PROJECT_REF: optionalString,
    SUPABASE_SERVICE_ROLE_KEY: optionalString,
    STRIPE_MODE: z.enum(["test", "live"]).default("test"),
    STRIPE_SECRET_KEY: optionalString,
    STRIPE_WEBHOOK_SECRET: optionalString,
    STRIPE_ANNUAL_PRICE_ID: optionalString,
    EMAIL_DELIVERY_MODE: z.enum(["log", "sandbox", "live"]).default("log"),
    RESEND_API_KEY: optionalString,
    RESEND_FROM_EMAIL: optionalEmail,
    FEATURE_DEMO_DATA: featureFlag,
    FEATURE_LOCAL_BILLING_BYPASS: featureFlag,
    FEATURE_AI_DERIVED: featureFlag,
    FEATURE_WEEKLY_DELIVERY: featureFlag,
    FEATURE_VOICE_TRANSCRIPTION: featureFlag,
  })
  .superRefine((environment, context) => {
    const expectedId = `backthen-${environment.DEPLOYMENT_ENV}`;
    if (environment.ENVIRONMENT_ID !== expectedId) {
      context.addIssue({
        code: "custom",
        message: `ENVIRONMENT_ID must be ${expectedId} for ${environment.DEPLOYMENT_ENV}`,
        path: ["ENVIRONMENT_ID"],
      });
    }

    const unsafeFlags = [
      environment.FEATURE_DEMO_DATA,
      environment.FEATURE_LOCAL_BILLING_BYPASS,
    ];
    if (environment.DEPLOYMENT_ENV !== "local" && unsafeFlags.some(Boolean)) {
      context.addIssue({
        code: "custom",
        message:
          "Demo data and billing bypass are restricted to the local environment",
        path: ["FEATURE_DEMO_DATA"],
      });
    }

    if (environment.DEPLOYMENT_ENV === "staging") {
      if (environment.STRIPE_MODE !== "test") {
        context.addIssue({
          code: "custom",
          message: "Staging must use Stripe test mode",
          path: ["STRIPE_MODE"],
        });
      }
      if (environment.EMAIL_DELIVERY_MODE !== "sandbox") {
        context.addIssue({
          code: "custom",
          message: "Staging must use sandbox email delivery",
          path: ["EMAIL_DELIVERY_MODE"],
        });
      }
      if (environment.SUPABASE_PROJECT_REF?.includes("production")) {
        context.addIssue({
          code: "custom",
          message: "Staging cannot reference a production Supabase project",
          path: ["SUPABASE_PROJECT_REF"],
        });
      }
    }

    if (environment.DEPLOYMENT_ENV === "production") {
      if (environment.STRIPE_MODE !== "live") {
        context.addIssue({
          code: "custom",
          message: "Production must use Stripe live mode",
          path: ["STRIPE_MODE"],
        });
      }
      if (environment.EMAIL_DELIVERY_MODE !== "live") {
        context.addIssue({
          code: "custom",
          message: "Production must use live email delivery",
          path: ["EMAIL_DELIVERY_MODE"],
        });
      }
      if (environment.SUPABASE_PROJECT_REF?.match(/local|staging|demo/)) {
        context.addIssue({
          code: "custom",
          message:
            "Production cannot reference a local, staging, or demo Supabase project",
          path: ["SUPABASE_PROJECT_REF"],
        });
      }
    }

    if (environment.STRIPE_SECRET_KEY) {
      const expectedPrefix =
        environment.STRIPE_MODE === "test" ? "sk_test_" : "sk_live_";
      if (!environment.STRIPE_SECRET_KEY.startsWith(expectedPrefix)) {
        context.addIssue({
          code: "custom",
          message: `Stripe secret must match ${environment.STRIPE_MODE} mode`,
          path: ["STRIPE_SECRET_KEY"],
        });
      }
    }
  });

export type RuntimeEnvironment = z.infer<typeof environmentSchema>;

export function parseRuntimeEnvironment(
  source: Readonly<Record<string, string | undefined>>,
): RuntimeEnvironment {
  return environmentSchema.parse(source);
}

let cachedEnvironment: RuntimeEnvironment | undefined;

export function getRuntimeEnvironment(): RuntimeEnvironment {
  cachedEnvironment ??= parseRuntimeEnvironment(process.env);
  return cachedEnvironment;
}

export function clearRuntimeEnvironmentCacheForTests() {
  cachedEnvironment = undefined;
}
