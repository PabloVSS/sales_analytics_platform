import { test, expect } from "@playwright/test";

test("dashboard loads KPIs", async ({ page }) => {
  page.on("dialog", (dialog) => dialog.dismiss());

  await page.goto("http://localhost:5173/");
  await page.fill('[data-testid="email"]', "admin@sales.com");
  await page.fill('[data-testid="password"]', "123456");
  await page.click('[data-testid="login-button"]');

  await expect(page).toHaveURL(/dashboard/, { timeout: 15000 });

  // Aguarda até 10s pelos KPIs (a API pode estar lenta ou precisar de aquecimento)
  await expect(page.getByTestId("kpi-orders")).toBeVisible({ timeout: 10000 });
  await expect(page.getByTestId("kpi-revenue")).toBeVisible();
});

test("loading state", async ({ page }) => {
  page.on("dialog", (dialog) => dialog.dismiss());

  // Intercepta a chamada de KPIs e atrasa 3 segundos (garantia de visualização do loading)
  await page.route("**/dashboard/kpis", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return route.continue();
  });

  await page.goto("http://localhost:5173/");
  await page.fill('[data-testid="email"]', "admin@sales.com");
  await page.fill('[data-testid="password"]', "123456");
  await page.click('[data-testid="login-button"]');

  await expect(page).toHaveURL(/dashboard/, { timeout: 15000 });

  // O loading deve estar visível enquanto a API está pendente
  await expect(page.getByTestId("dashboard-loading")).toBeVisible();

  // Após o delay, os KPIs aparecem e o loading desaparece
  await expect(page.getByTestId("kpi-orders")).toBeVisible({ timeout: 10000 });
  await expect(page.getByTestId("dashboard-loading")).not.toBeVisible();
});