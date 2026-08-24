import { z } from "zod";

const memoryDateSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("exact_date"), value: z.iso.date() }),
  z.object({
    type: z.literal("year"),
    value: z.number().int().min(1900).max(2100),
  }),
  z.object({
    type: z.literal("approximate_year"),
    value: z.number().int().min(1900).max(2100),
  }),
  z.object({ type: z.literal("age"), value: z.number().int().min(0).max(120) }),
  z.object({ type: z.literal("life_period"), value: z.string().min(1) }),
  z.object({ type: z.literal("unknown") }),
]);

export const demoMemorySeedSchema = z.object({
  answer: z.string().min(40),
  date: memoryDateSchema,
  medium: z.enum(["text", "voice", "photo", "text_photo", "voice_photo"]),
  people: z.array(z.string()).default([]),
  photoPlaceholder: z.string().min(1).optional(),
  question: z.string().min(10),
  title: z.string().min(3),
  transcript: z.string().min(20).optional(),
});

export const demoArchiveSchema = z.object({
  activeQuestion: z.object({
    id: z.string(),
    questionText: z.string().min(10),
  }),
  assignments: z
    .array(
      z.object({
        id: z.string(),
        questionId: z.string(),
        status: z.literal("answered"),
      }),
    )
    .length(30),
  fixtureVersion: z.literal(1),
  id: z.literal("fictional-year-in-memories"),
  memories: z
    .array(
      demoMemorySeedSchema.extend({ assignmentId: z.string(), id: z.string() }),
    )
    .length(30),
  people: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      relationship: z.string(),
    }),
  ),
  preferences: z.object({
    deliveryDay: z.literal("sunday"),
    deliveryWindow: z.literal("morning"),
    preservationInterests: z.array(z.string()),
    sensitiveTopics: z.array(z.string()),
    timezone: z.string(),
  }),
  profile: z.object({
    birthYear: z.number().int(),
    childhoodLocation: z.string(),
    firstName: z.string(),
    notice: z.literal("Entirely fictional demonstration data"),
  }),
  questions: z
    .array(z.object({ id: z.string(), questionText: z.string().min(10) }))
    .length(30),
});

export type DemoArchive = z.infer<typeof demoArchiveSchema>;
export type DemoMemorySeed = z.infer<typeof demoMemorySeedSchema>;
