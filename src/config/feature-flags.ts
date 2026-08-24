import type { RuntimeEnvironment } from "./environment";
import { getRuntimeEnvironment } from "./environment";

export type FeatureFlags = Readonly<{
  aiDerived: boolean;
  demoData: boolean;
  localBillingBypass: boolean;
  voiceTranscription: boolean;
  weeklyDelivery: boolean;
}>;

export function featureFlagsFromEnvironment(
  environment: RuntimeEnvironment,
): FeatureFlags {
  return Object.freeze({
    aiDerived: environment.FEATURE_AI_DERIVED,
    demoData: environment.FEATURE_DEMO_DATA,
    localBillingBypass: environment.FEATURE_LOCAL_BILLING_BYPASS,
    voiceTranscription: environment.FEATURE_VOICE_TRANSCRIPTION,
    weeklyDelivery: environment.FEATURE_WEEKLY_DELIVERY,
  });
}

export function getFeatureFlags(): FeatureFlags {
  return featureFlagsFromEnvironment(getRuntimeEnvironment());
}
