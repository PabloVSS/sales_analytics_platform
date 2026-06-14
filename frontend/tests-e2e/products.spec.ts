import { test, expect } from "@playwright/test";

test("products page loading state", async ({ page }) => {
  page.on("dialog", (dialog) => dialog.dismiss());

  await page.goto("http://localhost:5173/");
  await page.fill('[data-testid="email"]', "admin@sales.com");
  await page.fill('[data-testid="password"]', "123456");
  await page.click('[data-testid="login-button"]');
  await expect(page).toHaveURL(/dashboard/, { timeout: 15000 });

  // Navega para a página de produtos
  await page.goto("http://localhost:5173/products");

  // Verifica se o estado de carregamento aparece
  await expect(page.getByTestId("products-loading")).toBeVisible();
});