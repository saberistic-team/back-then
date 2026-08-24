import { describe, expect, it } from "vitest";

import { demoArchive } from "./fixtures";
import { demoArchiveSchema } from "./schema";

describe("fictional demo archive", () => {
  it("contains a complete, internally linked 30-memory archive", () => {
    expect(demoArchiveSchema.parse(demoArchive)).toStrictEqual(demoArchive);
    expect(demoArchive.memories).toHaveLength(30);
    expect(demoArchive.questions).toHaveLength(30);
    expect(demoArchive.assignments).toHaveLength(30);
    expect(
      new Set(demoArchive.memories.map((memory) => memory.assignmentId)).size,
    ).toBe(30);
  });

  it("contains text, voice, photo, people, and uncertain-date examples", () => {
    const media = new Set(demoArchive.memories.map((memory) => memory.medium));
    const dates = new Set(
      demoArchive.memories.map((memory) => memory.date.type),
    );
    expect([...media]).toEqual(
      expect.arrayContaining(["text", "voice", "photo", "voice_photo"]),
    );
    expect([...dates]).toEqual(
      expect.arrayContaining([
        "exact_date",
        "approximate_year",
        "age",
        "life_period",
        "unknown",
      ]),
    );
    expect(demoArchive.people.length).toBeGreaterThan(5);
    expect(demoArchive.memories.some((memory) => memory.transcript)).toBe(true);
    expect(demoArchive.memories.some((memory) => memory.photoPlaceholder)).toBe(
      true,
    );
  });

  it("is unmistakably fictional", () => {
    expect(demoArchive.profile.notice).toMatch(/fictional/i);
    expect(demoArchive.profile.childhoodLocation).toMatch(/fictional/i);
  });
});
