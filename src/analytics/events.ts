import { z } from "zod";

const eventNameSchema = z.enum([
  "account_created",
  "onboarding_completed",
  "first_memory_started",
  "first_memory_completed",
  "voice_memory_completed",
  "weekly_question_opened",
  "weekly_question_answered",
  "question_skipped",
  "photo_added",
  "subscription_started",
  "subscription_cancelled",
  "export_created",
]);

const safePropertiesSchema = z
  .object({
    answerMedium: z.enum(["text", "voice", "photo", "mixed"]).optional(),
    clientType: z.enum(["mobile_web", "desktop_web", "server"]).optional(),
    durationBucket: z.enum(["under_1m", "1_to_3m", "3_to_10m"]).optional(),
    entitlementState: z
      .enum(["trial", "paid", "cancelled", "expired"])
      .optional(),
    errorCode: z
      .string()
      .regex(/^[A-Z0-9_]{1,48}$/u)
      .optional(),
    questionCategory: z
      .string()
      .regex(/^[a-z0-9_-]{1,48}$/u)
      .optional(),
  })
  .strict();

const analyticsEventSchema = z.object({
  name: eventNameSchema,
  properties: safePropertiesSchema.default({}),
});

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;

export interface AnalyticsTransport {
  send(event: AnalyticsEvent): Promise<void>;
}

export function createAnalyticsEvent(input: unknown): AnalyticsEvent {
  return analyticsEventSchema.parse(input);
}

export const noOpAnalyticsTransport: AnalyticsTransport = Object.freeze({
  async send(event: AnalyticsEvent) {
    analyticsEventSchema.parse(event);
  },
});
