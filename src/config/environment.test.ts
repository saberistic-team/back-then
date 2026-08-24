import { describe, expect, it } from "vitest";

import { featureFlagsFromEnvironment, getFeatureFlags } from "./feature-flags";
import {
  clearRuntimeEnvironmentCacheForTests,
  getRuntimeEnvironment,
  parseRuntimeEnvironment,
} from "./environment";

describe("runtime environment", () => {
  it("uses production-safe local defaults", () => {
    const environment = parseRuntimeEnvironment({});
    expect(environment.DEPLOYMENT_ENV).toBe("local");
    expect(featureFlagsFromEnvironment(environment)).toEqual({
      aiDerived: false,
      demoData: false,
      localBillingBypass: false,
      voiceTranscription: false,
      weeklyDelivery: false,
    });
  });

  it("accepts an isolated staging configuration", () => {
    const environment = parseRuntimeEnvironment({
      DEPLOYMENT_ENV: "staging",
      EMAIL_DELIVERY_MODE: "sandbox",
      ENVIRONMENT_ID: "backthen-staging",
      STRIPE_MODE: "test",
      STRIPE_SECRET_KEY: "sk_test_fictional",
      SUPABASE_PROJECT_REF: "backthen-staging-placeholder",
    });
    expect(environment.DEPLOYMENT_ENV).toBe("staging");
  });

  it.each(["FEATURE_DEMO_DATA", "FEATURE_LOCAL_BILLING_BYPASS"])(
    "rejects unsafe staging flag %s",
    (flag) => {
      expect(() =>
        parseRuntimeEnvironment({
          DEPLOYMENT_ENV: "staging",
          EMAIL_DELIVERY_MODE: "sandbox",
          ENVIRONMENT_ID: "backthen-staging",
          STRIPE_MODE: "test",
          [flag]: "true",
        }),
      ).toThrow(/restricted to the local environment/);
    },
  );

  it.each(["FEATURE_DEMO_DATA", "FEATURE_LOCAL_BILLING_BYPASS"])(
    "rejects unsafe flag %s when a Vercel production deployment is mislabeled local",
    (flag) => {
      expect(() =>
        parseRuntimeEnvironment({
          DEPLOYMENT_ENV: "local",
          ENVIRONMENT_ID: "backthen-local",
          [flag]: "true",
          VERCEL_ENV: "production",
        }),
      ).toThrow(
        /Vercel production deployments must use DEPLOYMENT_ENV=production/,
      );
    },
  );

  it("rejects a mislabeled Vercel production deployment even with safe flags", () => {
    expect(() =>
      parseRuntimeEnvironment({
        DEPLOYMENT_ENV: "local",
        ENVIRONMENT_ID: "backthen-local",
        VERCEL_ENV: "production",
      }),
    ).toThrow(
      /Vercel production deployments must use DEPLOYMENT_ENV=production/,
    );
  });

  it("rejects live Stripe credentials in staging", () => {
    expect(() =>
      parseRuntimeEnvironment({
        DEPLOYMENT_ENV: "staging",
        EMAIL_DELIVERY_MODE: "sandbox",
        ENVIRONMENT_ID: "backthen-staging",
        STRIPE_MODE: "test",
        STRIPE_SECRET_KEY: "sk_live_not_allowed",
      }),
    ).toThrow(/Stripe secret must match test mode/);
  });

  it("requires live-only production modes", () => {
    expect(() =>
      parseRuntimeEnvironment({
        DEPLOYMENT_ENV: "production",
        EMAIL_DELIVERY_MODE: "sandbox",
        ENVIRONMENT_ID: "backthen-production",
        STRIPE_MODE: "test",
      }),
    ).toThrow();
  });

  it("accepts isolated production modes and credentials", () => {
    const environment = parseRuntimeEnvironment({
      DEPLOYMENT_ENV: "production",
      EMAIL_DELIVERY_MODE: "live",
      ENVIRONMENT_ID: "backthen-production",
      STRIPE_MODE: "live",
      STRIPE_SECRET_KEY: "sk_live_fictional",
      SUPABASE_PROJECT_REF: "backthen-production-placeholder",
      VERCEL_ENV: "production",
    });
    expect(environment.DEPLOYMENT_ENV).toBe("production");
  });

  it("rejects crossed environment identities and Supabase projects", () => {
    expect(() =>
      parseRuntimeEnvironment({
        DEPLOYMENT_ENV: "staging",
        EMAIL_DELIVERY_MODE: "live",
        ENVIRONMENT_ID: "backthen-production",
        STRIPE_MODE: "live",
        SUPABASE_PROJECT_REF: "backthen-production-placeholder",
      }),
    ).toThrow(/ENVIRONMENT_ID must be backthen-staging/);

    expect(() =>
      parseRuntimeEnvironment({
        DEPLOYMENT_ENV: "production",
        EMAIL_DELIVERY_MODE: "live",
        ENVIRONMENT_ID: "backthen-production",
        STRIPE_MODE: "live",
        SUPABASE_PROJECT_REF: "backthen-staging-placeholder",
      }),
    ).toThrow(/Production cannot reference/);
  });

  it("caches the server environment and exposes server-side flags", () => {
    clearRuntimeEnvironmentCacheForTests();
    const first = getRuntimeEnvironment();
    expect(getRuntimeEnvironment()).toBe(first);
    expect(getFeatureFlags()).toEqual({
      aiDerived: false,
      demoData: false,
      localBillingBypass: false,
      voiceTranscription: false,
      weeklyDelivery: false,
    });
    clearRuntimeEnvironmentCacheForTests();
  });
});
