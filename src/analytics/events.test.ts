import { describe, expect, it } from "vitest";

import { createAnalyticsEvent, noOpAnalyticsTransport } from "./events";

describe("analytics event contract", () => {
  it("accepts an approved event with safe metadata", async () => {
    const event = createAnalyticsEvent({
      name: "first_memory_completed",
      properties: {
        answerMedium: "voice",
        clientType: "mobile_web",
        durationBucket: "1_to_3m",
        entitlementState: "trial",
        questionCategory: "early_childhood",
      },
    });

    await expect(noOpAnalyticsTransport.send(event)).resolves.toBeUndefined();
  });

  it.each([
    "answer",
    "transcript",
    "extractedName",
    "filename",
    "signedUrl",
    "searchTerm",
  ])("rejects private property %s", (property) => {
    expect(() =>
      createAnalyticsEvent({
        name: "first_memory_completed",
        properties: { [property]: "private content" },
      }),
    ).toThrow();
  });

  it("rejects unknown events and unsafe error strings", () => {
    expect(() =>
      createAnalyticsEvent({ name: "memory_body_viewed" }),
    ).toThrow();
    expect(() =>
      createAnalyticsEvent({
        name: "first_memory_completed",
        properties: { errorCode: "contains private words" },
      }),
    ).toThrow();
  });
});
