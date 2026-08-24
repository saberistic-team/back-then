import { expect, test } from "@playwright/test";

test("foundation page is usable", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Foundation ready." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View service health" }),
  ).toHaveAttribute("href", "/api/health");
});

test("health endpoint reports only safe service metadata", async ({
  request,
}) => {
  const response = await request.get("/api/health");
  expect(response.ok()).toBe(true);
  expect(await response.json()).toEqual({
    environment: "local",
    service: "backthen",
    status: "ok",
    version: "0.0.0",
  });
  expect(response.headers()["cache-control"]).toContain("no-store");
});
