import { test, expect } from "@playwright/test";

test("login flow", async ({ page }) => {
  // Fecha qualquer diálogo de alerta automaticamente
  page.on("dialog", (dialog) => dialog.dismiss());

  await page.goto("http://localhost:5173/");

  await expect(page.getByTestId("email")).toBeVisible();

  await page.fill('[data-testid="email"]', "admin@sales.com");
  await page.fill('[data-testid="password"]', "123456");

  await page.click('[data-testid="login-button"]');

  await expect(page).toHaveURL(/dashboard/, { timeout: 15000 });
});